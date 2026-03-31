// // // "use client"

// // // import { useState } from "react"
// // // import { motion } from "framer-motion"
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   CheckCircle,
// // //   Clock,
// // //   Award,
// // //   ListChecks,
// // //   PenTool,
// // //   Menu,
// // //   X,
// // // } from "lucide-react"

// // // import DashboardUserMetrics from "./DashboardUserMetrics"
// // // import CourseList from "./CourseList"
// // // import CompletedCourses from "./CompletedCourses"
// // // import OngoingCourses from "./OngoingCourses"
// // // import Certificates from "./Certificates"
// // // import UserAssignments from "./UserAssignments"
// // // import UserQuizzes from "./UserQuizzes"

// // // export default function DashboardUser() {
// // //   const [activePage, setActivePage] = useState("dashboard")
// // //   const [sidebarOpen, setSidebarOpen] = useState(true)

// // //   const renderContent = () => {
// // //     switch (activePage) {
// // //       case "courses":
// // //         return <CourseList />
// // //       case "completed":
// // //         return <CompletedCourses />
// // //       case "ongoing":
// // //         return <OngoingCourses />
// // //       case "certificates":
// // //         return <Certificates />
// // //       case "assignments":
// // //         return <UserAssignments />
// // //       case "quizzes":
// // //         return <UserQuizzes />
// // //       default:
// // //         return <DashboardUserMetrics />
// // //     }
// // //   }

// // //   const buttonVariants = {
// // //     hidden: { opacity: 0, x: -20 },
// // //     visible: (i) => ({
// // //       opacity: 1,
// // //       x: 0,
// // //       transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
// // //     }),
// // //     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
// // //   }

// // //   const sidebarItems = [
// // //     { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
// // //     { label: "Course List", icon: <BookOpen size={20} />, key: "courses" },
// // //     { label: "Completed", icon: <CheckCircle size={20} />, key: "completed" },
// // //     { label: "Ongoing", icon: <Clock size={20} />, key: "ongoing" },
// // //     { label: "Certificates", icon: <Award size={20} />, key: "certificates" },
// // //     { label: "Assignments", icon: <ListChecks size={20} />, key: "assignments" },
// // //     { label: "Quizzes", icon: <PenTool size={20} />, key: "quizzes" },
// // //   ]

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
// // //       <div className="flex min-h-screen text-white">
// // //         {/* Sidebar */}
// // //         <motion.div
// // //           animate={{ width: sidebarOpen ? 256 : 80 }}
// // //           transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //           className="bg-gradient-to-b from-purple-900 to-purple-800 flex flex-col shadow-2xl border-r border-purple-500/20"
// // //         >
// // //           {/* Sidebar Header */}
// // //           <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
// // //             <motion.h2
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //               exit={{ opacity: 0 }}
// // //               className={`text-xl font-bold transition-opacity duration-300 text-purple-100 ${sidebarOpen ? "" : "hidden"}`}
// // //             >
// // //               Learning Hub
// // //             </motion.h2>
// // //             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-purple-200 hover:text-white">
// // //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //             </button>
// // //           </div>

// // //           {/* Nav Items */}
// // //           <nav className="flex-1 p-2 space-y-2">
// // //             {sidebarItems.map((item, index) => (
// // //               <motion.div
// // //                 key={item.key}
// // //                 custom={index}
// // //                 initial="hidden"
// // //                 animate={sidebarOpen ? "visible" : "hidden"}
// // //                 exit="exit"
// // //                 variants={buttonVariants}
// // //               >
// // //                 <SidebarButton
// // //                   active={activePage === item.key}
// // //                   onClick={() => setActivePage(item.key)}
// // //                   icon={item.icon}
// // //                   label={item.label}
// // //                   sidebarOpen={sidebarOpen}
// // //                 />
// // //               </motion.div>
// // //             ))}
// // //           </nav>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 flex flex-col">
// // //           {/* Top Navbar */}
// // //           <header className="h-16 bg-purple-800/50 backdrop-blur-lg shadow-lg flex items-center px-6 justify-between border-b border-purple-500/20">
// // //             <h1 className="text-xl font-semibold tracking-wide text-purple-100">
// // //               {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
// // //             </h1>
// // //           </header>

