// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.msg || "Password reset failed");

//       setMessage("Password reset successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
//         <form onSubmit={handleReset} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New Password"
//             className="w-full px-4 py-2 border rounded-lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm New Password"
//             className="w-full px-4 py-2 border rounded-lg"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           {message && <p className="text-green-600 text-sm">{message}</p>}
//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { resetPassword } from "../../api/authApi";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await resetPassword(token, { password });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error resetting password");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">Reset Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter new password"
//           className="w-full p-2 rounded bg-gray-700"
//         />
//         <button type="submit" className="bg-green-600 w-full py-2 rounded">
//           Reset Password
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../../api/authApi";
import ThemeBackground from "../../context/ThemeBackground"; // ✅ DRY gradient wrapper

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resetPassword(token, { password });
      toast.success(res.data.message || "Password reset successfully!");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeBackground className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.img
          src="/logoPesu.png"
          alt="Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="h-24 w-auto mx-auto mb-6 object-contain"
        />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">
            Reset Password
          </h1>
          <p className="text-indigo-800">
            Enter your new password to access your account
          </p>
        </div>

        {/* Reset Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl bg-white/85 border border-blue-300 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={20}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Reset Password <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </ThemeBackground>
  );
}
