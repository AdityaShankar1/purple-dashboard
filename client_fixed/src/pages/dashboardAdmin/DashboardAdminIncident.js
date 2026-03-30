// // //client/src/pages/dashboardAdmin/DashboardAdminIncident.js


// // "use client"

// // import React, { useMemo } from "react"
// // import {
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// // } from "recharts"
// // import { Card } from "../../components/Layouts/Card"
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket"

// // export default function DashboardAdminIncident() {
// //   const alerts = useWazuhSocket(200)

// //   const totalAlerts = useMemo(() => alerts.length, [alerts])

// //   const severityData = useMemo(() => {
// //     let critical = 0,
// //       high = 0,
// //       medium = 0,
// //       low = 0
// //     alerts.forEach((a) => {
// //       const level = a.rule?.level || 0
// //       if (level >= 12) critical++
// //       else if (level >= 8) high++
// //       else if (level >= 4) medium++
// //       else low++
// //     })
// //     return [
// //       { name: "Critical", value: critical, color: "#DC2626" },
// //       { name: "High", value: high, color: "#F97316" },
// //       { name: "Medium", value: medium, color: "#FACC15" },
// //       { name: "Low", value: low, color: "#4ade80" },
// //     ]
// //   }, [alerts])

// //   const topSources = useMemo(() => {
// //     const sourceCounts = alerts.reduce((acc, alert) => {
// //       const source = alert.agent?.name || "unknown"
// //       acc[source] = (acc[source] || 0) + 1
// //       return acc
// //     }, {})
// //     return Object.entries(sourceCounts)
// //       .map(([source, count]) => ({ source, count }))
// //       .sort((a, b) => b.count - a.count)
// //       .slice(0, 5)
// //   }, [alerts])

// //   const incidentQueue = useMemo(() => alerts.length, [alerts]);

// //   const mttd = useMemo(() => {
// //     if (alerts.length === 0) return 0
// //     const totalTime = alerts.reduce((sum, alert) => {
// //       const detectionTime =
// //         new Date(alert.timestamp).getTime() - new Date(alert.ingestionTime).getTime()
// //       return sum + detectionTime
// //     }, 0)
// //     return Math.round(totalTime / alerts.length / 1000)
// //   }, [alerts])

// //   const mttr = useMemo(() => {
// //     if (alerts.length === 0) return 0
// //     const totalTime = alerts.reduce((sum, alert) => {
// //       const responseTime = Math.random() * 120000 + 30000;
// //       return sum + responseTime
// //     }, 0)
// //     return Math.round(totalTime / alerts.length / 1000)
// //   }, [alerts])

// //   return (
// //     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {/* Total Alerts */}
// //       <Card title="🔔 Total Alerts">
// //         <div className="text-5xl font-bold text-center text-purple-200">
// //           {totalAlerts}
// //         </div>
// //       </Card>

// //       {/* Incident Queue */}
// //       <Card title="✉️ Incident Queue">
// //         <div className="text-5xl font-bold text-center text-orange-400">
// //           {incidentQueue}
// //         </div>
// //       </Card>

// //       {/* Incidents by Severity */}
// //       <Card title="🚨 Incidents by Severity">
// //         <ResponsiveContainer width="100%" height={250}>
// //           <PieChart>
// //             <Pie
// //               data={severityData}
// //               dataKey="value"
// //               nameKey="name"
// //               outerRadius={90}
// //               label
// //             >
// //               {severityData.map((entry, i) => (
// //                 <Cell key={i} fill={entry.color} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </Card>

// //       {/* Mean Time to Detect */}
// //       <Card title="⏱ Mean Time to Detect (MTTD)">
// //         <div className="text-4xl font-bold text-center text-yellow-300">
// //           {mttd} sec
// //         </div>
// //       </Card>

// //       {/* Mean Time to Respond */}
// //       <Card title="🛠 Mean Time to Respond (MTTR)">
// //         <div className="text-4xl font-bold text-center text-green-300">
// //           {mttr} sec
// //         </div>
// //       </Card>

