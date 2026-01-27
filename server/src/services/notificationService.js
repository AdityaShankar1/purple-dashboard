// // // import Notification from "../models/Notification.js"
// // // import { sendNotificationEmail } from "../config/mailer.js"
// // // // import { io, connectedUsers } from "../index.js"
// // // import { logger } from "../config/logger.js"
// // // import { io, connectedUsers } from "../config/socket.js";

// // // // Create and send notification
// // // export const createNotification = async (notificationData) => {
// // //   try {
// // //     const notification = await Notification.create(notificationData)

// // //     // Populate the notification with related data
// // //     await notification.populate([
// // //       { path: "sender", select: "name email" },
// // //       { path: "relatedCourse", select: "title" },
// // //     ])

// // //     // Send real-time notification via Socket.IO
// // //     const recipientSocketId = connectedUsers.get(notification.recipient.toString())
// // //     if (recipientSocketId) {
// // //       io.to(recipientSocketId).emit("new-notification", notification)
// // //     }

// // //     // Send email notification if it's high priority
// // //     if (notification.priority === "high") {
// // //       try {
// // //         const User = (await import("../models/User.js")).default
// // //         const recipient = await User.findById(notification.recipient)
// // //         if (recipient) {
// // //           await sendNotificationEmail(recipient, notification)
// // //         }
// // //       } catch (emailError) {
// // //         logger.error("Failed to send notification email:", emailError)
// // //       }
// // //     }

// // //     logger.info(`Notification created: ${notification.title} for user ${notification.recipient}`)
// // //     return notification
// // //   } catch (error) {
// // //     logger.error("Failed to create notification:", error)
// // //     throw error
// // //   }
// // // }

// // // // Bulk create notifications
// // // export const createBulkNotifications = async (notifications) => {
// // //   try {
// // //     const createdNotifications = await Notification.insertMany(notifications)

// // //     // Send real-time notifications
// // //     for (const notification of createdNotifications) {
// // //       const recipientSocketId = connectedUsers.get(notification.recipient.toString())
// // //       if (recipientSocketId) {
// // //         io.to(recipientSocketId).emit("new-notification", notification)
// // //       }
// // //     }

// // //     logger.info(`Bulk notifications created: ${createdNotifications.length} notifications`)
// // //     return createdNotifications
// // //   } catch (error) {
// // //     logger.error("Failed to create bulk notifications:", error)
// // //     throw error
// // //   }
// // // }

// // // // Send course-related notifications
// // // export const sendCourseNotification = async (type, courseId, senderId, additionalData = {}) => {
// // //   try {
// // //     const Course = (await import("../models/Course.js")).default
// // //     const User = (await import("../models/User.js")).default
// // //     const Enrollment = (await import("../models/Enrollment.js")).default

// // //     const course = await Course.findById(courseId)
// // //     if (!course) {
// // //       throw new Error("Course not found")
// // //     }

// // //     let recipients = []
// // //     let notificationData = {
// // //       sender: senderId,
// // //       type,
// // //       relatedCourse: courseId,
// // //       ...additionalData,
// // //     }

// // //     switch (type) {
// // //       case "course_created":
// // //         // Notify all active users
// // //         const allUsers = await User.find({ role: "user", isActive: true })
// // //         recipients = allUsers.map((user) => user._id)
// // //         notificationData = {
// // //           ...notificationData,
// // //           title: "New Course Available",
// // //           message: `A new course "${course.title}" has been added to the platform.`,
// // //           priority: "medium",
// // //         }
// // //         break

// // //       case "course_updated":
// // //         // Notify enrolled users
// // //         const enrollments = await Enrollment.find({ course: courseId, status: "active" })
// // //         recipients = enrollments.map((enrollment) => enrollment.user)
// // //         notificationData = {
// // //           ...notificationData,
// // //           title: "Course Updated",
// // //           message: `The course "${course.title}" has been updated with new content.`,
// // //           priority: "medium",
// // //         }
// // //         break

// // //       case "course_deleted":
// // //         // Notify enrolled users with high priority
// // //         const activeEnrollments = await Enrollment.find({ course: courseId, status: "active" })
// // //         recipients = activeEnrollments.map((enrollment) => enrollment.user)
// // //         notificationData = {
// // //           ...notificationData,
// // //           title: "Course Removed",
// // //           message: `The course "${course.title}" has been removed from the platform.`,
// // //           priority: "high",
// // //         }
// // //         break
// // //     }

