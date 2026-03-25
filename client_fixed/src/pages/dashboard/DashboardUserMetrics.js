// // "use client";

// // import { useMemo } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket";

// // export default function DashboardUser() {
// //   const alerts = useWazuhSocket(200);

// //   const incidentQueue = useMemo(() => alerts.length, [alerts]);

// //   const classification = useMemo(() => {
// //     const truePositives = alerts.filter((a) => a.rule?.level >= 8).length;
// //     const falsePositives = alerts.filter((a) =>
// //       Array.isArray(a.rule?.groups) && a.rule.groups.includes("false_positive")
// //     ).length;
// //     const falseNegatives = Math.max(0, alerts.length - (truePositives + falsePositives));
// //     return [
// //       { name: "True Positives", value: truePositives },
// //       { name: "False Positives", value: falsePositives },
// //       { name: "False Negatives", value: falseNegatives },
// //     ];
// //   }, [alerts]);

// //   const logViews = useMemo(() => {
// //     const logs = { Sources: 0, Application: 0, Network: 0 };
// //     alerts.forEach((a) => {
// //       if (a.agent?.type === "endpoint") logs.Sources++;
// //       if (a.agent?.type === "app") logs.Application++;
// //       if (a.agent?.type === "network") logs.Network++;
// //     });
// //     const total = Object.values(logs).reduce((sum, v) => sum + v, 0) || 1;
// //     return Object.entries(logs).map(([name, value]) => ({
// //       name,
// //       value: Math.round((value / total) * 100),
// //     }));
// //   }, [alerts]);

// //   const testSenior = useMemo(() => {
// //     const test = alerts.filter((a) => a.rule?.level < 8).length;
// //     const senior = alerts.filter((a) => a.rule?.level >= 8).length;
// //     return [
// //       { name: "Train", value: test },
// //       { name: "Test", value: senior },
// //     ];
// //   }, [alerts]);

// //   const trending = useMemo(() => {
// //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //     const grouped = {};
// //     alerts.forEach((a) => {
// //       const d = new Date(a["@timestamp"]);
// //       const day = days[d.getDay()];
// //       grouped[day] = (grouped[day] || 0) + 1;
// //     });
// //     return days.map((day) => ({ day, count: grouped[day] || 0 }));
// //   }, [alerts]);

// //   const threatTags = useMemo(() => {
// //     const tags = new Set();
// //     alerts.forEach((a) => {
// //       const groups = a.rule?.groups;
// //       if (Array.isArray(groups)) {
// //         groups.forEach((g) => tags.add(g));
// //       }
// //     });
// //     return Array.from(tags).slice(0, 10);
// //   }, [alerts]);

// //   const COLORS = ["#1976d2", "#ef5350", "#ffb74d"];

// //   const Card = ({ title, children }) => (
// //     <div className="bg-purple-800 rounded-xl shadow p-6 text-white">
// //       {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
// //       {children}
// //     </div>
// //   );

// //   return (
// //     <div className="min-h-screen bg-fuchsia-400">
// //       <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-purple-900 min-h-screen text-white">
// //         {/* Incident Queue */}
// //         <Card title="Incident Queue">
// //           <p className="text-5xl font-bold text-center">{incidentQueue}</p>
// //         </Card>

// //         {/* Classification Status */}
// //         <Card title="Classification Status">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <PieChart>
// //               <Pie data={classification} cx="50%" cy="50%" outerRadius={80} dataKey="value">
// //                 {classification.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="flex justify-around text-sm mt-2">
// //             {classification.map((c, i) => (
// //               <span key={i} style={{ color: COLORS[i] }}>
// //                 ● {c.name}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>

// //         {/* Log Views */}
// //         <Card title="Log Views">
// //           <ul className="space-y-2">
// //             {logViews.map((log, i) => (
// //               <li key={i} className="flex justify-between">
// //                 <span>{log.name}</span>
// //                 <div className="flex-1 mx-2 bg-purple-700 rounded h-2">
// //                   <div className="bg-blue-500 h-2 rounded" style={{ width: `${log.value}%` }} />
// //                 </div>
// //                 <span>{log.value}%</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </Card>

