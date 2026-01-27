"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { sessionManager } from "../utils/sessionManager"

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    sessionManager.clearSession()
    return <Navigate to="/auth/login" replace />
  }

  return children
}
