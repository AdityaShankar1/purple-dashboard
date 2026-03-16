// // "use client";

// // import React, { useMemo } from "react";
// // import { Card } from "../../components/Layouts/Card";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket";

// // const RISK_COLORS = {
// //   high: "#ef4444", // red
// //   medium: "#facc15", // yellow
// //   low: "#22c55e", // green
// // };

// // const trendingData = [
// //   { day: "Mon", count: 10 },
// //   { day: "Tue", count: 25 },
// //   { day: "Wed", count: 15 },
// //   { day: "Thu", count: 40 },
// //   { day: "Fri", count: 30 },
// //   { day: "Sat", count: 50 },
// //   { day: "Sun", count: 45 },
// // ];

// // const threatIntelData = [
// //   "Phishing",
// //   "Malware",
// //   "Ransomware",
// //   "Zero-Day",
// //   "Insider Threat",
// //   "DDoS",
// // ];

// // const trainTest = [
// //   { name: "Train", value: 80 },
// //   { name: "Test", value: 20 },
// // ];

// // export default function DashboardAdminMetrics() {
// //   // ✅ Destructure properly
// //   const { alerts, totalCount } = useWazuhSocket(200);

// //   // Live open alerts (from socket stream)
// //   const openAlerts = useMemo(() => (Array.isArray(alerts) ? alerts.length : 0), [alerts]);

// //   // Risk distribution
// //   const riskData = useMemo(() => {
// //     if (!Array.isArray(alerts)) return [];
// //     const high = alerts.filter((a) => a.rule?.level >= 8).length;
// //     const medium = alerts.filter((a) => a.rule?.level >= 5 && a.rule?.level < 8).length;
// //     const low = alerts.filter((a) => a.rule?.level < 5).length;
// //     return [
// //       { name: "High", value: high, color: RISK_COLORS.high },
// //       { name: "Medium", value: medium, color: RISK_COLORS.medium },
// //       { name: "Low", value: low, color: RISK_COLORS.low },
// //     ];
// //   }, [alerts]);

// //   // Top 5 log views
// //   const logViews = useMemo(() => {
// //     if (!Array.isArray(alerts)) return [];
// //     const logCounts = alerts.reduce((acc, alert) => {
// //       const type = alert.rule?.groups?.[0] || "unknown";
// //       acc[type] = (acc[type] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const totalLogs = alerts.length;
// //     return Object.entries(logCounts)
// //       .map(([name, count]) => ({
// //         name,
// //         value: totalLogs > 0 ? Math.round((count / totalLogs) * 100) : 0,
// //       }))
// //       .slice(0, 5);
// //   }, [alerts]);

// //   return (
// //     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
// //       {/* Total Alerts (from Indexer count) */}
// //       <Card title="📊 Total Alerts (All Time)" className="md:col-span-2">
// //         <div className="text-5xl font-bold text-center text-blue-400">
// //           {totalCount}
// //         </div>
// //       </Card>

// //       {/* Open Alerts (from live socket) */}
// //       <Card title="🚨 Open Alerts (Live Stream)" className="md:col-span-2">
// //         <div className="text-5xl font-bold text-center text-red-400">
// //           {openAlerts}
// //         </div>
// //       </Card>

// //       {/* Risk Distribution */}
// //       <Card title="📈 Risk Distribution">
// //         <ResponsiveContainer width="100%" height={200}>
// //           <PieChart>
// //             <Pie data={riskData} dataKey="value" nameKey="name" outerRadius={90} label>
// //               {riskData.map((entry, i) => (
// //                 <Cell key={i} fill={entry.color} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </Card>

// //       {/* Top 5 Log Views */}
// //       <Card title="👁 Top 5 Log Views">
// //         <ul className="space-y-2">
// //           {logViews.map((log, i) => (
// //             <li
// //               key={i}
// //               className="flex justify-between text-sm text-gray-300"
// //             >
// //               <span>{log.name}</span>
// //               <span className="font-semibold text-purple-300">
// //                 {log.value}%
// //               </span>
// //             </li>
// //           ))}
// //         </ul>
// //       </Card>

// //       {/* Train & Test */}
// //       <Card title="📊 Train & Test">
// //         <ResponsiveContainer width="100%" height={200}>
// //           <BarChart data={trainTest}>
// //             <XAxis dataKey="name" stroke="#aaa" />
// //             <YAxis stroke="#aaa" />
// //             <Tooltip />
// //             <Bar dataKey="value" fill="#4FC3F7" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </Card>

// //       {/* Trending Graphs */}
// //       <Card title="📈 Trending Graphs">
// //         <ResponsiveContainer width="100%" height={200}>
// //           <LineChart data={trendingData}>
// //             <XAxis dataKey="day" stroke="#aaa" />
// //             <YAxis stroke="#aaa" />
// //             <Tooltip />
// //             <Line type="monotone" dataKey="count" stroke="#FF4C4C" />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </Card>

