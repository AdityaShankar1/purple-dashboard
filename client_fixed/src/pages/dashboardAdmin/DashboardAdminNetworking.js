// //client/src/pages/dashboardAdmin/DashbaordAdminNetworking.js

// "use client"

// import React, { useMemo } from "react"
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts"
// import { Card } from "../../components/Layouts/Card"
// import { useWazuhSocket } from "../../hooks/useWazuhSocket"

// export default function DashboardAdminNetworking() {
//   const alerts = useWazuhSocket(200)

//   const trafficData = useMemo(() => {
//     const trafficCounts = alerts.reduce((acc, alert) => {
//       const time = new Date(alert.timestamp).getHours();
//       acc[time] = acc[time] || { inbound: 0, outbound: 0 };
//       acc[time].inbound += Math.floor(Math.random() * 50);
//       acc[time].outbound += Math.floor(Math.random() * 50);
//       return acc;
//     }, {});
//     return Object.entries(trafficCounts).map(([time, data]) => ({
//       time: `${time}:00`,
//       inbound: data.inbound,
//       outbound: data.outbound,
//     }));
//   }, [alerts]);

//   const firewallChart = useMemo(() => {
//     const firewallCounts = alerts.reduce((acc, alert) => {
//       const protocol = alert.protocol || "unknown";
//       acc[protocol] = (acc[protocol] || 0) + 1;
//       return acc;
//     }, {});
//     return Object.entries(firewallCounts).map(([protocol, count]) => ({
//       protocol,
//       count,
//     }));
//   }, [alerts]);

//   const systemStatus = [
//     { name: "Firewall", status: "healthy" },
//     { name: "IDS/IPS", status: "healthy" },
//     { name: "VPN", status: "degraded" },
//     { name: "WAF", status: "healthy" },
//   ];

//   const malwareList = useMemo(() => {
//     const malwareAlerts = alerts.filter(a => a.rule?.groups?.includes("malware"));
//     return malwareAlerts.map(alert => ({
//       type: "Malware Detection",
//       target: alert.agent?.name,
//       timestamp: alert.timestamp
//     }));
//   }, [alerts]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* Network Traffic Volume */}
//       <Card title="🌐 Network Traffic Volume">
//         {trafficData.length === 0 ? (
//           <p className="text-purple-300">No network traffic data</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={trafficData}>
//               <XAxis dataKey="time" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="inbound"
//                 stroke="#6366F1"
//                 name="Inbound"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="outbound"
//                 stroke="#FACC15"
//                 name="Outbound"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* Firewall & IDS/IPS Alerts */}
//       <Card title="🔥 Firewall & IDS/IPS Alerts">
//         {firewallChart.length === 0 ? (
//           <p className="text-purple-300">No firewall alerts</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={firewallChart}>
//               <XAxis dataKey="protocol" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="count" fill="#4ADE80" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* System Health */}
//       <Card title="❤️ System Health" className="md:col-span-2">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {systemStatus.map((sys, i) => (
//             <div
//               key={i}
//               className={`p-4 rounded-xl text-center font-semibold ${
//                 sys.status === "healthy"
//                   ? "bg-green-700 text-green-200"
//                   : sys.status === "degraded"
//                   ? "bg-yellow-700 text-yellow-200"
//                   : "bg-red-700 text-red-200"
//               }`}
//             >
//               {sys.name}
//               <div className="text-sm font-normal">({sys.status})</div>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Malware & Phishing Detections */}
//       <Card title="🐛 Malware & Phishing Detections" className="md:col-span-2">
//         {malwareList.length === 0 ? (
//           <p className="text-purple-300">No malware or phishing detected</p>
//         ) : (
//           <ul className="space-y-2">
//             {malwareList.map((m, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2 text-sm"
//               >
//                 <span>
//                   {m.type} → <span className="font-semibold">{m.target}</span>
//                 </span>
//                 <span className="text-gray-400">
//                   {new Date(m.timestamp).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>
//     </div>
//   )
// }























// //client/src/pages/dashboardAdmin/DashboardAdminNetworking.js


// "use client";

// import React from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts";
// import { Card } from "../../components/Layouts/Card";
// import { useNetworkingData } from "../../hooks/useNetworkingData";
// import { useWazuhAgents } from "../../hooks/useWazuhAgents"
// const { agents } = useWazuhAgents()

// export default function DashboardAdminNetworking() {
//   const { traffic, firewall, malware } = useNetworkingData();

