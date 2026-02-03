// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { motion } from "framer-motion"
// // // // import { Bell, Check, Trash2, BookOpen, Award } from "lucide-react"
// // // // import { notificationApi } from "../api/notificationApi"
// // // // import { toast } from "react-toastify"

// // // // export default function Notification() {
// // // //   const [notifications, setNotifications] = useState([])
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [filter, setFilter] = useState("all")
// // // //   const [unreadCount, setUnreadCount] = useState(0)

// // // //   useEffect(() => {
// // // //     fetchNotifications()
// // // //   }, [filter])

// // // //   const fetchNotifications = async () => {
// // // //     try {
// // // //       const params = filter === "unread" ? { isRead: false } : {}
// // // //       const response = await notificationApi.getUserNotifications(params)
// // // //       setNotifications(response.data.data.notifications || [])
// // // //       setUnreadCount(response.data.data.unreadCount || 0)
// // // //     } catch (error) {
// // // //       toast.error("Failed to fetch notifications")
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const handleMarkAsRead = async (notificationId) => {
// // // //     try {
// // // //       await notificationApi.markAsRead(notificationId)
// // // //       setNotifications(
// // // //         notifications.map((notif) => (notif._id === notificationId ? { ...notif, isRead: true } : notif)),
// // // //       )
// // // //       setUnreadCount(Math.max(0, unreadCount - 1))
// // // //       toast.success("Notification marked as read")
// // // //     } catch (error) {
// // // //       toast.error("Failed to mark notification as read")
// // // //     }
// // // //   }

// // // //   const handleMarkAllAsRead = async () => {
// // // //     try {
// // // //       await notificationApi.markAllAsRead()
// // // //       setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
// // // //       setUnreadCount(0)
// // // //       toast.success("All notifications marked as read")
// // // //     } catch (error) {
// // // //       toast.error("Failed to mark all notifications as read")
// // // //     }
// // // //   }

// // // //   const handleDelete = async (notificationId) => {
// // // //     try {
// // // //       await notificationApi.deleteNotification(notificationId)
// // // //       setNotifications(notifications.filter((notif) => notif._id !== notificationId))
// // // //       toast.success("Notification deleted")
// // // //     } catch (error) {
// // // //       toast.error("Failed to delete notification")
// // // //     }
// // // //   }

// // // //   const getNotificationIcon = (type) => {
// // // //     switch (type) {
// // // //       case "course_created":
// // // //       case "course_updated":
// // // //       case "course_deleted":
// // // //         return <BookOpen size={20} className="text-blue-500" />
// // // //       case "enrollment_success":
// // // //         return <Check size={20} className="text-green-500" />
// // // //       case "course_completed":
// // // //       case "certificate_issued":
// // // //         return <Award size={20} className="text-yellow-500" />
// // // //       default:
// // // //         return <Bell size={20} className="text-gray-500" />
// // // //     }
// // // //   }

// // // //   const getPriorityColor = (priority) => {
// // // //     switch (priority) {
// // // //       case "high":
// // // //         return "border-red-500"
// // // //       case "medium":
// // // //         return "border-yellow-500"
// // // //       case "low":
// // // //         return "border-blue-500"
// // // //       default:
// // // //         return "border-gray-600"
// // // //     }
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-fuchsia-400 p-6">
// // // //       <div className="max-w-4xl mx-auto space-y-6">
// // // //         {/* Header */}
// // // //         <div className="flex justify-between items-center">
// // // //           <div>
// // // //             <h1 className="text-2xl font-bold text-white">Notifications</h1>
// // // //             <p className="text-gray-300">Stay updated with your learning progress</p>
// // // //           </div>
// // // //           <div className="flex items-center gap-2">
// // // //             {unreadCount > 0 && (
// // // //               <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">{unreadCount} unread</span>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* Filters and Actions */}
// // // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //           <div className="flex gap-2">
// // // //             <button
// // // //               onClick={() => setFilter("all")}
// // // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // // //                 filter === "all" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// // // //               }`}
// // // //             >
// // // //               All
// // // //             </button>
// // // //             <button
// // // //               onClick={() => setFilter("unread")}
// // // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // // //                 filter === "unread" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// // // //               }`}
// // // //             >
// // // //               Unread
// // // //             </button>
// // // //           </div>
// // // //           {unreadCount > 0 && (
// // // //             <button
// // // //               onClick={handleMarkAllAsRead}
// // // //               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // // //             >
// // // //               <Check size={16} />
// // // //               Mark All Read
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {/* Notifications List */}
// // // //         {notifications.length > 0 ? (
// // // //           <div className="space-y-4">
// // // //             {notifications.map((notification) => (
// // // //               <motion.div
// // // //                 key={notification._id}
// // // //                 initial={{ opacity: 0, y: 20 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 className={`bg-gray-800 rounded-lg p-6 border-l-4 ${getPriorityColor(notification.priority)} ${
// // // //                   !notification.isRead ? "bg-opacity-90" : "bg-opacity-60"
// // // //                 }`}
// // // //               >
// // // //                 <div className="flex items-start justify-between">
// // // //                   <div className="flex items-start gap-4 flex-1">
// // // //                     {/* Icon */}
// // // //                     <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

// // // //                     {/* Content */}
// // // //                     <div className="flex-1">
// // // //                       <div className="flex items-center gap-2 mb-2">
// // // //                         <h3 className={`font-semibold ${!notification.isRead ? "text-white" : "text-gray-300"}`}>
// // // //                           {notification.title}
// // // //                         </h3>
// // // //                         {!notification.isRead && (
// // // //                           <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
// // // //                         )}
// // // //                       </div>
// // // //                       <p className={`text-sm mb-3 ${!notification.isRead ? "text-gray-300" : "text-gray-400"}`}>
// // // //                         {notification.message}
// // // //                       </p>
// // // //                       <div className="flex items-center gap-4 text-xs text-gray-500">
// // // //                         <span>{new Date(notification.createdAt).toLocaleString()}</span>
// // // //                         {notification.relatedCourse && (
// // // //                           <span className="bg-gray-700 px-2 py-1 rounded">
// // // //                             Course: {notification.relatedCourse.title}
// // // //                           </span>
// // // //                         )}
// // // //                         <span
// // // //                           className={`px-2 py-1 rounded ${
// // // //                             notification.priority === "high"
// // // //                               ? "bg-red-900 text-red-300"
// // // //                               : notification.priority === "medium"
// // // //                                 ? "bg-yellow-900 text-yellow-300"
// // // //                                 : "bg-blue-900 text-blue-300"
// // // //                           }`}
// // // //                         >
// // // //                           {notification.priority}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Actions */}
// // // //                   <div className="flex items-center gap-2 ml-4">
// // // //                     {!notification.isRead && (
// // // //                       <button
// // // //                         onClick={() => handleMarkAsRead(notification._id)}
// // // //                         className="text-green-400 hover:text-green-300 p-1"
// // // //                         title="Mark as read"
// // // //                       >
// // // //                         <Check size={16} />
// // // //                       </button>
// // // //                     )}
// // // //                     <button
// // // //                       onClick={() => handleDelete(notification._id)}
// // // //                       className="text-red-400 hover:text-red-300 p-1"
// // // //                       title="Delete notification"
// // // //                     >
// // // //                       <Trash2 size={16} />
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </motion.div>
// // // //             ))}
// // // //           </div>
// // // //         ) : (
// // // //           <div className="text-center py-12">
// // // //             <Bell size={48} className="text-gray-600 mx-auto mb-4" />
// // // //             <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // // //               {filter === "unread" ? "No unread notifications" : "No notifications"}
// // // //             </h3>
// // // //             <p className="text-gray-500">
// // // //               {filter === "unread"
// // // //                 ? "All caught up! Check back later for new updates."
// // // //                 : "You'll receive notifications about course updates and achievements here."}
// // // //             </p>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }






// // // //client/src/pages/Notification.js

// // // "use client"

// // // import { useState, useEffect, useCallback } from "react"
// // // import { motion } from "framer-motion"
// // // import { Bell, Check, Trash2, BookOpen, Award } from "lucide-react"
// // // import { notificationApi } from "../api/notificationApi"
// // // import { toast } from "react-toastify"

// // // export default function Notification() {
// // //   const [notifications, setNotifications] = useState([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [filter, setFilter] = useState("all")
// // //   const [unreadCount, setUnreadCount] = useState(0)

// // //   const fetchNotifications = useCallback(async () => {
// // //     try {
// // //       const params = filter === "unread" ? { isRead: false } : {}
// // //       const response = await notificationApi.getUserNotifications(params)
// // //       setNotifications(response.data.data.notifications || [])
// // //       setUnreadCount(response.data.data.unreadCount || 0)
// // //     } catch (error) {
// // //       toast.error("Failed to fetch notifications")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }, [filter])

// // //   useEffect(() => {
// // //     fetchNotifications()
// // //   }, [fetchNotifications])

// // //   const handleMarkAsRead = async (notificationId) => {
// // //     try {
// // //       await notificationApi.markAsRead(notificationId)
// // //       setNotifications(
// // //         notifications.map((notif) =>
// // //           notif._id === notificationId ? { ...notif, isRead: true } : notif,
// // //         ),
// // //       )
// // //       setUnreadCount(Math.max(0, unreadCount - 1))
// // //       toast.success("Notification marked as read")
// // //     } catch (error) {
// // //       toast.error("Failed to mark notification as read")
// // //     }
// // //   }

// // //   const handleMarkAllAsRead = async () => {
// // //     try {
// // //       await notificationApi.markAllAsRead()
// // //       setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
// // //       setUnreadCount(0)
// // //       toast.success("All notifications marked as read")
// // //     } catch (error) {
// // //       toast.error("Failed to mark all notifications as read")
// // //     }
// // //   }

// // //   const handleDelete = async (notificationId) => {
// // //     try {
// // //       await notificationApi.deleteNotification(notificationId)
// // //       setNotifications(notifications.filter((notif) => notif._id !== notificationId))
// // //       toast.success("Notification deleted")
// // //     } catch (error) {
// // //       toast.error("Failed to delete notification")
// // //     }
// // //   }

// // //   const getNotificationIcon = (type) => {
// // //     switch (type) {
// // //       case "course_created":
// // //       case "course_updated":
// // //       case "course_deleted":
// // //         return <BookOpen size={20} className="text-blue-500" />
// // //       case "enrollment_success":
// // //         return <Check size={20} className="text-green-500" />
// // //       case "course_completed":
// // //       case "certificate_issued":
// // //         return <Award size={20} className="text-yellow-500" />
// // //       default:
// // //         return <Bell size={20} className="text-gray-500" />
// // //     }
// // //   }

// // //   const getPriorityColor = (priority) => {
// // //     switch (priority) {
// // //       case "high":
// // //         return "border-red-500"
// // //       case "medium":
// // //         return "border-yellow-500"
// // //       case "low":
// // //         return "border-blue-500"
// // //       default:
// // //         return "border-gray-600"
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-fuchsia-400 p-6">
// // //       <div className="max-w-4xl mx-auto space-y-6">
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center">
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-white">Notifications</h1>
// // //             <p className="text-gray-300">Stay updated with your learning progress</p>
// // //           </div>
// // //           <div className="flex items-center gap-2">
// // //             {unreadCount > 0 && (
// // //               <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
// // //                 {unreadCount} unread
// // //               </span>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Filters and Actions */}
// // //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // //           <div className="flex gap-2">
// // //             <button
// // //               onClick={() => setFilter("all")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 filter === "all" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               All
// // //             </button>
// // //             <button
// // //               onClick={() => setFilter("unread")}
// // //               className={`px-4 py-2 rounded-lg transition-colors ${
// // //                 filter === "unread" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               Unread
// // //             </button>
// // //           </div>
// // //           {unreadCount > 0 && (
// // //             <button
// // //               onClick={handleMarkAllAsRead}
// // //               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
// // //             >
// // //               <Check size={16} />
// // //               Mark All Read
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* Notifications List */}
// // //         {notifications.length > 0 ? (
// // //           <div className="space-y-4">
// // //             {notifications.map((notification) => (
// // //               <motion.div
// // //                 key={notification._id}
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 className={`bg-gray-800 rounded-lg p-6 border-l-4 ${getPriorityColor(notification.priority)} ${
// // //                   !notification.isRead ? "bg-opacity-90" : "bg-opacity-60"
// // //                 }`}
// // //               >
// // //                 <div className="flex items-start justify-between">
// // //                   <div className="flex items-start gap-4 flex-1">
// // //                     {/* Icon */}
// // //                     <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

