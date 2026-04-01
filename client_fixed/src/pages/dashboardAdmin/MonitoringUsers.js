/**
 * ============================================================================
 * LATEST VERSION - UI/UX Consistency Fix
 * ============================================================================
 * BUG FIXED: Low Contrast Header and Glassmorphism issues
 * - The header elements had white text on a purple background that lacked sufficient contrast and uniformity.
 * SOLUTION:
 * - Stripped `glass-purple-theme` wrapper in favor of plain `bg-white` container.
 * - Reshaded header titles to `text-blue-900` and labels to `text-black`.
 * ============================================================================
 */
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Users, BookOpen, Award, Clock, Search, Filter } from "lucide-react"
// import axios from "../../api/axiosConfig"
// import { toast } from "react-toastify"

// export default function MonitoringUsers() {
//   const [users, setUsers] = useState([])
//   const [enrollments, setEnrollments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filterStatus, setFilterStatus] = useState("all")
//   const [selectedUser, setSelectedUser] = useState(null)

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     try {
//       const [usersResponse, enrollmentsResponse] = await Promise.all([
//         axios.get("/auth/users"), // You'll need to create this endpoint
//         axios.get("/enrollments/admin/all"),
//       ])

//       setUsers(usersResponse.data.data || [])
//       setEnrollments(enrollmentsResponse.data.data || [])
//     } catch (error) {
//       toast.error("Failed to fetch user data")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getUserEnrollments = (userId) => {
//     return enrollments.filter((enrollment) => enrollment.user._id === userId)
//   }

//   const getUserStats = (userId) => {
//     const userEnrollments = getUserEnrollments(userId)
//     return {
//       total: userEnrollments.length,
//       completed: userEnrollments.filter((e) => e.status === "completed").length,
//       active: userEnrollments.filter((e) => e.status === "active").length,
//       dropped: userEnrollments.filter((e) => e.status === "dropped").length,
//     }
//   }

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())

//     if (filterStatus === "all") return matchesSearch

//     const userEnrollments = getUserEnrollments(user._id)
//     const hasStatus = userEnrollments.some((e) => e.status === filterStatus)

//     return matchesSearch && hasStatus
//   })

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-black">User Monitoring</h1>
//         <p className="text-indigo-400">Monitor user enrollments and course progress</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white-800 rounded-lg py-6 border border-gray-300"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-black-900 text-sm">Total Users</p>
//               <p className="text-2xl font-bold text-black">{users.length}</p>
//             </div>
//             <Users className="text-purple-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           delay={0.1}
//           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Total Enrollments</p>
//               <p className="text-2xl font-bold text-white">{enrollments.length}</p>
//             </div>
//             <BookOpen className="text-blue-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           delay={0.2}
//           className="bg-white-800 rounded-lg p-6 border border-gray-700"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-black-400 text-sm">Completed Courses</p>
//               <p className="text-2xl font-bold text-white">
//                 {enrollments.filter((e) => e.status === "completed").length}
//               </p>
//             </div>
//             <Award className="text-green-500" size={24} />
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           delay={0.3}
//           className="bg-gray-800 rounded-lg p-6 border border-gray-700"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Active Enrollments</p>
//               <p className="text-2xl font-bold text-white">{enrollments.filter((e) => e.status === "active").length}</p>
//             </div>
//             <Clock className="text-yellow-500" size={24} />
//           </div>
//         </motion.div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search users by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Filter className="text-gray-400" size={20} />
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//           >
//             <option value="all">All Users</option>
//             <option value="active">Active Enrollments</option>
//             <option value="completed">Completed Courses</option>
//             <option value="dropped">Dropped Courses</option>
//           </select>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Total Courses
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Completed
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Active
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Joined
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-700">
//               {filteredUsers.map((user) => {
//                 const stats = getUserStats(user._id)
//                 return (
//                   <motion.tr
//                     key={user._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="hover:bg-gray-700 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10">
//                           <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
//                             <span className="text-sm font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-white">{user.name}</div>
//                           <div className="text-sm text-gray-400">{user.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{stats.total}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
//                         {stats.completed}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
//                         {stats.active}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <button onClick={() => setSelectedUser(user)} className="text-purple-400 hover:text-purple-300">
//                         View Details
//                       </button>
//                     </td>
//                   </motion.tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* User Details Modal */}
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
//           >
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold text-white">User Details: {selectedUser.name}</h2>
//               <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-white">
//                 ✕
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="bg-gray-700 rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-white mb-2">User Information</h3>
//                 <div className="space-y-2">
//                   <p className="text-gray-300">
//                     <span className="font-medium">Email:</span> {selectedUser.email}
//                   </p>
//                   <p className="text-gray-300">
//                     <span className="font-medium">Role:</span> {selectedUser.role}
//                   </p>
//                   <p className="text-gray-300">
//                     <span className="font-medium">Joined:</span> {new Date(selectedUser.createdAt).toLocaleDateString()}
//                   </p>
//                   <p className="text-gray-300">
//                     <span className="font-medium">Status:</span> {selectedUser.isActive ? "Active" : "Inactive"}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-gray-700 rounded-lg p-4">
//                 <h3 className="text-lg font-semibold text-white mb-2">Course Statistics</h3>
//                 <div className="space-y-2">
//                   {(() => {
//                     const stats = getUserStats(selectedUser._id)
//                     return (
//                       <>
//                         <p className="text-gray-300">
//                           <span className="font-medium">Total Enrollments:</span> {stats.total}
//                         </p>
//                         <p className="text-gray-300">
//                           <span className="font-medium">Completed:</span> {stats.completed}
//                         </p>
//                         <p className="text-gray-300">
//                           <span className="font-medium">Active:</span> {stats.active}
//                         </p>
//                         <p className="text-gray-300">
//                           <span className="font-medium">Dropped:</span> {stats.dropped}
//                         </p>
//                       </>
//                     )
//                   })()}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-700 rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-white mb-4">Course Enrollments</h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-600">
//                       <th className="text-left py-2 text-gray-300">Course</th>
//                       <th className="text-left py-2 text-gray-300">Status</th>
//                       <th className="text-left py-2 text-gray-300">Progress</th>
//                       <th className="text-left py-2 text-gray-300">Enrolled</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {getUserEnrollments(selectedUser._id).map((enrollment) => (
//                       <tr key={enrollment._id} className="border-b border-gray-600">
//                         <td className="py-2 text-white">{enrollment.course.title}</td>
//                         <td className="py-2">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                               enrollment.status === "completed"
//                                 ? "bg-green-900 text-green-300"
//                                 : enrollment.status === "active"
//                                   ? "bg-blue-900 text-blue-300"
//                                   : "bg-red-900 text-red-300"
//                             }`}
//                           >
//                             {enrollment.status}
//                           </span>
//                         </td>
//                         <td className="py-2 text-gray-300">{enrollment.progress}%</td>
//                         <td className="py-2 text-gray-300">{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }























