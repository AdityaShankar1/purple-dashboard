// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion } from "framer-motion"
// // import { TrendingUp, Clock, Target, Award, Calendar, BarChart3, PieChartIcon, Flame } from "lucide-react"
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
// //   Area,
// //   AreaChart,
// // } from "recharts"
// // import { progressApi } from "../../api/progressApi"
// // import { toast } from "react-toastify"

// // export default function ProgressAnalytics() {
// //   const [analytics, setAnalytics] = useState(null)
// //   const [streak, setStreak] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     fetchAnalytics()
// //   }, [])

// //   const fetchAnalytics = async () => {
// //     try {
// //       const [analyticsResponse, streakResponse] = await Promise.all([
// //         progressApi.getAnalytics(),
// //         progressApi.getStreak(),
// //       ])

// //       setAnalytics(analyticsResponse.data.data)
// //       setStreak(streakResponse.data.data)
// //     } catch (error) {
// //       toast.error("Failed to fetch analytics")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// //       </div>
// //     )
// //   }

// //   if (!analytics) {
// //     return (
// //       <div className="text-center py-12">
// //         <BarChart3 size={48} className="text-gray-600 mx-auto mb-4" />
// //         <h3 className="text-lg font-semibold text-gray-400 mb-2">No analytics available</h3>
// //         <p className="text-gray-500">Start taking courses to see your progress analytics</p>
// //       </div>
// //     )
// //   }

// //   const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"]

// //   const categoryData = Object.entries(analytics.categoryBreakdown).map(([name, value]) => ({
// //     name,
// //     value,
// //   }))

// //   const difficultyData = Object.entries(analytics.difficultyBreakdown).map(([name, value]) => ({
// //     name,
// //     value,
// //   }))

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div>
// //         <h1 className="text-2xl font-bold text-white">Learning Analytics</h1>
// //         <p className="text-gray-400">Track your learning progress and achievements</p>
// //       </div>

// //       {/* Key Metrics */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-gray-400 text-sm">Total Courses</p>
// //               <p className="text-2xl font-bold text-white">{analytics.totalCourses}</p>
// //             </div>
// //             <Target className="text-purple-500" size={24} />
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           delay={0.1}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-gray-400 text-sm">Completed</p>
// //               <p className="text-2xl font-bold text-white">{analytics.completedCourses}</p>
// //             </div>
// //             <Award className="text-green-500" size={24} />
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           delay={0.2}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-gray-400 text-sm">Time Spent</p>
// //               <p className="text-2xl font-bold text-white">{Math.round(analytics.totalTimeSpent / 60)}h</p>
// //             </div>
// //             <Clock className="text-blue-500" size={24} />
// //           </div>
// //         </motion.div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           delay={0.3}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <p className="text-gray-400 text-sm">Avg Progress</p>
// //               <p className="text-2xl font-bold text-white">{analytics.averageProgress}%</p>
// //             </div>
// //             <TrendingUp className="text-yellow-500" size={24} />
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Learning Streak */}
// //       {streak && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6"
// //         >
// //           <div className="flex items-center justify-between">
// //             <div>
// //               <div className="flex items-center gap-2 mb-2">
// //                 <Flame className="text-white" size={24} />
// //                 <h3 className="text-xl font-bold text-white">Learning Streak</h3>
// //               </div>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
// //                 <div>
// //                   <p className="text-orange-100 text-sm">Current Streak</p>
// //                   <p className="text-2xl font-bold">{streak.currentStreak} days</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-orange-100 text-sm">Longest Streak</p>
// //                   <p className="text-2xl font-bold">{streak.longestStreak} days</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-orange-100 text-sm">Active Days</p>
// //                   <p className="text-2xl font-bold">{streak.totalActiveDays}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-orange-100 text-sm">Last Activity</p>
// //                   <p className="text-lg font-semibold">
// //                     {streak.lastActivityDate ? new Date(streak.lastActivityDate).toLocaleDateString() : "Never"}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>
// //       )}

// //       {/* Charts Section */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Category Breakdown */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center gap-2 mb-4">
// //             <PieChartIcon className="text-purple-500" size={20} />
// //             <h3 className="text-lg font-semibold text-white">Courses by Category</h3>
// //           </div>
// //           {categoryData.length > 0 ? (
// //             <ResponsiveContainer width="100%" height={300}>
// //               <PieChart>
// //                 <Pie
// //                   data={categoryData}
// //                   cx="50%"
// //                   cy="50%"
// //                   outerRadius={100}
// //                   dataKey="value"
// //                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
// //                 >
// //                   {categoryData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           ) : (
// //             <div className="h-300 flex items-center justify-center text-gray-400">No category data available</div>
// //           )}
// //         </motion.div>

