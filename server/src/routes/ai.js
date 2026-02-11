import express from 'express';
import ollama from 'ollama';

const router = express.Router();

router.post('/summarize-dashboard', async (req, res) => {
    try {
        const { dashboardStats } = req.body;

        if (!dashboardStats) {
            return res.status(400).json({ error: "No dashboard stats provided" });
        }

        // Construct the natural language prompt
        // We can make this more elaborate based on the structure of data we pass
        const prompt = `You are a helpful AI assistant for a cybersecurity dashboard. 
        Analyze the following dashboard data: 
        ${JSON.stringify(dashboardStats, null, 2)}
        
        Provide a concise, natural language summary of the current status, high-risk items, and any recommended actions. 
        Keep it simple and direct for a user who might not be a security expert.`;

        const response = await ollama.chat({
            model: 'qwen2.5', // Defaulting to qwen2.5 as requested
            messages: [{ role: 'user', content: prompt }],
            stream: false,
        });

        res.json({ summary: response.message.content });
    } catch (error) {
        console.error("Ollama Error:", error);
        // Fallback or better error message
        res.status(500).json({
            error: "Failed to connect to local AI",
            details: error.message
        });
    }
});

export default router;