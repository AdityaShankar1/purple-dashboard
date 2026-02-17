"use client"

import { useState, useEffect, useCallback } from "react"
import { notificationApi } from "../api/notificationApi"
import { toast } from "react-toastify"
import io from "socket.io-client"

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [socket, setSocket] = useState(null)

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    const socketInstance = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5001", {
      auth: { token },
    })

    // Authenticate user with socket
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.id) {
      socketInstance.emit("authenticate", user.id)
    }

    // Listen for new notifications
    socketInstance.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev])
      setUnreadCount((prev) => prev + 1)

      // Show toast notification
      toast.info(notification.title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Fetch notifications
  const fetchNotifications = useCallback(async (params = {}) => {
    try {
      setLoading(true)
      const response = await notificationApi.getUserNotifications(params)
      setNotifications(response.data.data.notifications || [])
      setUnreadCount(response.data.data.unreadCount || 0)
    } catch (error) {
      toast.error("Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }, [])

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationApi.markAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === notificationId ? { ...notif, isRead: true } : notif)),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      toast.error("Failed to mark notification as read")
    }
  }, [])

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationApi.markAllAsRead()
      setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
      setUnreadCount(0)
      toast.success("All notifications marked as read")
    } catch (error) {
      toast.error("Failed to mark all notifications as read")
    }
  }, [])

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationApi.deleteNotification(notificationId)
      setNotifications((prev) => prev.filter((notif) => notif._id !== notificationId))
      toast.success("Notification deleted")
    } catch (error) {
      toast.error("Failed to delete notification")
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    socket,
  }
}
