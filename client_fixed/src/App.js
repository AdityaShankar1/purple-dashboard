/**
 * ============================================================================
 * LATEST VERSION - UI/UX Consistency Fix
 * ============================================================================
 * BUG FIXED: Hidden Global Wrapper on Auth Pages
 * - App.js was wrapping all Route instances for Login, Signup, ResetPassword inside <ThemeBackground>.
 * - This forced the admin gap theme onto the login page regardless of internal component logic.
 * SOLUTION:
 * - Stripped <ThemeBackground> wrapper from all auth routes, allowing them to style their own backgrounds.
 * - Updated <ThemeBackground> dependency in the loading skeleton to a plain styled div.
 * ============================================================================
 */


// // "use client";

// // import { useState, useEffect } from "react";
// // import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import CheckEmail from "./pages/CheckEmail";
// // import Login from "./pages/auth/Login";
// // import Signup from "./pages/auth/Signup";
// // import ForgotPassword from "./pages/auth/ForgotPassword";
// // import ResetPassword from "./pages/auth/ResetPassword";
// // import DashboardAdmin from "./pages/dashboardAdmin/DashboardAdmin";
// // import DashboardUser from "./pages/dashboard/DashboardUser";
// // import Notification from "./pages/Notification";
// // import MonitoringUsers from "./pages/dashboardAdmin/MonitoringUsers";
// // import ManageCourses from "./pages/dashboardAdmin/ManageCourses";
// // import Navbar from "./components/Layouts/Navbar";
// // import Sidebar from "./components/Layouts/Sidebar";
// // import Watermark from "./components/Layouts/Watermark";
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // // ✅ Providers
// // import { ThemeProvider } from "./context/ThemeContext";
// // import { AuthProvider } from "./context/AuthContext";

