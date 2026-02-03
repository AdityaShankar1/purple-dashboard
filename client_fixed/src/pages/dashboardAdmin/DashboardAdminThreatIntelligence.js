// // // // //client/src/pages/dashboardAdmin/DashbaordAdminThreatIntelligence.js


// // // // "use client";

// // // // import React, { useMemo } from "react";
// // // // import {
// // // //   ResponsiveContainer,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   BarChart,
// // // //   Bar,
// // // // } from "recharts";
// // // // import { Card } from "../../components/Layouts/Card";
// // // // import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// // // // import { useWazuhSocket } from "../../hooks/useWazuhSocket";

// // // // const geoUrl =
// // // //   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// // // // export default function DashboardAdminThreatIntelligence() {
// // // //   const alerts = useWazuhSocket(200);

// // // //   const threatMarkers = useMemo(() => {
// // // //     const locations = alerts.reduce((acc, alert) => {
// // // //       const country = alert.agent?.geo?.country_name;
// // // //       const lat = alert.agent?.geo?.latitude;
// // // //       const lon = alert.agent?.geo?.longitude;
// // // //       if (country && lat && lon) {
// // // //         if (!acc[country]) {
// // // //           acc[country] = { count: 0, lat, lon };
// // // //         }
// // // //         acc[country].count++;
// // // //       }
// // // //       return acc;
// // // //     }, {});
// // // //     return Object.entries(locations).map(([country, data]) => ({
// // // //       name: country,
// // // //       coordinates: [data.lon, data.lat],
// // // //       count: data.count,
// // // //     }));
// // // //   }, [alerts]);

// // // //   const actorChart = useMemo(() => {
// // // //     const actorCounts = alerts.reduce((acc, alert) => {
// // // //       const actor = alert.rule?.mitre?.tactic || "Unknown";
// // // //       acc[actor] = (acc[actor] || 0) + 1;
// // // //       return acc;
// // // //     }, {});
// // // //     return Object.entries(actorCounts)
// // // //       .map(([actor, activity]) => ({
// // // //         actor,
// // // //         activity,
// // // //       }))
// // // //       .sort((a, b) => b.activity - a.activity);
// // // //   }, [alerts]);

// // // //   const assetList = useMemo(() => {
// // // //     const assets = alerts.filter(a => a.rule?.groups?.includes("vulnerability")).slice(0, 5);
// // // //     return assets.map(asset => ({
// // // //       name: asset.agent?.name,
// // // //       status: "Vulnerable",
// // // //       vulnerability: asset.rule?.description,
// // // //     }));
// // // //   }, [alerts]);

// // // //   return (
// // // //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
// // // //       {/* Global Threat Map */}
// // // //       <Card title="🌎 Global Threat Map">
// // // //         {threatMarkers.length === 0 ? (
// // // //           <p className="text-purple-300">No threat locations available</p>
// // // //         ) : (
// // // //           <ComposableMap projectionConfig={{ scale: 140 }}>
// // // //             <Geographies geography={geoUrl}>
// // // //               {({ geographies }) =>
// // // //                 geographies.map((geo) => (
// // // //                   <Geography
// // // //                     key={geo.rsmKey}
// // // //                     geography={geo}
// // // //                     fill="#1E1B4B"
// // // //                     stroke="#6366F1"
// // // //                   />
// // // //                 ))
// // // //               }
// // // //             </Geographies>
// // // //             {threatMarkers.map((marker, i) => (
// // // //               <Marker key={i} coordinates={marker.coordinates}>
// // // //                 <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
// // // //                 <text
// // // //                   textAnchor="middle"
// // // //                   y={15}
// // // //                   className="text-xs fill-purple-300"
// // // //                 >
// // // //                   {marker.name} ({marker.count})
// // // //                 </text>
// // // //               </Marker>
// // // //             ))}
// // // //           </ComposableMap>
// // // //         )}
// // // //       </Card>

// // // //       {/* Threat Actor Activity */}
// // // //       <Card title="🎭 Threat Actor Activity">
// // // //         {actorChart.length === 0 ? (
// // // //           <p className="text-purple-300">No actor activity data</p>
// // // //         ) : (
// // // //           <ResponsiveContainer width="100%" height={250}>
// // // //             <BarChart data={actorChart}>
// // // //               <XAxis dataKey="actor" stroke="#aaa" />
// // // //               <YAxis stroke="#aaa" />
// // // //               <Tooltip />
// // // //               <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
// // // //             </BarChart>
// // // //           </ResponsiveContainer>
// // // //         )}
// // // //       </Card>