// // //                     {/* Content */}
// // //                     <div className="flex-1">
// // //                       <div className="flex items-center gap-2 mb-2">
// // //                         <h3 className={`font-semibold ${!notification.isRead ? "text-white" : "text-gray-300"}`}>
// // //                           {notification.title}
// // //                         </h3>
// // //                         {!notification.isRead && (
// // //                           <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
// // //                         )}
// // //                       </div>
// // //                       <p className={`text-sm mb-3 ${!notification.isRead ? "text-gray-300" : "text-gray-400"}`}>
// // //                         {notification.message}
// // //                       </p>
// // //                       <div className="flex items-center gap-4 text-xs text-gray-500">
// // //                         <span>{new Date(notification.createdAt).toLocaleString()}</span>
// // //                         {notification.relatedCourse && (
// // //                           <span className="bg-gray-700 px-2 py-1 rounded">
// // //                             Course: {notification.relatedCourse.title}
// // //                           </span>
// // //                         )}
// // //                         <span
// // //                           className={`px-2 py-1 rounded ${
// // //                             notification.priority === "high"
// // //                               ? "bg-red-900 text-red-300"
// // //                               : notification.priority === "medium"
// // //                                 ? "bg-yellow-900 text-yellow-300"
// // //                                 : "bg-blue-900 text-blue-300"
// // //                           }`}
// // //                         >
// // //                           {notification.priority}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Actions */}
// // //                   <div className="flex items-center gap-2 ml-4">
// // //                     {!notification.isRead && (
// // //                       <button
// // //                         onClick={() => handleMarkAsRead(notification._id)}
// // //                         className="text-green-400 hover:text-green-300 p-1"
// // //                         title="Mark as read"
// // //                       >
// // //                         <Check size={16} />
// // //                       </button>
// // //                     )}
// // //                     <button
// // //                       onClick={() => handleDelete(notification._id)}
// // //                       className="text-red-400 hover:text-red-300 p-1"
// // //                       title="Delete notification"
// // //                     >
// // //                       <Trash2 size={16} />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <div className="text-center py-12">
// // //             <Bell size={48} className="text-gray-600 mx-auto mb-4" />
// // //             <h3 className="text-lg font-semibold text-gray-400 mb-2">
// // //               {filter === "unread" ? "No unread notifications" : "No notifications"}
// // //             </h3>
// // //             <p className="text-gray-500">
// // //               {filter === "unread"
// // //                 ? "All caught up! Check back later for new updates."
// // //                 : "You'll receive notifications about course updates and achievements here."}
// // //             </p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   )
// // // }