// //         {/* Test & Senior */}
// //         <Card title="Train & Test">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={testSenior}>
// //               <XAxis dataKey="name" stroke="#aaa" />
// //               <YAxis stroke="#aaa" />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#1976d2" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Trending Graphs */}
// //         <Card title="Trending Graphs">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <LineChart data={trending}>
// //               <XAxis dataKey="day" stroke="#aaa" />
// //               <YAxis stroke="#aaa" />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="count" stroke="#42a5f5" />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Threat Intel Tags */}
// //         <Card title="Threat Intel Tags">
// //           <div className="flex flex-wrap gap-2">
// //             {threatTags.map((tag, i) => (
// //               <span key={i} className="bg-purple-700 text-sm px-3 py-1 rounded-full">
// //                 {tag}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }



// // "use client";

// // import { useMemo } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket";
// // import Layout from "../../components/Layouts/Layouts";
// // import { Card } from "../../components/Layouts/Card";
// // import { useTheme } from "../../context/ThemeContext";

// // export default function DashboardUserMetrics() {
// //   const theme = useTheme();
// //   const alerts = useWazuhSocket(200);

// //   const incidentQueue = useMemo(() => alerts.length, [alerts]);

// //   const classification = useMemo(() => {
// //     const truePositives = alerts.filter((a) => a.rule?.level >= 8).length;
// //     const falsePositives = alerts.filter((a) =>
// //       Array.isArray(a.rule?.groups) && a.rule.groups.includes("false_positive")
// //     ).length;
// //     const falseNegatives = Math.max(0, alerts.length - (truePositives + falsePositives));
// //     return [
// //       { name: "True Positives", value: truePositives },
// //       { name: "False Positives", value: falsePositives },
// //       { name: "False Negatives", value: falseNegatives },
// //     ];
// //   }, [alerts]);

// //   const logViews = useMemo(() => {
// //     const logs = { Sources: 0, Application: 0, Network: 0 };
// //     alerts.forEach((a) => {
// //       if (a.agent?.type === "endpoint") logs.Sources++;
// //       if (a.agent?.type === "app") logs.Application++;
// //       if (a.agent?.type === "network") logs.Network++;
// //     });
// //     const total = Object.values(logs).reduce((sum, v) => sum + v, 0) || 1;
// //     return Object.entries(logs).map(([name, value]) => ({
// //       name,
// //       value: Math.round((value / total) * 100),
// //     }));
// //   }, [alerts]);

// //   const testSenior = useMemo(() => {
// //     const test = alerts.filter((a) => a.rule?.level < 8).length;
// //     const senior = alerts.filter((a) => a.rule?.level >= 8).length;
// //     return [
// //       { name: "Train", value: test },
// //       { name: "Test", value: senior },
// //     ];
// //   }, [alerts]);

// //   const trending = useMemo(() => {
// //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //     const grouped = {};
// //     alerts.forEach((a) => {
// //       const d = new Date(a["@timestamp"]);
// //       const day = days[d.getDay()];
// //       grouped[day] = (grouped[day] || 0) + 1;
// //     });
// //     return days.map((day) => ({ day, count: grouped[day] || 0 }));
// //   }, [alerts]);

// //   const threatTags = useMemo(() => {
// //     const tags = new Set();
// //     alerts.forEach((a) => {
// //       const groups = a.rule?.groups;
// //       if (Array.isArray(groups)) groups.forEach((g) => tags.add(g));
// //     });
// //     return Array.from(tags).slice(0, 10);
// //   }, [alerts]);

// //   const COLORS = [theme.colors.primary, theme.colors.accent, theme.colors.secondary];

// //   return (
// //     <Layout>
// //       <div
// //         className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen"
// //         style={{ background: theme.background.gradient, color: theme.colors.text }}
// //       >
// //         {/* Incident Queue */}
// //         <Card title="Incident Queue">
// //           <p className="text-5xl font-bold text-center text-[theme.colors.primary]">
// //             {incidentQueue}
// //           </p>
// //         </Card>

