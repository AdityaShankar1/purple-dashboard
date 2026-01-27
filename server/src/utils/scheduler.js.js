import cron from "node-cron"
import { sendReminderNotifications } from "../services/notificationService.js"
import { logger } from "../config/logger.js"

// Schedule reminder notifications to run daily at 9 AM
export const scheduleReminderNotifications = () => {
  cron.schedule("0 9 * * *", async () => {
    try {
      logger.info("Running scheduled reminder notifications...")
      await sendReminderNotifications()
      logger.info("Reminder notifications completed")
    } catch (error) {
      logger.error("Failed to send scheduled reminder notifications:", error)
    }
  })

  logger.info("Reminder notification scheduler initialized")
}

// Schedule cleanup of old notifications (older than 30 days)
export const scheduleNotificationCleanup = () => {
  cron.schedule("0 2 * * 0", async () => {
    try {
      logger.info("Running notification cleanup...")
      const Notification = (await import("../models/Notification.js")).default

      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const result = await Notification.deleteMany({
        createdAt: { $lt: thirtyDaysAgo },
        isRead: true,
      })

      logger.info(`Cleaned up ${result.deletedCount} old notifications`)
    } catch (error) {
      logger.error("Failed to cleanup old notifications:", error)
    }
  })

  logger.info("Notification cleanup scheduler initialized")
}
