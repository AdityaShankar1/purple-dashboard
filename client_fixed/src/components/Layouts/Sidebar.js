// // // //client/src/components/Layouts/Sidebar.js


// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   Users,
// // //   Award,
// // //   Bell,
// // //   ChevronLeft,
// // //   ChevronRight,
// // // } from "lucide-react";

// // // export default function Sidebar() {
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const user = JSON.parse(localStorage.getItem("user") || "{}");

// // //   const menuItems =
// // //     user.role === "admin"
// // //       ? [
// // //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
// // //           { icon: <BookOpen size={20} />, label: "Manage Courses", href: "/admin/courses" },
// // //           { icon: <Users size={20} />, label: "Monitor Users", href: "/admin/monitoring-users" },
// // //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// // //         ]
// // //       : [
// // //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/user" },
// // //           { icon: <BookOpen size={20} />, label: "Courses", href: "/user/courses" },
// // //           { icon: <Award size={20} />, label: "Certificates", href: "/user/certificates" },
// // //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// // //         ];

// // //   return (
// // //     <motion.div
// // //       animate={{ width: isCollapsed ? 80 : 280 }}
// // //       transition={{ duration: 0.3, ease: "easeInOut" }}
// // //       className="bg-gradient-to-b from-blue-900 to-blue-800 h-screen shadow-2xl border-r border-blue-500/20"
// // //     >
// // //       <div className="flex flex-col h-full">
// // //         {/* Header */}
// // //         <div className="p-2 border-b border-blue-500/20">
// // //           <div className="flex items-center justify-end">
// // //             <button
// // //               onClick={() => setIsCollapsed(!isCollapsed)}
// // //               className="text-blue-400 hover:text-blue-200 transition-colors p-1"
// // //             >
// // //               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Navigation */}
// // //         <nav className="flex-1 p-2">
// // //           <ul className="space-y-2">
// // //             {menuItems.map((item, index) => (
// // //               <motion.li
// // //                 key={item.label}
// // //                 initial={{ opacity: 0, x: -20 }}
// // //                 animate={{ opacity: 1, x: 0 }}
// // //                 transition={{ delay: index * 0.1 }}
// // //               >
// // //                 <a
// // //                   href={item.href}
// // //                   className="flex items-center px-3 py-3 rounded-lg text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-200 group"
// // //                 >
// // //                   <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
// // //                   {!isCollapsed && (
// // //                     <span className="font-medium ml-2">{item.label}</span>
// // //                   )}
// // //                 </a>
// // //               </motion.li>
// // //             ))}
// // //           </ul>
// // //         </nav>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }






















// // // "use client";

// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import {
// // //   LayoutDashboard,
// // //   BookOpen,
// // //   Users,
// // //   Award,
// // //   Bell,
// // //   ChevronLeft,
// // //   ChevronRight,
// // // } from "lucide-react";

// // // export default function Sidebar() {
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const user = JSON.parse(localStorage.getItem("user") || "{}");

// // //   const menuItems =
// // //     user.role === "admin"
// // //       ? [
// // //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
// // //           { icon: <BookOpen size={20} />, label: "Manage Courses", href: "/admin/courses" },
// // //           { icon: <Users size={20} />, label: "Monitor Users", href: "/admin/monitoring-users" },
// // //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// // //         ]
// // //       : [
// // //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/user" },
// // //           { icon: <BookOpen size={20} />, label: "Courses", href: "/user/courses" },
// // //           { icon: <Award size={20} />, label: "Certificates", href: "/user/certificates" },
// // //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// // //         ];

// // //   return (
// // //     <motion.div
// // //       animate={{ width: isCollapsed ? 80 : 280 }}
// // //       transition={{ duration: 0.3, ease: "easeInOut" }}
// // //       className="bg-gradient-to-b from-blue-700 to-blue-500 min-h-screen shadow-2xl border-r border-blue-500/20"
// // //     >
// // //       <div className="flex flex-col h-full">
// // //         {/* Header */}
// // //         <div className="p-2 border-b border-blue-500/20">
// // //           <div className="flex items-center justify-end">
// // //             <button
// // //               onClick={() => setIsCollapsed(!isCollapsed)}
// // //               className="text-blue-400 hover:text-blue-200 transition-colors p-1"
// // //             >
// // //               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Navigation */}
// // //         <nav className="flex-1 p-2">
// // //           <ul className="space-y-2">
// // //             {menuItems.map((item, index) => (
// // //               <motion.li
// // //                 key={item.label}
// // //                 initial={{ opacity: 0, x: -20 }}
// // //                 animate={{ opacity: 1, x: 0 }}
// // //                 transition={{ delay: index * 0.1 }}
// // //               >
// // //                 <a
// // //                   href={item.href}
// // //                   className="flex items-center px-3 py-3 rounded-lg text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-200 group"
// // //                 >
// // //                   <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
// // //                   {!isCollapsed && (
// // //                     <span className="font-medium ml-2">{item.label}</span>
// // //                   )}
// // //                 </a>
// // //               </motion.li>
// // //             ))}
// // //           </ul>
// // //         </nav>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }











// // "use client";

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   LayoutDashboard,
// //   BookOpen,
// //   Users,
// //   Award,
// //   Bell,
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";

// // export default function Sidebar() {
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const user = JSON.parse(localStorage.getItem("user") || "{}");

// //   const menuItems =
// //     user.role === "admin"
// //       ? [
// //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
// //           { icon: <BookOpen size={20} />, label: "Manage Courses", href: "/admin/courses" },
// //           { icon: <Users size={20} />, label: "Monitor Users", href: "/admin/monitoring-users" },
// //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// //         ]
// //       : [
// //           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/user" },
// //           { icon: <BookOpen size={20} />, label: "Courses", href: "/user/courses" },
// //           { icon: <Award size={20} />, label: "Certificates", href: "/user/certificates" },
// //           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
// //         ];