// //         {/* Classification Status */}
// //         <Card title="Classification Status">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <PieChart>
// //               <Pie data={classification} cx="50%" cy="50%" outerRadius={80} dataKey="value">
// //                 {classification.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="flex justify-around text-sm mt-2">
// //             {classification.map((c, i) => (
// //               <span key={i} style={{ color: COLORS[i] }}>
// //                 ● {c.name}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>

// //         {/* Log Views */}
// //         <Card title="Log Views">
// //           <ul className="space-y-2">
// //             {logViews.map((log, i) => (
// //               <li key={i} className="flex justify-between items-center text-sm">
// //                 <span>{log.name}</span>
// //                 <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
// //                   <div
// //                     className="h-2 rounded"
// //                     style={{
// //                       width: `${log.value}%`,
// //                       backgroundColor: theme.colors.accent,
// //                     }}
// //                   />
// //                 </div>
// //                 <span>{log.value}%</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </Card>

// //         {/* Train & Test */}
// //         <Card title="Train & Test">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={testSenior}>
// //               <XAxis dataKey="name" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Bar dataKey="value" fill={theme.colors.primary} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Trending Graphs */}
// //         <Card title="Trending Graphs">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <LineChart data={trending}>
// //               <XAxis dataKey="day" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="count" stroke={theme.colors.accent} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Threat Intel Tags */}
// //         <Card title="Threat Intel Tags">
// //           <div className="flex flex-wrap gap-2">
// //             {threatTags.map((tag, i) => (
// //               <span
// //                 key={i}
// //                 className="text-sm px-3 py-1 rounded-full"
// //                 style={{
// //                   backgroundColor: theme.colors.accent,
// //                   color: "#fff",
// //                 }}
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>
// //       </div>
// //     </Layout>
// //   );
// // }







// // "use client";

// // import { useMemo } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket";
// // import { Card } from "../../components/Layouts/Card";
// // import { useTheme } from "../../context/ThemeContext";
// // import ThemeBackground from "../../context/ThemeBackground";

// // export default function DashboardUserMetrics() {
// //   const theme = useTheme();
// //   const alerts = useWazuhSocket(200);

// //   const incidentQueue = useMemo(() => alerts.length, [alerts]);

// //   const classification = useMemo(() => {
// //     const truePositives = alerts.filter((a) => a.rule?.level >= 8).length;
// //     const falsePositives = alerts.filter((a) =>
// //       Array.isArray(a.rule?.groups) && a.rule.groups.includes("false_positive")
// //     ).length;
// //     const falseNegatives = Math.max(0, alerts.length - (truePositives + falsePositives));
// //     return [
// //       { name: "True Positives", value: truePositives },
// //       { name: "False Positives", value: falsePositives },
// //       { name: "False Negatives", value: falseNegatives },
// //     ];
// //   }, [alerts]);

// //   const logViews = useMemo(() => {
// //     const logs = { Sources: 0, Application: 0, Network: 0 };
// //     alerts.forEach((a) => {
// //       if (a.agent?.type === "endpoint") logs.Sources++;
// //       if (a.agent?.type === "app") logs.Application++;
// //       if (a.agent?.type === "network") logs.Network++;
// //     });
// //     const total = Object.values(logs).reduce((sum, v) => sum + v, 0) || 1;
// //     return Object.entries(logs).map(([name, value]) => ({
// //       name,
// //       value: Math.round((value / total) * 100),
// //     }));
// //   }, [alerts]);

// //   const testSenior = useMemo(() => {
// //     const test = alerts.filter((a) => a.rule?.level < 8).length;
// //     const senior = alerts.filter((a) => a.rule?.level >= 8).length;
// //     return [
// //       { name: "Train", value: test },
// //       { name: "Test", value: senior },
// //     ];
// //   }, [alerts]);

// //   const trending = useMemo(() => {
// //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //     const grouped = {};
// //     alerts.forEach((a) => {
// //       const d = new Date(a["@timestamp"]);
// //       const day = days[d.getDay()];
// //       grouped[day] = (grouped[day] || 0) + 1;
// //     });
// //     return days.map((day) => ({ day, count: grouped[day] || 0 }));
// //   }, [alerts]);

