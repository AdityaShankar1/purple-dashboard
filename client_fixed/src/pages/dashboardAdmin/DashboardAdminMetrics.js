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

  // Risk distribution (from server-side accurate breakdown)
  const riskData = useMemo(() => {
    if (!metrics.riskDistribution?.risk) return [];
    const { high, medium, low } = metrics.riskDistribution.risk;
    return [
      { name: "High", value: high, color: RISK_COLORS.high },
      { name: "Medium", value: medium, color: RISK_COLORS.medium },
      { name: "Low", value: low, color: RISK_COLORS.low },
    ].filter(d => d.value > 0);
  }, [metrics.riskDistribution]);

  // Top 5 log views (from server-side accurate breakdown)
  const logViews = useMemo(() => {
    if (!metrics.riskDistribution?.groups) return [];
    const total = Object.values(metrics.riskDistribution.risk).reduce((a, b) => a + b, 0);
    return metrics.riskDistribution.groups
      .map(g => ({
        name: g.name,
        value: total > 0 ? Math.round((g.count / total) * 100) : 0,
      }))
      .slice(0, 5);
  }, [metrics.riskDistribution]);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Total Alerts (with Dropdown) - Larger Card */}
      <Card
        title={
          <div className="flex justify-between items-center w-full">
            <span className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">📊</span>
              Total Alerts {timeRange !== "all" ? `(Past ${timeRange})` : "(All Time)"}
            </span>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[var(--bg-secondary)] text-sm border border-[var(--card-border)] rounded-lg px-3 py-1.5 text-[var(--accent-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-purple)] transition-all"
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
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-7xl font-black text-indigo-500 drop-shadow-sm">
            {timeRange === "all" ? (metrics.count || totalCount) : (filteredCount ?? "...")}
          </div>
          <div className="mt-2 text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest">
            System Alerts Detected
          </div>
        </div>
      </Card>

      {/* Last 24Hr Alerts - Smaller Highlight */}
      <Card
        title={
          <span className="flex items-center gap-2">
            <span className="p-1.5 bg-red-500/10 rounded-lg text-red-500">🚨</span>
            Last 24Hr Alerts
          </span>
        }
        className="md:col-span-1 border-red-500/20"
      >
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-6xl font-black text-rose-500 drop-shadow-sm">
            {last24hAlertsCount}
          </div>
          <div className="mt-2 text-sm font-medium text-red-400 uppercase tracking-widest">
            Critical Window
          </div>
        </div>
      </Card>

      {/* Risk Distribution */}
      <Card
        title={
          <span className="flex items-center gap-2">
            <span className="p-1.5 bg-purple-500/10 rounded-lg text-purple-500">📈</span>
            Risk Distribution
          </span>
        }
        className="md:col-span-1"
      >
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                stroke="none"
              >
                {riskData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary, #1e293b)',
                  borderColor: 'var(--card-border, #334155)',
                  borderRadius: '12px',
                  color: 'var(--text-primary, #f8fafc)',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)'
                }}
                itemStyle={{ color: 'var(--text-primary, #f8fafc)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {riskData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs font-medium text-[var(--text-secondary)]">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top 5 Log Views - Moved Up */}
      <Card
        title={
          <span className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">👁</span>
            Source Activity
          </span>
        }
        className="md:col-span-1"
      >
        <ul className="space-y-4 mt-2">
          {logViews.map((log, i) => (
            <li key={i} className="group">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-[var(--text-primary)]">{log.name}</span>
                <span className="font-bold text-[var(--accent-purple)]">{log.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-[var(--accent-purple)] h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${log.value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Threat Intel Tags - Moved Up */}
      <Card
        title={
          <span className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">🛡️</span>
            Threat classification
          </span>
        }
        className="md:col-span-1"
      >
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(tags) &&
            tags.map((t, i) => (
              <div
                key={i}
                className="bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-purple)] hover:border-[var(--accent-purple)] rounded-xl px-4 py-2 transition-all cursor-default text-sm font-medium flex items-center gap-2 group"
              >
                {t.tag}
                <span className="bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] px-2 py-0.5 rounded-md text-[10px] font-bold">
                  {t.count}
                </span>
              </div>
            ))}
        </div>
      </Card>

      {/* Trending Graphs - Now at Bottom */}
      <Card
        title={
          <div className="flex justify-between items-center w-full">
            <span className="flex items-center gap-2">
              <span className="p-1.5 bg-red-500/10 rounded-lg text-red-500">📊</span>
              Trending Alerts
            </span>
            <select
              value={trendRange}
              onChange={(e) => setTrendRange(e.target.value)}
              className="bg-[var(--bg-secondary)] text-sm border border-[var(--card-border)] rounded-lg px-3 py-1.5 text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
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
        className="md:col-span-3"
      >
        <div className="h-[240px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trending}>
              <defs>
                <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="var(--text-secondary)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(tick) => {
                  if (!tick) return "";
                  const date = new Date(tick);
                  return trendRange === "7d" || trendRange === "15d"
                    ? `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`
                    : `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleString()}
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--card-border)',
                  borderRadius: '12px',
                  color: 'var(--text-primary)'
                }}
              />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#ef4444"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

    </div>
  );
}