// // //           {/* Content */}
// // //           <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* === Sidebar Button Component === */
// // // function SidebarButton({ active, onClick, icon, label, sidebarOpen }) {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
// // //         active
// // //           ? "bg-purple-600 text-white shadow-lg"
// // //           : "text-purple-200 hover:bg-purple-700/50 hover:text-white"
// // //       }`}
// // //     >
// // //       <span className="group-hover:scale-110 transition-transform">{icon}</span>
// // //       {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
// // //     </button>
// // //   )
// // // }







// // // "use client"

// // // import { useState } from "react"
// // // import { motion } from "framer-motion"
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   CheckCircle,
// // //   Clock,
// // //   Award,
// // //   ListChecks,
// // //   PenTool,
// // //   Menu,
// // //   X,
// // // } from "lucide-react"

// // // import Layout from "../../components/Layouts/Layouts"
// // // import { Card } from "../../components/Layouts/Card"
// // // import { useTheme } from "../../context/ThemeContext"

// // // import DashboardUserMetrics from "./DashboardUserMetrics"
// // // import CourseList from "./CourseList"
// // // import CompletedCourses from "./CompletedCourses"
// // // import OngoingCourses from "./OngoingCourses"
// // // import Certificates from "./Certificates"
// // // import UserAssignments from "./UserAssignments"
// // // import UserQuizzes from "./UserQuizzes"

// // // export default function DashboardUser() {
// // //   const { colors } = useTheme()
// // //   const [activePage, setActivePage] = useState("dashboard")
// // //   const [sidebarOpen, setSidebarOpen] = useState(true)

// // //   const renderContent = () => {
// // //     switch (activePage) {
// // //       case "courses":
// // //         return <CourseList />
// // //       case "completed":
// // //         return <CompletedCourses />
// // //       case "ongoing":
// // //         return <OngoingCourses />
// // //       case "certificates":
// // //         return <Certificates />
// // //       case "assignments":
// // //         return <UserAssignments />
// // //       case "quizzes":
// // //         return <UserQuizzes />
// // //       default:
// // //         return <DashboardUserMetrics />
// // //     }
// // //   }

// // //   const buttonVariants = {
// // //     hidden: { opacity: 0, x: -20 },
// // //     visible: (i) => ({
// // //       opacity: 1,
// // //       x: 0,
// // //       transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
// // //     }),
// // //     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
// // //   }

// // //   const sidebarItems = [
// // //     { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
// // //     { label: "Course List", icon: <BookOpen size={20} />, key: "courses" },
// // //     { label: "Completed", icon: <CheckCircle size={20} />, key: "completed" },
// // //     { label: "Ongoing", icon: <Clock size={20} />, key: "ongoing" },
// // //     { label: "Certificates", icon: <Award size={20} />, key: "certificates" },
// // //     { label: "Assignments", icon: <ListChecks size={20} />, key: "assignments" },
// // //     { label: "Quizzes", icon: <PenTool size={20} />, key: "quizzes" },
// // //   ]

// // //   return (
// // //     <Layout>
// // //       <div className="min-h-screen flex text-white bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
// // //         {/* Sidebar */}
// // //         <motion.div
// // //           animate={{ width: sidebarOpen ? 256 : 80 }}
// // //           transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //           className="bg-gradient-to-b from-purple-900 to-purple-800 flex flex-col shadow-2xl border-r border-purple-500/20"
// // //         >
// // //           {/* Sidebar Header */}
// // //           <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
// // //             <motion.h2
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //               exit={{ opacity: 0 }}
// // //               className={`text-xl font-bold transition-opacity duration-300 text-purple-100 ${sidebarOpen ? "" : "hidden"}`}
// // //             >
// // //               Learning Hub
// // //             </motion.h2>
// // //             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-purple-200 hover:text-white">
// // //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //             </button>
// // //           </div>

