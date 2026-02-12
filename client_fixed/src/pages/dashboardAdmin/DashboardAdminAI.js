"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../components/Layouts/Card";
import { Bot, Send, Trash2, User, Loader2, AlertCircle } from "lucide-react";
import { useIncidentsData } from "../../hooks/useIncidentsData";

export default function DashboardAdminAI() {
    const getApiBase = () => {
        if (typeof window !== "undefined") {
            const host = window.location.hostname;
            if (host === "localhost" || host === "127.0.0.1") {
                return "/api";
            }
        }
        return process.env.REACT_APP_API_URL || "/api";
    };
    // Data State
    const incidentsFromHook = useIncidentsData();
    const [metrics, setMetrics] = useState(null);
    const [wazuhAlerts, setWazuhAlerts] = useState(null);

    // Chat State
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("ai_chat_history");
        return saved ? JSON.parse(saved) : [{
            id: 1,
            role: 'assistant',
            content: "Hello! I'm your AI Security Assistant. I'm ready to help you analyze your security posture."
        }];
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
                const API = getApiBase();

                // 1. Try Wazuh Alerts (Real-time)
                const wazuhRes = await fetch(`${API}/wazuh/logs`).catch(() => null);
                let wazuhData = null;
                if (wazuhRes && wazuhRes.ok) {
                    wazuhData = await wazuhRes.json();
                    setWazuhAlerts(wazuhData);
                }

                // 2. Try Dashboard Metrics (Recent)
                const metricsRes = await fetch(`${API}/wazuh/metrics`).catch(() => null);
                let dashboardData = null;
                if (metricsRes && metricsRes.ok) {
                    dashboardData = await metricsRes.json();
                    setMetrics(dashboardData);
                }

                // Determine priority
                // Determine priority of data source
                // 1. Live Wazuh Data (Best)
                // 2. Dashboard Metrics (Good)
                // 3. Mock Data (Fallback/Simulation Mode)
                if (wazuhData && wazuhData.length > 0) {
                    setConnStatus("wazuh");
                } else if (dashboardData && dashboardData.count > 0) {
                    setConnStatus("dashboard");
                } else {
                    // Fallback to mock data mode instead of failing completely.
                    // This ensures the chat interface remains usable for demos/testing.
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
            const initialMsg = [{
                id: Date.now(),
                role: 'assistant',
                content: "Chat cleared. I'm ready to help!"
            }];
            setMessages(initialMsg);
            localStorage.setItem("ai_chat_history", JSON.stringify(initialMsg));
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        // Removed blocking check - backend will handle mock data generation


        try {
            // Aggregating data for context
            const contextData = {
                source: connStatus === 'wazuh' ? 'Wazuh Real-time API' : 'Dashboard Metrics Fallback',
                totalAlerts: metrics?.count || 0,
                activeIncidents: incidentsFromHook?.length || 0,
                recentIncidents: (wazuhAlerts || incidentsFromHook || []).slice(0, 5).map(i => ({
                    level: i.rule?.level || i.level,
                    description: i.rule?.description || i.description,
                    agent: i.agent?.name || i.agent
                })),
                timestamp: new Date().toISOString()
            };

            const apiBase = getApiBase();
            const res = await fetch(
                `${apiBase}/ai/summarize-dashboard`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        dashboardStats: contextData,
                        userPrompt: input,
                        history: messages.slice(-3)
                    }),
                }
            );

            if (!res.ok) throw new Error("Connection failed");

            const data = await res.json();

            // If backend returned isMock flag, we can update status if needed, 
            // but for now we trust the initial check or just show the message.
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
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
                <button
                    onClick={handleClearChat}
                    className="p-2.5 hover:bg-white/20 rounded-xl transition-all text-purple-100"
                    title="Clear History"
                >
                    <Trash2 size={22} />
                </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-gray-800/20">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-purple-600'}`}>
                                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
                            </div>
                            <div className={`p-4 rounded-2xl shadow-sm border ${msg.role === 'user' ? 'bg-indigo-600 text-white border-transparent rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-100 dark:border-gray-700 rounded-tl-none text-[15px] leading-relaxed'}`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                            <Loader2 className="animate-spin text-purple-600" size={20} />
                            <span className="text-sm font-medium text-gray-500 animate-pulse">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-5 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about your logs..."
                        className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-800 dark:text-white transition-all"
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
