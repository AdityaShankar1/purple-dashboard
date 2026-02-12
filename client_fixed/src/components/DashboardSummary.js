import React, { useState } from 'react';
import axios from 'axios';

const DashboardSummary = ({ stats }) => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const getAiSummary = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/ai/summarize-dashboard', { dashboardStats: stats });
            setSummary(res.data.summary);
        } catch (err) {
            setSummary("Could not load AI summary.");
        }
        setLoading(false);
    };

    return (
        <div className="ai-section">
            <button onClick={getAiSummary} disabled={loading}>
                {loading ? "Analyzing..." : "Ask AI to Summarize Dashboard"}
            </button>
            {summary && <p className="mt-4 p-3 bg-gray-100 rounded">{summary}</p>}
        </div>
    );
};