// //         {/* Difficulty Breakdown */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center gap-2 mb-4">
// //             <BarChart3 className="text-blue-500" size={20} />
// //             <h3 className="text-lg font-semibold text-white">Courses by Difficulty</h3>
// //           </div>
// //           {difficultyData.length > 0 ? (
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={difficultyData}>
// //                 <XAxis dataKey="name" stroke="#9ca3af" />
// //                 <YAxis stroke="#9ca3af" />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#374151",
// //                     border: "none",
// //                     borderRadius: "8px",
// //                     color: "#fff",
// //                   }}
// //                 />
// //                 <Bar dataKey="value" fill="#8b5cf6" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           ) : (
// //             <div className="h-300 flex items-center justify-center text-gray-400">No difficulty data available</div>
// //           )}
// //         </motion.div>
// //       </div>

// //       {/* Monthly Progress */}
// //       {analytics.monthlyProgress.length > 0 && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
// //         >
// //           <div className="flex items-center gap-2 mb-4">
// //             <Calendar className="text-green-500" size={20} />
// //             <h3 className="text-lg font-semibold text-white">Monthly Learning Activity</h3>
// //           </div>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <AreaChart data={analytics.monthlyProgress}>
// //               <XAxis dataKey="month" stroke="#9ca3af" />
// //               <YAxis stroke="#9ca3af" />
// //               <Tooltip
// //                 contentStyle={{
// //                   backgroundColor: "#374151",
// //                   border: "none",
// //                   borderRadius: "8px",
// //                   color: "#fff",
// //                 }}
// //               />
// //               <Area type="monotone" dataKey="sectionsCompleted" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
// //             </AreaChart>
// //           </ResponsiveContainer>
// //         </motion.div>
// //       )}
// //     </div>
// //   )
// // }





// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { TrendingUp, Clock, Target, Award, Calendar, BarChart3, PieChartIcon, Flame } from "lucide-react";
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
// import { progressApi } from "../../api/progressApi";
// import { toast } from "react-toastify";

// export default function ProgressAnalytics() {
//   const [analytics, setAnalytics] = useState(null);
//   const [streak, setStreak] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const fetchAnalytics = async () => {
//     try {
//       const [analyticsResponse, streakResponse] = await Promise.all([
//         progressApi.getAnalytics(),
//         progressApi.getStreak(),
//       ]);

//       setAnalytics(analyticsResponse.data?.data || null);
//       setStreak(streakResponse.data?.data || null);
//     } catch (error) {
//       toast.error("Failed to fetch analytics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   if (!analytics) {
//     return (
//       <div className="text-center py-12">
//         <BarChart3 size={48} className="text-gray-600 mx-auto mb-4" />
//         <h3 className="text-lg font-semibold text-gray-400 mb-2">No analytics available</h3>
//         <p className="text-gray-500">Start taking courses to see your progress analytics</p>
//       </div>
//     );
//   }

//   const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

//   const categoryData = Object.entries(analytics.categoryBreakdown || {}).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const difficultyData = Object.entries(analytics.difficultyBreakdown || {}).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-white">Learning Analytics</h1>
//         <p className="text-gray-400">Track your learning progress and achievements</p>
//       </div>

//       {/* Key Metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Total Courses</p>
//               <p className="text-2xl font-bold text-white">{analytics.totalCourses || 0}</p>
//             </div>
//             <Target className="text-purple-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Completed</p>
//               <p className="text-2xl font-bold text-white">{analytics.completedCourses || 0}</p>
//             </div>
//             <Award className="text-green-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Time Spent</p>
//               <p className="text-2xl font-bold text-white">{Math.round((analytics.totalTimeSpent || 0) / 60)}h</p>
//             </div>
//             <Clock className="text-blue-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Avg Progress</p>
//               <p className="text-2xl font-bold text-white">{analytics.averageProgress || 0}%</p>
//             </div>
//             <TrendingUp className="text-yellow-500" size={24} />
//           </div>
//         </motion.div>
//       </div>

