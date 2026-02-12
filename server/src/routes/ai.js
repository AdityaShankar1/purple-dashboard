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

        // Pre-calculate severity to ensure it's deterministic
        const activeInc = statsToUse.activeIncidents || 0;
        let baseSeverity = 'Low';
        if (activeInc >= 1 && activeInc <= 2) baseSeverity = 'Medium';
        else if (activeInc >= 3 && activeInc <= 5) baseSeverity = 'High';
        else if (activeInc > 5) baseSeverity = 'Critical';

        // Map incident descriptions to MITRE ATT&CK techniques
        const mitreMapping = {
            'lateral movement': 'T1021 - Remote Services',
            'brute force': 'T1110 - Brute Force',
            'privilege escalation': 'T1134 - Access Token Manipulation',
            'data exfiltration': 'T1041 - Exfiltration Over Network',
            'credential theft': 'T1555 - Credentials from Password Stores',
            'malware': 'T1204 - User Execution',
            'ransomware': 'T1486 - Data Encrypted for Impact',
            'ddos': 'T1498 - Network Denial of Service',
            'sql injection': 'T1190 - Exploit Public-Facing Application',
            'phishing': 'T1566 - Phishing',
            'credential stuffing': 'T1110.004 - Credential Stuffing',
            'scanning': 'T1018 - Remote System Discovery',
            'reconnaissance': 'T1592 - Gather Victim Host Information',
            'unauthorized access': 'T1078 - Valid Accounts',
            'backdoor': 'T1098 - Account Manipulation',
            'persistence': 'T1547 - Boot or Logon Autostart Execution'
        };

        let detectedTechniques = [];
        if (statsToUse.recentIncidents && Array.isArray(statsToUse.recentIncidents)) {
            statsToUse.recentIncidents.forEach(incident => {
                const desc = (incident.description || '').toLowerCase();
                for (const [keyword, technique] of Object.entries(mitreMapping)) {
                    if (desc.includes(keyword)) {
                        detectedTechniques.push(technique);
                        break;
                    }
                }
            });
        }
        
        const mitreText = detectedTechniques.length > 0 
            ? detectedTechniques.slice(0, 3).join(', ')
            : 'None Detected';

        const prompt = `SOC SECURITY REPORT

DATA:
${contextInfo}

DETECTED MITRE ATT&CK TECHNIQUES: ${mitreText}

USER ASKS: "${userPrompt || "What is the security status?"}"

DETERMINISTIC SEVERITY (CALCULATED): ${baseSeverity}
(This is determined by activeIncidents count: ${activeInc})

ANSWER THE USER'S SPECIFIC QUESTION USING ONLY THE DATA ABOVE.

RESPONSE FORMAT:
SUMMARY: [One sentence directly answering their question]
SEVERITY: ${baseSeverity}
MITRE ATT&CK: ${mitreText}
NEXT ACTIONS: [Only if severity is High or Critical, else omit]

ANSWER APPROACH BY QUESTION TYPE:
- "logs" → Describe incidents/logs shown
- "status" → Describe overall security posture
- "actions" → Describe recommended steps
- "severity" → Explain why this severity level
- Generic → Overall assessment

CRITICAL RULES:
1. Severity is ALWAYS ${baseSeverity} for this data (${activeInc} active incidents)
2. MITRE ATT&CK is ALWAYS: ${mitreText}
3. Use ONLY real numbers from data above
4. Tailor summary wording to their specific question
5. Keep concise, no invented data
6. Format must be exact

OUTPUT ONLY THE FORMAT ABOVE.`;

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
