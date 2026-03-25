// // // //client/src/components/Layouts/AdminLayout.js

// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
// // // import ThemeBackground from "../../context/ThemeBackground";

// // // export default function UserLayout({ children, activePage, setActivePage, menuItems }) {
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // //   const [expanded, setExpanded] = useState({});

// // //   const toggleExpand = (key) => {
// // //     setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
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

// // //   return (
// // //     <ThemeBackground className="min-h-screen">
// // //       <div className="flex min-h-screen text-white">
// // //         {/* Sidebar */}
// // //         <motion.div
// // //           animate={{ width: sidebarOpen ? 256 : 80 }}
// // //           transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //           className="bg-gradient-to-b from-blue-600 to-blue-500 flex flex-col shadow-2xl border-r border-blue-400/30"
// // //         >
// // //           {/* Sidebar Header */}
// // //           <div className="flex items-center justify-between p-4 border-b border-blue-400/40">
// // //             <motion.h2
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //               exit={{ opacity: 0 }}
// // //               className={`text-xl font-bold transition-opacity duration-300 text-blue-50 ${
// // //                 sidebarOpen ? "" : "hidden"
// // //               }`}
// // //             >
// // //               Learning Hub
// // //             </motion.h2>
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="text-blue-200 hover:text-white"
// // //             >
// // //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //             </button>
// // //           </div>

// // //           {/* Sidebar Navigation */}
// // //           <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
// // //             {menuItems.map((item, index) => (
// // //               <motion.div
// // //                 key={item.key}
// // //                 custom={index}
// // //                 initial="hidden"
// // //                 animate={sidebarOpen ? "visible" : "hidden"}
// // //                 exit="exit"
// // //                 variants={buttonVariants}
// // //               >
// // //                 {item.children ? (
// // //                   <SidebarGroup
// // //                     item={item}
// // //                     activePage={activePage}
// // //                     setActivePage={setActivePage}
// // //                     sidebarOpen={sidebarOpen}
// // //                     expanded={expanded}
// // //                     toggleExpand={toggleExpand}
// // //                   />
// // //                 ) : (
// // //                   <SidebarButton
// // //                     active={activePage === item.key}
// // //                     onClick={() => setActivePage(item.key)}
// // //                     icon={item.icon}
// // //                     label={item.label}
// // //                     sidebarOpen={sidebarOpen}
// // //                   />
// // //                 )}
// // //               </motion.div>
// // //             ))}
// // //           </nav>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 flex flex-col">
// // //           {/* Header */}
// // //           <header className="h-14 bg-blue-600 flex items-center px-6 shadow-md border-b border-blue-400/40">
// // //             <h1 className="text-lg font-semibold text-white">
// // //               {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
// // //             </h1>
// // //           </header>

// // //           {/* Page Content */}
// // //           <main className="flex-1 overflow-y-auto p-6">{children}</main>
// // //         </div>
// // //       </div>
// // //     </ThemeBackground>
// // //   );
// // // }

// // // /* Sidebar Button */
// // // function SidebarButton({ active, onClick, icon, label, sidebarOpen }) {
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`flex items-center ${
// // //         sidebarOpen ? "justify-start px-4" : "justify-center px-0"
// // //       } w-full py-3 rounded-lg transition-all duration-200 ${
// // //         active
// // //           ? "bg-blue-500 text-white shadow-lg"
// // //           : "text-blue-100 hover:bg-blue-400/60 hover:text-white"
// // //       }`}
// // //     >
// // //       <span>{icon}</span>
// // //       {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
// // //     </button>
// // //   );
// // // }

// // // /* Sidebar Group */
// // // function SidebarGroup({ item, activePage, setActivePage, sidebarOpen, expanded, toggleExpand }) {
// // //   const isExpanded = expanded[item.key];
// // //   const isActiveGroup = item.children?.some((c) => c.key === activePage);

// // //   return (
// // //     <div>
// // //       <button
// // //         onClick={() => toggleExpand(item.key)}
// // //         className={`flex items-center justify-between w-full ${
// // //           sidebarOpen ? "px-4" : "px-0 justify-center"
// // //         } py-3 rounded-lg font-medium transition-all duration-200 ${
// // //           isActiveGroup
// // //             ? "bg-blue-500 text-white shadow-lg"
// // //             : "text-blue-100 hover:bg-blue-400/60 hover:text-white"
// // //         }`}
// // //       >
// // //         {sidebarOpen && <span>{item.label}</span>}
// // //         {sidebarOpen && (isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
// // //       </button>