// // //     // Create notifications for all recipients
// // //     const notifications = recipients.map((recipientId) => ({
// // //       ...notificationData,
// // //       recipient: recipientId,
// // //     }))

// // //     if (notifications.length > 0) {
// // //       await createBulkNotifications(notifications)
// // //     }

// // //     return notifications
// // //   } catch (error) {
// // //     logger.error("Failed to send course notification:", error)
// // //     throw error
// // //   }
// // // }

// // // // Send enrollment notification
// // // export const sendEnrollmentNotification = async (userId, courseId) => {
// // //   try {
// // //     const Course = (await import("../models/Course.js")).default
// // //     const course = await Course.findById(courseId)

// // //     if (!course) {
// // //       throw new Error("Course not found")
// // //     }

// // //     await createNotification({
// // //       recipient: userId,
// // //       type: "enrollment_success",
// // //       title: "Enrollment Successful",
// // //       message: `You have successfully enrolled in "${course.title}". Start learning now!`,
// // //       relatedCourse: courseId,
// // //       priority: "medium",
// // //     })
// // //   } catch (error) {
// // //     logger.error("Failed to send enrollment notification:", error)
// // //     throw error
// // //   }
// // // }

// // // // Send completion notification
// // // export const sendCompletionNotification = async (userId, courseId) => {
// // //   try {
// // //     const Course = (await import("../models/Course.js")).default
// // //     const course = await Course.findById(courseId)

// // //     if (!course) {
// // //       throw new Error("Course not found")
// // //     }

// // //     await createNotification({
// // //       recipient: userId,
// // //       type: "course_completed",
// // //       title: "Course Completed!",
// // //       message: `Congratulations! You have completed "${course.title}". Your certificate is ready for download.`,
// // //       relatedCourse: courseId,
// // //       priority: "high",
// // //     })
// // //   } catch (error) {
// // //     logger.error("Failed to send completion notification:", error)
// // //     throw error
// // //   }
// // // }

// // // // Send certificate notification
// // // export const sendCertificateNotification = async (userId, courseId, certificateId) => {
// // //   try {
// // //     const Course = (await import("../models/Course.js")).default
// // //     const course = await Course.findById(courseId)

// // //     if (!course) {
// // //       throw new Error("Course not found")
// // //     }

// // //     await createNotification({
// // //       recipient: userId,
// // //       type: "certificate_issued",
// // //       title: "Certificate Issued",
// // //       message: `Your certificate for completing "${course.title}" has been generated and is ready for download.`,
// // //       relatedCourse: courseId,
// // //       priority: "medium",
// // //     })
// // //   } catch (error) {
// // //     logger.error("Failed to send certificate notification:", error)
// // //     throw error
// // //   }
// // // }

// // // // Send reminder notifications
// // // export const sendReminderNotifications = async () => {
// // //   try {
// // //     const Enrollment = (await import("../models/Enrollment.js")).default

// // //     // Find users who haven't accessed their courses in 7 days
// // //     const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
// // //     const inactiveEnrollments = await Enrollment.find({
// // //       status: "active",
// // //       lastAccessedAt: { $lt: sevenDaysAgo },
// // //     })
// // //       .populate("course", "title")
// // //       .populate("user", "name email")

// // //     const notifications = inactiveEnrollments.map((enrollment) => ({
// // //       recipient: enrollment.user._id,
// // //       type: "system",
// // //       title: "Continue Your Learning",
// // //       message: `You haven't accessed "${enrollment.course.title}" in a while. Continue your learning journey!`,
// // //       relatedCourse: enrollment.course._id,
// // //       priority: "low",
// // //     }))

// // //     if (notifications.length > 0) {
// // //       await createBulkNotifications(notifications)
// // //       logger.info(`Sent ${notifications.length} reminder notifications`)
// // //     }

// // //     return notifications
// // //   } catch (error) {
// // //     logger.error("Failed to send reminder notifications:", error)
// // //     throw error
// // //   }
// // // }








// // ////above is working code ///// 16/10/25 Below is new claude code



// // // server/src/services/notificationService.js
// // import Notification from "../models/Notification.js";