// // //           {/* Nav Items */}
// // //           <nav className="flex-1 p-2 space-y-2">
// // //             {sidebarItems.map((item, index) => (
// // //               <motion.div
// // //                 key={item.key}
// // //                 custom={index}
// // //                 initial="hidden"
// // //                 animate={sidebarOpen ? "visible" : "hidden"}
// // //                 exit="exit"
// // //                 variants={buttonVariants}
// // //               >
// // //                 <SidebarButton
// // //                   active={activePage === item.key}
// // //                   onClick={() => setActivePage(item.key)}
// // //                   icon={item.icon}
// // //                   label={item.label}
// // //                   sidebarOpen={sidebarOpen}
// // //                   accentColor={colors.accent}
// // //                 />
// // //               </motion.div>
// // //             ))}
// // //           </nav>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 flex flex-col">
// // //           {/* Top Navbar */}
// // //           <header className="h-16 bg-purple-800/50 backdrop-blur-lg shadow-lg flex items-center px-6 justify-between border-b border-purple-500/20">
// // //             <h1 className="text-xl font-semibold tracking-wide text-purple-100">
// // //               {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
// // //             </h1>
// // //           </header>

// // //           {/* Content */}
// // //           <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
// // //         </div>
// // //       </div>
// // //     </Layout>
// // //   )
// // // }

// // // /* === Sidebar Button Component === */
// // // function SidebarButton({ active, onClick, icon, label, sidebarOpen, accentColor }) {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
// // //         active
// // //           ? `bg-[${accentColor}] text-white shadow-lg`
// // //           : "text-purple-200 hover:bg-purple-700/50 hover:text-white"
// // //       }`}
// // //     >
// // //       <span className="group-hover:scale-110 transition-transform">{icon}</span>
// // //       {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
// // //     </button>
// // //   )
// // // }









// // // "use client";

// // // import { useState, memo } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   CheckCircle,
// // //   Clock,
// // //   Award,
// // //   ListChecks,
// // //   PenTool,
// // //   Menu,
// // //   X,
// // // } from "lucide-react";

// // // import { useTheme } from "../../context/ThemeContext";
// // // import ThemeBackground from "../../context/ThemeBackground";

// // // import DashboardUserMetrics from "./DashboardUserMetrics";
// // // import CourseList from "./CourseList";
// // // import CompletedCourses from "./CompletedCourses";
// // // import OngoingCourses from "./OngoingCourses";
// // // import Certificates from "./Certificates";
// // // import UserAssignments from "./UserAssignments";
// // // import UserQuizzes from "./UserQuizzes";

