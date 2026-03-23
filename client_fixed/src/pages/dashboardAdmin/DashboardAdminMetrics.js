//client/src/pages/dashboardAdmin/DashboardAdminMetrics.js

"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Card } from "../../components/Layouts/Card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import { useWazuhSocket } from "../../hooks/useWazuhSocket";
import axios from "../../api/axiosConfig";

const RISK_COLORS = {
  high: "#ef4444", // red
  medium: "#facc15", // yellow
  low: "#22c55e", // green
};

export default function DashboardAdminMetrics() {
  // Live alerts from socket (keep totalCount if needed, but alerts is unused now)
  const { totalCount } = useWazuhSocket(200);

  // Backend metrics (total + last 24h alerts)
  const [metrics, setMetrics] = useState({ count: 0, alerts: [], last24hCount: 0 });
  const [trending, setTrending] = useState([]);
  const [tags, setTags] = useState([]);
  const [timeRange, setTimeRange] = useState("all");
  const [filteredCount, setFilteredCount] = useState(null);
  const [trendRange, setTrendRange] = useState("7d");

  const fetchAll = async () => {
    try {
      const [metricsRes, tagsRes] = await Promise.all([
        axios.get("/wazuh/metrics"),
        axios.get("/wazuh/threat-tags"),
      ]);

      setMetrics(metricsRes.data);
      setTags(Array.isArray(tagsRes.data) ? tagsRes.data : tagsRes.data?.tags || []);
    } catch (err) {
      console.error("Failed to fetch dashboard metrics/tags:", err);
    }
  };

  const fetchTrending = async (range) => {
    try {
      let interval = "1h";
      if (range === "365d" || range === "180d" || range === "90d") {
        interval = "1d";
      }
      const res = await axios.get("/wazuh/trending", { params: { range, interval } });
      setTrending(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch trending data:", err);
    }
  };

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 30000); // auto-refresh every 30s
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetchTrending(trendRange);
  }, [trendRange]);

  useEffect(() => {
    const fetchFilteredCount = async () => {
      if (timeRange === "all") {
        setFilteredCount(null);
        return;
      }
      try {
        const res = await axios.get(`/wazuh/alerts/count`, { params: { timeRange } });
        setFilteredCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch filtered count:", err);
      }
    };
    fetchFilteredCount();
  }, [timeRange]);

  // Last 24Hr Alerts — use server-provided accurate count (not just alerts.length which is capped at 1000)
  const last24hAlertsCount = useMemo(
    () => metrics.last24hCount || (Array.isArray(metrics.alerts) ? metrics.alerts.length : 0),
    [metrics.last24hCount, metrics.alerts]
  );

  // Risk distribution (from last 24h alerts via backend metrics)
  const riskData = useMemo(() => {
    if (!Array.isArray(metrics.alerts)) return [];

    // Wazuh Standard Severity Mapping (last 24h baseline):
    // Low: <= 6, Medium: 7-11, High: >= 12
    const high = metrics.alerts.filter((a) => (a.rule?.level || 0) >= 12).length;
    const medium = metrics.alerts.filter((a) => (a.rule?.level || 0) >= 7 && (a.rule?.level || 0) <= 11).length;
    const low = metrics.alerts.filter((a) => (a.rule?.level || 0) <= 6).length;

    return [
      { name: "High", value: high, color: RISK_COLORS.high },
      { name: "Medium", value: medium, color: RISK_COLORS.medium },
      { name: "Low", value: low, color: RISK_COLORS.low },
    ].filter(d => d.value > 0);
  }, [metrics.alerts]);

  // Top 5 log views (from last 24h alerts via backend metrics)
  const logViews = useMemo(() => {
    if (!Array.isArray(metrics.alerts)) return [];
    const logCounts = metrics.alerts.reduce((acc, alert) => {
      const type = alert.rule?.groups?.[0] || "unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    const totalLogs = metrics.alerts.length;
    return Object.entries(logCounts)
      .map(([name, count]) => ({
        name,
        value: totalLogs > 0 ? Math.round((count / totalLogs) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [metrics.alerts]);

  return (
    <div className="w-full h-full py-6 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Total Alerts (with Dropdown) */}
      <Card
        title={
          <div className="flex justify-between items-center w-full">
            <span>📊 Total Alerts {timeRange !== "all" ? `(Past ${timeRange})` : "(All Time)"}</span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 text-sm border border-gray-600 rounded px-2 py-1 text-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="365d">1 Year</option>
              <option value="180d">6 Months</option>
              <option value="90d">3 Months</option>
              <option value="30d">1 Month</option>
              <option value="15d">15 Days</option>
              <option value="7d">1 Week</option>
            </select>
          </div>
        }
        className="md:col-span-2"
      >
        <div className="text-5xl font-bold text-center text-blue-400">
          {timeRange === "all" ? (metrics.count || totalCount) : (filteredCount ?? "...")}
        </div>
      </Card>

      {/* Last 24Hr Alerts */}
      <Card title="🚨 Last 24Hr Alerts" className="md:col-span-2">
        <div className="text-5xl font-bold text-center text-red-400">
          {last24hAlertsCount}
        </div>
      </Card>

      {/* Risk Distribution */}
      <Card title="📈 Risk Distribution">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={riskData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {riskData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Top 5 Log Views */}
      <Card title="👁 Top 5 Log Views">
        <ul className="space-y-2">
          {logViews.map((log, i) => (
            <li
              key={i}
              className="flex justify-between text-sm text-gray-300"
            >
              <span>{log.name}</span>
              <span className="font-semibold text-purple-300">
                {log.value}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Trending Graphs */}
      <Card
        title={
          <div className="flex justify-between items-center w-full">
            <span>📈 Trending Graphs</span>
            <select
              value={trendRange}
              onChange={(e) => setTrendRange(e.target.value)}
              className="bg-gray-800 text-sm border border-gray-600 rounded px-2 py-1 text-red-100 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="365d">1 Year</option>
              <option value="180d">6 Months</option>
              <option value="90d">3 Months</option>
              <option value="30d">1 Month</option>
              <option value="15d">15 Days</option>
              <option value="7d">1 Week</option>
            </select>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trending}>
            <XAxis
              dataKey="time"
              stroke="#aaa"
              fontSize={10}
              tickFormatter={(tick) => {
                if (!tick) return "";
                const date = new Date(tick);
                return trendRange === "7d" || trendRange === "15d"
                  ? `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`
                  : `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis stroke="#aaa" />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Line type="monotone" dataKey="alerts" stroke="#FF4C4C" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Threat Intel Tags */}
      <Card title="🛡️ Threat Intel Tags">
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          {Array.isArray(tags) &&
            tags.map((t, i) => (
              <li
                key={i}
                className="bg-purple-700 rounded-xl px-3 py-2 text-center"
              >
                {t.tag} ({t.count})
              </li>
            ))}
        </ul>
      </Card>
    </div>
  );
}