// //   const threatTags = useMemo(() => {
// //     const tags = new Set();
// //     alerts.forEach((a) => {
// //       const groups = a.rule?.groups;
// //       if (Array.isArray(groups)) groups.forEach((g) => tags.add(g));
// //     });
// //     return Array.from(tags).slice(0, 10);
// //   }, [alerts]);

// //   const COLORS = [theme.colors.primary, theme.colors.accent, theme.colors.secondary];

// //   return (
// //     <ThemeBackground className="p-6 min-h-screen">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {/* Incident Queue */}
// //         <Card title="Incident Queue">
// //           <p
// //             className="text-5xl font-bold text-center"
// //             style={{ color: theme.colors.primary }}
// //           >
// //             {incidentQueue}
// //           </p>
// //         </Card>

// //         {/* Classification Status */}
// //         <Card title="Classification Status">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <PieChart>
// //               <Pie data={classification} cx="50%" cy="50%" outerRadius={80} dataKey="value">
// //                 {classification.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="flex justify-around text-sm mt-2">
// //             {classification.map((c, i) => (
// //               <span key={i} style={{ color: COLORS[i] }}>
// //                 ● {c.name}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>

// //         {/* Log Views */}
// //         <Card title="Log Views">
// //           <ul className="space-y-2">
// //             {logViews.map((log, i) => (
// //               <li key={i} className="flex justify-between items-center text-sm">
// //                 <span>{log.name}</span>
// //                 <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
// //                   <div
// //                     className="h-2 rounded"
// //                     style={{
// //                       width: `${log.value}%`,
// //                       backgroundColor: theme.colors.accent,
// //                     }}
// //                   />
// //                 </div>
// //                 <span>{log.value}%</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </Card>

// //         {/* Train & Test */}
// //         <Card title="Train & Test">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={testSenior}>
// //               <XAxis dataKey="name" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Bar dataKey="value" fill={theme.colors.primary} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Trending Graphs */}
// //         <Card title="Trending Graphs">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <LineChart data={trending}>
// //               <XAxis dataKey="day" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="count" stroke={theme.colors.accent} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Threat Intel Tags */}
// //         <Card title="Threat Intel Tags">
// //           <div className="flex flex-wrap gap-2">
// //             {threatTags.map((tag, i) => (
// //               <span
// //                 key={i}
// //                 className="text-sm px-3 py-1 rounded-full"
// //                 style={{
// //                   backgroundColor: theme.colors.accent,
// //                   color: "#fff",
// //                 }}
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>
// //       </div>
// //     </ThemeBackground>
// //   );
// // }






// // ///client/src/pages/dashboard/DashboardUserMetrics.js

// // "use client";

// // import { useMemo } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// // } from "recharts";
// // import { useWazuhSocket } from "../../hooks/useWazuhSocket";
// // import { Card } from "../../components/Layouts/Card";
// // import { useTheme } from "../../context/ThemeContext";

// // export default function DashboardUserMetrics() {
// //   const theme = useTheme();
// //   const alerts = useWazuhSocket(200);

// //   const incidentQueue = useMemo(() => alerts.length, [alerts]);

// //   const classification = useMemo(() => {
// //     const truePositives = alerts.filter((a) => a.rule?.level >= 8).length;
// //     const falsePositives = alerts.filter((a) =>
// //       Array.isArray(a.rule?.groups) && a.rule.groups.includes("false_positive")
// //     ).length;
// //     const falseNegatives = Math.max(0, alerts.length - (truePositives + falsePositives));
// //     return [
// //       { name: "True Positives", value: truePositives },
// //       { name: "False Positives", value: falsePositives },
// //       { name: "False Negatives", value: falseNegatives },
// //     ];
// //   }, [alerts]);