// // // //       {/* Vulnerable Assets */}
// // // //       <Card title="💥 Vulnerable Assets">
// // // //         {assetList.length === 0 ? (
// // // //           <p className="text-purple-300">No vulnerable assets reported</p>
// // // //         ) : (
// // // //           <ul className="space-y-2 text-sm">
// // // //             {assetList.map((asset, i) => (
// // // //               <li
// // // //                 key={i}
// // // //                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
// // // //               >
// // // //                 <span>{asset.name}</span>
// // // //                 <span className="text-red-300 font-semibold">
// // // //                   {asset.status || "Exposed"}
// // // //                 </span>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // }




















// // // // "use client";

// // // // import React from "react";
// // // // import {
// // // //   ResponsiveContainer,
// // // //   XAxis,
// // // //   YAxis,
// // // //   Tooltip,
// // // //   BarChart,
// // // //   Bar,
// // // // } from "recharts";
// // // // import { Card } from "../../components/Layouts/Card";
// // // // import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// // // // import { useThreatIntelData } from "../../hooks/useThreatIntelData";
// // // // import { useMitreMap } from "../../hooks/useMitreMap";



// // // // const geoUrl =
// // // //   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// // // // export default function DashboardAdminThreatIntelligence() {
// // // //   const { global, actors, assets } = useThreatIntelData();

// // // //   return (
// // // //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
// // // //       {/* Global Threat Map */}
// // // //       <Card title="🌎 Global Threat Map">
// // // //         {global.length === 0 ? (
// // // //           <p className="text-purple-300">No threat locations available</p>
// // // //         ) : (
// // // //           <ComposableMap projectionConfig={{ scale: 140 }}>
// // // //             <Geographies geography={geoUrl}>
// // // //               {({ geographies }) =>
// // // //                 geographies.map((geo) => (
// // // //                   <Geography
// // // //                     key={geo.rsmKey}
// // // //                     geography={geo}
// // // //                     fill="#1E1B4B"
// // // //                     stroke="#6366F1"
// // // //                   />
// // // //                 ))
// // // //               }
// // // //             </Geographies>
// // // //             {global.map((marker, i) => (
// // // //               <Marker key={i} coordinates={marker.coordinates}>
// // // //                 <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
// // // //                 <text
// // // //                   textAnchor="middle"
// // // //                   y={15}
// // // //                   className="text-xs fill-purple-300"
// // // //                 >
// // // //                   {marker.name} ({marker.count})
// // // //                 </text>
// // // //               </Marker>
// // // //             ))}
// // // //           </ComposableMap>
// // // //         )}
// // // //       </Card>

// // // //       {/* Threat Actor Activity */}
// // // //       <Card title="🎭 Threat Actor Activity">
// // // //         {actors.length === 0 ? (
// // // //           <p className="text-purple-300">No actor activity data</p>
// // // //         ) : (
// // // //           <ResponsiveContainer width="100%" height={250}>
// // // //             <BarChart data={actors}>
// // // //               <XAxis dataKey="actor" stroke="#aaa" />
// // // //               <YAxis stroke="#aaa" />
// // // //               <Tooltip />
// // // //               <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
// // // //             </BarChart>
// // // //           </ResponsiveContainer>
// // // //         )}
// // // //       </Card>

// // // //       {/* Vulnerable Assets */}
// // // //       <Card title="💥 Vulnerable Assets">
// // // //         {assets.length === 0 ? (
// // // //           <p className="text-purple-300">No vulnerable assets reported</p>
// // // //         ) : (
// // // //           <ul className="space-y-2 text-sm">
// // // //             {assets.map((asset, i) => (
// // // //               <li
// // // //                 key={i}
// // // //                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
// // // //               >
// // // //                 <span>{asset.name}</span>
// // // //                 <span className="text-red-300 font-semibold">
// // // //                   {asset.status || "Exposed"}
// // // //                 </span>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         )}
// // // //       </Card>
// // // //     </div>
// // // //   );
// // // // }







// // // "use client";

