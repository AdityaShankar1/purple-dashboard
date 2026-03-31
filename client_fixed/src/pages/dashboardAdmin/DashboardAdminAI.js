/**
 * ============================================================================
 * LATEST VERSION - UI/UX Consistency Fix
 * ============================================================================
 * BUG FIXED: AI Chat Theme Colors
 * - The chat window had a dark brown background, and tailwind injected dark mode overrides.
 * SOLUTION:
 * - Changed chat background definitively to light blue #ddeeff.
 * - Removed `dark:` tailwind classes that were overriding the light blue theme.
 * - Changed chat bubbles to solid white with black text for readability.
 * ============================================================================
 */
import React, { useState, useEffect, useRef } from "react";

import { Bot, Send, Trash2, User, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { useIncidentsData } from "../../hooks/useIncidentsData";
import axios from "../../api/axiosConfig";

export default function DashboardAdminAI() {
    // Data State
    const incidentsFromHook = useIncidentsData();
    const [metrics, setMetrics] = useState(null);
    const [wazuhAlerts, setWazuhAlerts] = useState(null);
    // ... rest of state ...

    // Chat State
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("ai_chat_history");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Connection Status
    const [connStatus, setConnStatus] = useState("checking"); // checking, wazuh, dashboard, failed

    // Fetch metrics and wazuh status on mount
    useEffect(() => {
        const fetchData = async () => {
            setConnStatus("checking");
            try {
                // 1. Try Wazuh Alerts (Real-time)
                const wazuhRes = await axios.get("/wazuh/logs").catch(() => null);
                let wazuhData = null;
                if (wazuhRes && wazuhRes.data) {
                    wazuhData = wazuhRes.data;
                    setWazuhAlerts(wazuhData);
                }

                // 2. Try Dashboard Metrics (Recent)
                const metricsRes = await axios.get("/wazuh/metrics").catch(() => null);
                let dashboardData = null;
                if (metricsRes && metricsRes.data) {
                    dashboardData = metricsRes.data;
                    setMetrics(dashboardData);
                }

                if (wazuhData && wazuhData.length > 0) {
                    setConnStatus("wazuh");
                } else if (dashboardData && (dashboardData.count > 0 || dashboardData.last24hCount > 0)) {
                    setConnStatus("dashboard");
                } else {
                    setConnStatus("mock");
                }
            } catch (err) {
                console.error("Data fetch error:", err);
                setConnStatus("failed");
            }
        };
        fetchData();
    }, []);

    // Persist messages
    useEffect(() => {
        localStorage.setItem("ai_chat_history", JSON.stringify(messages));
    }, [messages]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleClearChat = () => {
        if (window.confirm("Are you sure you want to clear the chat history?")) {
            setMessages([]);
            localStorage.removeItem("ai_chat_history");
        }
    };

    const handleSendMessage = async (e, forcedPrompt = null) => {
        if (e) e.preventDefault();
        const promptToUse = forcedPrompt || input;
        if (!promptToUse.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: promptToUse };
        setMessages(prev => [...prev, userMsg]);
        if (!forcedPrompt) setInput("");
        setLoading(true);

        try {
            // Aggregating data for context
            const contextData = {
                source: connStatus === 'wazuh' ? 'Wazuh Real-time API' : 'Dashboard Metrics Fallback',
                totalAlerts: metrics?.count || wazuhAlerts?.length || incidentsFromHook?.length || 0,
                activeIncidents: (wazuhAlerts?.length || 0) + (incidentsFromHook?.length || 0),
                riskDistribution: metrics?.alerts ? {
                    critical: (metrics.alerts.filter(a => (a.rule?.level || 0) >= 14) || []).length,
                    high: (metrics.alerts.filter(a => (a.rule?.level || 0) >= 8 && (a.rule?.level || 0) < 14) || []).length,
                    medium: (metrics.alerts.filter(a => (a.rule?.level || 0) >= 5 && (a.rule?.level || 0) < 8) || []).length,
                    low: (metrics.alerts.filter(a => (a.rule?.level || 0) < 5) || []).length,
                } : {},
                recentIncidents: (wazuhAlerts || metrics?.alerts || incidentsFromHook || []).slice(0, 5).map(i => ({
                    level: i.rule?.level || i.level || 0,
                    description: i.rule?.description || i.description || "Security event",
                    agent: i.agent?.name || i.agent || "Unknown agent",
                    timestamp: i.timestamp || new Date().toISOString()
                })),
                timestamp: new Date().toISOString()
            };

            const res = await axios.post("/ai/summarize-dashboard", {
                dashboardStats: contextData,
                userPrompt: promptToUse,
                history: messages.slice(-3)
            });

            const data = res.data;

            if (data.isMock && connStatus !== 'mock') {
                setConnStatus('mock');
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: data.summary
            }]);

        } catch (err) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: "I encountered an error connecting to the AI service. Please try again later."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] glass-purple-theme overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-5 flex justify-between items-center text-white">
                <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                        <Bot size={28} />
                    </div>
                    <div>
                        <h2 className="font-extrabold text-xl tracking-tight">Security Assistant</h2>
                        <div className="flex items-center text-xs font-medium text-purple-100">
                            {connStatus === 'checking' && <Loader2 size={12} className="animate-spin mr-2" />}
                            {connStatus === 'wazuh' && <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>}
                            {connStatus === 'dashboard' && <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>}
                            {connStatus === 'mock' && <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>}
                            {connStatus === 'failed' && <AlertCircle size={12} className="text-red-400 mr-2" />}

                            {connStatus === 'checking' && "Checking connectivity..."}
                            {connStatus === 'wazuh' && "Connected to Real-time Wazuh API"}
                            {connStatus === 'dashboard' && "Using Dashboard Metrics Fallback"}
                            {connStatus === 'mock' && "Simulation Mode (Mock Data)"}
                            {connStatus === 'failed' && "No Security Data Available"}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleSendMessage(null, "What do the logs suggest?")}
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-xl transition-all text-sm font-bold text-purple-100 border border-white/10"
                        title="Quick Summary"
                    >
                        <Sparkles size={18} />
                        <span>Summarize</span>
                    </button>
                    <button
                        onClick={handleClearChat}
                        className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-purple-100"
                        title="Clear History"
                    >
                        <Trash2 size={22} />
                    </button>
                </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-primary)]">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-purple-600'}`}>
                                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border border-gray-200 bg-white text-black whitespace-pre-line ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} text-[15px] leading-relaxed`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-200 backdrop-blur-sm">
                            <Loader2 className="animate-spin text-purple-600" size={20} />
                            <span className="text-sm font-medium text-black animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-[var(--card-bg)]/60 backdrop-blur-md border-t border-[var(--card-border)]">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about your logs..."
                        className="flex-1 px-5 py-4 rounded-2xl border-2 border-[var(--card-border)] bg-[var(--bg-secondary)] focus:outline-none focus:border-purple-500/50 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-all"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 rounded-2xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center"
                    >
                        <Send size={22} />
                    </button>
                </form>
                <p className="text-[11px] text-center mt-3 text-gray-400 font-medium">AI Insights are generated by Qwen 2.5:1.5b. Always verify critical alerts manually.</p>
            </div>
        </div>
    );
}