//       {/* Learning Streak */}
//       {streak && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Flame className="text-white" size={24} />
//                 <h3 className="text-xl font-bold text-white">Learning Streak</h3>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
//                 <div>
//                   <p className="text-orange-100 text-sm">Current Streak</p>
//                   <p className="text-2xl font-bold">{streak.currentStreak || 0} days</p>
//                 </div>
//                 <div>
//                   <p className="text-orange-100 text-sm">Longest Streak</p>
//                   <p className="text-2xl font-bold">{streak.longestStreak || 0} days</p>
//                 </div>
//                 <div>
//                   <p className="text-orange-100 text-sm">Active Days</p>
//                   <p className="text-2xl font-bold">{streak.totalActiveDays || 0}</p>
//                 </div>
//                 <div>
//                   <p className="text-orange-100 text-sm">Last Activity</p>
//                   <p className="text-lg font-semibold">
//                     {streak.lastActivityDate ? new Date(streak.lastActivityDate).toLocaleDateString() : "Never"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Category Breakdown */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center gap-2 mb-4">
//             <PieChartIcon className="text-purple-500" size={20} />
//             <h3 className="text-lg font-semibold text-white">Courses by Category</h3>
//           </div>
//           {categoryData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-72 flex items-center justify-center text-gray-400">No category data available</div>
//           )}
//         </motion.div>

//         {/* Difficulty Breakdown */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center gap-2 mb-4">
//             <BarChart3 className="text-blue-500" size={20} />
//             <h3 className="text-lg font-semibold text-white">Courses by Difficulty</h3>
//           </div>
//           {difficultyData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={difficultyData}>
//                 <XAxis dataKey="name" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip contentStyle={{ backgroundColor: "#374151", border: "none", borderRadius: "8px", color: "#fff" }} />
//                 <Bar dataKey="value" fill="#8b5cf6" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="h-72 flex items-center justify-center text-gray-400">No difficulty data available</div>
//           )}
//         </motion.div>
//       </div>

//       {/* Monthly Progress */}
//       {analytics.monthlyProgress?.length > 0 && (
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//           <div className="flex items-center gap-2 mb-4">
//             <Calendar className="text-green-500" size={20} />
//             <h3 className="text-lg font-semibold text-white">Monthly Learning Activity</h3>
//           </div>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={analytics.monthlyProgress}>
//               <XAxis dataKey="month" stroke="#9ca3af" />
//               <YAxis stroke="#9ca3af" />
//               <Tooltip contentStyle={{ backgroundColor: "#374151", border: "none", borderRadius: "8px", color: "#fff" }} />
//               <Area type="monotone" dataKey="sectionsCompleted" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </motion.div>
//       )}
//     </div>
//   );
// }










// client/src/pages/dashboard/ProgressAnalytics.js
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { progressApi } from "../../api/progressApi"
import { toast } from "react-toastify"

export default function CourseProgressTracker({ courseId }) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [courseId])

  const fetchProgress = async () => {
    try {
      const response = await progressApi.getCourseProgress(courseId)
      setProgress(response.data.data)
    } catch (error) {
      toast.error("Failed to fetch progress")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  }

  if (!progress) {
    return <p className="text-gray-500">No progress data available</p>
  }

  const progressItems = [
    {
      label: "Materials",
      completed: progress.materialsCompleted,
      total: progress.totalMaterials,
      color: "bg-blue-500",
    },
    {
      label: "Quizzes",
      completed: progress.quizzesCompleted,
      total: progress.totalQuizzes,
      color: "bg-green-500",
    },
    {
      label: "Assignments",
      completed: progress.assignmentsCompleted,
      total: progress.totalAssignments,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Progress</h2>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Overall Progress</span>
            <span className="text-2xl font-bold text-purple-600">{progress.overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.overallProgress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-purple-600 h-3 rounded-full"
            />
          </div>
        </motion.div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                <span className="text-lg font-bold text-gray-900">
                  {item.completed}/{item.total}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-300`}
                  style={{
                    width: item.total > 0 ? `${(item.completed / item.total) * 100}%` : "0%",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {progress.certificateGenerated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 border-2 border-yellow-400"
        >
          <p className="text-yellow-800 font-semibold">
            🎉 Congratulations! You have completed this course and earned a certificate!
          </p>
        </motion.div>
      )}
    </div>
  )
}
