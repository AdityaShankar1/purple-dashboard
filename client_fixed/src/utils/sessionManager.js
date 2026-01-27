/**
 * Session Manager - Handles page refresh state persistence
 * Stores critical navigation and UI state
 */

class SessionManager {
  constructor() {
    this.SESSION_KEY = "lms_session_state"
    this.TIMEOUT = 30 * 60 * 1000 // 30 minutes
    this.initSession()
  }

  initSession() {
    const session = this.getSession()
    if (!session) {
      this.setSession({
        currentPage: "/user/dashboard",
        courseId: null,
        enrollmentId: null,
        timestamp: Date.now(),
      })
    }
  }

  getSession() {
    try {
      const session = localStorage.getItem(this.SESSION_KEY)
      return session ? JSON.parse(session) : null
    } catch (error) {
      console.error("Error reading session:", error)
      return null
    }
  }

  setSession(data) {
    try {
      const session = this.getSession() || {}
      localStorage.setItem(
        this.SESSION_KEY,
        JSON.stringify({
          ...session,
          ...data,
          timestamp: Date.now(),
        }),
      )
    } catch (error) {
      console.error("Error saving session:", error)
    }
  }

  updateCurrentPage(page, context = {}) {
    this.setSession({
      currentPage: page,
      ...context,
    })
  }

  getCurrentPage() {
    const session = this.getSession()
    return session?.currentPage || "/user/dashboard"
  }

  clearSession() {
    try {
      localStorage.removeItem(this.SESSION_KEY)
    } catch (error) {
      console.error("Error clearing session:", error)
    }
  }

  isSessionValid() {
    const session = this.getSession()
    if (!session) return false
    return Date.now() - session.timestamp < this.TIMEOUT
  }
}

export const sessionManager = new SessionManager()