// // // import React from "react";
// // // import {
// // //   ResponsiveContainer,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   BarChart,
// // //   Bar,
// // // } from "recharts";
// // // import { Card } from "../../components/Layouts/Card";
// // // import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// // // import { useThreatIntelData } from "../../hooks/useThreatIntelData";
// // // import { useMitreMap } from "../../hooks/useMitreMap";

// // // const geoUrl =
// // //   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// // // export default function DashboardAdminThreatIntelligence() {
// // //   const { global, actors, assets } = useThreatIntelData();
// // //   const { tactics, techniques } = useMitreMap();

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
// // //       {/* Global Threat Map */}
// // //       <Card title="🌎 Global Threat Map">
// // //         {global.length === 0 ? (
// // //           <p className="text-purple-300">No threat locations available</p>
// // //         ) : (
// // //           <ComposableMap projectionConfig={{ scale: 140 }}>
// // //             <Geographies geography={geoUrl}>
// // //               {({ geographies }) =>
// // //                 geographies.map((geo) => (
// // //                   <Geography
// // //                     key={geo.rsmKey}
// // //                     geography={geo}
// // //                     fill="#1E1B4B"
// // //                     stroke="#6366F1"
// // //                   />
// // //                 ))
// // //               }
// // //             </Geographies>
// // //             {global.map((marker, i) => (
// // //               <Marker key={i} coordinates={marker.coordinates}>
// // //                 <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
// // //                 <text
// // //                   textAnchor="middle"
// // //                   y={15}
// // //                   className="text-xs fill-purple-300"
// // //                 >
// // //                   {marker.name} ({marker.count})
// // //                 </text>
// // //               </Marker>
// // //             ))}
// // //           </ComposableMap>
// // //         )}
// // //       </Card>

// // //       {/* Threat Actor Activity */}
// // //       <Card title="🎭 Threat Actor Activity">
// // //         {actors.length === 0 ? (
// // //           <p className="text-purple-300">No actor activity data</p>
// // //         ) : (
// // //           <ResponsiveContainer width="100%" height={250}>
// // //             <BarChart data={actors}>
// // //               <XAxis dataKey="actor" stroke="#aaa" />
// // //               <YAxis stroke="#aaa" />
// // //               <Tooltip />
// // //               <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
// // //             </BarChart>
// // //           </ResponsiveContainer>
// // //         )}
// // //       </Card>

// // //       {/* Vulnerable Assets */}
// // //       <Card title="💥 Vulnerable Assets">
// // //         {assets.length === 0 ? (
// // //           <p className="text-purple-300">No vulnerable assets reported</p>
// // //         ) : (
// // //           <ul className="space-y-2 text-sm">
// // //             {assets.map((asset, i) => (
// // //               <li
// // //                 key={i}
// // //                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
// // //               >
// // //                 <span>{asset.name}</span>
// // //                 <span className="text-red-300 font-semibold">
// // //                   {asset.status || "Exposed"}
// // //                 </span>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </Card>

// // //       {/* MITRE Tactics */}
// // //       <Card title="🧠 MITRE Tactics">
// // //         {tactics.length === 0 ? (
// // //           <p className="text-purple-300">No MITRE tactics detected</p>
// // //         ) : (
// // //           <ul className="space-y-2 text-sm text-gray-300">
// // //             {tactics.map((t, i) => (
// // //               <li key={i} className="flex justify-between">
// // //                 <span>{t.key}</span>
// // //                 <span className="font-semibold text-purple-300">{t.doc_count}</span>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </Card>

// // //       {/* MITRE Techniques */}
// // //       <Card title="🧩 MITRE Techniques">
// // //         {techniques.length === 0 ? (
// // //           <p className="text-purple-300">No MITRE techniques detected</p>
// // //         ) : (
// // //           <ul className="space-y-2 text-sm text-gray-300">
// // //             {techniques.map((t, i) => (
// // //               <li key={i} className="flex justify-between">
// // //                 <span>{t.key}</span>
// // //                 <span className="font-semibold text-blue-300">{t.doc_count}</span>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </Card>
// // //     </div>
// // //   );
// // // }






// // "use client";

// // import React, { useState } from "react";
// // import {
// //   ResponsiveContainer,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   BarChart,
// //   Bar,
// // } from "recharts";
// // import { Card } from "../../components/Layouts/Card";
// // import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// // import { useThreatIntelData } from "../../hooks/useThreatIntelData";
// // import { useMitreMap } from "../../hooks/useMitreMap";
// // import { useAgentDetails } from "../../hooks/useAgentDetails";