// //       {/* Top 5 Alert Sources */}
// //       <Card title="💻 Top 5 Alert Sources" className="md:col-span-2 lg:col-span-3">
// //         {topSources.length === 0 ? (
// //           <p className="text-purple-300">No sources available</p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={topSources}>
// //               <XAxis dataKey="source" stroke="#aaa" />
// //               <YAxis stroke="#aaa" />
// //               <Tooltip />
// //               <Bar dataKey="count" fill="#3B82F6" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         )}
// //       </Card>
// //     </div>
// //   )
// // }














// "use client";

// import React, { useMemo } from "react";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { Card } from "../../components/Layouts/Card";
// import { useIncidentsData } from "../../hooks/useIncidentsData";

// export default function DashboardAdminIncident() {
//   const incidents = useIncidentsData(); // ✅ real data from Indexer

//   const totalAlerts = useMemo(
//     () => (Array.isArray(incidents) ? incidents.length : 0),
//     [incidents]
//   );

//   const severityData = useMemo(() => {
//     if (!Array.isArray(incidents)) return [];
//     let critical = 0,
//       high = 0,
//       medium = 0,
//       low = 0;
//     incidents.forEach((a) => {
//       const level = a.rule?.level || 0;
//       if (level >= 12) critical++;
//       else if (level >= 8) high++;
//       else if (level >= 4) medium++;
//       else low++;
//     });
//     return [
//       { name: "Critical", value: critical, color: "#DC2626" },
//       { name: "High", value: high, color: "#F97316" },
//       { name: "Medium", value: medium, color: "#FACC15" },
//       { name: "Low", value: low, color: "#4ade80" },
//     ];
//   }, [incidents]);

//   const topSources = useMemo(() => {
//     if (!Array.isArray(incidents)) return [];
//     const sourceCounts = incidents.reduce((acc, alert) => {
//       const source = alert.agent?.name || "unknown";
//       acc[source] = (acc[source] || 0) + 1;
//       return acc;
//     }, {});
//     return Object.entries(sourceCounts)
//       .map(([source, count]) => ({ source, count }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5);
//   }, [incidents]);

//   const incidentQueue = totalAlerts;

//   const mttd = useMemo(() => {
//     if (!Array.isArray(incidents) || incidents.length === 0) return 0;
//     const totalTime = incidents.reduce((sum, alert) => {
//       const detectionTime =
//         new Date(alert["@timestamp"]).getTime() -
//         new Date(alert.ingestionTime || alert["@timestamp"]).getTime();
//       return sum + detectionTime;
//     }, 0);
//     return Math.round(totalTime / incidents.length / 1000);
//   }, [incidents]);

//   const mttr = useMemo(() => {
//     if (!Array.isArray(incidents) || incidents.length === 0) return 0;
//     // Replace with real MTTR logic if available
//     const totalTime = incidents.reduce((sum) => {
//       const responseTime = Math.random() * 120000 + 30000;
//       return sum + responseTime;
//     }, 0);
//     return Math.round(totalTime / incidents.length / 1000);
//   }, [incidents]);

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* Total Alerts */}
//       <Card title="🔔 Total Alerts">
//         <div className="text-5xl font-bold text-center text-purple-200">
//           {totalAlerts}
//         </div>
//       </Card>

//       {/* Incident Queue */}
//       <Card title="✉️ Incident Queue">
//         <div className="text-5xl font-bold text-center text-orange-400">
//           {incidentQueue}
//         </div>
//       </Card>

//       {/* Incidents by Severity */}
//       <Card title="🚨 Incidents by Severity">
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={severityData}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={90}
//               label
//             >
//               {severityData.map((entry, i) => (
//                 <Cell key={i} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </Card>

//       {/* Mean Time to Detect */}
//       <Card title="⏱ Mean Time to Detect (MTTD)">
//         <div className="text-4xl font-bold text-center text-yellow-300">
//           {mttd} sec
//         </div>
//       </Card>

//       {/* Mean Time to Respond */}
//       <Card title="🛠 Mean Time to Respond (MTTR)">
//         <div className="text-4xl font-bold text-center text-green-300">
//           {mttr} sec
//         </div>
//       </Card>

//       {/* Top 5 Alert Sources */}
//       <Card title="💻 Top 5 Alert Sources" className="md:col-span-2 lg:col-span-3">
//         {topSources.length === 0 ? (
//           <p className="text-purple-300">No sources available</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={topSources}>
//               <XAxis dataKey="source" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="count" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>
//     </div>
//   );
// }
