// // ///above is working code ///// 16/10/25 Below is new claude code





// // //client/src/pages/Notification.js
// // "use client"

// // import { useState, useEffect, useCallback } from "react"
// // import { motion } from "framer-motion"
// // import { 
// //   Bell, 
// //   Check, 
// //   Trash2, 
// //   BookOpen, 
// //   Award, 
// //   FileText,
// //   ClipboardList,
// //   AlertCircle,
// //   CheckCircle,
// //   XCircle,
// //   RefreshCw,
// //   Clock
// // } from "lucide-react"
// // import axios from "../api/axiosConfig"
// // import { toast, ToastContainer } from "react-toastify"
// // import "react-toastify/dist/ReactToastify.css"

// // export default function Notification() {
// //   const [notifications, setNotifications] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [filter, setFilter] = useState("all")
// //   const [unreadCount, setUnreadCount] = useState(0)
// //   const [page, setPage] = useState(1)
// //   const [totalPages, setTotalPages] = useState(1)

// //   const fetchNotifications = useCallback(async () => {
// //     try {
// //       setLoading(true)
// //       const params = {
// //         page,
// //         limit: 20,
// //         unreadOnly: filter === "unread",
// //       }
      
// //       const response = await axios.get("/notifications/my-notifications", { params })
// //       const data = response.data?.data || {}
      