// //   const logViews = useMemo(() => {
// //     const logs = { Sources: 0, Application: 0, Network: 0 };
// //     alerts.forEach((a) => {
// //       if (a.agent?.type === "endpoint") logs.Sources++;
// //       if (a.agent?.type === "app") logs.Application++;
// //       if (a.agent?.type === "network") logs.Network++;
// //     });
// //     const total = Object.values(logs).reduce((sum, v) => sum + v, 0) || 1;
// //     return Object.entries(logs).map(([name, value]) => ({
// //       name,
// //       value: Math.round((value / total) * 100),
// //     }));
// //   }, [alerts]);

// //   const testSenior = useMemo(() => {
// //     const test = alerts.filter((a) => a.rule?.level < 8).length;
// //     const senior = alerts.filter((a) => a.rule?.level >= 8).length;
// //     return [
// //       { name: "Train", value: test },
// //       { name: "Test", value: senior },
// //     ];
// //   }, [alerts]);

// //   const trending = useMemo(() => {
// //     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// //     const grouped = {};
// //     alerts.forEach((a) => {
// //       const d = new Date(a["@timestamp"]);
// //       const day = days[d.getDay()];
// //       grouped[day] = (grouped[day] || 0) + 1;
// //     });
// //     return days.map((day) => ({ day, count: grouped[day] || 0 }));
// //   }, [alerts]);

// //   const threatTags = useMemo(() => {
// //     const tags = new Set();
// //     alerts.forEach((a) => {
// //       const groups = a.rule?.groups;
// //       if (Array.isArray(groups)) groups.forEach((g) => tags.add(g));
// //     });
// //     return Array.from(tags).slice(0, 10);
// //   }, [alerts]);

// //   const COLORS = [theme.colors.primary, theme.colors.accent, theme.colors.secondary];

// //   return (
// //     <div className="p-6 space-y-6">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {/* Incident Queue */}
// //         <Card title="Incident Queue">
// //           <p
// //             className="text-5xl font-bold text-center"
// //             style={{ color: theme.colors.primary }}
// //           >
// //             {incidentQueue}
// //           </p>
// //         </Card>

// //         {/* Classification Status */}
// //         <Card title="Classification Status">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <PieChart>
// //               <Pie data={classification} cx="50%" cy="50%" outerRadius={80} dataKey="value">
// //                 {classification.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="flex justify-around text-sm mt-2">
// //             {classification.map((c, i) => (
// //               <span key={i} style={{ color: COLORS[i] }}>
// //                 ● {c.name}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>

// //         {/* Log Views */}
// //         <Card title="Log Views">
// //           <ul className="space-y-2">
// //             {logViews.map((log, i) => (
// //               <li key={i} className="flex justify-between items-center text-sm">
// //                 <span>{log.name}</span>
// //                 <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
// //                   <div
// //                     className="h-2 rounded"
// //                     style={{
// //                       width: `${log.value}%`,
// //                       backgroundColor: theme.colors.accent,
// //                     }}
// //                   />
// //                 </div>
// //                 <span>{log.value}%</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </Card>

// //         {/* Train & Test */}
// //         <Card title="Train & Test">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <BarChart data={testSenior}>
// //               <XAxis dataKey="name" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Bar dataKey="value" fill={theme.colors.primary} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Trending Graphs */}
// //         <Card title="Trending Graphs">
// //           <ResponsiveContainer width="100%" height={200}>
// //             <LineChart data={trending}>
// //               <XAxis dataKey="day" stroke={theme.colors.text} />
// //               <YAxis stroke={theme.colors.text} />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="count" stroke={theme.colors.accent} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Threat Intel Tags */}
// //         <Card title="Threat Intel Tags">
// //           <div className="flex flex-wrap gap-2">
// //             {threatTags.map((tag, i) => (
// //               <span
// //                 key={i}
// //                 className="text-sm px-3 py-1 rounded-full"
// //                 style={{
// //                   backgroundColor: theme.colors.accent,
// //                   color: "#fff",
// //                 }}
// //               >
// //                 {tag}
// //               </span>
// //             ))}
// //           </div>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }





























// // client/src/pages/dashboard/DashboardUserMetrics.js
// "use client";

// import { useMemo } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import { useWazuhSocket } from "../../hooks/useWazuhSocket";
// import { Card } from "../../components/Layouts/Card";
// import { useTheme } from "../../context/ThemeContext";

