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

        const prompt = `SOC SECURITY STATUS REPORT - DATA-BASED ONLY

ACTUAL DATA FROM DASHBOARD:
${contextInfo}

SEVERITY MAPPING (APPLY STRICTLY):
- If activeIncidents = 0: SEVERITY IS Low
- If activeIncidents 1-2: SEVERITY IS Medium  
- If activeIncidents 3-5: SEVERITY IS High
- If activeIncidents > 5: SEVERITY IS Critical
- NEVER escalate beyond what incidents show

RESPONSE FORMAT:
SUMMARY: State the actual count of activeIncidents and the top risk level from riskDistribution
SEVERITY: (Apply from mapping above based on activeIncidents count ONLY)
MITRE ATT&CK: Only list if recentIncidents contain specific attack types, else "None Detected"
NEXT ACTIONS: List only if Severity is High or Critical. If Low/Medium, omit this section.

CRITICAL RULES - OBEY THESE:
1. Report ONLY facts from the provided data
2. NEVER invent incidents, threats, or activities not in the data
3. If data shows 0 activeIncidents, do NOT say "high risk"
4. If riskDistribution is mostly low, severity cannot be High
5. Reference specific numbers from the data
6. Do NOT add drama or assumptions

EXAMPLE RESPONSE (format reference only):
Given: activeIncidents: 0, low risk distribution, 0 open alerts
SUMMARY: No active security incidents detected. 1,414,832 total alerts on file with mostly low-level activity.
SEVERITY: Low
MITRE ATT&CK: None Detected
(no NEXT ACTIONS for Low severity)

Given: activeIncidents: 4, high: 39, medium: 149, low: 12
SUMMARY: 4 active incidents detected with medium-to-low risk distribution (39 high, 149 medium, 12 low)
SEVERITY: High
MITRE ATT&CK: Possible lateral movement patterns
NEXT ACTIONS:
Investigate the 4 active incidents immediately
Review high-risk alerts (39 total)
Monitor for spread to additional systems

OUTPUT ONLY THIS FORMAT. NO OTHER TEXT. NO PROSE.`;

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