// // // export default function DashboardUser() {
// // //   const { colors } = useTheme();
// // //   const [activePage, setActivePage] = useState("dashboard");
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   const renderContent = () => {
// // //     switch (activePage) {
// // //       case "courses":
// // //         return <CourseList />;
// // //       case "completed":
// // //         return <CompletedCourses />;
// // //       case "ongoing":
// // //         return <OngoingCourses />;
// // //       case "certificates":
// // //         return <Certificates />;
// // //       case "assignments":
// // //         return <UserAssignments />;
// // //       case "quizzes":
// // //         return <UserQuizzes />;
// // //       default:
// // //         return <DashboardUserMetrics />;
// // //     }
// // //   };

// // //   const buttonVariants = {
// // //     hidden: { opacity: 0, x: -20 },
// // //     visible: (i) => ({
// // //       opacity: 1,
// // //       x: 0,
// // //       transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
// // //     }),
// // //     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
// // //   };

// // //   const sidebarItems = [
// // //     { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
// // //     { label: "Course List", icon: <BookOpen size={20} />, key: "courses" },
// // //     { label: "Completed", icon: <CheckCircle size={20} />, key: "completed" },
// // //     { label: "Ongoing", icon: <Clock size={20} />, key: "ongoing" },
// // //     { label: "Certificates", icon: <Award size={20} />, key: "certificates" },
// // //     { label: "Assignments", icon: <ListChecks size={20} />, key: "assignments" },
// // //     { label: "Quizzes", icon: <PenTool size={20} />, key: "quizzes" },
// // //   ];

// // //   return (
// // //     <ThemeBackground className="min-h-screen flex overflow-hidden text-white">
// // //       {/* Sidebar */}
// // //       <motion.aside
// // //         aria-label="User navigation"
// // //         animate={{ width: sidebarOpen ? 256 : 80 }}
// // //         transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //         className="bg-gradient-to-b from-purple-900 to-purple-800 flex flex-col shadow-2xl border-r border-purple-500/20 h-screen overflow-y-auto"
// // //       >
// // //         {/* Sidebar Header */}
// // //         <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
// // //           <motion.h2
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //             className={`text-xl font-bold transition-opacity duration-300 text-purple-100 ${
// // //               sidebarOpen ? "" : "hidden"
// // //             }`}
// // //           >
// // //             Learning Hub
// // //           </motion.h2>
// // //           <button
// // //             onClick={() => setSidebarOpen(!sidebarOpen)}
// // //             className="text-purple-200 hover:text-white"
// // //             aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
// // //           >
// // //             {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //           </button>
// // //         </div>

// // //         {/* Nav Items */}
// // //         <nav className="flex-1 p-2 space-y-2">
// // //           {sidebarItems.map((item, index) => (
// // //             <motion.div
// // //               key={item.key}
// // //               custom={index}
// // //               initial="hidden"
// // //               animate={sidebarOpen ? "visible" : "hidden"}
// // //               exit="exit"
// // //               variants={buttonVariants}
// // //             >
// // //               <SidebarButton
// // //                 active={activePage === item.key}
// // //                 onClick={() => setActivePage(item.key)}
// // //                 icon={item.icon}
// // //                 label={item.label}
// // //                 sidebarOpen={sidebarOpen}
// // //                 accentColor={colors.accent}
// // //               />
// // //             </motion.div>
// // //           ))}
// // //         </nav>
// // //       </motion.aside>

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex flex-col h-screen overflow-hidden">
// // //         {/* Top Navbar */}
// // //         <header className="h-16 bg-purple-800/50 backdrop-blur-lg shadow-lg flex items-center px-6 justify-between border-b border-purple-500/20">
// // //           <h1 className="text-xl font-semibold tracking-wide text-purple-100">
// // //             {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
// // //           </h1>
// // //         </header>

// // //         {/* Content */}
// // //         <main className="flex-1 overflow-y-auto p-6">
// // //           {renderContent()}
// // //         </main>
// // //       </div>
// // //     </ThemeBackground>
// // //   );
// // // }

// // // /* === Sidebar Button Component === */
// // // const SidebarButton = memo(function SidebarButton({
// // //   active,
// // //   onClick,
// // //   icon,
// // //   label,
// // //   sidebarOpen,
// // //   accentColor,
// // // }) {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`group flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
// // //         active
// // //           ? "text-white shadow-lg"
// // //           : "text-purple-200 hover:bg-purple-700/50 hover:text-white"
// // //       }`}
// // //       style={active ? { backgroundColor: accentColor } : undefined}
// // //       aria-current={active ? "page" : undefined}
// // //     >
// // //       <span className="transition-transform">{icon}</span>
// // //       {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
// // //     </button>
// // //   );
// // // });














// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   CheckCircle,
// // //   Clock,
// // //   Award,
// // //   ListChecks,
// // //   PenTool,
// // //   Menu,
// // //   X,
// // // } from "lucide-react";

// // // import { useTheme } from "../../context/ThemeContext";
// // // import ThemeBackground from "../../context/ThemeBackground";

// // // import DashboardUserMetrics from "./DashboardUserMetrics";
// // // import CourseList from "./CourseList";
// // // import CompletedCourses from "./CompletedCourses";
// // // import OngoingCourses from "./OngoingCourses";
// // // import Certificates from "./Certificates";
// // // import UserAssignments from "./UserAssignments";
// // // import UserQuizzes from "./UserQuizzes";

// // // export default function DashboardUser() {
// // //   const { colors } = useTheme();
// // //   const [activePage, setActivePage] = useState("dashboard");
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   const renderContent = () => {
// // //     switch (activePage) {
// // //       case "courses":
// // //         return <CourseList />;
// // //       case "completed":
// // //         return <CompletedCourses />;
// // //       case "ongoing":
// // //         return <OngoingCourses />;
// // //       case "certificates":
// // //         return <Certificates />;
// // //       case "assignments":
// // //         return <UserAssignments />;
// // //       case "quizzes":
// // //         return <UserQuizzes />;
// // //       default:
// // //         return <DashboardUserMetrics />;
// // //     }
// // //   };

// // //   const sidebarItems = [
// // //     { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
// // //     { label: "Course List", icon: <BookOpen size={20} />, key: "courses" },
// // //     { label: "Completed", icon: <CheckCircle size={20} />, key: "completed" },
// // //     { label: "Ongoing", icon: <Clock size={20} />, key: "ongoing" },
// // //     { label: "Certificates", icon: <Award size={20} />, key: "certificates" },
// // //     { label: "Assignments", icon: <ListChecks size={20} />, key: "assignments" },
// // //     { label: "Quizzes", icon: <PenTool size={20} />, key: "quizzes" },
// // //   ];

// // //   return (
// // //     <ThemeBackground className="h-screen flex text-white">
// // //       {/* Sidebar */}
// // //       <motion.div
// // //         animate={{ width: sidebarOpen ? 256 : 80 }}
// // //         transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //         className="bg-gradient-to-b from-purple-900 to-purple-800 flex flex-col shadow-2xl border-r border-purple-500/20 h-full"
// // //       >
// // //         {/* Sidebar Header */}
// // //         <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
// // //           {sidebarOpen && (
// // //             <motion.h2
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: 1 }}
// // //               className="text-xl font-bold text-purple-100"
// // //             >
// // //               Learning Hub
// // //             </motion.h2>
// // //           )}
// // //           <button
// // //             onClick={() => setSidebarOpen(!sidebarOpen)}
// // //             className="text-purple-200 hover:text-white"
// // //           >
// // //             {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //           </button>
// // //         </div>