// // const geoUrl =
// //   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// // export default function DashboardAdminThreatIntelligence() {
// //   const { global, actors, assets } = useThreatIntelData();
// //   const { tactics, techniques } = useMitreMap();

// //   const [selectedAgent, setSelectedAgent] = useState("soc");
// //   const { alerts, mitre } = useAgentDetails(selectedAgent);

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
// //       {/* Global Threat Map */}
// //       <Card title="🌎 Global Threat Map">
// //         {global.length === 0 ? (
// //           <p className="text-purple-300">No threat locations available</p>
// //         ) : (
// //           <ComposableMap projectionConfig={{ scale: 140 }}>
// //             <Geographies geography={geoUrl}>
// //               {({ geographies }) =>
// //                 geographies.map((geo) => (
// //                   <Geography
// //                     key={geo.rsmKey}
// //                     geography={geo}
// //                     fill="#1E1B4B"
// //                     stroke="#6366F1"
// //                   />
// //                 ))
// //               }
// //             </Geographies>
// //             {global.map((marker, i) => (
// //               <Marker key={i} coordinates={marker.coordinates}>
// //                 <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
// //                 <text
// //                   textAnchor="middle"
// //                   y={15}
// //                   className="text-xs fill-purple-300"
// //                 >
// //                   {marker.name} ({marker.count})
// //                 </text>
// //               </Marker>
// //             ))}
// //           </ComposableMap>
// //         )}
// //       </Card>

// //       {/* Threat Actor Activity */}
// //       <Card title="🎭 Threat Actor Activity">
// //         {actors.length === 0 ? (
// //           <p className="text-purple-300">No actor activity data</p>
// //         ) : (
// //           <ResponsiveContainer width="100%" height={250}>
// //             <BarChart data={actors}>
// //               <XAxis dataKey="actor" stroke="#aaa" />
// //               <YAxis stroke="#aaa" />
// //               <Tooltip />
// //               <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         )}
// //       </Card>

// //       {/* Vulnerable Assets */}
// //       <Card title="💥 Vulnerable Assets">
// //         {assets.length === 0 ? (
// //           <p className="text-purple-300">No vulnerable assets reported</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm">
// //             {assets.map((asset, i) => (
// //               <li
// //                 key={i}
// //                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
// //               >
// //                 <span>{asset.name}</span>
// //                 <span className="text-red-300 font-semibold">
// //                   {asset.status || "Exposed"}
// //                 </span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>

// //       {/* MITRE Tactics */}
// //       <Card title="🧠 MITRE Tactics">
// //         {tactics.length === 0 ? (
// //           <p className="text-purple-300">No MITRE tactics detected</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm text-gray-300">
// //             {tactics.map((t, i) => (
// //               <li key={i} className="flex justify-between">
// //                 <span>{t.key}</span>
// //                 <span className="font-semibold text-purple-300">{t.doc_count}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>

// //       {/* MITRE Techniques */}
// //       <Card title="🧩 MITRE Techniques">
// //         {techniques.length === 0 ? (
// //           <p className="text-purple-300">No MITRE techniques detected</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm text-gray-300">
// //             {techniques.map((t, i) => (
// //               <li key={i} className="flex justify-between">
// //                 <span>{t.key}</span>
// //                 <span className="font-semibold text-blue-300">{t.doc_count}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>

// //       {/* Agent Selector */}
// //       <Card title="🎯 Select Agent">
// //         <select
// //           value={selectedAgent}
// //           onChange={(e) => setSelectedAgent(e.target.value)}
// //           className="bg-purple-900 text-white px-4 py-2 rounded w-full"
// //         >
// //           <option value="soc">soc</option>
// //           <option value="node1">node1</option>
// //           <option value="endpoint-01">endpoint-01</option>
// //         </select>
// //       </Card>

// //       {/* Agent MITRE Tactics */}
// //       <Card title={`🧠 MITRE Tactics (${selectedAgent})`}>
// //         {mitre.tactics.length === 0 ? (
// //           <p className="text-purple-300">No tactics detected</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm text-gray-300">
// //             {mitre.tactics.map((t, i) => (
// //               <li key={i} className="flex justify-between">
// //                 <span>{t.key}</span>
// //                 <span className="font-semibold text-purple-300">{t.count}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>