"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, BookOpen, Award, Clock, Search, Filter } from "lucide-react"
import axios from "../../api/axiosConfig"
import { toast } from "react-toastify"

export default function MonitoringUsers() {
  const [users, setUsers] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersResponse, enrollmentsResponse] = await Promise.all([
        axios.get("/auth/users"),
        axios.get("/enrollments/admin/all"),
      ])

      setUsers(usersResponse.data.data || [])
      setEnrollments(enrollmentsResponse.data.data || [])
    } catch (error) {
      toast.error("Failed to fetch user data")
    } finally {
      setLoading(false)
    }
  }

  const getUserEnrollments = (userId) => {
    return enrollments.filter((enrollment) => enrollment.userId._id === userId)
  }

  const getUserStats = (userId) => {
    const userEnrollments = getUserEnrollments(userId)
    return {
      total: userEnrollments.length,
      completed: userEnrollments.filter((e) => e.status === "completed").length,
      active: userEnrollments.filter((e) => e.status === "active").length,
      dropped: userEnrollments.filter((e) => e.status === "dropped").length,
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch

    const userEnrollments = getUserEnrollments(user._id)
    const hasStatus = userEnrollments.some((e) => e.status === filterStatus)

    return matchesSearch && hasStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-[#f6e6f7] tracking-tight">User Monitoring</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">Monitor user enrollments and course progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Users</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="text-purple-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.1}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Enrollments</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">{enrollments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="text-blue-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.2}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Completed Courses</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
                {enrollments.filter((e) => e.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="text-green-500" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.3}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Enrollments</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
                {enrollments.length - enrollments.filter((e) => e.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:border-purple-500 transition-all outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" size={20} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent rounded-xl text-gray-900 dark:text-gray-100 font-semibold focus:border-purple-500 transition-all outline-none appearance-none cursor-pointer shadow-sm"
          >
            <option value="all">All Users</option>
            <option value="active">Active Enrollments</option>
            <option value="completed">Completed Courses</option>
            <option value="dropped">Dropped Courses</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Total Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Active
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => {
                const stats = getUserStats(user._id)
                return (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-800">{user.name.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">{stats.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {stats.completed}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {stats.active}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-purple-600 hover:text-purple-800 font-bold transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar transition-colors"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">User Details: {selectedUser.name}</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-100 dark:border-gray-600 shadow-sm transition-all premium-hover-glow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Users className="text-purple-500" size={18} />
                  User Information
                </h3>
                <div className="space-y-3 text-gray-800 dark:text-gray-200">
                  <p>
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Email:</span> {selectedUser.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Role:</span> <span className="capitalize">{selectedUser.role}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Joined:</span> {new Date(selectedUser.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {selectedUser.isActive ? "Active" : "Inactive"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-100 dark:border-gray-600 shadow-sm transition-all premium-hover-glow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={18} />
                  Course Statistics
                </h3>
                <div className="space-y-3 text-gray-800 dark:text-gray-200">
                  {(() => {
                    const stats = getUserStats(selectedUser._id)
                    return (
                      <>
                        <p>
                          <span className="font-semibold text-gray-600">Total Enrollments:</span> {stats.total}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold text-gray-600">Completed:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{stats.completed}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold text-gray-600">Active:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{stats.active}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold text-gray-600">Dropped:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{stats.dropped}</span>
                        </p>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-gray-100 dark:border-gray-600 shadow-sm transition-all premium-hover-glow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="text-purple-500" size={18} />
                Course Enrollments
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Course</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUserEnrollments(selectedUser._id).map((enrollment) => (
                      <tr key={enrollment._id} className="border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-gray-600/50 transition-colors">
                        <td className="py-3 text-gray-900 dark:text-white font-medium">{enrollment.courseId?.title || "Deleted/Unknown Course"}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${enrollment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : enrollment.status === "active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                              }`}
                          >
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="py-3 text-gray-800 font-medium">{enrollment.progress}%</td>
                        <td className="py-3 text-gray-700">{new Date(enrollment.enrolledAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}