// // //         {/* Sidebar Navigation */}
// // //         <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
// // //           {sidebarItems.map((item) => (
// // //             <SidebarButton
// // //               key={item.key}
// // //               active={activePage === item.key}
// // //               onClick={() => setActivePage(item.key)}
// // //               icon={item.icon}
// // //               label={item.label}
// // //               sidebarOpen={sidebarOpen}
// // //               accentColor={colors.accent}
// // //             />
// // //           ))}
// // //         </nav>
// // //       </motion.div>

// // //       {/* Main Content Area */}
// // //       <div className="flex-1 flex flex-col h-full">
// // //         {/* Header */}
// // //         <header className="h-14 bg-blue-600 flex items-center px-6 shadow-md border-b border-blue-500/30">
// // //           <h1 className="text-lg font-semibold text-white">
// // //             {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
// // //           </h1>
// // //         </header>

// // //         {/* Page Content */}
// // //         <main className="flex-1 overflow-y-auto px-6 py-4">
// // //           {renderContent()}
// // //         </main>
// // //       </div>
// // //     </ThemeBackground>
// // //   );
// // // }

// // // /* === Sidebar Button === */
// // // function SidebarButton({ active, onClick, icon, label, sidebarOpen, accentColor }) {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
// // //         active
// // //           ? "text-white shadow-lg"
// // //           : "text-purple-200 hover:bg-purple-700/50 hover:text-white"
// // //       }`}
// // //       style={active ? { backgroundColor: accentColor } : undefined}
// // //     >
// // //       {icon}
// // //       {sidebarOpen && (
// // //         <motion.span
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //           className="ml-3 font-medium"
// // //         >
// // //           {label}
// // //         </motion.span>
// // //       )}
// // //     </button>
// // //   );
// // // }