// //       setNotifications(data.notifications || [])
// //       setUnreadCount(data.unreadCount || 0)
// //       setTotalPages(data.pages || 1)
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to fetch notifications")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }, [filter, page])

// //   useEffect(() => {
// //     fetchNotifications()
// //   }, [fetchNotifications])

// //   const handleMarkAsRead = async (notificationId) => {
// //     try {
// //       await axios.patch(`/notifications/${notificationId}/read`)
// //       setNotifications(
// //         notifications.map((notif) =>
// //           notif._id === notificationId ? { ...notif, isRead: true } : notif,
// //         ),
// //       )
// //       setUnreadCount(Math.max(0, unreadCount - 1))
// //       toast.success("Notification marked as read")
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to mark notification as read")
// //     }
// //   }

// //   const handleMarkAllAsRead = async () => {
// //     try {
// //       await axios.patch("/notifications/mark-all-read")
// //       setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
// //       setUnreadCount(0)
// //       toast.success("All notifications marked as read")
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || "Failed to mark all notifications as read")
// //     }
// //   }

// //   const getNotificationIcon = (type) => {
// //     switch (type) {
// //       case "course_enrolled":
// //         return <BookOpen className="w-5 h-5 text-blue-500" />
// //       case "assignment_created":
// //       case "assignment_updated":
// //         return <FileText className="w-5 h-5 text-purple-500" />
// //       case "assignment_deleted":
// //         return <XCircle className="w-5 h-5 text-red-500" />
// //       case "assignment_graded":
// //         return <CheckCircle className="w-5 h-5 text-green-500" />
// //       case "quiz_created":
// //       case "quiz_updated":
// //         return <ClipboardList className="w-5 h-5 text-indigo-500" />
// //       case "quiz_deleted":
// //         return <XCircle className="w-5 h-5 text-red-500" />
// //       case "quiz_graded":
// //         return <CheckCircle className="w-5 h-5 text-green-500" />
// //       case "certificate_issued":
// //         return <Award className="w-5 h-5 text-yellow-500" />
// //       case "resubmit_allowed":
// //         return <RefreshCw className="w-5 h-5 text-orange-500" />
// //       default:
// //         return <Bell className="w-5 h-5 text-slate-500" />
// //     }
// //   }