// //       {/* Threat Intel Tags */}
// //       <Card title="🛡️ Threat Intel Tags">
// //         <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
// //           {threatIntelData.map((tag, i) => (
// //             <li
// //               key={i}
// //               className="bg-purple-700 rounded-xl px-3 py-2 text-center"
// //             >
// //               {tag}
// //             </li>
// //           ))}
// //         </ul>
// //       </Card>
// //     </div>
// //   );
// // }





















// "use client";

// import React, { useMemo, useEffect, useState } from "react";
// import { Card } from "../../components/Layouts/Card";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   LineChart,
//   Line,
// } from "recharts";
// import { useWazuhSocket } from "../../hooks/useWazuhSocket";

// const RISK_COLORS = {
//   high: "#ef4444", // red
//   medium: "#facc15", // yellow
//   low: "#22c55e", // green
// };

// const trainTest = [
//   { name: "Train", value: 80 },
//   { name: "Test", value: 20 },
// ];

// export default function DashboardAdminMetrics() {
//   // Live alerts from socket
//   const { alerts, totalCount } = useWazuhSocket(200);

//   // Backend metrics (total + last 24h alerts)
//   const [metrics, setMetrics] = useState({ count: 0, alerts: [] });

//   useEffect(() => {
//     const fetchMetrics = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wazuh/metrics`
//         );
//         const data = await res.json();
//         setMetrics(data);
//       } catch (err) {
//         console.error("Failed to fetch metrics:", err);
//       }
//     };
//     fetchMetrics();
//   }, []);

//   // Live open alerts (from socket stream)
//   const openAlerts = useMemo(
//     () => (Array.isArray(alerts) ? alerts.length : 0),
//     [alerts]
//   );

//   // Risk distribution (from last 24h alerts via backend metrics)
//   const riskData = useMemo(() => {
//     if (!Array.isArray(metrics.alerts)) return [];
//     const high = metrics.alerts.filter((a) => a.rule?.level >= 8).length;
//     const medium = metrics.alerts.filter(
//       (a) => a.rule?.level >= 5 && a.rule?.level < 8
//     ).length;
//     const low = metrics.alerts.filter((a) => a.rule?.level < 5).length;
//     return [
//       { name: "High", value: high, color: RISK_COLORS.high },
//       { name: "Medium", value: medium, color: RISK_COLORS.medium },
//       { name: "Low", value: low, color: RISK_COLORS.low },
//     ];
//   }, [metrics.alerts]);

//   // Top 5 log views (from last 24h alerts via backend metrics)
//   const logViews = useMemo(() => {
//     if (!Array.isArray(metrics.alerts)) return [];
//     const logCounts = metrics.alerts.reduce((acc, alert) => {
//       const type = alert.rule?.groups?.[0] || "unknown";
//       acc[type] = (acc[type] || 0) + 1;
//       return acc;
//     }, {});
//     const totalLogs = metrics.alerts.length;
//     return Object.entries(logCounts)
//       .map(([name, count]) => ({
//         name,
//         value: totalLogs > 0 ? Math.round((count / totalLogs) * 100) : 0,
//       }))
//       .slice(0, 5);
//   }, [metrics.alerts]);

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Total Alerts (from Indexer count via backend) */}
//       <Card title="📊 Total Alerts (All Time)" className="md:col-span-2">
//         <div className="text-5xl font-bold text-center text-blue-400">
//           {metrics.count || totalCount}
//         </div>
//       </Card>

//       {/* Open Alerts (from live socket) */}
//       <Card title="🚨 Open Alerts (Live Stream)" className="md:col-span-2">
//         <div className="text-5xl font-bold text-center text-red-400">
//           {openAlerts}
//         </div>
//       </Card>

//       {/* Risk Distribution */}
//       <Card title="📈 Risk Distribution">
//         <ResponsiveContainer width="100%" height={200}>
//           <PieChart>
//             <Pie
//               data={riskData}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={90}
//               label
//             >
//               {riskData.map((entry, i) => (
//                 <Cell key={i} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </Card>

//       {/* Top 5 Log Views */}
//       <Card title="👁 Top 5 Log Views">
//         <ul className="space-y-2">
//           {logViews.map((log, i) => (
//             <li
//               key={i}
//               className="flex justify-between text-sm text-gray-300"
//             >
//               <span>{log.name}</span>
//               <span className="font-semibold text-purple-300">
//                 {log.value}%
//               </span>
//             </li>
//           ))}
//         </ul>
//       </Card>

//       {/* Train & Test */}
//       <Card title="📊 Train & Test">
//         <ResponsiveContainer width="100%" height={200}>
//           <BarChart data={trainTest}>
//             <XAxis dataKey="name" stroke="#aaa" />
//             <YAxis stroke="#aaa" />
//             <Tooltip />
//             <Bar dataKey="value" fill="#4FC3F7" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Card>