// // // /pages/dashboard/DashboardUser.js
// // "use client";

// // import { useState } from "react";
// // import { LayoutDashboard, BookOpen, CheckCircle, Clock, Award, ListChecks, PenTool } from "lucide-react";
// // import UserLayout from "../../components/Layouts/UserLayout";

// // import DashboardUserMetrics from "./DashboardUserMetrics";
// // import CourseList from "./CourseList";
// // import CompletedCourses from "./CompletedCourses";
// // import OngoingCourses from "./OngoingCourses";
// // import Certificates from "./Certificates";
// // import UserAssignments from "./UserAssignments";
// // import UserQuizzes from "./UserQuizzes";

// // export default function DashboardUser() {
// //   const [activePage, setActivePage] = useState("dashboard");

// //   const sidebarItems = [
// //     {
// //       key: "dashboard",
// //       label: "Dashboard",
// //       children: [
// //         { key: "dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
// //       ],
// //     },
// //     {
// //       key: "learning",
// //       label: "Learning",
// //       children: [
// //         { key: "courses", label: "Courses", icon: <BookOpen size={18} /> },
// //         { key: "completed", label: "Completed", icon: <CheckCircle size={18} /> },
// //         { key: "ongoing", label: "Ongoing", icon: <Clock size={18} /> },
// //         { key: "certificates", label: "Certificates", icon: <Award size={18} /> },
// //         { key: "assignments", label: "Assignments", icon: <ListChecks size={18} /> },
// //         { key: "quizzes", label: "Quizzes", icon: <PenTool size={18} /> },
// //       ],
// //     },
// //   ];

// //   const renderContent = () => {
// //     switch (activePage) {
// //       case "courses": return <CourseList />;
// //       case "completed": return <CompletedCourses />;
// //       case "ongoing": return <OngoingCourses />;
// //       case "certificates": return <Certificates />;
// //       case "assignments": return <UserAssignments />;
// //       case "quizzes": return <UserQuizzes />;
// //       default: return <DashboardUserMetrics />;
// //     }
// //   };

// //   return (
// //     <UserLayout activePage={activePage} setActivePage={setActivePage} menuItems={sidebarItems}>
// //       {renderContent()}
// //     </UserLayout>
// //   );
// // }










// // /pages/dashboard/DashboardUser.js
// "use client";

// import { useState, useContext, useEffect } from "react";
// import { LayoutDashboard, BookOpen, CheckCircle, Clock, Award, ListChecks, PenTool } from "lucide-react";
// import UserLayout from "../../components/Layouts/UserLayout";
// import { AuthContext } from "../../context/AuthContext"; // Assuming you need user context for IDs
// import axios from "axios"; // Needed to fetch initial course data if required
// import { toast } from "react-toastify";

// import DashboardUserMetrics from "./DashboardUserMetrics";
// import CourseList from "./CourseList";
// import CompletedCourses from "./CompletedCourses";
// import OngoingCourses from "./OngoingCourses";
// import Certificates from "./Certificates";
// import UserAssignments from "./UserAssignments";
// import UserQuizzes from "./UserQuizzes";
// import { usePageRefreshRecovery } from "../../hooks/usePageRefreshRecovery"



// const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; // Assuming API URL

// export default function DashboardUser() {
//   const { user } = useContext(AuthContext); // Get user for ID if needed
//   const [activePage, setActivePage] = useState("dashboard");