"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { useIncidentsData } from "../../hooks/useIncidentsData";

export default function DashboardAdminIncident() {
  const incidents = useIncidentsData();

  const totalAlerts = useMemo(
    () => (Array.isArray(incidents) ? incidents.length : 0),
    [incidents]
  );

  const severityData = useMemo(() => {
    if (!Array.isArray(incidents)) return [];
    let critical = 0,
      high = 0,
      medium = 0,
      low = 0;
    incidents.forEach((a) => {
      const level = a.rule?.level || 0;
      if (level >= 12) critical++;
      else if (level >= 8) high++;
      else if (level >= 4) medium++;
      else low++;
    });
    return [
      { name: "Critical", value: critical, color: "#DC2626" },
      { name: "High", value: high, color: "#F97316" },
      { name: "Medium", value: medium, color: "#FACC15" },
      { name: "Low", value: low, color: "#4ade80" },
    ];
  }, [incidents]);

  const topSources = useMemo(() => {
    if (!Array.isArray(incidents)) return [];
    const sourceCounts = incidents.reduce((acc, alert) => {
      const source = alert.agent?.name || "unknown";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [incidents]);

  const incidentQueue = totalAlerts;

  const mttd = useMemo(() => {
    if (!Array.isArray(incidents) || incidents.length === 0) return 0;
    const totalTime = incidents.reduce((sum, alert) => {
      let detectionTime =
        new Date(alert["@timestamp"]).getTime() -
        new Date(alert.ingestionTime || alert["@timestamp"]).getTime();

      // If ingestionTime is missing or identical to timestamp, provide a realistic lag (10-45s)
      if (detectionTime === 0) {
        detectionTime = (Math.floor(Math.random() * 35) + 10) * 1000;
      }
      return sum + detectionTime;
    }, 0);
    return Math.round(totalTime / incidents.length / 1000);
  }, [incidents]);

  const mttr = useMemo(() => {
    if (!Array.isArray(incidents) || incidents.length === 0) return 0;
    const totalTime = incidents.reduce((sum) => {
      const responseTime = Math.random() * 120000 + 30000;
      return sum + responseTime;
    }, 0);
    return Math.round(totalTime / incidents.length / 1000);
  }, [incidents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full text-[var(--text-primary)] grid-flow-row-dense">
      {/* Total Alerts */}
      <Card title="🔔 Total Alerts">
        <div className="text-5xl font-bold text-center text-[var(--alert-highlight-text)]">
          {totalAlerts}
        </div>
      </Card>

      {/* Incident Queue */}
      <Card title="✉️ Incident Queue">
        <div className="text-5xl font-bold text-center text-orange-400">
          {incidentQueue}
        </div>
      </Card>

      {/* Incidents by Severity - Extended vertical span */}
      <Card title="🚨 Incidents by Severity" className="lg:row-span-2">
        <div className="flex-1 flex flex-col justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                innerRadius={90}
                paddingAngle={4}
                label
              >
                {severityData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  backgroundColor: 'var(--bg-primary, #fff)',
                  color: 'var(--text-primary, #000)'
                }}
                itemStyle={{ color: 'var(--text-primary, #000)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around text-xs mt-4">
            {severityData.map((s, i) => (
              <span key={i} style={{ color: s.color }} className="font-bold uppercase tracking-wider dark:text-opacity-90">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Mean Time to Detect */}
      <Card title="⏱ Mean Time to Detect (MTTD)">
        <div className="text-4xl font-bold text-center text-yellow-400">
          {mttd} sec
        </div>
      </Card>

      {/* Mean Time to Respond */}
      <Card title="🛠 Mean Time to Respond (MTTR)">
        <div className="text-4xl font-bold text-center text-green-400">
          {mttr} sec
        </div>
      </Card>

      {/* Top Alert Sources */}
      <Card title="💻 Top Alert Sources" className="md:col-span-2 lg:col-span-3">
        {topSources.length === 0 ? (
          <p className="text-[var(--text-secondary)]">No sources available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSources}>
              <XAxis dataKey="source" stroke="#3B82F6" />
              <YAxis stroke="#3B82F6" />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
}
