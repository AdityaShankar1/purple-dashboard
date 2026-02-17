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
  BarChart,
  Bar,
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
  // Live alerts from socket
  const { alerts, totalCount } = useWazuhSocket(200);

  // Backend metrics (total + last 24h alerts)
  const [metrics, setMetrics] = useState({ count: 0, alerts: [] });
  const [trainTest, setTrainTest] = useState([]);
  const [trending, setTrending] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const API = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

    const fetchAll = async () => {
      try {
        const [metricsRes, trainRes, trendRes, tagsRes] = await Promise.all([
          fetch(`${API}/wazuh/metrics`).then(r => r.json()),
          fetch(`${API}/wazuh/train-test`).then(r => r.json()),
          fetch(`${API}/wazuh/trending`).then(r => r.json()),
          fetch(`${API}/wazuh/threat-tags`).then(r => r.json()),
        ]);

        setMetrics(metricsRes);
        setTrainTest(Array.isArray(trainRes) ? trainRes : trainRes?.data || []);
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

  // Live open alerts (from socket stream)
  const openAlerts = useMemo(
    () => (Array.isArray(alerts) ? alerts.length : 0),
    [alerts]
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
      .slice(0, 5);
  }, [metrics.alerts]);

  return (
    <div className="w-full h-full py-6 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Total Alerts (from Indexer count via backend) */}
      <Card title="📊 Total Alerts (All Time)" className="md:col-span-2">
        <div className="text-5xl font-bold text-center text-blue-400">
          {metrics.count || totalCount}
        </div>
      </Card>

      {/* Open Alerts (from live socket) */}
      <Card title="🚨 Open Alerts (Live Stream)" className="md:col-span-2">
        <div className="text-5xl font-bold text-center text-red-400">
          {openAlerts}
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

      {/* Train & Test */}
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
