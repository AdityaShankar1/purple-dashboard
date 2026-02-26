import express from 'express';
import { Ollama } from 'ollama';
import { getMockDashboardStats } from '../services/mockDataService.js';
import { wazuhService } from '../services/wazuhService.js';

const router = express.Router();
const ollama = new Ollama({ host: 'http://127.0.0.1:11434' });

/**
 * AI Dashboard Summarization Route
 * 
 * DESCRIPTION:
 * This route fetches real-time security data from Wazuh and uses Ollama (Qwen 2.5:1.5b) 
 * to generate a structured SOC reporting summary.
 * 
 * SUMMARIZATION FEATURE:
 * - Triggered by the "✨ Summarize" button in the frontend.
 * - Uses a default prompt: "Summarize the current security status and dashboard metrics."
 * - The backend handles this just like any other prompt but is optimized (via system prompt)
 *   to provide a high-level overview of the cumulative metrics.
 * 
 * DESIGN PHILOSOPHY:
 * - Direct Data: Fetches alerts server-side to ensure the AI sees the same data as the Dashboard.
 * - Strict Formatting: Enforces a bracketed title and bulleted list for a "CLI/SOC Console" feel.
 * - Balanced Descriptiveness: Targets a 2-3 sentence summary explaining the "why" behind logs.
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
    console.log("[AI ROUTE] Received request for dashboard summary");
    try {
        const { userPrompt, history } = req.body;

        // 1. Fetch Real Data Server-Side (Don't rely on frontend stats)
        let stats = {
            totalAlerts: 0,
            activeIncidents: 0,
            riskDistribution: {},
            recentIncidents: [],
            source: 'Real-time Wazuh API'
        };

        try {
            // Fetch total alerts, recent alerts (to count incidents and show logs), and risk
            const [total, recentAlerts, risk] = await Promise.all([
                wazuhService.getTotalAlerts(),
                wazuhService.getSecurityAlerts({ size: 50, timeRange: '24h' }),
                wazuhService.getRiskDistribution()
            ]);

            stats.totalAlerts = total;
            stats.recentIncidents = recentAlerts;

            // Sync with Dashboard logic: Incidents are Level >= 7
            stats.activeIncidents = recentAlerts.filter(a => a.rule && a.rule.level >= 7).length;

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

        const contextInfo = `
DATA SOURCE: ${isMock ? "SIMULATED" : "LIVE WAZUH"}
TOTAL ALERTS: ${stats.totalAlerts}
ACTIVE INCIDENTS (Level>=7): ${activeInc}
RISK LEVELS: ${JSON.stringify(stats.riskDistribution)}
RECENT LOG ENTRIES:
${recentLogs}
`;

        // 4. Improved System Prompt (Balanced & Structured)
        const systemPrompt = `ROLE: You are an expert SOC Security Auditor.
GOAL: Provide a balanced security summary. It must be descriptive enough for a user to understand the threat but strictly formatted.
AUDIENCE: Security analysts.

DATA CONTEXT:
${contextInfo}

OUTPUT FORMAT RULES (STRICT):
1. START with the title in brackets: [SECURITY STATUS]: or [LOG ANALYSIS]:
2. Next line: EXACTLY 2-3 DESCRIPTIVE SENTENCES explaining the current situation. 
   - Mention specific logs (e.g. "failed login attempts", "Apparmor DENIED").
   - Explain the impact (e.g. "potential brute force attack").
3. EACH detail MUST be on a NEW LINE starting with a dash (-).
4. USE THE EXACT VALUES PROVIDED BELOW FOR SEVERITY, INCIDENTS, AND MITRE. DO NOT REWRITE OR HALLUCINATE MITRE CODES.
5. NO pipes (|), NO markdown bold (**), NO horizontal lines.

STRICT TEMPLATE (Must use NEW LINES for every item):
[TITLE]:
[2-3 sentence summary]

- Severity: ${baseSeverity}
- Incidents: ${activeInc}
- MITRE: ${mitreText}
- Action: [Step 1]
- Action: [Step 2]

7. DO NOT repeat the User Query. DO NOT include "User Query" or "Response" labels.
8. START directly with [SECURITY STATUS]: or [LOG ANALYSIS]:.

EXAMPLE OUTPUT:
[SECURITY STATUS]:
We have detected a significantly high volume of failed authentication attempts on the domain controller. This pattern suggests an active brute force attack targeting the administrator account, although current safeguards are holding.

- Severity: Critical
- Incidents: 37
- MITRE: T1110 - Brute Force
- Action: Enable multi-factor authentication immediately.
- Action: Block the suspicious source IPs found in the logs.

THE USER QUERY IS: "${userPrompt || "Status report"}"
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

        console.log("[AI ROUTE] Sending request to Ollama (127.0.0.1:11434)...");
        const response = await ollama.chat({
            model: 'qwen2.5:1.5b',
            messages: messages,
            stream: false,
            options: {
                temperature: 0.1, // Very low for consistency
                num_predict: 300
            }
        });
        console.log("[AI ROUTE] Received response from Ollama");

        res.json({
            summary: response.message.content.trim(),
            isMock: isMock
        });

    } catch (error) {
        console.error("Global AI Route Error:", error);
        // Distinguish between Ollama specific errors and other errors
        const status = error.status || 500;
        let message = error.message || "An unexpected error occurred in the AI service";

        if (status === 404 && message.includes('model')) {
            message = "Ollama model not found. Please ensure 'qwen2.5:1.5b' is pulled.";
        }

        res.status(status).json({
            error: message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

export default router;