// //       {/* Agent MITRE Techniques */}
// //       <Card title={`🧩 MITRE Techniques (${selectedAgent})`}>
// //         {mitre.techniques.length === 0 ? (
// //           <p className="text-purple-300">No techniques detected</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm text-gray-300">
// //             {mitre.techniques.map((t, i) => (
// //               <li key={i} className="flex justify-between">
// //                 <span>{t.key}</span>
// //                 <span className="font-semibold text-blue-300">{t.count}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>

// //       {/* Agent Recent Alerts */}
// //       <Card title={`📋 Recent Alerts (${selectedAgent})`}>
// //         {alerts.length === 0 ? (
// //           <p className="text-purple-300">No alerts found</p>
// //         ) : (
// //           <ul className="space-y-2 text-sm text-gray-300">
// //             {alerts.slice(0, 5).map((a, i) => (
// //               <li key={i} className="flex flex-col bg-purple-800 rounded px-4 py-2">
// //                 <span className="font-semibold text-red-300">{a.rule?.description}</span>
// //                 <span className="text-xs text-gray-400">{a["@timestamp"]}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </Card>
// //     </div>
// //   );
// // }










// //client/src/pages/dashboardAdmin/DashboardAdminThreatIntelligence

// "use client";

// import React, { useState } from "react";
// import {
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts";
// import { Card } from "../../components/Layouts/Card";
// import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
// import { useThreatIntelData } from "../../hooks/useThreatIntelData";
// import { useAgentDetails } from "../../hooks/useAgentDetails";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// export default function DashboardAdminThreatIntelligence() {
//   const { global, actors, assets } = useThreatIntelData();
//   const [selectedAgent, setSelectedAgent] = useState("soc");
//   const { alerts, mitre } = useAgentDetails(selectedAgent);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {/* Global Threat Map */}
//       <Card title="🌎 Global Threat Map">
//         {global.length === 0 ? (
//           <p className="text-purple-300">No threat locations available</p>
//         ) : (
//           <ComposableMap projectionConfig={{ scale: 140 }}>
//             <Geographies geography={geoUrl}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill="#1E1B4B"
//                     stroke="#6366F1"
//                   />
//                 ))
//               }
//             </Geographies>
//             {global.map((marker, i) => (
//               <Marker key={i} coordinates={marker.coordinates}>
//                 <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
//                 <text
//                   textAnchor="middle"
//                   y={15}
//                   className="text-xs fill-purple-300"
//                 >
//                   {marker.name} ({marker.count})
//                 </text>
//               </Marker>
//             ))}
//           </ComposableMap>
//         )}
//       </Card>

//       {/* Threat Actor Activity */}
//       <Card title="🎭 Threat Actor Activity">
//         {actors.length === 0 ? (
//           <p className="text-purple-300">No actor activity data</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={actors}>
//               <XAxis dataKey="actor" stroke="#aaa" />
//               <YAxis stroke="#aaa" />
//               <Tooltip />
//               <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Card>

//       {/* Vulnerable Assets */}
//       <Card title="💥 Vulnerable Assets">
//         {assets.length === 0 ? (
//           <p className="text-purple-300">No vulnerable assets reported</p>
//         ) : (
//           <ul className="space-y-2 text-sm">
//             {assets.map((asset, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
//               >
//                 <span>{asset.name}</span>
//                 <span className="text-red-300 font-semibold">
//                   {asset.status || "Exposed"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>

//       {/* Agent Selector */}
//       <Card title="🎯 Select Agent">
//         <select
//           value={selectedAgent}
//           onChange={(e) => setSelectedAgent(e.target.value)}
//           className="bg-purple-900 text-white px-4 py-2 rounded w-full"
//         >
//           <option value="soc">soc</option>
//           <option value="node1">node1</option>
//           <option value="endpoint-01">endpoint-01</option>
//         </select>
//       </Card>

//       {/* Agent MITRE Tactics */}
//       <Card title={`🧠 MITRE Tactics (${selectedAgent})`}>
//         {mitre.tactics.length === 0 ? (
//           <p className="text-purple-300">No tactics detected</p>
//         ) : (
//           <ul className="space-y-2 text-sm text-gray-300">
//             {mitre.tactics.map((t, i) => (
//               <li key={i} className="flex justify-between">
//                 <span>{t.key}</span>
//                 <span className="font-semibold text-purple-300">{t.count}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>