//   // 🌟 FIX 1: State to manage the ID of the course currently selected for detail views (e.g., quizzes)
//   const [selectedCourseId, setSelectedCourseId] = useState(null); 

//   // Optional: State to store the actual list of ongoing courses
//   const [userCourses, setUserCourses] = useState([]);
//   const [loadingCourses, setLoadingCourses] = useState(true);


//    const sessionMgr = usePageRefreshRecovery()

//   useEffect(() => {
//     // Update session on component mount
//     sessionMgr.updateCurrentPage("/user/dashboard", {
//       section: "overview",
//     })
//   }, [sessionMgr])
//   // --- Course Selection Handler ---
//   // 🌟 FIX 2: Function to be passed to course list components (like OngoingCourses)
//   const handleCourseSelectForDetailView = (courseId, detailPage) => {
//       setSelectedCourseId(courseId);
//       setActivePage(detailPage); // Change the view to 'quizzes' or 'assignments'
//   };

//   // --- Initial Data Fetching (Optional but recommended to populate the course list) ---
//   useEffect(() => {
//     const fetchUserCourses = async () => {
//       if (!user) {
//         setLoadingCourses(false);
//         return;
//       }
//       try {
//         // Assuming this endpoint returns the list of enrolled courses with their courseId
//         const res = await axios.get(`${API}/enrollments/user/ongoing`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setUserCourses(res.data);
//       } catch (error) {
//         toast.error("Failed to load your enrolled courses.");
//         console.error("Error fetching user courses:", error);
//       } finally {
//         setLoadingCourses(false);
//       }
//     };

//     fetchUserCourses();
//   }, [user]);

//   // --- Sidebar Menu Structure ---
//   const sidebarItems = [
//     {
//       key: "dashboard",
//       label: "Dashboard",
//       children: [
//         { key: "dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
//       ],
//     },
//     {
//       key: "learning",
//       label: "Learning",
//       children: [
//         { key: "courses", label: "Courses", icon: <BookOpen size={18} /> },
//         { key: "completed", label: "Completed", icon: <CheckCircle size={18} /> },
//         { key: "ongoing", label: "Ongoing", icon: <Clock size={18} /> },
//         { key: "certificates", label: "Certificates", icon: <Award size={18} /> },

//         // These will now require selecting a course first, or we render a default list/prompt
//         { key: "assignments", label: "Assignments", icon: <ListChecks size={18} /> },
//         { key: "quizzes", label: "Quizzes", icon: <PenTool size={18} /> },
//       ],
//     },
//   ];

//   // --- Content Rendering Logic ---
//   const renderContent = () => {
//     const userId = user?._id; // Ensure you get the correct MongoDB user ID

//     switch (activePage) {
//       case "courses": return <CourseList />;
//       case "completed": return <CompletedCourses />;

//       // 🌟 UPDATED: Pass the course list and the selection handler
//       case "ongoing": return (
//         <OngoingCourses 
//             courses={userCourses} 
//             loading={loadingCourses} 
//             onSelectCourseForQuizzes={(courseId) => handleCourseSelectForDetailView(courseId, 'quizzes')}
//             onSelectCourseForAssignments={(courseId) => handleCourseSelectForDetailView(courseId, 'assignments')}
//         />
//       );

//       case "certificates": return <Certificates />;

//       // 🌟 FIX 3: Conditionally render UserQuizzes/UserAssignments only if a course is selected
//       case "assignments":
//         if (!selectedCourseId) {
//             // Render the ongoing list again or a prompt to select a course
//             return (
//                 <div className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Assignments</h2>
//                     <p className="p-4 bg-yellow-50 rounded text-yellow-800">
//                         Please go to "Ongoing" courses and select a course to view its assignments.
//                     </p>
//                     <OngoingCourses 
//                         courses={userCourses} 
//                         loading={loadingCourses} 
//                         onSelectCourseForAssignments={(courseId) => handleCourseSelectForDetailView(courseId, 'assignments')}
//                     />
//                 </div>
//             );
//         }
//         return <UserAssignments userId={userId} courseId={selectedCourseId} />;

