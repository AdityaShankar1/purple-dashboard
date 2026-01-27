"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Check, Trash2, X } from "lucide-react"
import { useNotifications } from "../../hooks/useNotifications"

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead, deleteNotification, markAllAsRead } = useNotifications()

  const recentNotifications = notifications.slice(0, 5)

  const getNotificationIcon = (type) => {
    switch (type) {
      case "course_created":
      case "course_updated":
        return "📚"
      case "enrollment_success":
        return "✅"
      case "course_completed":
        return "🎉"
      case "certificate_issued":
        return "🏆"
      default:
        return "📢"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-blue-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-indigo-800 hover:text-indigo-600 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-purple-400 hover:text-purple-300">
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {recentNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-700">
                    {recentNotifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`p-4 hover:bg-gray-700 transition-colors border-l-4 ${getPriorityColor(
                          notification.priority,
                        )} ${!notification.isRead ? "bg-gray-750" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-sm font-medium ${
                                    !notification.isRead ? "text-white" : "text-gray-300"
                                  }`}
                                >
                                  {notification.title}
                                </h4>
                                {!notification.isRead && (
                                  <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className={`text-xs mt-1 ${!notification.isRead ? "text-gray-300" : "text-gray-400"}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-green-400 hover:text-green-300 p-1"
                                title="Mark as read"
                              >
                                <Check size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Bell size={32} className="text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400">No notifications</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 5 && (
                <div className="p-3 border-t border-gray-700">
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      window.location.href = "/notifications"
                    }}
                    className="w-full text-center text-sm text-purple-400 hover:text-purple-300"
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
