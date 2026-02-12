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

        const prompt = `SOC SECURITY REPORT - ANSWER THE USER'S QUESTION BASED ON THIS EXACT DATA

DATA DEFINITIONS:
- totalAlerts: LIFETIME count of all alerts ever (example: 1,414,832)
- activeIncidents: COUNT of CURRENT open/active issues (0, 1, 2, 3, 4, 5, etc.)
- riskDistribution: BREAKDOWN of alert severity (critical, high, medium, low counts)
- recentIncidents: LIST of current incident details

TODAY'S DATA:
${contextInfo}

USER'S QUESTION: ${userPrompt || "What is the security status?"}

RULES FOR YOUR RESPONSE:
1. SEVERITY = determined ONLY by activeIncidents count:
   - activeIncidents = 0 → Severity LOW
   - activeIncidents 1-2 → Severity MEDIUM
   - activeIncidents 3-5 → Severity HIGH
   - activeIncidents > 5 → Severity CRITICAL

2. ANSWER THEIR SPECIFIC QUESTION:
   - If "status" → Report activeIncidents and severity
   - If "logs" → Describe recentIncidents if any, else say "no recent incidents"
   - If "what actions" → Suggest actions for the severity level
   - Default → Overall security posture

3. CRITICAL: Use ONLY the numbers provided above. NEVER invent values.

FORMAT:
SUMMARY: [Answer their question using actual data]
SEVERITY: [Low/Medium/High/Critical based on activeIncidents]
MITRE ATT&CK: [Only if recentIncidents describe attack, else "None Detected"]
NEXT ACTIONS: [Only for High/Critical severity, else omit]

OUTPUT ONLY THIS FORMAT. NO OTHER TEXT.`;

        // Build conversation with history for context continuity
        const messages = [];
        
        // Add conversation history if available (preserves context from previous exchanges)
        if (history && Array.isArray(history)) {
            messages.push(...history);
        }
        
        // Add the data context and rules as a SYSTEM message
        const systemPrompt = prompt;
        
        // Add the user's ACTUAL QUERY as a separate message
        // This allows the AI to respond differently to different questions
        const userQuery = userPrompt && userPrompt.trim() 
            ? userPrompt 
            : "What is the current security status based on the dashboard data?";
        
        messages.push({ 
            role: 'user', 
            content: `${systemPrompt}\n\nUSER QUERY: ${userQuery}` 
        });

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