// // //       {isExpanded && sidebarOpen && (
// // //         <div className="ml-4 mt-1 space-y-1">
// // //           {item.children.map((child) => (
// // //             <button
// // //               key={child.key}
// // //               onClick={() => setActivePage(child.key)}
// // //               className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
// // //                 activePage === child.key
// // //                   ? "bg-blue-400 text-white shadow"
// // //                   : "text-blue-100 hover:bg-blue-300/70 hover:text-white"
// // //               }`}
// // //             >
// // //               {child.label}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


















// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { Menu, X } from "lucide-react";
// // // import ThemeBackground from "../../context/ThemeBackground";
// // // import SidebarButton from "./SidebarButton";
// // // import SidebarGroup from "./SidebarGroup";

// // // export default function AdminLayout({ children, activePage, setActivePage, menuItems }) {
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // //   const [expanded, setExpanded] = useState({});

// // //   const toggleExpand = (key) => {
// // //     setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
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

// // //   return (
// // //     <ThemeBackground className="min-h-screen bg-[#F5F0F0] text-white">
// // //       <div className="flex min-h-screen">
// // //         {/* Sidebar */}
// // //         <motion.div
// // //           animate={{ width: sidebarOpen ? 256 : 80 }}
// // //           transition={{ type: "spring", stiffness: 200, damping: 30 }}
// // //           className="bg-gradient-to-b from-blue-600 to-blue-500 flex flex-col shadow-2xl border-r border-blue-400/30"
// // //         >
// // //           <div className="flex items-center justify-between p-4 border-b border-blue-400/40">
// // //             <motion.h2
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: sidebarOpen ? 1 : 0 }}
// // //               exit={{ opacity: 0 }}
// // //               className={`text-xl font-bold transition-opacity duration-300 text-blue-50 ${
// // //                 sidebarOpen ? "" : "hidden"
// // //               }`}
// // //             >
// // //               Learning Hub
// // //             </motion.h2>
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="text-blue-200 hover:text-white"
// // //             >
// // //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// // //             </button>
// // //           </div>

// // //           <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
// // //             {menuItems.map((item, index) => (
// // //               <motion.div
// // //                 key={item.key}
// // //                 custom={index}
// // //                 initial="hidden"
// // //                 animate={sidebarOpen ? "visible" : "hidden"}
// // //                 exit="exit"
// // //                 variants={buttonVariants}
// // //               >
// // //                 {item.children ? (
// // //                   <SidebarGroup
// // //                     item={item}
// // //                     activePage={activePage}
// // //                     setActivePage={setActivePage}
// // //                     sidebarOpen={sidebarOpen}
// // //                     expanded={expanded}
// // //                     toggleExpand={toggleExpand}
// // //                   />
// // //                 ) : (
// // //                   <SidebarButton
// // //                     active={activePage === item.key}
// // //                     onClick={() => setActivePage(item.key)}
// // //                     icon={item.icon}
// // //                     label={item.label}
// // //                     sidebarOpen={sidebarOpen}
// // //                   />
// // //                 )}
// // //               </motion.div>
// // //             ))}
// // //           </nav>
// // //         </motion.div>

// // //         {/* Main Content */}
// // //         <main className="flex-1 overflow-y-auto p-6 bg-[#F5F0F0]">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </ThemeBackground>
// // //   );
// // // }













// // "use client";

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
// // import ThemeBackground from "../../context/ThemeBackground";

// // export default function AdminLayout({ children, activePage, setActivePage, menuItems }) {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [expanded, setExpanded] = useState({});

// //   const toggleExpand = (key) => {
// //     setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
// //   };

// //   const buttonVariants = {
// //     hidden: { opacity: 0, x: -20 },
// //     visible: (i) => ({
// //       opacity: 1,
// //       x: 0,
// //       transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
// //     }),
// //     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
// //   };

// //   return (
// //     <ThemeBackground className="min-h-screen text-white">
// //       <div className="flex min-h-screen">
// //         {/* Sidebar */}
// //         <motion.div
// //           animate={{ width: sidebarOpen ? 256 : 80 }}
// //           transition={{ type: "spring", stiffness: 200, damping: 30 }}
// //           className="bg-blue-800 flex flex-col shadow-2xl border-r border-blue-600/30"
// //         >
// //           {/* Sidebar Header */}
// //           <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
// //             <motion.h2
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: sidebarOpen ? 1 : 0 }}
// //               exit={{ opacity: 0 }}
// //               className={`text-xl font-bold transition-opacity duration-300 text-blue-50 ${
// //                 sidebarOpen ? "" : "hidden"
// //               }`}
// //             >
// //               Learning Hub
// //             </motion.h2>
// //             <button
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="text-blue-200 hover:text-white"
// //             >
// //               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
// //             </button>
// //           </div>