// //   return (
// //     <motion.div
// //       animate={{ width: isCollapsed ? 64 : 200 }}
// //       transition={{ duration: 0.3, ease: "easeInOut" }}
// //       className="h-screen min-h-screen bg-gradient-to-b from-blue-700 to-blue-500 shadow-2xl border-r border-blue-500/20"
// //     >
// //       <div className="flex flex-col h-full">
// //         {/* Header */}
// //         <div className="p-2 border-b border-blue-500/20">
// //           <div className="flex items-center justify-end">
// //             <button
// //               onClick={() => setIsCollapsed(!isCollapsed)}
// //               className="text-blue-400 hover:text-blue-200 transition-colors p-1"
// //             >
// //               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 p-2">
// //           <ul className="space-y-2">
// //             {menuItems.map((item, index) => (
// //               <motion.li
// //                 key={item.label}
// //                 initial={{ opacity: 0, x: -20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 transition={{ delay: index * 0.1 }}
// //               >
// //                 <a
// //                   href={item.href}
// //                   className="flex items-center px-3 py-3 rounded-lg text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-200 group"
// //                 >
// //                   <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
// //                   {!isCollapsed && (
// //                     <span className="font-medium ml-2">{item.label}</span>
// //                   )}
// //                 </a>
// //               </motion.li>
// //             ))}
// //           </ul>
// //         </nav>
// //       </div>
// //     </motion.div>
// //   );
// // }













// // client/src/components/Layouts/Sidebar.js

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   LayoutDashboard,
//   BookOpen,
//   Users,
//   Award,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// export default function Sidebar() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const menuItems =
//     user.role === "admin"
//       ? [
//           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
//           { icon: <BookOpen size={20} />, label: "Manage Courses", href: "/admin/courses" },
//           { icon: <Users size={20} />, label: "Monitor Users", href: "/admin/monitoring-users" },
//           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
//         ]
//       : [
//           { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/user" },
//           { icon: <BookOpen size={20} />, label: "Courses", href: "/user/courses" },
//           { icon: <Award size={20} />, label: "Certificates", href: "/user/certificates" },
//           { icon: <Bell size={20} />, label: "Notifications", href: "/notifications" },
//         ];

//   return (
//     <motion.div
//       animate={{ width: isCollapsed ? 64 : 200 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="h-screen min-h-screen bg-gradient-to-b from-blue-700 to-blue-500 shadow-2xl border-r border-blue-500/20"
//     >
//       <div className="flex flex-col h-full">
//         {/* Header - Changed p-2 to p-1 for minimal padding on the collapse button */}
//         <div className="p-1 border-b border-blue-500/20">
//           <div className="flex items-center justify-end">
//             <button
//               onClick={() => setIsCollapsed(!isCollapsed)}
//               className="text-blue-400 hover:text-blue-200 transition-colors p-1"
//             >
//               {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Navigation - Changed p-2 to p-0 to remove all padding from the nav container */}
//         <nav className="flex-1 p-0">
//           <ul className="space-y-2">
//             {menuItems.map((item, index) => (
//               <motion.li
//                 key={item.label}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <a
//                   href={item.href}
//                   // Changed px-3 to px-2 to reduce the internal link padding.
//                   // This leaves a slight 8px gap (from px-2) to the left edge (p-0 parent).
//                   className="flex items-center px-0 py-0 rounded-lg text-blue-400 hover:bg-blue-700/50 hover:text-white transition-all duration-200 group"
//                 >
//                   <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
//                   {!isCollapsed && (
//                     <span className="font-medium ml-2">{item.label}</span>
//                   )}
//                 </a>
//               </motion.li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </motion.div>
//   );
// }
// client/src/components/Layouts/Sidebar.js

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    learning: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-gradient-to-b from-blue-800 to-blue-600 shadow-xl border-r border-blue-500/30 text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/30">
        {!isCollapsed && <h1 className="text-lg font-semibold">Learning Hub</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-blue-300 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <button
              onClick={() => toggleMenu("dashboard")}
              className="flex items-center w-full px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-md transition"
            >
              <LayoutDashboard size={20} />
              {!isCollapsed && <span className="ml-2">Dashboard</span>}
            </button>
            {!isCollapsed && openMenus.dashboard && (
              <ul className="ml-8 mt-1 space-y-1 text-sm text-blue-200">
                <li>
                  <a href="/admin" className="block hover:text-white">Overview</a>
                </li>
                <li>
                  <a href="/admin/alerts" className="block hover:text-white">Alerts</a>
                </li>
              </ul>
            )}
          </li>

          {/* Monitoring Users */}
          <li>
            <a
              href="/admin/monitoring-users"
              className="flex items-center px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-md transition"
            >
              <Users size={20} />
              {!isCollapsed && <span className="ml-2">Monitoring Users</span>}
            </a>
          </li>

          {/* Learning */}
          <li>
            <button
              onClick={() => toggleMenu("learning")}
              className="flex items-center w-full px-4 py-2 text-blue-100 hover:bg-blue-700/50 rounded-md transition"
            >
              <BookOpen size={20} />
              {!isCollapsed && <span className="ml-2">Learning</span>}
            </button>
            {!isCollapsed && openMenus.learning && (
              <ul className="ml-8 mt-1 space-y-1 text-sm text-blue-200">
                <li>
                  <a href="/admin/courses" className="block hover:text-white">Courses</a>
                </li>
                <li>
                  <a href="/admin/resources" className="block hover:text-white">Resources</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </motion.div>
  );
}
