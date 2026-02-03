"use client"

import React from "react"

import { useEffect, useRef } from "react"

/**
 * Custom hook to sync component state with localStorage
 * Automatically saves and restores state on page refresh
 */
export const useStateSync = (key, initialValue) => {
  const [state, setState] = React.useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch (error) {
      console.error(`Error loading state for key ${key}:`, error)
      return initialValue
    }
  })

  const timeoutRef = useRef(null)

  useEffect(() => {
    // Debounce localStorage writes
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.error(`Error saving state for key ${key}:`, error)
      }
    }, 500)

    return () => clearTimeout(timeoutRef.current)
  }, [state, key])

  return [state, setState]
}