// //   const getNotificationColor = (type) => {
// //     switch (type) {
// //       case "course_enrolled":
// //         return "border-blue-500 bg-blue-50/50"
// //       case "assignment_created":
// //       case "assignment_updated":
// //       case "quiz_created":
// //       case "quiz_updated":
// //         return "border-purple-500 bg-purple-50/50"
// //       case "assignment_deleted":
// //       case "quiz_deleted":
// //         return "border-red-500 bg-red-50/50"
// //       case "assignment_graded":
// //       case "quiz_graded":
// //         return "border-green-500 bg-green-50/50"
// //       case "certificate_issued":
// //         return "border-yellow-500 bg-yellow-50/50"
// //       case "resubmit_allowed":
// //         return "border-orange-500 bg-orange-50/50"
// //       default:
// //         return "border-slate-300 bg-white"
// //     }
// //   }

// //   const getTypeLabel = (type) => {
// //     const labels = {
// //       course_enrolled: "Course",
// //       assignment_created: "Assignment",
// //       assignment_updated: "Assignment",
// //       assignment_deleted: "Assignment",
// //       assignment_graded: "Grade",
// //       quiz_created: "Quiz",
// //       quiz_updated: "Quiz",
// //       quiz_deleted: "Quiz",
// //       quiz_graded: "Grade",
// //       certificate_issued: "Certificate",
// //       resubmit_allowed: "Resubmit",
// //     }
// //     return labels[type] || "Notification"
// //   }