//       case "quizzes":
//         if (!selectedCourseId) {
//             // Render the ongoing list again or a prompt to select a course
//             return (
//                 <div className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">Quizzes</h2>
//                     <p className="p-4 bg-yellow-50 rounded text-yellow-800">
//                         Please go to "Ongoing" courses and select a course to view its quizzes.
//                     </p>
//                     <OngoingCourses 
//                         courses={userCourses} 
//                         loading={loadingCourses} 
//                         onSelectCourseForQuizzes={(courseId) => handleCourseSelectForDetailView(courseId, 'quizzes')}
//                     />
//                 </div>
//             );
//         }
//         return <UserQuizzes userId={userId} courseId={selectedCourseId} />;

//       default: return <DashboardUserMetrics />;
//     }
//   };

//   return (
//     <UserLayout activePage={activePage} setActivePage={setActivePage} menuItems={sidebarItems}>
//       {renderContent()}
//     </UserLayout>
//   );
// }







"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, BookOpen, CheckCircle, Clock, Award, ListChecks, PenTool } from "lucide-react"
import UserLayout from '../../components/Layouts/UserLayout'
import { usePageRefreshRecovery } from '../../hooks/usePageRefreshRecovery'

import DashboardUserMetrics from "./DashboardUserMetrics"
import CourseList from "./CourseList"
import CompletedCourses from "./CompletedCourses"
import OngoingCourses from "./OngoingCourses"
import Certificates from "./Certificates"
import UserAssignments from "./UserAssignments"
import UserQuizzes from "./UserQuizzes"

export default function DashboardUser() {
  const [activePage, setActivePage] = useState("dashboard")
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  
  // Optional: State to store the actual list of ongoing courses
  const [userCourses] = useState([])
  const [loadingCourses] = useState(false)

  const sessionMgr = usePageRefreshRecovery()

  useEffect(() => {
    sessionMgr.updateCurrentPage("/dashboard", { section: "overview" })
  }, [sessionMgr])

  const handleCourseSelectForDetailView = (courseId, detailPage) => {
    setSelectedCourseId(courseId)
    setActivePage(detailPage)
  }

  const sidebarItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      children: [{ key: "dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> }],
    },
    {
      key: "learning",
      label: "Learning",
      children: [
        { key: "courses", label: "Courses", icon: <BookOpen size={18} /> },
        { key: "completed", label: "Completed", icon: <CheckCircle size={18} /> },
        { key: "ongoing", label: "Ongoing", icon: <Clock size={18} /> },
        { key: "certificates", label: "Certificates", icon: <Award size={18} /> },
        { key: "assignments", label: "Assignments", icon: <ListChecks size={18} /> },
        { key: "quizzes", label: "Quizzes", icon: <PenTool size={18} /> },
      ],
    },
  ]

  const renderContent = () => {
    switch (activePage) {
      case "courses":
        return <CourseList />
      case "completed":
        return <CompletedCourses />
      case "ongoing":
        return (
          <OngoingCourses
            courses={userCourses}
            loading={loadingCourses}
            onSelectCourseForQuizzes={(courseId) => handleCourseSelectForDetailView(courseId, "quizzes")}
            onSelectCourseForAssignments={(courseId) => handleCourseSelectForDetailView(courseId, "assignments")}
          />
        )
      case "certificates":
        return <Certificates />
      case "assignments":
        // Allow viewing all assignments or course-specific assignments
        return <UserAssignments courseId={selectedCourseId} />
      case "quizzes":
        return <UserQuizzes courseId={selectedCourseId} />
      default:
        return <DashboardUserMetrics />
    }
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    setSelectedCourseId(null)
  }

  return (
    <UserLayout activePage={activePage} setActivePage={handlePageChange} menuItems={sidebarItems}>
      {renderContent()}
    </UserLayout>
  )
}
