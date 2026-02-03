/**
 * Storage Manager - Centralized localStorage management
 * Handles quota management and data cleanup
 */

class StorageManager {
  constructor() {
    this.PREFIX = "lms_"
    this.MAX_STORAGE_ITEMS = 50
  }

  setItem(key, value, expiryMinutes = null) {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiry: expiryMinutes ? Date.now() + expiryMinutes * 60 * 1000 : null,
      }

      localStorage.setItem(this.PREFIX + key, JSON.stringify(data))
      this.cleanupOldItems()
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        this.clearOldestItems()
        this.setItem(key, value, expiryMinutes)
      } else {
        console.error("Storage error:", error)
      }
    }
  }

  getItem(key) {
    try {
      const item = localStorage.getItem(this.PREFIX + key)
      if (!item) return null

      const data = JSON.parse(item)

      // Check expiry
      if (data.expiry && Date.now() > data.expiry) {
        localStorage.removeItem(this.PREFIX + key)
        return null
      }

      return data.value
    } catch (error) {
      console.error("Storage retrieval error:", error)
      return null
    }
  }

  removeItem(key) {
    try {
      localStorage.removeItem(this.PREFIX + key)
    } catch (error) {
      console.error("Storage removal error:", error)
    }
  }

  cleanupOldItems() {
    try {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(this.PREFIX))
        .map((k) => ({
          key: k,
          timestamp: JSON.parse(localStorage.getItem(k)).timestamp,
        }))
        .sort((a, b) => a.timestamp - b.timestamp)

      if (keys.length > this.MAX_STORAGE_ITEMS) {
        const itemsToRemove = keys.slice(0, keys.length - this.MAX_STORAGE_ITEMS)
        itemsToRemove.forEach((item) => localStorage.removeItem(item.key))
      }
    } catch (error) {
      console.error("Cleanup error:", error)
    }
  }

  clearOldestItems() {
    try {
      const keys = Object.keys(localStorage)
        .filter((k) => k.startsWith(this.PREFIX))
        .map((k) => ({
          key: k,
          timestamp: JSON.parse(localStorage.getItem(k)).timestamp,
        }))
        .sort((a, b) => a.timestamp - b.timestamp)

      const itemsToRemove = Math.ceil(keys.length * 0.2) // Remove 20%
      for (let i = 0; i < itemsToRemove; i++) {
        localStorage.removeItem(keys[i].key)
      }
    } catch (error) {
      console.error("Clear error:", error)
    }
  }
}

export const storageManager = new StorageManager()
