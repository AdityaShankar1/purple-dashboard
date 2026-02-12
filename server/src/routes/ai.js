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

RESPONSE RULES:
First section: SUMMARY:
Second section: SEVERITY: (Critical/High/Medium/Low)
Third section: MITRE ATT&CK: (T#### - Technique)
Fourth section: NEXT ACTIONS: (line by line, no bullet prose)

Content rules:
- NO markdown, NO paragraphs, NO explanations
- Each line is ONE fact
- If IP data available, mention IP and its risk profile
- Confidence inline: (XX%)
- Action items are plain directives, max 12 words each

EXAMPLE FORMATS:
Example 1:
SUMMARY:
Brute force attempt detected on Auth server with 247 failed logins in 15min

SEVERITY:
Critical

MITRE ATT&CK:
Brute Force (T1110) - Confidence: 92%

NEXT ACTIONS:
Block source IPs immediately
Enable MFA for affected accounts
Review authentication logs

Example 2:
SUMMARY:
Data exfiltration activity from endpoint Finance-Workstation-07

SEVERITY:
High

MITRE ATT&CK:
Exfiltration Over Network (T1041) - Confidence: 88%

NEXT ACTIONS:
Isolate compromised endpoint
Audit recent file access and transfers
Scan for malware signatures

OUTPUT ONLY THIS FORMAT WITH YOUR OWN DATA. NO OTHER TEXT.`;

        const response = await ollama.chat({
            model: 'qwen2.5:1.5b',
            messages: [{ role: 'user', content: prompt }],
            stream: false,
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
