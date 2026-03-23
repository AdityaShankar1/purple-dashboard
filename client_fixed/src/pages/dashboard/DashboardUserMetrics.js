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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Enrolled Courses</p>
            <p className="text-3xl font-bold mt-2">{metrics.enrolledCourses}</p>
          </div>
          <BookOpen className="text-blue-500" size={32} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Ongoing Courses</p>
            <p className="text-3xl font-bold mt-2">{metrics.ongoingCourses}</p>
          </div>
          <Clock className="text-yellow-500" size={32} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Completed Courses</p>
            <p className="text-3xl font-bold mt-2">{metrics.completedCourses}</p>
          </div>
          <CheckCircle className="text-green-500" size={32} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Certificates</p>
            <p className="text-3xl font-bold mt-2">{metrics.certificates}</p>
          </div>
          <Award className="text-purple-500" size={32} />
        </div>
      </Card>
    </div>
  )
}