// //           {/* Sidebar Navigation */}
// //           <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
// //             {menuItems.map((item, index) => (
// //               <motion.div
// //                 key={item.key}
// //                 custom={index}
// //                 initial="hidden"
// //                 animate={sidebarOpen ? "visible" : "hidden"}
// //                 exit="exit"
// //                 variants={buttonVariants}
// //               >
// //                 {item.children ? (
// //                   <SidebarGroup
// //                     item={item}
// //                     activePage={activePage}
// //                     setActivePage={setActivePage}
// //                     sidebarOpen={sidebarOpen}
// //                     expanded={expanded}
// //                     toggleExpand={toggleExpand}
// //                   />
// //                 ) : (
// //                   <SidebarButton
// //                     active={activePage === item.key}
// //                     onClick={() => setActivePage(item.key)}
// //                     icon={item.icon}
// //                     label={item.label}
// //                     sidebarOpen={sidebarOpen}
// //                   />
// //                 )}
// //               </motion.div>
// //             ))}
// //           </nav>
// //         </motion.div>

// //         {/* Main Content */}
// //      <main className="flex-1 overflow-y-auto py-6">


// //           {children}
// //         </main>
// //       </div>
// //     </ThemeBackground>
// //   );
// // }

// // function SidebarButton({ active, onClick, icon, label, sidebarOpen }) {
// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
// //         active ? "bg-blue-700 text-white" : "text-blue-200 hover:bg-blue-700/50 hover:text-white"
// //       }`}
// //     >
// //       <span className="mr-2">{icon}</span>
// //       {sidebarOpen && <span className="font-medium">{label}</span>}
// //     </button>
// //   );
// // }

// // function SidebarGroup({ item, activePage, setActivePage, sidebarOpen, expanded, toggleExpand }) {
// //   const isOpen = expanded[item.key];

// //   return (
// //     <div>
// //       <button
// //         onClick={() => toggleExpand(item.key)}
// //         className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-blue-200 hover:bg-blue-700/50 hover:text-white`}
// //       >
// //         <span className="flex items-center">
// //           {item.icon && <span className="mr-2">{item.icon}</span>}
// //           {sidebarOpen && <span className="font-medium">{item.label}</span>}
// //         </span>
// //         {sidebarOpen && (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
// //       </button>

// //       {isOpen && sidebarOpen && (
// //         <div className="ml-4 mt-1 space-y-1">
// //           {item.children.map((child) => (
// //             <SidebarButton
// //               key={child.key}
// //               active={activePage === child.key}
// //               onClick={() => setActivePage(child.key)}
// //               icon={child.icon}
// //               label={child.label}
// //               sidebarOpen={sidebarOpen}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }












// //client/src/components/Layouts/AdminLayout.js


// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
// import ThemeBackground from "../../context/ThemeBackground";
// // import Navbar from "./Navbar"; // ✅ Import your Navbar

// export default function AdminLayout({ children, activePage, setActivePage, menuItems }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [expanded, setExpanded] = useState({});
//   // const user = JSON.parse(localStorage.getItem("user") || "{}"); // ✅ Get user for Navbar

//   const toggleExpand = (key) => {
//     setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: { delay: i * 0.05, type: "spring", stiffness: 300 },
//     }),
//     exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
//   };

//   return (
//     <ThemeBackground className="min-h-screen text-white">
//       {/* ✅ Navbar at the top */}
//       {/* <Navbar user={user} /> */}

//       <div className="flex h-[calc(100vh-72px)] min-h-[calc(100vh-72px)]">
//         {/* Sidebar */}
//         <motion.div
//           animate={{ width: sidebarOpen ? 200 : 64 }}
//           transition={{ type: "spring", stiffness: 200, damping: 30 }}
//           className="h-full bg-blue-800 flex flex-col shadow-2xl border-r border-blue-600/30"
//         >
//           {/* Sidebar Header */}
//           <div className="flex items-center justify-between p-4 border-b border-blue-500/30">
//             <motion.h2
//               initial={{ opacity: 0 }}
//               animate={{ opacity: sidebarOpen ? 1 : 0 }}
//               exit={{ opacity: 0 }}
//               className={`text-xl font-bold transition-opacity duration-300 text-blue-50 ${
//                 sidebarOpen ? "" : "hidden"
//               }`}
//             >
//               Learning Hub
//             </motion.h2>
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="text-blue-200 hover:text-white"
//             >
//               {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>

