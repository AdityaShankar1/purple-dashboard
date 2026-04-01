import express from 'express';
import ollama from 'ollama';
import { getMockDashboardStats } from '../services/mockDataService.js';
import { wazuhService } from '../services/wazuhService.js';
import { probeModels, pickModel } from '../services/modelService.js';
import { filterPrompt } from '../services/promptFilter.js';
import { classifyQuery } from '../services/queryClassifier.js';

const router = express.Router();

/**
 * AI Dashboard Summarization Route
 *
 * DESCRIPTION:
 * Fetches real-time security data from Wazuh and uses the most appropriate
 * local Ollama model to generate a structured SOC reporting summary.
 *
 * MODEL ROUTING PIPELINE:
 * 1. promptFilter  → blocks off-topic / policy-violating queries early
 * 2. queryClassifier → scores prompt + wazuh context → 'small' | 'large' tier
 * 3. pickModel(tier) → maps tier to an actual model name; falls back to
 *    qwen2.5:1.5b automatically if qwen2.5:7b is not installed on this server
 *
 * DESIGN PHILOSOPHY:
 * - Graceful degradation: codebase works identically on a server that only
 *   has qwen2.5:1.5b — the larger model is a transparent extension.
 * - Security-aware branding: model identities are never sent to the frontend;
 *   they appear only in server console.log for operator visibility.
 *
 * ENCOUNTERED BUGS & FIXES:
 * 1. Incident Count Mismatch:
 *    - Bug: AI reported 0 incidents while dashboard showed many.
 *    - Fix: Synced backend logic: Dashboard counts "Incidents" as Level >= 7 alerts.
 * 2. Response Multi-lining (Collapsed Lines):
 *    - Bug: Qwen 1.5b tended to collapse outputs into a single line to be "concise".
 *    - Fix: Implemented a rigid structural template with explicit newline instructions (\n).
 * 3. Prompt Leakage:
 *    - Bug: AI repeated "User Query:" and "Response:" labels in its final output.
 *    - Fix: Removed terminal labels from the end of the prompt and added strict output instructions.
 * 4. MITRE Hallucination:
 *    - Bug: Model sometimes generated its own MITRE codes when "None Detected" was provided.
 *    - Fix: Hardened prompt instructions to use the EXACT provided metrics without rewriting.
 */
