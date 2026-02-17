// //client/src/components/Layouts/Navbar.js


// "use client";

// import { useState } from "react";
// import { User, LogOut } from "lucide-react";
// import { motion } from "framer-motion";
// import NotificationDropdown from "./NotificationDropdown";

// export default function Navbar({ user }) {
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   const userName = user?.name || "User";
//   const userEmail = user?.email || "no-email@example.com";
//   const userRole = user?.role || "user";

//   return (
//     <nav className="h-18 md:h-22 bg-[#F5F0F0] shadow-2xl border-b border-indigo-200">
//       <div className="px-6 h-full flex items-center justify-between">
//         {/* Left side: Logo and title */}
//         <div className="flex items-center gap-4">
//           <img
//             src="/c_isfcr_logo-removebg-preview.png"
//             alt="Logo ISFCR"
//             className="h-14 md:h-19 w-16 md:w-20 object-contain"
//           />
//           <div>
//             <h1 className="text-xl md:text-2xl font-bold text-indigo-800">PESU SOC</h1>
//             <p className="text-xs md:text-sm text-indigo-500">
//               Where Every Alert Tells A Story
//             </p>
//           </div>
//         </div>

//         {/* Right side: Notifications and user menu */}
//         {user && (
//           <div className="flex items-center gap-4">
//             {/* Notifications */}
//             <NotificationDropdown className="text-indigo-600" />

//             {/* User Menu */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center gap-3 text-indigo-700 hover:text-indigo-500 transition-colors p-2 rounded-lg hover:bg-indigo-100"
//               >
//                 <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                   <User size={18} />
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <div className="text-sm font-medium">{userName}</div>
//                   <div className="text-xs text-indigo-500 capitalize">{userRole}</div>
//                 </div>
//               </button>

//               {showUserMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="absolute right-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-2xl border border-indigo-200 z-20"
//                 >
//                   <div className="p-4 border-b border-indigo-200">
//                     <p className="text-indigo-800 font-medium">{userName}</p>
//                     <p className="text-indigo-500 text-sm">{userEmail}</p>
//                     <span className="inline-block mt-1 px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full capitalize">
//                       {userRole}
//                     </span>
//                   </div>
//                   <div className="p-2">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }










// "use client";

// import { useState } from "react";
// import { User, LogOut } from "lucide-react";
// import { motion } from "framer-motion";
// import NotificationDropdown from "./NotificationDropdown";

// export default function Navbar({ user }) {
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   const userName = user?.name || "User";
//   const userEmail = user?.email || "no-email@example.com";
//   const userRole = user?.role || "user";

//   return (
//     <nav className="min-h-[72px] bg-white shadow-md border-b border-indigo-200 z-50">
//       <div className="px-6 h-full flex items-center justify-between">
//         {/* Left side: Logo and title */}
//         <div className="flex items-center gap-0">
//           <img
//             src="/c_isfcr_logo-removebg-preview.png"
//             alt="Logo ISFCR"
//             className="h-14 w-14 object-contain"
//           />
//           <div>
//             <h1 className="text-xl font-bold text-indigo-800">PESU SOC</h1>
//              {/* <p className="text-xs text-indigo-500">Where Every Alert Tells A Story</p>  */}
            
//             <p className="text-xs text-indigo-500 italic">Where Every Alert Tells A Story</p> 
//           </div>
//         </div>

//         {/* Right side: Notifications and user menu */}
//         {user && (
//           <div className="flex items-center gap-3">
//             <NotificationDropdown className="text-indigo-600" />

//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center gap-3 text-indigo-700 hover:text-indigo-500 transition-colors p-2 rounded-lg hover:bg-indigo-100"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
//                   <User size={18} />
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <div className="text-sm font-medium">{userName}</div>
//                   <div className="text-xs text-indigo-500 capitalize">{userRole}</div>
//                 </div>
//               </button>

//               {showUserMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="absolute right-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-2xl border border-indigo-200 z-20"
//                 >
//                   <div className="p-4 border-b border-indigo-200">
//                     <p className="text-indigo-800 font-medium">{userName}</p>
//                     <p className="text-indigo-500 text-sm">{userEmail}</p>
//                     <span className="inline-block mt-1 px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full capitalize">
//                       {userRole}
//                     </span>
//                   </div>
//                   <div className="p-2">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }










"use client";

import { useState } from "react";
import { User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar({ user }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "no-email@example.com";
  const userRole = user?.role || "user";

  return (
    <nav className="min-h-[56px] bg-white shadow-md border-b border-indigo-200 z-50 w-full">
      <div className="h-full flex items-center justify-between px-0">
        <div className="flex items-center gap-0">
          <img
            src="/c_isfcr_logo-removebg-preview.png"
            alt="Logo ISFCR"
            className="h-14 w-14 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-indigo-800">PESU SOC</h1>
            <p className="text-xs text-indigo-500 italic">Where Every Alert Tells A Story</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <NotificationDropdown className="text-indigo-600" />

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 text-indigo-700 hover:text-indigo-500 transition-colors py-2 px-3 rounded-lg hover:bg-indigo-100"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-indigo-500 capitalize">{userRole}</div>
                </div>
              </button>

              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-2xl border border-indigo-200 z-20"
                >
                  <div className="p-4 border-b border-indigo-200">
                    <p className="text-indigo-800 font-medium">{userName}</p>
                    <p className="text-indigo-500 text-sm">{userEmail}</p>
                    <span className="inline-block mt-1 px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full capitalize">
                      {userRole}
                    </span>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}