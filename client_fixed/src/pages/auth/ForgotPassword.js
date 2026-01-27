// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleForgot = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.msg || "Failed to send reset link");

//       // ✅ Redirect user to check-email page
//       navigate("/check-email");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
//         <form onSubmit={handleForgot} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 border rounded-lg"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import { forgotPassword } from "../../api/authApi";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await forgotPassword({ email });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error sending reset link");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-gray-800 text-white rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Enter your email"
//           className="w-full p-2 rounded bg-gray-700"
//         />
//         <button type="submit" className="bg-blue-600 w-full py-2 rounded">
//           Send Reset Link
//         </button>
//       </form>
//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// }











"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { forgotPassword } from "../../api/authApi";
import { useTheme } from "../../context/ThemeContext";

export default function ForgotPassword() {
  const { background } = useTheme();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPassword({ email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundImage: background.gradient }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 rounded-2xl bg-white/85 border border-blue-300 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Send Reset Link <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Message */}
          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}

          {/* Back to login */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Back to Login
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