//           {/* Sidebar Navigation */}
//           <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
//             {menuItems.map((item, index) => (
//               <motion.div
//                 key={item.key}
//                 custom={index}
//                 initial="hidden"
//                 animate={sidebarOpen ? "visible" : "hidden"}
//                 exit="exit"
//                 variants={buttonVariants}
//               >
//                 {item.children ? (
//                   <SidebarGroup
//                     item={item}
//                     activePage={activePage}
//                     setActivePage={setActivePage}
//                     sidebarOpen={sidebarOpen}
//                     expanded={expanded}
//                     toggleExpand={toggleExpand}
//                   />
//                 ) : (
//                   <SidebarButton
//                     active={activePage === item.key}
//                     onClick={() => setActivePage(item.key)}
//                     icon={item.icon}
//                     label={item.label}
//                     sidebarOpen={sidebarOpen}
//                   />
//                 )}
//               </motion.div>
//             ))}
//           </nav>
//         </motion.div>

//         {/* Main Content */}
//         {/* <main className="flex-1 overflow-y-auto py-6"> */}
//         <main className="w-screen h-screen overflow-y-auto py-6">
//           {children}
//         </main>
//       </div>
//     </ThemeBackground>
//   );
// }

// function SidebarButton({ active, onClick, icon, label, sidebarOpen }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
//         active ? "bg-blue-700 text-white" : "text-blue-200 hover:bg-blue-700/50 hover:text-white"
//       }`}
//     >
//       <span className="mr-2">{icon}</span>
//       {sidebarOpen && <span className="font-medium">{label}</span>}
//     </button>
//   );
// }

// function SidebarGroup({ item, activePage, setActivePage, sidebarOpen, expanded, toggleExpand }) {
//   const isOpen = expanded[item.key];

//   return (
//     <div>
//       <button
//         onClick={() => toggleExpand(item.key)}
//         className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-blue-200 hover:bg-blue-700/50 hover:text-white`}
//       >
//         <span className="flex items-center">
//           {item.icon && <span className="mr-2">{item.icon}</span>}
//           {sidebarOpen && <span className="font-medium">{item.label}</span>}
//         </span>
//         {sidebarOpen && (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
//       </button>

//       {isOpen && sidebarOpen && (
//         <div className="ml-4 mt-1 space-y-1">
//           {item.children.map((child) => (
//             <SidebarButton
//               key={child.key}
//               active={activePage === child.key}
//               onClick={() => setActivePage(child.key)}
//               icon={child.icon}
//               label={child.label}
//               sidebarOpen={sidebarOpen}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








"use client"

import React, { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "../../components/Layouts/Button"


export default function AdminLayout({ children, activePage, setActivePage, menuItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    window.location.href = "/auth/login"
  }

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-[var(--purple-800)] to-[var(--purple-900)] text-white transition-all duration-300 flex flex-col shadow-2xl border-r border-white/5 z-20`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10 min-h-[64px]">
          {sidebarOpen && <h1 className="text-lg font-bold tracking-tight">Admin Console</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((section) => (
            <div key={section.key} className="py-2">
              {section.children ? (
                <>
                  {sidebarOpen && (
                    <p className="text-[10px] font-bold text-purple-300/60 px-4 mb-2 uppercase tracking-widest">{section.label}</p>
                  )}
                  {section.children.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActivePage(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                        activePage === item.key 
                        ? "bg-[var(--accent-purple)] text-white shadow-lg shadow-purple-600/20" 
                        : "hover:bg-white/5 text-purple-100/70 hover:text-white"
                      }`}
                    >
                      {item.icon && <span className={`${activePage === item.key ? "text-white" : "text-purple-400 group-hover:text-white"}`}>{item.icon}</span>}
                      {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                    </button>
                  ))}
                </>
              ) : (
                <button
                  onClick={() => setActivePage(section.key)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                    activePage === section.key 
                    ? "bg-[var(--accent-purple)] text-white shadow-lg shadow-purple-600/20" 
                    : "hover:bg-white/5 text-purple-100/70 hover:text-white"
                  }`}
                >
                  {section.icon && <span className={`${activePage === section.key ? "text-white" : "text-purple-400 group-hover:text-white"}`}>{section.icon}</span>}
                  {sidebarOpen && <span className="font-medium text-sm">{section.label}</span>}
                </button>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 mb-2">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-white border-white/20 hover:bg-red-500/20 hover:border-red-500/50 bg-transparent flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[var(--bg-secondary)] border-b border-[var(--card-border)] py-4 px-8 flex items-center justify-between shadow-sm z-10 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-[var(--accent-purple)] rounded-full" />
            <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight uppercase">
              {activePage.replace(/_/g, ' ')}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
            <span className="opacity-50">Admin</span>
            <span>/</span>
            <span className="text-[var(--accent-purple)] capitalize">{activePage}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 pt-2 bg-[var(--bg-primary)] custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
