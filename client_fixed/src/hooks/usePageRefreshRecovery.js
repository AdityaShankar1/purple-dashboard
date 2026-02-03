"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { sessionManager } from "../utils/sessionManager"

/**
 * Hook to recover page state after refresh
 * Redirects to the last visited page if session is valid
 */
export const usePageRefreshRecovery = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if this is a page refresh
    const isPageRefresh = performance.getEntriesByType("navigation")[0]?.type === "reload"

    if (isPageRefresh && sessionManager.isSessionValid()) {
      const lastPage = sessionManager.getCurrentPage()
      const session = sessionManager.getSession()

      // Restore navigation context
      if (lastPage && lastPage !== window.location.pathname) {
        navigate(lastPage, { state: session })
      }
    }
  }, [navigate])

  return sessionManager
}