// //   if (loading && notifications.length === 0) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="flex flex-col items-center gap-4">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
// //           <p className="text-slate-600 font-medium">Loading notifications...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
// //       <ToastContainer position="bottom-right" theme="colored" />
      
// //       <div className="max-w-5xl mx-auto space-y-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //             <div className="flex items-center gap-4">
// //               <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
// //                 <Bell className="w-7 h-7 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //                   Notifications
// //                 </h1>
// //                 <p className="text-slate-600 mt-1">Stay updated with your learning progress</p>
// //               </div>
// //             </div>
// //             {unreadCount > 0 && (
// //               <div className="flex items-center gap-3">
// //                 <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
// //                   {unreadCount} unread
// //                 </span>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Filters and Actions */}
// //         <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => {
// //                   setFilter("all")
// //                   setPage(1)
// //                 }}
// //                 className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
// //                   filter === "all"
// //                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
// //                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
// //                 }`}
// //               >
// //                 All
// //               </button>
// //               <button
// //                 onClick={() => {
// //                   setFilter("unread")
// //                   setPage(1)
// //                 }}
// //                 className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
// //                   filter === "unread"
// //                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
// //                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
// //                 }`}
// //               >
// //                 Unread
// //               </button>
// //             </div>
// //             {unreadCount > 0 && (
// //               <button
// //                 onClick={handleMarkAllAsRead}
// //                 className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-semibold"
// //               >
// //                 <Check className="w-4 h-4" />
// //                 Mark All Read
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Notifications List */}
// //         {notifications.length > 0 ? (
// //           <div className="space-y-4">
// //             {notifications.map((notification, index) => (
// //               <motion.div
// //                 key={notification._id}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: index * 0.05 }}
// //                 className={`bg-white rounded-2xl shadow-lg border-l-4 ${getNotificationColor(notification.type)} overflow-hidden hover:shadow-xl transition-all`}
// //               >
// //                 <div className="p-6">
// //                   <div className="flex items-start justify-between gap-4">
// //                     <div className="flex items-start gap-4 flex-1">
// //                       {/* Icon */}
// //                       <div className="flex-shrink-0 mt-1 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
// //                         {getNotificationIcon(notification.type)}
// //                       </div>

// //                       {/* Content */}
// //                       <div className="flex-1 min-w-0">
// //                         <div className="flex items-center gap-2 mb-2 flex-wrap">
// //                           <h3 className={`font-bold text-lg ${!notification.isRead ? "text-slate-900" : "text-slate-600"}`}>
// //                             {notification.title}
// //                           </h3>
// //                           {!notification.isRead && (
// //                             <span className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 animate-pulse"></span>
// //                           )}
// //                           <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
// //                             {getTypeLabel(notification.type)}
// //                           </span>
// //                         </div>
                        
// //                         <p className={`text-sm mb-3 ${!notification.isRead ? "text-slate-700" : "text-slate-500"}`}>
// //                           {notification.message}
// //                         </p>
                        
// //                         <div className="flex items-center gap-3 text-xs text-slate-500">
// //                           <span className="flex items-center gap-1">
// //                             <Clock className="w-3 h-3" />
// //                             {new Date(notification.createdAt).toLocaleDateString("en-US", {
// //                               month: "short",
// //                               day: "numeric",
// //                               year: "numeric",
// //                               hour: "2-digit",
// //                               minute: "2-digit",
// //                             })}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Actions */}
// //                     <div className="flex items-center gap-2 flex-shrink-0">
// //                       {!notification.isRead && (
// //                         <button
// //                           onClick={() => handleMarkAsRead(notification._id)}
// //                           className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
// //                           title="Mark as read"
// //                         >
// //                           <Check className="w-4 h-4" />
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
// //             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Bell className="w-10 h-10 text-slate-400" />
// //             </div>
// //             <h3 className="text-xl font-bold text-slate-900 mb-2">
// //               {filter === "unread" ? "No unread notifications" : "No notifications yet"}
// //             </h3>
// //             <p className="text-slate-600 max-w-md mx-auto">
// //               {filter === "unread"
// //                 ? "All caught up! You've read all your notifications."
// //                 : "You'll receive notifications about courses, assignments, quizzes, and certificates here."}
// //             </p>
// //           </div>
// //         )}