// // function AppContent() {
// //   const location = useLocation();
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const hideMenuRoutes = [
// //     "/login",
// //     "/signup",
// //     "/forgot-password",
// //     "/reset-password",
// //     "/check-email",
// //   ];
// //   const showMenu = !hideMenuRoutes.includes(location.pathname) && user;

// //   useEffect(() => {
// //     setSidebarOpen(false);
// //   }, [location.pathname]);

// //   // Load user from localStorage
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     const userData = localStorage.getItem("user");

// //     if (token && userData) {
// //       try {
// //         setUser(JSON.parse(userData));
// //       } catch (error) {
// //         console.error("Error parsing user data:", error);
// //         localStorage.removeItem("token");
// //         localStorage.removeItem("user");
// //       }
// //     }
// //     setLoading(false);
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-4"
// //         style={{
// //           background: "#020024",
// //           backgroundImage: "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 219, 1) 0%, rgba(0, 212, 255, 1) 100%)"
// //         }}
// //       >
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen relative"
// //       style={{
// //         background: "#020024",
// //         backgroundImage: "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 219, 1) 0%, rgba(0, 212, 255, 1) 100%)"
// //       }}
// //     >
// //       <Watermark />
// //       {showMenu && (
// //         <Navbar
// //           showMenu={showMenu}
// //           onMenuClick={() => setSidebarOpen(!sidebarOpen)}
// //           user={user}
// //         />
// //       )}

// //       <div className="flex">
// //         {showMenu && sidebarOpen && <Sidebar user={user} />}
// //         <main className={`flex-1 ${showMenu ? "p-6" : ""}`}>
// //           <Routes>
// //             {/* Auth Pages */}
// //             <Route path="/login" element={<Login setUser={setUser} />} />
// //             <Route path="/signup" element={<Signup />} />
// //             <Route path="/forgot-password" element={<ForgotPassword />} />
// //             <Route path="/reset-password/:token" element={<ResetPassword />} />
// //             <Route path="/check-email" element={<CheckEmail />} />

// //             {/* Dashboards */}
// //             <Route
// //               path="/admin/*"
// //               element={
// //                 user?.role === "admin" ? (
// //                   <DashboardAdmin />
// //                 ) : user ? (
// //                   <div className="p-6 text-red-500 font-bold text-center">
// //                     Access denied. Admin role required.
// //                   </div>
// //                 ) : (
// //                   <Navigate to="/login" />
// //                 )
// //               }
// //             />
// //             <Route
// //               path="/user/*"
// //               element={
// //                 user?.role === "user" ? (
// //                   <DashboardUser />
// //                 ) : user ? (
// //                   <div className="p-6 text-red-500 font-bold text-center">
// //                     Access denied. User role required.
// //                   </div>
// //                 ) : (
// //                   <Navigate to="/login" />
// //                 )
// //               }
// //             />

// //             <Route path="/notifications" element={<Notification />} />
// //             <Route path="/admin/monitoring-users" element={<MonitoringUsers />} />
// //             <Route path="/admin/courses" element={
// //               user?.role === "admin" ? <ManageCourses /> :
// //               <div className="p-6 text-red-500 font-bold text-center">
// //                 Access denied. Admin role required.
// //               </div>
// //             } />

// //             {/* Default route */}
// //             <Route
// //               path="/"
// //               element={
// //                 user ? (
// //                   user.role === "admin" ? (
// //                     <Navigate to="/admin" />
// //                   ) : (
// //                     <Navigate to="/user" />
// //                   )
// //                 ) : (
// //                   <Navigate to="/login" />
// //                 )
// //               }
// //             />
// //             <Route path="*" element={<Navigate to="/login" />} />
// //           </Routes>
// //         </main>
// //       </div>

// //       <ToastContainer position="top-right" autoClose={3000} />
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <ThemeProvider>
// //       <AuthProvider>
// //         <AppContent />
// //       </AuthProvider>
// //     </ThemeProvider>
// //   );
// // }

// // export default App;
























// "use client";

// import { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import CheckEmail from "./pages/CheckEmail";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import DashboardAdmin from "./pages/dashboardAdmin/DashboardAdmin";
// import DashboardUser from "./pages/dashboard/DashboardUser";
// import Notification from "./pages/Notification";
// import MonitoringUsers from "./pages/dashboardAdmin/MonitoringUsers";
// import ManageCourses from "./pages/dashboardAdmin/ManageCourses";
// import Navbar from "./components/Layouts/Navbar";
// import Sidebar from "./components/Layouts/Sidebar";
// import Watermark from "./components/Layouts/Watermark";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // ✅ Providers
// import { ThemeProvider } from "./context/ThemeContext";
// import { AuthProvider } from "./context/AuthContext";
// import ThemeBackground from "./context/ThemeBackground"; // ✅ Import gradient wrapper

// function AppContent() {
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const hideMenuRoutes = [
//     "/login",
//     "/signup",
//     "/forgot-password",
//     "/reset-password",
//     "/check-email",
//   ];
//   const showMenu = !hideMenuRoutes.includes(location.pathname) && user;

//   useEffect(() => {
//     setSidebarOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <ThemeBackground className="flex items-center justify-center p-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//       </ThemeBackground>
//     );
//   }

//   return (
//     <ThemeBackground className="relative">
//       <Watermark />
//       {showMenu && (
//         <Navbar
//           showMenu={showMenu}
//           onMenuClick={() => setSidebarOpen(!sidebarOpen)}
//           user={user}
//         />
//       )}

//       <div className="flex">
//         {showMenu && sidebarOpen && <Sidebar user={user} />}
//         <main className={`flex-1 ${showMenu ? "p-6" : ""}`}>
//           <Routes>
//             {/* Auth Pages */}
//             <Route path="/login" element={<Login setUser={setUser} />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />
//             <Route path="/check-email" element={<CheckEmail />} />

//             {/* Dashboards */}
//             <Route
//               path="/admin/*"
//               element={
//                 user?.role === "admin" ? (
//                   <DashboardAdmin />
//                 ) : user ? (
//                   <div className="p-6 text-red-500 font-bold text-center">
//                     Access denied. Admin role required.
//                   </div>
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/user/*"
//               element={
//                 user?.role === "user" ? (
//                   <DashboardUser />
//                 ) : user ? (
//                   <div className="p-6 text-red-500 font-bold text-center">
//                     Access denied. User role required.
//                   </div>
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />

//             <Route path="/notifications" element={<Notification />} />
//             <Route path="/admin/monitoring-users" element={<MonitoringUsers />} />
//             <Route path="/admin/courses" element={
//               user?.role === "admin" ? <ManageCourses /> :
//               <div className="p-6 text-red-500 font-bold text-center">
//                 Access denied. Admin role required.
//               </div>
//             } />

//             {/* Default route */}
//             <Route
//               path="/"
//               element={
//                 user ? (
//                   user.role === "admin" ? (
//                     <Navigate to="/admin" />
//                   ) : (
//                     <Navigate to="/user" />
//                   )
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </main>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </ThemeBackground>
//   );
// }

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;












// client/src/App.js

"use client";

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CheckEmail from "./pages/CheckEmail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import DashboardAdmin from "./pages/dashboardAdmin/DashboardAdmin";
import DashboardUser from "./pages/dashboard/DashboardUser";
import Notification from "./pages/Notification";
import MonitoringUsers from "./pages/dashboardAdmin/MonitoringUsers";
import ManageCourses from "./pages/dashboardAdmin/AddCourseMaterials";
import UserQuizzes from "./pages/dashboard/UserQuizzes";


// ✅ Import the layout component (renamed from Layouts.js for clarity)
import DashboardLayout from "./components/Layouts/Layouts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ThemeBackground from "./context/ThemeBackground";

// =========================================================================
// Protected Route Wrapper Component
// =========================================================================
function ProtectedRoute({ element: Element, user, allowedRoles, redirectTo = "/login" }) {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.map(role => role.toLowerCase()).includes(user.role?.toLowerCase())) {
    return (
      <DashboardLayout user={user}>
        <div className="p-6 text-red-500 font-bold text-center">
          Access denied. Insufficient permissions.
        </div>
      </DashboardLayout>
    );
  }

  return (
    // ✅ Apply the layout to the protected page content
    <DashboardLayout user={user}>
      <Element />
    </DashboardLayout>
  );
}
// =========================================================================

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Removed unused isAuthRoute variable

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-purple-900 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Auth Pages (no global wrapper needed as they style themselves) */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />

        {/* Dashboard Pages (Protected and use Layout) */}
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={DashboardAdmin} user={user} allowedRoles={["admin"]} />}
        />
        <Route
          path="/admin/monitoring-users"
          element={<ProtectedRoute element={MonitoringUsers} user={user} allowedRoles={["admin"]} />}
        />
        <Route
          path="/admin/courses"
          element={<ProtectedRoute element={ManageCourses} user={user} allowedRoles={["admin"]} />}
        />

        {/* User Routes */}
        <Route
          path="/user"
          element={<ProtectedRoute element={DashboardUser} user={user} allowedRoles={["user"]} />}
        />

        {/* Shared Routes */}
        <Route
          path="/notifications"
          element={<ProtectedRoute element={Notification} user={user} allowedRoles={["admin", "user"]} />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            user ? (
              user.role?.toLowerCase() === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />

        <Route
          path="/user/quizzes/:courseId"
          element={<ProtectedRoute element={UserQuizzes} user={user} allowedRoles={["user"]} />}
        />


      </Routes>

      {/* Toast container is outside the router */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;