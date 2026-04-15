// client_fixed/src/pages/dashboardAdmin/DashboardAdminMisp.js

"use client";

import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { useMispData } from "../../hooks/useMispData";
import {
  Shield,
  Globe,
  Clock,
  Activity,
  AlertTriangle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

const TIME_RANGES = [
  { label: "1h", value: "1h" },
  { label: "6h", value: "6h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
];

const DONUT_COLORS = [
  "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444", "#10b981",
  "#ec4899", "#3b82f6", "#f97316", "#14b8a6", "#6366f1",
];

const ROWS_PER_PAGE = 10;

export default function DashboardAdminMisp() {
  const [timeRange, setTimeRange] = useState("7d");
  const { alerts, stats, loading, error, refetch } = useMispData(timeRange);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("timestamp");
  const [sortDir, setSortDir] = useState("desc");

  // Reset page when data/filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [timeRange, searchTerm]);

  // ─── Filtered & sorted alerts ───
  const filteredAlerts = useMemo(() => {
    let data = [...alerts];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (a) =>
          a.srcip?.toLowerCase().includes(term) ||
          a.agentName?.toLowerCase().includes(term) ||
          a.ruleDescription?.toLowerCase().includes(term) ||
          a.result?.toLowerCase().includes(term)
      );
    }
    data.sort((a, b) => {
      let aVal = a[sortField] || "";
      let bVal = b[sortField] || "";
      if (sortField === "timestamp") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (sortDir === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    return data;
  }, [alerts, searchTerm, sortField, sortDir]);

  const totalPages = Math.ceil(filteredAlerts.length / ROWS_PER_PAGE);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  // ─── Timeline data formatting ───
  const timelineData = useMemo(() => {
    return (stats.timeline || []).map((t) => {
      const d = new Date(t.time);
      return {
        label: d.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        alerts: t.count,
      };
    });
  }, [stats.timeline]);

  // ─── Daily bar data ───
  const dailyData = useMemo(() => {
    return (stats.dailyCounts || []).map((d) => {
      const dt = new Date(d.date);
      return {
        day: dt.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        alerts: d.count,
      };
    });
  }, [stats.dailyCounts]);

  // ─── Top IPs for pie ───
  const ipPieData = useMemo(() => {
    return (stats.topIps || []).map((ip) => ({
      name: ip.ip,
      value: ip.count,
    }));
  }, [stats.topIps]);

  // ─── Format timestamp ───
  const formatTime = (ts) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw size={40} className="animate-spin text-purple-500" />
          <p className="text-[var(--text-secondary)] text-lg font-medium">
            Loading MISP Intelligence...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertTriangle size={48} className="text-red-500" />
          <p className="text-red-400 text-lg font-bold">Failed to load MISP data</p>
          <p className="text-[var(--text-secondary)] text-sm">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-8">
      {/* ═══ Header ═══ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/20">
            <Shield size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
              MISP Threat Intelligence
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              IOC matches detected via Wazuh integration
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl overflow-hidden">
            {TIME_RANGES.map((tr) => (
              <button
                key={tr.value}
                onClick={() => setTimeRange(tr.value)}
                className={`px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
                  timeRange === tr.value
                    ? "bg-[var(--accent-purple)] text-white shadow-lg shadow-purple-600/30"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>
          <button
            onClick={refetch}
            className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-purple)] hover:border-purple-500/30 transition-all"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* ═══ Summary Cards ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<AlertTriangle size={22} className="text-red-400" />}
          label="Total MISP Matches"
          value={stats.totalCount.toLocaleString()}
          gradient="from-red-500/10 to-orange-500/10"
          borderColor="border-red-500/20"
          accentColor="text-red-400"
        />
        <SummaryCard
          icon={<Globe size={22} className="text-cyan-400" />}
          label="Unique IOC IPs"
          value={stats.uniqueIpCount.toLocaleString()}
          gradient="from-cyan-500/10 to-blue-500/10"
          borderColor="border-cyan-500/20"
          accentColor="text-cyan-400"
        />
        <SummaryCard
          icon={<Clock size={22} className="text-amber-400" />}
          label="Latest Match"
          value={stats.latestTimestamp ? formatTime(stats.latestTimestamp) : "None"}
          valueSize="text-sm"
          gradient="from-amber-500/10 to-yellow-500/10"
          borderColor="border-amber-500/20"
          accentColor="text-amber-400"
        />
        <SummaryCard
          icon={<Activity size={22} className="text-emerald-400" />}
          label="Alerts/Hour (avg)"
          value={stats.alertsPerHour}
          gradient="from-emerald-500/10 to-teal-500/10"
          borderColor="border-emerald-500/20"
          accentColor="text-emerald-400"
        />
      </div>

      {/* ═══ Charts Row ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Area Chart */}
        <Card title="📈 Alert Timeline (Hourly)" className="lg:col-span-2">
          {timelineData.length === 0 ? (
            <EmptyState message="No timeline data available" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="mispGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" opacity={0.5} />
                <XAxis
                  dataKey="label"
                  stroke="var(--text-secondary)"
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--card-border)",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="alerts"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#mispGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Top IPs Donut */}
        <Card title="🎯 Top IOC Source IPs">
          {ipPieData.length === 0 ? (
            <EmptyState message="No IOC IP data available" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ipPieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={3}
                  label={({ name, value }) => `${name} (${value})`}
                  labelLine={{ stroke: "var(--text-secondary)", strokeWidth: 1 }}
                >
                  {ipPieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={DONUT_COLORS[i % DONUT_COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid var(--card-border)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* ═══ Daily Bar Chart ═══ */}
      <Card title="📊 Alerts Per Day">
        {dailyData.length === 0 ? (
          <EmptyState message="No daily data available" />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" opacity={0.5} />
              <XAxis
                dataKey="day"
                stroke="var(--text-secondary)"
                tick={{ fontSize: 12, fontWeight: 600 }}
              />
              <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid var(--card-border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              />
              <Bar
                dataKey="alerts"
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* ═══ Alert Table ═══ */}
      <Card title="🔍 MISP Alert Details" className="overflow-visible">
        {/* Search Bar */}
        <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by IP, agent, description..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
          <span className="text-xs text-[var(--text-secondary)] font-medium whitespace-nowrap">
            {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--bg-primary)] border-b border-[var(--card-border)]">
                {[
                  { key: "timestamp", label: "Timestamp" },
                  { key: "srcip", label: "Source IP" },
                  { key: "result", label: "Result" },
                  { key: "agentName", label: "Agent" },
                  { key: "ruleDescription", label: "Description" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider cursor-pointer hover:text-[var(--accent-purple)] transition-colors select-none"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortField === col.key && (
                        <span className="text-[var(--accent-purple)]">
                          {sortDir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-border)]">
              {paginatedAlerts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-[var(--text-secondary)]"
                  >
                    No MISP alerts found for the selected time range.
                  </td>
                </tr>
              ) : (
                paginatedAlerts.map((alert, idx) => {
                  const isRecent =
                    new Date() - new Date(alert.timestamp) < 3600000; // < 1 hour
                  return (
                    <tr
                      key={idx}
                      className={`transition-colors hover:bg-purple-500/5 ${
                        isRecent ? "bg-red-500/5" : ""
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-[var(--text-primary)] font-mono text-xs">
                        {formatTime(alert.timestamp)}
                        {isRecent && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/20">
                            NEW
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-lg text-xs">
                          {alert.srcip}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            alert.result === "found"
                              ? "bg-red-500/15 text-red-400 border border-red-500/20"
                              : "bg-green-500/15 text-green-400 border border-green-500/20"
                          }`}
                        >
                          {alert.result === "found" ? "⚠ IOC Found" : alert.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--text-primary)] font-medium text-xs">
                        {alert.agentName}
                      </td>
                      <td className="px-4 py-3 text-[var(--text-secondary)] text-xs max-w-xs truncate">
                        {alert.ruleDescription}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--card-border)]">
            <p className="text-xs text-[var(--text-secondary)]">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-purple)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === page
                        ? "bg-[var(--accent-purple)] text-white shadow-lg shadow-purple-600/30"
                        : "bg-[var(--bg-primary)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-purple)]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--card-border)] text-[var(--text-secondary)] hover:text-[var(--accent-purple)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Summary Card Sub-component ───
function SummaryCard({ icon, label, value, valueSize = "text-3xl", gradient, borderColor, accentColor }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${gradient} p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className={`${valueSize} font-black ${accentColor} tracking-tight leading-tight`}>
            {value}
          </p>
        </div>
        <div className="p-2 rounded-xl bg-[var(--bg-secondary)]/50 border border-[var(--card-border)]">
          {icon}
        </div>
      </div>
      {/* Decorative background element */}
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full ${accentColor} opacity-5 blur-2xl`} />
    </div>
  );
}

// ─── Empty State Sub-component ───
function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
      <Shield size={40} className="opacity-20 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