router.post('/summarize-dashboard', async (req, res) => {
    try {
        const { userPrompt, history } = req.body;

        // ── Stage 1: Prompt Filter ──────────────────────────────────────────
        const filterResult = filterPrompt(userPrompt);
        if (!filterResult.allowed) {
            return res.json({
                summary: filterResult.message,
                isMock: false,
                blocked: true
            });
        }

        // ── Stage 2: Model Selection (probe once, then cached) ───────────────
        await probeModels();

        // 1. Fetch Real Data Server-Side (Don't rely on frontend stats)
        let stats = {
            totalAlerts: 0,
            activeIncidents: 0,
            riskDistribution: {},
            recentIncidents: [],
            source: 'Real-time Wazuh API'
        };

        try {
            // Fetch comprehensive stats for 24h
            const [total, incidentsCount, recentAlerts, risk] = await Promise.all([
                wazuhService.getAlertCount({ timeRange: '24h' }),
                wazuhService.getAlertCount({ timeRange: '24h', level: 7 }),
                wazuhService.getSecurityAlerts({ size: 50, timeRange: '24h' }),
                wazuhService.getRiskDistribution ? wazuhService.getRiskDistribution() : Promise.resolve(null)
            ]);

            stats.totalAlerts = total;
            stats.activeIncidents = incidentsCount;
            stats.recentIncidents = recentAlerts;

            // Format risk distribution
            if (risk && risk.levels) {
                stats.riskDistribution = risk.levels.reduce((acc, curr) => {
                    acc[`Level ${curr.key}`] = curr.doc_count;
                    return acc;
                }, {});
            }
        } catch (err) {
            console.error("Failed to fetch real Wazuh data for AI:", err.message);
            // Fallback naturally if stats remain zero/empty
        }

        // 2. Fallback to Mock Data if no real data found
        let isMock = false;
        if (stats.totalAlerts === 0 && stats.activeIncidents === 0) {
            stats = getMockDashboardStats();
            isMock = true;
        }

        // ── Stage 3: Query Classification ────────────────────────────────────
        const tier = classifyQuery(userPrompt, { activeIncidents: stats.activeIncidents });
        const modelName = pickModel(tier);

        // Operator-visible model identification (never reaches the frontend)
        console.log(
            `[AI] Model: ${modelName} | Tier: ${tier} | ` +
            `Incidents: ${stats.activeIncidents} | ` +
            `Prompt: "${(userPrompt || '').slice(0, 60)}${(userPrompt || '').length > 60 ? '...' : ''}"`
        );

        // 3. Prepare Context for AI
        const activeInc = stats.activeIncidents || 0;
        let baseSeverity = 'Low';
        if (activeInc >= 1 && activeInc <= 5) baseSeverity = 'Medium';
        else if (activeInc > 5 && activeInc <= 10) baseSeverity = 'High';
        else if (activeInc > 10) baseSeverity = 'Critical';

        // Map incident descriptions to MITRE techniques
        const mitreMapping = {
            'lateral movement': 'T1021 - Remote Services',
            'brute force': 'T1110 - Brute Force',
            'privilege escalation': 'T1134 - Access Token Manipulation',
            'data exfiltration': 'T1041 - Exfiltration Over Network',
            'malware': 'T1204 - User Execution',
            'unauthorized access': 'T1078 - Valid Accounts',
            'failed login': 'T1110 - Brute Force',
            'scanning': 'T1046 - Network Service Scanning'
        };

        const detectedTechniques = new Set();
        stats.recentIncidents.forEach(i => {
            const desc = (i.rule?.description || '').toLowerCase();
            for (const [key, val] of Object.entries(mitreMapping)) {
                if (desc.includes(key)) detectedTechniques.add(val);
            }
        });
        const mitreText = detectedTechniques.size > 0
            ? Array.from(detectedTechniques).slice(0, 3).join(', ')
            : 'None Detected';

        const recentLogs = stats.recentIncidents.slice(0, 5).map(i => {
            return `[${i['@timestamp']}] Level ${i.rule?.level}: ${i.rule?.description}`;
        }).join('\n');

        const dataSourceLabel = "Powered by Ollama, Always Verify Results";

        const contextInfo = `
DATA SOURCE: ${dataSourceLabel}
TOTAL ALERTS IN PERIOD: ${stats.totalAlerts}
ACTIVE INCIDENTS (Level >= 7): ${activeInc}
RISK LEVELS: ${JSON.stringify(stats.riskDistribution)}
RECENT LOG ENTRIES:
${recentLogs || "No recent high-level alerts found."}
`;

        // 4. Improved System Prompt (Balanced & Structured)
        const isSimpleRequested = (userPrompt || "").toLowerCase().includes("simple") || (userPrompt || "").toLowerCase().includes("suggest");

        const systemPrompt = `ROLE: You are an expert SOC Security Auditor and Assistant.
GOAL: Provide a clear, actionable security summary based on the provided logs. 
${isSimpleRequested ? "IMPORTANT: The user wants an answer in SIMPLE WORDS. Avoid overly technical jargon where possible, but stay accurate." : "STYLE: Professional, concise, and technical."}

DATA CONTEXT:
${contextInfo}

OUTPUT FORMAT RULES (STRICT):
1. START with the title in brackets: [LOG ANALYSIS]: or [SECURITY STATUS]:
2. Next line: EXACTLY 2-3 SENTENCES explaining what the logs suggest in simple, clear language.
   - Mention the primary threat if any (e.g. "We see multiple login failures", "System files were accessed").
   - Explain what this means for the user (e.g. "This suggests someone is trying to guess a password").
3. EACH detail MUST be on a NEW LINE starting with a dash (-).
4. USE THE EXACT VALUES PROVIDED BELOW for Severity, Incidents, and MITRE.
5. NO pipes (|), NO markdown bold (**), NO horizontal lines.

STRICT TEMPLATE (Use NEW LINES for every item):
[TITLE]:
[2-3 sentence summary in simple words]

- Severity: ${baseSeverity}
- Incidents: ${activeInc}
- MITRE: ${mitreText}
- Action: [Simple, clear step 1]
- Action: [Simple, clear step 2]

7. DO NOT repeat the User Query. 
8. START directly with the Title.

THE USER QUERY IS: "${userPrompt || "What do the logs suggest?"}"
YOUR REPORT:`;

        // 5. Ollama Chat
        const messages = [
            { role: 'system', content: "You are a robotic SOC reporting tool. Output ONLY the report. No chat." },
            { role: 'user', content: systemPrompt }
        ];

        // Include truncated history if relevant
        if (history && history.length > 0) {
            messages.splice(1, 0, ...history.slice(-2));
        }

        const response = await ollama.chat({
            model: modelName,
            messages: messages,
            stream: false,
            options: {
                temperature: 0.1, // Very low for consistency
                num_predict: 300
            }
        });

        res.json({
            summary: response.message.content.trim(),
            isMock: isMock
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Ollama connection failed", details: error.message });
    }
});

export default router;
