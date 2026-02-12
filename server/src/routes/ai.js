import express from 'express';
import ollama from 'ollama';
import { getMockDashboardStats } from '../services/mockDataService.js';

const router = express.Router();

router.post('/summarize-dashboard', async (req, res) => {
    try {
        const { dashboardStats, userPrompt, history } = req.body;

        // Check if we have valid real data
        // We consider data "real" if we have >0 alerts or incidents
        let statsToUse = dashboardStats;
        let isMock = false;

        const hasRealData = dashboardStats &&
            (dashboardStats.totalAlerts > 0 ||
                dashboardStats.activeIncidents > 0 ||
                (dashboardStats.recentIncidents && dashboardStats.recentIncidents.length > 0));

        // Fallback Logic: If no real data is found, switch to mock data service
        if (!hasRealData) {
            console.log("No real security data found. Switching to Mock Data Mode.");
            statsToUse = getMockDashboardStats();
            isMock = true; // Flag to inform frontend/AI that this is a simulation
        }

        // Construct the prompt with context
        const contextInfo = `
Current Security Context (${isMock ? "SIMULATED/MOCK DATA" : "Real-time Data"}):
- Total Alerts: ${statsToUse.totalAlerts || 0}
- Active Incidents: ${statsToUse.activeIncidents || 0}
- Risk Distribution: ${JSON.stringify(statsToUse.riskDistribution || {})}
- Recent Critical Logs: ${JSON.stringify(statsToUse.recentIncidents || [])}
- Data Source: ${statsToUse.source || 'Unknown'}
`;

        const prompt = `SOC ALERT SYSTEM - MACHINE FORMAT RESPONSE

DATA:
${contextInfo}

QUERY: ${userPrompt || "status"}

CRITICAL RULES:
1. Respond ONLY based on the provided security data above
2. Do NOT invent threats or change threat levels without data support
3. If data shows low/no alerts, respond accurately - do NOT escalate severity
4. Each line is ONE fact from the data
5. Answer should reference specific incidents/alerts in the data provided
6. Consistency: Repeat the same assessment if queried again with same data

RESPONSE FORMAT (no other text):
SUMMARY: ONE-LINE description of security status from the provided data
SEVERITY: (Critical/High/Medium/Low) - based only on provided metrics
MITRE ATT&CK: (Technique codes if applicable, or "None Detected")
NEXT ACTIONS: Line-by-line directives (3-5 max). Omit if severity is Low.

EXAMPLES (format only, do NOT copy content):
Example 1:
SUMMARY: Brute force activity on authentication service
SEVERITY: Critical
MITRE ATT&CK: Brute Force (T1110) - Confidence: 92%
NEXT ACTIONS:
Block source IP ranges
Enable MFA enforcement
Review failed login logs

Example 2:
SUMMARY: No active security incidents detected
SEVERITY: Low
MITRE ATT&CK: None Detected
NEXT ACTIONS: (none - omit when Low severity)

OUTPUT ONLY THE FORMATTED RESPONSE. NO OTHER TEXT.`;

        // Build conversation with history for context continuity
        const messages = [];
        
        // Add conversation history if available
        if (history && Array.isArray(history)) {
            messages.push(...history);
        }
        
        // Add current query
        messages.push({ role: 'user', content: prompt });

        const response = await ollama.chat({
            model: 'qwen2.5:1.5b',
            messages: messages,
            stream: false,
            options: {
                temperature: 0.5 // Balanced: data-driven but with natural variation
            }
        });

        res.json({
            summary: response.message.content,
            isMock: isMock
        });
    } catch (error) {
        console.error("Ollama Error:", error);
        res.status(500).json({
            error: "Failed to connect to local AI",
            details: error.message
        });
    }
});

export default router;