// export default function DashboardUserMetrics() {
//   const theme = useTheme();
//   const rawAlerts = useWazuhSocket(200);

//   // ✅ Stable alerts reference for useMemo dependencies
//   const alerts = useMemo(() => (Array.isArray(rawAlerts) ? rawAlerts : []), [rawAlerts]);

//   const incidentQueue = useMemo(() => alerts.length, [alerts]);

//   const classification = useMemo(() => {
//     const truePositives = alerts.filter((a) => a.rule?.level >= 8).length;
//     const falsePositives = alerts.filter((a) =>
//       Array.isArray(a.rule?.groups) && a.rule.groups.includes("false_positive")
//     ).length;
//     const falseNegatives = Math.max(0, alerts.length - (truePositives + falsePositives));
//     return [
//       { name: "True Positives", value: truePositives },
//       { name: "False Positives", value: falsePositives },
//       { name: "False Negatives", value: falseNegatives },
//     ];
//   }, [alerts]);

//   const logViews = useMemo(() => {
//     const logs = { Sources: 0, Application: 0, Network: 0 };
//     alerts.forEach((a) => {
//       if (a.agent?.type === "endpoint") logs.Sources++;
//       if (a.agent?.type === "app") logs.Application++;
//       if (a.agent?.type === "network") logs.Network++;
//     });
//     const total = Object.values(logs).reduce((sum, v) => sum + v, 0) || 1;
//     return Object.entries(logs).map(([name, value]) => ({
//       name,
//       value: Math.round((value / total) * 100),
//     }));
//   }, [alerts]);

//   const testSenior = useMemo(() => {
//     const test = alerts.filter((a) => a.rule?.level < 8).length;
//     const senior = alerts.filter((a) => a.rule?.level >= 8).length;
//     return [
//       { name: "Train", value: test },
//       { name: "Test", value: senior },
//     ];
//   }, [alerts]);

//   const trending = useMemo(() => {
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const grouped = {};
//     alerts.forEach((a) => {
//       const d = new Date(a["@timestamp"]);
//       const day = days[d.getDay()];
//       grouped[day] = (grouped[day] || 0) + 1;
//     });
//     return days.map((day) => ({ day, count: grouped[day] || 0 }));
//   }, [alerts]);

//   const threatTags = useMemo(() => {
//     const tags = new Set();
//     alerts.forEach((a) => {
//       const groups = a.rule?.groups;
//       if (Array.isArray(groups)) groups.forEach((g) => tags.add(g));
//     });
//     return Array.from(tags).slice(0, 10);
//   }, [alerts]);

//   const COLORS = [theme.colors.primary, theme.colors.accent, theme.colors.secondary];

//   return (
//     <div className="p-6 space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Incident Queue */}
//         <Card title="Incident Queue">
//           <p
//             className="text-5xl font-bold text-center"
//             style={{ color: theme.colors.primary }}
//           >
//             {incidentQueue}
//           </p>
//         </Card>

//         {/* Classification Status */}
//         <Card title="Classification Status">
//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie data={classification} cx="50%" cy="50%" outerRadius={80} dataKey="value">
//                 {classification.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="flex justify-around text-sm mt-2">
//             {classification.map((c, i) => (
//               <span key={i} style={{ color: COLORS[i] }}>
//                 ● {c.name}
//               </span>
//             ))}
//           </div>
//         </Card>

//         {/* Log Views */}
//         <Card title="Log Views">
//           <ul className="space-y-2">
//             {logViews.map((log, i) => (
//               <li key={i} className="flex justify-between items-center text-sm">
//                 <span>{log.name}</span>
//                 <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
//                   <div
//                     className="h-2 rounded"
//                     style={{
//                       width: `${log.value}%`,
//                       backgroundColor: theme.colors.accent,
//                     }}
//                   />
//                 </div>
//                 <span>{log.value}%</span>
//               </li>
//             ))}
//           </ul>
//         </Card>