//   const systemStatus = [
//     { name: "Firewall", status: "healthy" },
//     { name: "IDS/IPS", status: "healthy" },
//     { name: "VPN", status: "degraded" },
//     { name: "WAF", status: "healthy" },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* Network Traffic Volume */}
//       <Card title="🌐 Network Traffic Volume">
//         {traffic.length === 0 ? (
//           <p className="text-purple-300">No network traffic data</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={traffic}>
//               <XAxis dataKey="time" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="inbound"
//                 stroke="#6366F1"
//                 name="Inbound"
//               />
//               <Line
//                 type="monotone"
//                 dataKey="outbound"
//                 stroke="#FACC15"
//                 name="Outbound"
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* Firewall & IDS/IPS Alerts */}
//       <Card title="🔥 Firewall & IDS/IPS Alerts">
//         {firewall.length === 0 ? (
//           <p className="text-purple-300">No firewall alerts</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={firewall}>
//               <XAxis dataKey="protocol" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="count" fill="#4ADE80" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* System Health */}
//       <Card title="❤️ System Health" className="md:col-span-2">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {systemStatus.map((sys, i) => (
//             <div
//               key={i}
//               className={`p-4 rounded-xl text-center font-semibold ${
//                 sys.status === "healthy"
//                   ? "bg-green-700 text-green-200"
//                   : sys.status === "degraded"
//                   ? "bg-yellow-700 text-yellow-200"
//                   : "bg-red-700 text-red-200"
//               }`}
//             >
//               {sys.name}
//               <div className="text-sm font-normal">({sys.status})</div>
//             </div>
//           ))}
//         </div>
//       </Card>

//       {/* Malware & Phishing Detections */}
//       <Card title="🐛 Malware & Phishing Detections" className="md:col-span-2">
//         {malware.length === 0 ? (
//           <p className="text-purple-300">No malware or phishing detected</p>
//         ) : (
//           <ul className="space-y-2">
//             {malware.map((m, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2 text-sm"
//               >
//                 <span>
//                   {m.type} → <span className="font-semibold">{m.target}</span>
//                 </span>
//                 <span className="text-gray-400">
//                   {new Date(m.timestamp).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>
//     </div>
//   );
// }










//client/src/pages/dashboardAdmin/DashboardAdminNetworking.js


"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { useNetworkingData } from "../../hooks/useNetworkingData";
import { useWazuhAgents } from "../../hooks/useWazuhAgents";

export default function DashboardAdminNetworking() {
  const { traffic, firewall, malware, connectionStatus } = useNetworkingData();
  const { agents } = useWazuhAgents(); // ✅ Hook used properly

  const systemStatus = [
    { name: "Firewall", status: "healthy" },
    { name: "IDS/IPS", status: "healthy" },
    { name: "VPN", status: "degraded" },
    { name: "WAF", status: "healthy" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Network Traffic Volume */}
      <Card title="🌐 Network Traffic Volume">
        {connectionStatus === "disconnected" ? (
          <p className="text-purple-300">Unable to connect to Wazuh or networking source</p>
        ) : traffic.length === 0 ? (
          <p className="text-purple-300">No network traffic data (connected)</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={traffic}>
              <XAxis dataKey="time" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="inbound" stroke="#6366F1" name="Inbound" />
              <Line type="monotone" dataKey="outbound" stroke="#FACC15" name="Outbound" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Firewall & IDS/IPS Alerts */}
      <Card title="🔥 Firewall & IDS/IPS Alerts">
        {connectionStatus === "disconnected" ? (
          <p className="text-purple-300">Unable to connect to Wazuh or networking source</p>
        ) : firewall.length === 0 ? (
          <p className="text-purple-300">No firewall alerts (connected)</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={firewall}>
              <XAxis dataKey="protocol" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="count" fill="#4ADE80" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* System Health */}
      <Card title="❤️ System Health" className="md:col-span-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemStatus.map((sys, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl text-center font-semibold ${
                sys.status === "healthy"
                  ? "bg-green-700 text-green-200"
                  : sys.status === "degraded"
                  ? "bg-yellow-700 text-yellow-200"
                  : "bg-red-700 text-red-200"
              }`}
            >
              {sys.name}
              <div className="text-sm font-normal">({sys.status})</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Wazuh Agents */}
      <Card title="🧠 Active Wazuh Agents" className="md:col-span-2">
        {connectionStatus === "disconnected" ? (
          <p className="text-purple-300">Unable to connect to Wazuh or agent source</p>
        ) : agents.length === 0 ? (
          <p className="text-purple-300">No active agents (connected)</p>
        ) : (
          <ul className="space-y-2">
            {agents.map((agent, i) => (
              <li
                key={i}
                className="flex justify-between bg-neutral-800 rounded-xl px-4 py-2 text-sm text-white"
              >
                <span>{agent.name || agent.id}</span>
                <span className="text-gray-400">{agent.status}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Malware & Phishing Detections */}
      <Card title="🐛 Malware & Phishing Detections" className="md:col-span-2">
        {connectionStatus === "disconnected" ? (
          <p className="text-purple-300">Unable to connect to Wazuh or malware source</p>
        ) : malware.length === 0 ? (
          <p className="text-purple-300">No malware or phishing detected (connected)</p>
        ) : (
          <ul className="space-y-2">
            {malware.map((m, i) => (
              <li
                key={i}
                className="flex justify-between bg-purple-700 rounded-xl px-4 py-2 text-sm"
              >
                <span>
                  {m.type} → <span className="font-semibold">{m.target}</span>
                </span>
                <span className="text-gray-400">
                  {new Date(m.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