// // class NotificationService {
// //   async createNotification({ users, type, title, message, data }) {
// //     try {
// //       const notifications = users.map((userId) => ({
// //         user: userId,
// //         type,
// //         title,
// //         message,
// //         data,
// //         isRead: false,
// //       }));

// //       const created = await Notification.insertMany(notifications);

// //       // Emit via Socket.IO if available
// //       if (global.io) {
// //         users.forEach((userId, index) => {
// //           global.io.to(userId.toString()).emit("new_notification", created[index]);
// //         });
// //       }

// //       return created;
// //     } catch (error) {
// //       console.error("Notification error:", error);
// //       throw error;
// //     }
// //   }

// //   async getUserNotifications(userId, { page = 1, limit = 20, unreadOnly = false }) {
// //     try {
// //       const query = { user: userId };
// //       if (unreadOnly) query.isRead = false;

// //       const notifications = await Notification.find(query)
// //         .sort({ createdAt: -1 })
// //         .skip((page - 1) * limit)
// //         .limit(limit)
// //         .lean();

// //       const total = await Notification.countDocuments(query);
// //       const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });

// //       return {
// //         notifications,
// //         total,
// //         unreadCount,
// //         page,
// //         pages: Math.ceil(total / limit),
// //       };
// //     } catch (error) {
// //       console.error("Fetch notifications error:", error);
// //       throw error;
// //     }
// //   }

// //   async markAsRead(notificationId, userId) {
// //     return await Notification.findOneAndUpdate({ _id: notificationId, user: userId }, { isRead: true }, { new: true });
// //   }

// //   async markAllAsRead(userId) {
// //     await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
// //     return true;
// //   }
// // }

// // export default new NotificationService();












// //above is working code ///// 16/10/25 Below is new claude code

// // server/src/services/notificationService.js
// import Notification from "../models/Notification.js"

// /**
//  * Create a notification for a single user
//  */
// export const createNotification = async (userId, type, title, message, data = {}) => {
//   if (!userId || !type || !title || !message) return

//   try {
//     const notification = new Notification({
//       user: userId,
//       type,
//       title,
//       message,
//       data,
//     })
//     await notification.save()
//     return notification
//   } catch (err) {
//     console.error("❌ Failed to create notification:", err)
//     throw err
//   }
// }

// /**
//  * Broadcast a notification to multiple users
//  */
// export const broadcastNotification = async (userIds, type, title, message, data = {}) => {
//   if (!Array.isArray(userIds) || userIds.length === 0) return

//   const notifications = userIds.map((userId) => ({
//     user: userId,
//     type,
//     title,
//     message,
//     data,
//   }))

//   try {
//     await Notification.insertMany(notifications)
//   } catch (err) {
//     console.error("❌ Failed to broadcast notifications:", err)
//     throw err
//   }
// }

// /**
//  * Send enrollment notification to a user
//  */
// export const sendEnrollmentNotification = async (userId, courseCode) => {
//   const title = `Enrolled in ${courseCode}`
//   const message = `You've been successfully enrolled in course ${courseCode}.`
//   return await createNotification(userId, "course_enrolled", title, message, { courseCode })
// }
// export default {
//   createNotification,
//   broadcastNotification,
//   sendEnrollmentNotification
// }









//server/src/services/notificationService.js

import Notification from "../models/Notification.js"


export const sendEnrollmentNotification = async ({ sender, recipient, message, relatedCourse }) => {
  const notification = new Notification({
    sender,
    recipient,
    message,
    relatedCourse,
  })

  await notification.save()
}


export const createNotification = async ({ sender, recipient, message, relatedCourse }) => {
  const notification = new Notification({
    sender,
    recipient,
    message,
    relatedCourse,
  })

  await notification.save()
}

export const createBulkNotifications = async ({ sender, recipients, message, relatedCourse }) => {
  const notifications = recipients.map((recipient) => ({
    sender,
    recipient,
    message,
    relatedCourse,
  }))

  await Notification.insertMany(notifications)
}

export const sendCourseNotification = async ({ sender, recipient, message, relatedCourse }) => {
  const notification = new Notification({
    sender,
    recipient,
    message,
    relatedCourse,
  })

  await notification.save()
}

const notificationService = {
  sendEnrollmentNotification,
  createNotification,
  createBulkNotifications,
}


export default notificationService