// //         {/* Pagination */}
// //         {totalPages > 1 && (
// //           <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
// //             <div className="flex items-center justify-center gap-2">
// //               <button
// //                 onClick={() => setPage((p) => Math.max(1, p - 1))}
// //                 disabled={page === 1}
// //                 className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
// //               >
// //                 Previous
// //               </button>
// //               <span className="px-4 py-2 text-slate-700 font-medium">
// //                 Page {page} of {totalPages}
// //               </span>
// //               <button
// //                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// //                 disabled={page === totalPages}
// //                 className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }













// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   Bell,
//   Check,
//   Trash2,
//   BookOpen,
//   Award,
//   FileText,
//   ClipboardList,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   Clock,
// } from "lucide-react"
// import { notificationApi } from "../api/notificationApi"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"

// export default function Notification() {
//   const [notifications, setNotifications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState("all")
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true)
//       const params = {
//         page,
//         limit: 20,
//         unreadOnly: filter === "unread",
//       }

//       const response = await notificationApi.getUserNotifications(params)
//       const data = response.data?.data || {}

//       setNotifications(data.notifications || [])
//       setUnreadCount(data.unreadCount || 0)
//       setTotalPages(data.pages || 1)
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch notifications")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchNotifications()
//   }, [filter, page])

//   const handleMarkAsRead = async (notificationId) => {
//     try {
//       await notificationApi.markAsRead(notificationId)
//       setNotifications(
//         notifications.map((notif) => (notif._id === notificationId ? { ...notif, isRead: true } : notif)),
//       )
//       setUnreadCount(Math.max(0, unreadCount - 1))
//       toast.success("Notification marked as read")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to mark notification as read")
//     }
//   }

//   const handleMarkAllAsRead = async () => {
//     try {
//       await notificationApi.markAllAsRead()
//       setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })))
//       setUnreadCount(0)
//       toast.success("All notifications marked as read")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to mark all notifications as read")
//     }
//   }

//   const handleDelete = async (notificationId) => {
//     try {
//       await notificationApi.deleteNotification(notificationId)
//       setNotifications(notifications.filter((notif) => notif._id !== notificationId))
//       toast.success("Notification deleted")
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete notification")
//     }
//   }

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "course_enrolled":
//         return <BookOpen className="w-5 h-5 text-blue-500" />
//       case "assignment_created":
//       case "assignment_updated":
//         return <FileText className="w-5 h-5 text-purple-500" />
//       case "assignment_deleted":
//         return <XCircle className="w-5 h-5 text-red-500" />
//       case "assignment_graded":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "quiz_created":
//       case "quiz_updated":
//         return <ClipboardList className="w-5 h-5 text-indigo-500" />
//       case "quiz_deleted":
//         return <XCircle className="w-5 h-5 text-red-500" />
//       case "quiz_graded":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "certificate_issued":
//         return <Award className="w-5 h-5 text-yellow-500" />
//       case "resubmit_allowed":
//         return <RefreshCw className="w-5 h-5 text-orange-500" />
//       default:
//         return <Bell className="w-5 h-5 text-slate-500" />
//     }
//   }

//   const getNotificationColor = (type) => {
//     switch (type) {
//       case "course_enrolled":
//         return "border-blue-500 bg-blue-50/50"
//       case "assignment_created":
//       case "assignment_updated":
//       case "quiz_created":
//       case "quiz_updated":
//         return "border-purple-500 bg-purple-50/50"
//       case "assignment_deleted":
//       case "quiz_deleted":
//         return "border-red-500 bg-red-50/50"
//       case "assignment_graded":
//       case "quiz_graded":
//         return "border-green-500 bg-green-50/50"
//       case "certificate_issued":
//         return "border-yellow-500 bg-yellow-50/50"
//       case "resubmit_allowed":
//         return "border-orange-500 bg-orange-50/50"
//       default:
//         return "border-slate-300 bg-white"
//     }
//   }

