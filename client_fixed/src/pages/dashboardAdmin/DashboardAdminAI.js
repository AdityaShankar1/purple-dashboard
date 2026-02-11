"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../components/Layouts/Card";
import { Bot, Send, Trash2, User, Loader2 } from "lucide-react";
import { useIncidentsData } from "../../hooks/useIncidentsData";

export default function DashboardAdminAI() {
    // Data Context (Background)
    const incidents = useIncidentsData();
    const [metrics, setMetrics] = useState({ count: 0 });

    // Chat State
    // Load initial messages from localStorage or default welcome message
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("ai_chat_history");
        return saved ? JSON.parse(saved) : [{
            id: 1,
            role: 'assistant',
            content: "Hello! I'm your AI Security Assistant. I have access to your dashboard metrics and incident logs. How can I help you today?"
        }];
    });

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Fetch metrics on mount
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wazuh/metrics`
                );
                const data = await res.json();
                setMetrics(data);
            } catch (err) {
                console.error("Failed to fetch metrics for AI:", err);
            }
        };
        fetchMetrics();
    }, []);

    // Persist messages to localStorage
    useEffect(() => {
        localStorage.setItem("ai_chat_history", JSON.stringify(messages));
    }, [messages]);

    // Auto-scroll to bottom of chat
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

        const userMsg = {
            id: Date.now(),
            role: 'user',
            content: input
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            // Prepare context data
            const contextData = {
                totalAlerts: metrics.count,
                activeIncidents: incidents.length,
                metrics: metrics,
                recentIncidents: incidents.slice(0, 10), // Send top 10 incidents for context
                timestamp: new Date().toISOString()
            };

            // TODO: This endpoint might need to be updated to handle "chat" instead of just "summary"
            // For now, we sending the prompt + context
            const res = await fetch(
                `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/ai/summarize-dashboard`, // Reusing existing endpoint for now
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        dashboardStats: contextData,
                        userPrompt: input, // Pass user input distinct from stats
                        history: messages.slice(-5) // Send last 5 messages for context
                    }),
                }
            );

            if (!res.ok) throw new Error("Failed to get response");

            const data = await res.json();

            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                content: data.summary || "I processed your request based on the current dashboard data."
            };

            setMessages(prev => [...prev, aiMsg]);

        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                content: "Sorry, I encountered an error connecting to the AI service. Please try again later."
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-purple-700 p-4 flex justify-between items-center text-white shadow-md">
                <div className="flex items-center space-x-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Security Assistant</h2>
                        <div className="flex items-center text-xs text-purple-200">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Connected to Wazuh & Dashboard
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-purple-100 hover:text-white"
                    title="Clear Chat History"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50 dark:bg-gray-800/50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>

                            {/* Avatar */}
                            <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0
                ${msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}
              `}>
                                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`
                p-4 rounded-2xl shadow-sm text-sm leading-relaxed
                ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-600'}
              `}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm">
                            <Loader2 className="animate-spin text-purple-600" size={18} />
                            <span className="text-sm text-gray-500">Analyzing...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your security status (e.g., 'Do I have any critical alerts?')"
                        className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-3 rounded-xl transition-colors shadow-lg"
                    >
                        <Send size={20} />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p className="text-xs text-gray-400">AI can make mistakes. Verify critical security alerts manually.</p>
                </div>
            </div>
        </div>
    );
}