//       {/* Agent MITRE Techniques */}
//       <Card title={`🧩 MITRE Techniques (${selectedAgent})`}>
//         {mitre.techniques.length === 0 ? (
//           <p className="text-purple-300">No techniques detected</p>
//         ) : (
//           <ul className="space-y-2 text-sm text-gray-300">
//             {mitre.techniques.map((t, i) => (
//               <li key={i} className="flex justify-between">
//                 <span>{t.key}</span>
//                 <span className="font-semibold text-blue-300">{t.count}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>

//       {/* Agent Recent Alerts */}
//       <Card title={`📋 Recent Alerts (${selectedAgent})`}>
//         {alerts.length === 0 ? (
//           <p className="text-purple-300">No alerts found</p>
//         ) : (
//           <ul className="space-y-2 text-sm text-gray-300">
//             {alerts.slice(0, 5).map((a, i) => (
//               <li key={i} className="flex flex-col bg-purple-800 rounded px-4 py-2">
//                 <span className="font-semibold text-red-300">{a.rule?.description}</span>
//                 <span className="text-xs text-gray-400">{a["@timestamp"]}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Card>
//     </div>
//   );
// }


















// //client/src/pages/dashboardAdmin/DashboardAdminThreatIntelligence
"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "../../components/Layouts/Card";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useThreatIntelData } from "../../hooks/useThreatIntelData";
import { useAgentDetails } from "../../hooks/useAgentDetails";
import useAgentList from "../../hooks/useAgentList";
import { useAgentHealth } from "../../hooks/useAgentHealth";
import { useMitreAlerts } from "../../hooks/useMitreAlerts.js";
// import useAgentList from "../../hooks/useAgentList";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export default function DashboardAdminThreatIntelligence() {
  const { global, actors, assets } = useThreatIntelData();
  const agentList = useAgentList();
  const agentHealth = useAgentHealth();
  const [selectedAgent, setSelectedAgent] = useState("all");
  const { alerts, mitre } = useAgentDetails(selectedAgent);