//   const getTypeLabel = (type) => {
//     const labels = {
//       course_enrolled: "Course",
//       assignment_created: "Assignment",
//       assignment_updated: "Assignment",
//       assignment_deleted: "Assignment",
//       assignment_graded: "Grade",
//       quiz_created: "Quiz",
//       quiz_updated: "Quiz",
//       quiz_deleted: "Quiz",
//       quiz_graded: "Grade",
//       certificate_issued: "Certificate",
//       resubmit_allowed: "Resubmit",
//     }
//     return labels[type] || "Notification"
//   }

//   if (loading && notifications.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
//           <p className="text-slate-600 font-medium">Loading notifications...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-6">
//       <ToastContainer position="bottom-right" theme="colored" />

//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Bell className="w-7 h-7 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Notifications
//                 </h1>
//                 <p className="text-slate-600 mt-1">Stay updated with your learning progress</p>
//               </div>
//             </div>
//             {unreadCount > 0 && (
//               <div className="flex items-center gap-3">
//                 <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
//                   {unreadCount} unread
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Filters and Actions */}
//         <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   setFilter("all")
//                   setPage(1)
//                 }}
//                 className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
//                   filter === "all"
//                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
//                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                 }`}
//               >
//                 All
//               </button>
//               <button
//                 onClick={() => {
//                   setFilter("unread")
//                   setPage(1)
//                 }}
//                 className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
//                   filter === "unread"
//                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
//                     : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                 }`}
//               >
//                 Unread
//               </button>
//             </div>
//             {unreadCount > 0 && (
//               <button
//                 onClick={handleMarkAllAsRead}
//                 className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md font-semibold"
//               >
//                 <Check className="w-4 h-4" />
//                 Mark All Read
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Notifications List */}
//         {notifications.length > 0 ? (
//           <div className="space-y-4">
//             {notifications.map((notification, index) => (
//               <motion.div
//                 key={notification._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className={`bg-white rounded-2xl shadow-lg border-l-4 ${getNotificationColor(notification.type)} overflow-hidden hover:shadow-xl transition-all`}
//               >
//                 <div className="p-6">
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-start gap-4 flex-1">
//                       {/* Icon */}
//                       <div className="flex-shrink-0 mt-1 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
//                         {getNotificationIcon(notification.type)}
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-2 flex-wrap">
//                           <h3
//                             className={`font-bold text-lg ${!notification.isRead ? "text-slate-900" : "text-slate-600"}`}
//                           >
//                             {notification.title}
//                           </h3>
//                           {!notification.isRead && (
//                             <span className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex-shrink-0 animate-pulse"></span>
//                           )}
//                           <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
//                             {getTypeLabel(notification.type)}
//                           </span>
//                         </div>

//                         <p className={`text-sm mb-3 ${!notification.isRead ? "text-slate-700" : "text-slate-500"}`}>
//                           {notification.message}
//                         </p>

//                         <div className="flex items-center gap-3 text-xs text-slate-500">
//                           <span className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {new Date(notification.createdAt).toLocaleDateString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex items-center gap-2 flex-shrink-0">
//                       {!notification.isRead && (
//                         <button
//                           onClick={() => handleMarkAsRead(notification._id)}
//                           className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
//                           title="Mark as read"
//                         >
//                           <Check className="w-4 h-4" />
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(notification._id)}
//                         className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
//                         title="Delete notification"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
//             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Bell className="w-10 h-10 text-slate-400" />
//             </div>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">
//               {filter === "unread" ? "No unread notifications" : "No notifications yet"}
//             </h3>
//             <p className="text-slate-600 max-w-md mx-auto">
//               {filter === "unread"
//                 ? "All caught up! You've read all your notifications."
//                 : "You'll receive notifications about courses, assignments, quizzes, and certificates here."}
//             </p>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200">
//             <div className="flex items-center justify-center gap-2">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//               >
//                 Previous
//               </button>
//               <span className="px-4 py-2 text-slate-700 font-medium">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