//       {/* Trending Graphs (static demo data for now) */}
//       <Card title="📈 Trending Graphs">
//         <ResponsiveContainer width="100%" height={200}>
//           <LineChart
//             data={[
//               { day: "Mon", count: 10 },
//               { day: "Tue", count: 25 },
//               { day: "Wed", count: 15 },
//               { day: "Thu", count: 40 },
//               { day: "Fri", count: 30 },
//               { day: "Sat", count: 50 },
//               { day: "Sun", count: 45 },
//             ]}
//           >
//             <XAxis dataKey="day" stroke="#aaa" />
//             <YAxis stroke="#aaa" />
//             <Tooltip />
//             <Line type="monotone" dataKey="count" stroke="#FF4C4C" />
//           </LineChart>
//         </ResponsiveContainer>
//       </Card>

//       {/* Threat Intel Tags (static demo tags for now) */}
//       <Card title="🛡️ Threat Intel Tags">
//         <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
//           {["Phishing", "Malware", "Ransomware", "Zero-Day", "Insider Threat", "DDoS"].map(
//             (tag, i) => (
//               <li
//                 key={i}
//                 className="bg-purple-700 rounded-xl px-3 py-2 text-center"
//               >
//                 {tag}
//               </li>
//             )
//           )}
//         </ul>
//       </Card>
//     </div>
//   );
// }

























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

const RISK_COLORS = {
  high: "#ef4444", // red
  medium: "#facc15", // yellow
  low: "#22c55e", // green
};

export default function DashboardAdminMetrics() {
  // Live alerts from socket (keep totalCount if needed, but alerts is unused now)
  const { totalCount } = useWazuhSocket(200);

  // Backend metrics (total + last 24h alerts)
  const [metrics, setMetrics] = useState({ count: 0, alerts: [] });
  const [trending, setTrending] = useState([]);
  const [tags, setTags] = useState([]);
  const [timeRange, setTimeRange] = useState("all");
  const [filteredCount, setFilteredCount] = useState(null);

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

    const fetchAll = async () => {
      try {
        const [metricsRes, trendRes, tagsRes] = await Promise.all([
          fetch(`${API}/wazuh/metrics`).then(r => r.json()),
          fetch(`${API}/wazuh/trending`).then(r => r.json()),
          fetch(`${API}/wazuh/threat-tags`).then(r => r.json()),
        ]);

        setMetrics(metricsRes);
        setTrending(Array.isArray(trendRes) ? trendRes : trendRes?.data || []);
        setTags(Array.isArray(tagsRes) ? tagsRes : tagsRes?.tags || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchAll();
    const id = setInterval(fetchAll, 15000); // auto-refresh every 15s
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fetchFilteredCount = async () => {
      if (timeRange === "all") {
        setFilteredCount(null);
        return;
      }
      try {
        const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";
        const res = await fetch(`${API}/wazuh/alerts-count?timeRange=${timeRange}`);
        const data = await res.json();
        setFilteredCount(data.count);
      } catch (err) {
        console.error("Failed to fetch filtered count:", err);
      }
    };
    fetchFilteredCount();
  }, [timeRange]);

  // Last 24Hr Alerts (from metrics.alerts)
  const last24hAlertsCount = useMemo(
    () => (Array.isArray(metrics.alerts) ? metrics.alerts.length : 0),
    [metrics.alerts]
  );

  // Risk distribution (from last 24h alerts via backend metrics)
  const riskData = useMemo(() => {
    if (!Array.isArray(metrics.alerts)) return [];
    const high = metrics.alerts.filter((a) => a.rule?.level >= 8).length;
    const medium = metrics.alerts.filter(
      (a) => a.rule?.level >= 5 && a.rule?.level < 8
    ).length;
    const low = metrics.alerts.filter((a) => a.rule?.level < 5).length;
    return [
      { name: "High", value: high, color: RISK_COLORS.high },
      { name: "Medium", value: medium, color: RISK_COLORS.medium },
      { name: "Low", value: low, color: RISK_COLORS.low },
    ];
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
        <div className="text-5xl font-bold text-center text-red-100">
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
              className="flex justify-between text-sm text-black-300"
            >
              <span>{log.name}</span>
              <span className="font-semibold text-purple-300">
                {log.value}%
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Train & Test - Removed as per request */}
      {/* 
      <Card title="📊 Train & Test">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trainTest}>
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="value" fill="#4FC3F7" />
          </BarChart>
        </ResponsiveContainer>
      </Card> 
      */}

      {/* Trending Graphs */}
      <Card title="📈 Trending Graphs">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trending}>
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FF4C4C" />
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