const [selectedTechnique, setSelectedTechnique] = useState("all");
const mitreTechniqueAlerts = useMitreAlerts(selectedTechnique);




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Global Threat Map */}
      <Card title="🌎 Global Threat Map">
        {global.length === 0 ? (
          <p className="text-purple-300">No threat locations available</p>
        ) : (
          <ComposableMap projectionConfig={{ scale: 140 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#1E1B4B"
                    stroke="#6366F1"
                  />
                ))
              }
            </Geographies>
            {global.map((marker, i) => (
              <Marker key={i} coordinates={marker.coordinates}>
                <circle r={5} fill="#EF4444" stroke="#fff" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={15}
                  className="text-xs fill-purple-300"
                >
                  {marker.name} ({marker.count})
                </text>
              </Marker>
            ))}
          </ComposableMap>
        )}
      </Card>

      {/* Threat Actor Activity */}
      <Card title="🎭 Threat Actor Activity">
        {actors.length === 0 ? (
          <p className="text-purple-300">No actor activity data</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={actors}>
              <XAxis dataKey="actor" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="activity" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Vulnerable Assets */}
      <Card title="💥 Vulnerable Assets">
        {assets.length === 0 ? (
          <p className="text-purple-300">No vulnerable assets reported</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {assets.map((asset, i) => (
              <li
                key={i}
                className="flex justify-between bg-purple-700 rounded-xl px-4 py-2"
              >
                <span>{asset.name}</span>
                <span className="text-red-300 font-semibold">
                  {asset.status || "Exposed"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

<Card title="🧠 Select MITRE Technique">
  <select
    value={selectedTechnique}
    onChange={(e) => setSelectedTechnique(e.target.value)}
    className="bg-purple-900 text-white px-4 py-2 rounded w-full"
  >
    <option value="all">All Techniques</option>
    {[
      "T1078", "T1059", "T1566", "T1027", "T1547", "T1036", "T1082", "T1047", "T1056"
    ].map((tech, i) => (
      <option key={i} value={tech}>
        {tech}
      </option>
    ))}
  </select>
</Card>

<Card title={`📌 Alerts for ${selectedTechnique}`}>
  {mitreTechniqueAlerts.length === 0 ? (
    <p className="text-purple-300">No alerts for this technique</p>
  ) : (
    <ul className="space-y-2 text-sm text-gray-300">
      {mitreTechniqueAlerts.map((alert, i) => (
        <li key={i} className="flex flex-col bg-purple-800 rounded px-4 py-2">
          <span className="font-semibold text-blue-300">
            {alert.rule?.description || "Unknown alert"}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(alert["@timestamp"]).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  )}
</Card>



      {/* Agent Selector */}
      <Card title="🎯 Select Agent">
        {/* <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="bg-purple-900 text-white px-4 py-2 rounded w-full"
        >
          {agentList.map((a, i) => (
            <option key={i} value={a.name}>
              {a.name} ({a.count})
            </option>
          ))}
        </select> */}
       
{/*        
       
       <select
  value={selectedAgent}
  onChange={(e) => setSelectedAgent(e.target.value)}
  className="bg-purple-900 text-white px-4 py-2 rounded w-full"
>
  <option value="all">All Agents</option>
  {agentList.map((a, i) => (
    <option key={i} value={a.name}>
      {a.name} ({a.count})
    </option>
  ))}
</select> */}



{/* <select
  value={selectedAgent}
  onChange={(e) => setSelectedAgent(e.target.value)}
  className="bg-purple-900 text-white px-4 py-2 rounded w-full"
>
  <option value="all">All Agents</option>
  {agentList.map((a, i) => (
    <option key={i} value={a.name}>
      {a.name} ({a.count})
    </option>
  ))}
</select> */}
<select
    value={selectedAgent}
    onChange={(e) => setSelectedAgent(e.target.value)}
    className="bg-purple-900 text-white px-4 py-2 rounded w-full"
  >
    <option value="all">All Agents</option>
    {agentList.length === 0 && (
      <option disabled>No active agents found</option>
    )}
    {agentList.map((a, i) => (
      <option key={i} value={a.name}>
        {a.name}
      </option>
    ))}
  </select>



      </Card>

      {/* Agent Health Status */}
      <Card title="🩺 Agent Health Status">
        {agentHealth.length === 0 ? (
          <p className="text-purple-300">No agent health data available</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {agentHealth.map((agent, i) => (
              <li key={i} className="flex justify-between bg-purple-700 rounded-xl px-4 py-2">
                <span>
                  {agent.name}
                  {agent.name === selectedAgent && (
                    <span className="ml-2 text-xs text-purple-300">(selected)</span>
                  )}
                </span>
                <span
                  className={`font-semibold ${
                    agent.status === "Active"
                      ? "text-green-300"
                      : agent.status === "Disconnected"
                      ? "text-yellow-300"
                      : "text-red-300"
                  }`}
                >
                  {agent.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Agent MITRE Tactics */}
      <Card title={`🧠 MITRE Tactics (${selectedAgent})`}>
        {mitre.tactics.length === 0 ? (
          <p className="text-purple-300">No tactics detected</p>
        ) : (
          <ul className="space-y-2 text-sm text-black-300">
            {mitre.tactics.map((t, i) => (
              <li key={i} className="flex justify-between">
                <span>{t.key}</span>
                <span className="font-semibold text-purple-300">{t.count}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Agent MITRE Techniques */}
      <Card title={`🧩 MITRE Techniques (${selectedAgent})`}>
        {mitre.techniques.length === 0 ? (
          <p className="text-purple-300">No techniques detected</p>
        ) : (
          <ul className="space-y-2 text-sm text-black-300">
            {mitre.techniques.map((t, i) => (
              <li key={i} className="flex justify-between">
                <span>{t.key}</span>
                <span className="font-semibold text-blue-300">{t.count}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Agent Recent Alerts */}
      <Card title={`📋 Recent Alerts (${selectedAgent})`}>
        {alerts.length === 0 ? (
          <p className="text-purple-300">No alerts found</p>
        ) : (
          <ul className="space-y-2 text-sm text-gray-300">
            {alerts.slice(0, 5).map((a, i) => (
              <li key={i} className="flex flex-col bg-purple-800 rounded px-4 py-2">
                <span className="font-semibold text-red-300">{a.rule?.description}</span>
                <span className="text-xs text-gray-400">{a["@timestamp"]}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
