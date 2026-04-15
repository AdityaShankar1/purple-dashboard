import express from 'express';
import ollama from 'ollama';

import { wazuhService } from '../services/wazuhService.js';
import { filterPrompt } from '../services/promptFilter.js';

const router = express.Router();

/**
 * AI Dashboard Summarization Route
 * 
 * DESCRIPTION:
 * This route fetches real-time security data from Wazuh and uses Ollama (Qwen 2.5:1.5b) 
 * to generate a structured SOC reporting summary.
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
    try {
        const { userPrompt, history } = req.body;

        // Check if prompt is allowed
        const filterResult = filterPrompt(userPrompt);
        if (!filterResult.allowed) {
            return res.status(200).json({
                blocked: true,
                summary: filterResult.message
            });
        }

        // 1. Fetch Real Data Server-Side (Don't rely on frontend stats)
        let stats = {
            totalAlerts: 0,
            activeIncidents: 0,
            riskDistribution: {},
            recentIncidents: [],
            source: 'Real-time Wazuh API'
        };

        try {
            // First attempt: last 24h
            let [total, incidentsCount, recentAlerts, risk] = await Promise.all([
                wazuhService.getAlertCount({ timeRange: '24h' }),
                wazuhService.getAlertCount({ timeRange: '24h', level: 7 }),
                wazuhService.getSecurityAlerts({ size: 50, timeRange: '24h' }),
                wazuhService.getDashboardDistribution()
            ]);

            // If empty, try historical data (last 30 days) before mock
            if (!total || total === 0) {
                console.log("[AI ROUTER] No 24h data found. Searching historical records (30 days)...");
                [total, incidentsCount, recentAlerts] = await Promise.all([
                    wazuhService.getAlertCount({ timeRange: '30d' }),
                    wazuhService.getAlertCount({ timeRange: '30d', level: 7 }),
                    wazuhService.getSecurityAlerts({ size: 50, timeRange: '30d' })
                ]);
                stats.source = 'Historical Wazuh Data (30d)';
            }

            stats.totalAlerts = total || 0;
            stats.activeIncidents = incidentsCount || 0;
            stats.recentIncidents = recentAlerts || [];

            if (risk && risk.risk) {
                stats.riskDistribution = risk.risk;
            }
        } catch (err) {
            console.error("Failed to fetch real Wazuh data for AI:", err.message);
        }

        // 2. Data Availability Check
        let isRealDataPresent = stats.totalAlerts > 0 || stats.activeIncidents > 0;
        if (!isRealDataPresent) {
            console.log("[AI ROUTER] No real or historical data found.");
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
DATA SOURCE: ${isRealDataPresent ? "LIVE WAZUH" : "NO RECENT LOGS FOUND"}
TOTAL ALERTS IN PERIOD: ${stats.totalAlerts}
ACTIVE INCIDENTS (Level >= 7): ${activeInc}
RISK LEVELS: ${JSON.stringify(stats.riskDistribution)}
RECENT LOG ENTRIES:
${recentLogs || "No recent high-level alerts found."}
`;

        // 4. Intent Classification & Pre-processing (1.5b)
        console.log(`\n[AI ROUTER] Initializing. User Query: "${userPrompt || "What do the logs suggest?"}"`);
        
        let userIntent = 'STATUS_REQUEST';
        let preprocessedNotes = 'None (no logs to preprocess).';

        try {
            console.log(`[AI ROUTER] Classifying intent and preprocessing with qwen2.5:1.5b...`);
            const prepPrompt = `STRICT TASK: Analyze the User Query: "${userPrompt || "What do the logs suggest?"}"
            
            TASK 1: Intent Classification
            - "STATUS_REQUEST": Asking about logs, alerts, dashboard, or security state.
            - "GENERAL_QUERY": General security/IT questions.
            
            TASK 2: Log Extraction (DO NOT ALTER DATA)
            - Summarize these logs: ${recentLogs || "None"}
            
            Output EXACT JSON: {"intent": "STATUS_REQUEST/GENERAL_QUERY", "summary": "brief summary or N/A"}`;

            const prepResult = await ollama.chat({
                model: 'qwen2.5:1.5b',
                messages: [{ role: 'user', content: prepPrompt }],
                stream: false,
                format: 'json',
                options: { temperature: 0.1, num_predict: 200 }
            });

            const parsed = JSON.parse(prepResult.message.content);
            userIntent = parsed.intent || 'STATUS_REQUEST';
            preprocessedNotes = parsed.summary || 'N/A';
            console.log(`[AI ROUTER] 1.5b Analysis complete. Intent: ${userIntent}`);
        } catch(e) {
            console.log(`[AI ROUTER] 1.5b Analysis failed or invalid JSON, defaulting to STATUS_REQUEST.`);
        }

        const systemPrompt = `ROLE: You are an expert SOC Security Auditor and Assistant.
GOAL: Provide clear, accurate information based on the provided logs or general knowledge.
STYLE: Technical, structured, and extremely concise.

DATA CONTEXT (Last Recorded Dashboard Stats):
${contextInfo}
(Derived Metrics for Accuracy):
- Severity Level: ${activeInc > 0 ? baseSeverity : 'Low'}
- Active Incidents: ${activeInc}
- Detected MITRE Techniques: ${mitreText}

1.5b PRE-PROCESSED LOG SUMMARY (USE THIS TO HELP FORMULATE YOUR ANSWER):
${preprocessedNotes}

${userIntent === 'STATUS_REQUEST' ? `
OUTPUT FORMAT RULES (STRICT):
1. START with the title: [SOC ASSISTANT]:
2. Use the EXACT following bulleted format:
   - severity: ${activeInc > 0 ? baseSeverity : 'Low'}
   - incidents: ${activeInc}
   - mitre: ${mitreText}
   - status: [2-3 sentence technical summary of the security state]
3. DO NOT use paragraphs for the entire response. Use the list above.
` : `
OUTPUT FORMAT RULES:
1. START with the title: [SOC ASSISTANT]:
2. Answer the user's question directly and naturally.
3. Use a structured, professional tone.
`}

THE USER QUERY IS: "${userPrompt || "What do the logs suggest?"}"
YOUR RESPONSE:`;

        // 5. Dual Model AI Router (Qwen 7b primary)
        let finalResponseText = '';
        let targetModel = 'qwen2.5:7b';
        
        console.log(`[AI ROUTER] Dispatching main query to ${targetModel} (Intent: ${userIntent})...`);
        
        const messages = [
            { role: 'system', content: "You are a robotic SOC reporting tool. Output ONLY the response. No chat." },
            { role: 'user', content: systemPrompt }
        ];

        if (history && history.length > 0) {
            messages.splice(1, 0, ...history.slice(-2));
        }

        try {
            const response = await ollama.chat({
                model: targetModel,
                messages: messages,
                stream: false,
                options: { temperature: 0.1, num_predict: 450 }
            });
            finalResponseText = response.message.content.trim();
        } catch (modelError) {
            console.log(`[AI ROUTER] Fallback to 1.5b due to connectivity: ${modelError.message}`);
            const fallbackResponse = await ollama.chat({
                model: 'qwen2.5:1.5b',
                messages: messages,
                stream: false,
                options: { temperature: 0.1, num_predict: 450 }
            });
            finalResponseText = fallbackResponse.message.content.trim();
        }

        // 6. Clean-up/Format validation (1.5b) - Ensure title exists
        if (!finalResponseText.startsWith('[SOC ASSISTANT]:')) {
             finalResponseText = '[SOC ASSISTANT]: ' + finalResponseText;
        }

        res.json({
            summary: finalResponseText,
            isRealDataPresent: isRealDataPresent
        });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Ollama connection failed", details: error.message });
    }
});

export default router;