//         {/* Train & Test */}
//         <Card title="Train & Test">
//           <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={testSenior}>
//               <XAxis dataKey="name" stroke={theme.colors.text} />
//               <YAxis stroke={theme.colors.text} />
//               <Tooltip />
//               <Bar dataKey="value" fill={theme.colors.primary} />
//             </BarChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Trending Graphs */}
//         <Card title="Trending Graphs">
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={trending}>
//               <XAxis dataKey="day" stroke={theme.colors.text} />
//               <YAxis stroke={theme.colors.text} />
//               <Tooltip />
//               <Line type="monotone" dataKey="count" stroke={theme.colors.accent} />
//             </LineChart>
//           </ResponsiveContainer>
//         </Card>

//         {/* Threat Intel Tags */}
//         <Card title="Threat Intel Tags">
//           <div className="flex flex-wrap gap-2">
//             {threatTags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="text-sm px-3 py-1 rounded-full"
//                 style={{
//                   backgroundColor: theme.colors.accent,
//                   color: "#fff",
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }











"use client"

import { useEffect, useState } from "react"
import axios from "../../api/axiosConfig"
import { Card } from "../../components/Layouts/Card"
import { BookOpen, CheckCircle, Award, Clock } from "lucide-react"

export default function DashboardUserMetrics() {
  const [metrics, setMetrics] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    certificates: 0,
    ongoingCourses: 0,
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("/dashboard/user")
        const payload = response.data?.data || response.data

        // Transform dashboard data to metrics format
        setMetrics({
          enrolledCourses: (payload.ongoing?.length || 0) + (payload.completed?.length || 0),
          ongoingCourses: payload.ongoing?.length || 0,
          completedCourses: payload.completed?.length || 0,
          certificates: payload.certificates?.length || 0,
        })
      } catch (error) {
        console.error("Error fetching metrics:", error)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Enrolled Courses - Highlight Card */}
      <Card className="md:col-span-2 bg-gradient-to-br from-[var(--card-bg)] to-blue-500/10 border-blue-500/20">
        <div className="flex items-center justify-between h-full py-2">
          <div>
            <p className="text-[var(--text-secondary)] text-sm font-medium uppercase tracking-wider">Total Enrolled Courses</p>
            <p className="text-6xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              {metrics.enrolledCourses}
            </p>
            <p className="mt-4 text-xs text-blue-400 font-semibold flex items-center gap-1">
              <span>View all courses</span>
              <span className="text-[10px]">→</span>
            </p>
          </div>
          <div className="p-6 bg-blue-500/10 rounded-2xl">
            <BookOpen className="text-blue-500" size={48} />
          </div>
        </div>
      </Card>

      {/* Ongoing Courses */}
      <Card className="md:col-span-1 border-yellow-500/20">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[var(--text-secondary)] text-sm font-medium">Ongoing</p>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="text-yellow-500" size={20} />
            </div>
          </div>
          <p className="text-5xl font-black mt-4 text-[var(--text-primary)]">{metrics.ongoingCourses}</p>
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full">
            <div className="bg-yellow-500 h-full rounded-full" style={{ width: '40%' }} />
          </div>
        </div>
      </Card>

      {/* Completed Courses */}
      <Card className="border-green-500/20">
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[var(--text-secondary)] text-sm font-medium">Completed</p>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="text-green-500" size={20} />
            </div>
          </div>
          <p className="text-5xl font-black mt-4 text-[var(--text-primary)]">{metrics.completedCourses}</p>
          <p className="mt-2 text-xs text-green-500 font-medium">Successfully finished</p>
        </div>
      </Card>

      {/* Certificates */}
      <Card className="md:col-span-2 border-purple-500/20 bg-gradient-to-br from-[var(--card-bg)] to-purple-500/5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[var(--text-secondary)] text-sm font-medium uppercase tracking-wider">Achievements</p>
            <div className="flex items-baseline gap-3 mt-2">
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                {metrics.certificates}
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">Certificates Earned</p>
            </div>
          </div>
          <div className="p-6 bg-purple-500/10 rounded-2xl">
            <Award className="text-purple-500" size={48} />
          </div>
        </div>
      </Card>
    </div>
  )
}

