// // // // // import express from "express"
// // // // // import auth  from "../middleware/auth.js"
// // // // // import {
// // // // //   getUserNotifications,
// // // // //   markAsRead,
// // // // //   markAllAsRead,
// // // // //   deleteNotification,
// // // // // } from "../controllers/notificationController.js"

// // // // // const router = express.Router()

// // // // // // All routes require authentication
// // // // // router.use(auth)

// // // // // router.get("/", getUserNotifications)
// // // // // router.patch("/:id/read", markAsRead)
// // // // // router.patch("/read-all", markAllAsRead)
// // // // // router.delete("/:id", deleteNotification)

// // // // // export default router










// // // // import express from "express";
// // // // import { requireAuth } from "../middleware/auth.js"; // Use named import for requireAuth
// // // // import {
// // // //   getUserNotifications,
// // // //   markAsRead,
// // // //   markAllAsRead,
// // // //   deleteNotification,
// // // // } from "../controllers/notificationController.js";

// // // // const router = express.Router();

// // // // // All routes require authentication
// // // // router.use(requireAuth); // Use requireAuth here

// // // // router.get("/", getUserNotifications);
// // // // router.patch("/:id/read", markAsRead);
// // // // router.patch("/read-all", markAllAsRead);
// // // // router.delete("/:id", deleteNotification);

// // // // export default router;






// // // //server/src/routes/notificationRoutes.js

// // // import express from "express";
// // // import { requireAuth } from "../middleware/auth.js";
// // // import Notification from "../models/Notification.js";
// // // import { io } from "../config/socket.js";


// // // const router = express.Router();

// // // class NotificationService {
// // //   async createNotification({ users, type, title, message, data }) {
// // //     try {
// // //       const notifications = users.map((userId) => ({
// // //         user: userId,
// // //         type,
// // //         title,
// // //         message,
// // //         data,
// // //         isRead: false,
// // //       }));

// // //       const createdNotifications = await Notification.insertMany(notifications);

// // //       users.forEach((userId, index) => {
// // //         io.to(userId.toString()).emit("new_notification", createdNotifications[index]);
// // //       });

// // //       return createdNotifications;
// // //     } catch (error) {
// // //       console.error("Error creating notification:", error);
// // //       throw error;
// // //     }
// // //   }
// // // async getUserNotifications(userId, { page = 1, limit = 20, unreadOnly = false }) {
// // //   try {
// // //     const query = { user: userId };
// // //     if (unreadOnly) {
// // //       query.isRead = false;
// // //     }

// // //     // Sanitize pagination values
// // //     const safePage = Number.isFinite(parseInt(page)) && parseInt(page) > 0 ? parseInt(page) : 1;
// // //     const safeLimit = Number.isFinite(parseInt(limit)) && parseInt(limit) > 0 ? parseInt(limit) : 20;
// // //     const skip = (safePage - 1) * safeLimit;

// // //     const notifications = await Notification.find(query)
// // //       .sort({ createdAt: -1 })
// // //       .skip(skip)
// // //       .limit(safeLimit)
// // //       .lean();

// // //     const total = await Notification.countDocuments(query);
// // //     const unreadCount = await Notification.countDocuments({
// // //       user: userId,
// // //       isRead: false,
// // //     });

// // //     return {
// // //       notifications,
// // //       total,
// // //       unreadCount,
// // //       page: safePage,
// // //       pages: Math.ceil(total / safeLimit),
// // //     };
// // //   } catch (error) {
// // //     console.error("Error fetching notifications:", error);
// // //     throw error;
// // //   }
// // // }


// // //   async markAsRead(notificationId, userId) {
// // //     try {
// // //       const notification = await Notification.findOneAndUpdate(
// // //         { _id: notificationId, user: userId },
// // //         { isRead: true },
// // //         { new: true }
// // //       );

// // //       return notification;
// // //     } catch (error) {
// // //       console.error("Error marking notification as read:", error);
// // //       throw error;
// // //     }
// // //   }

// // //   async markAllAsRead(userId) {
// // //     try {
// // //       const result = await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
// // //       return result;
// // //     } catch (error) {
// // //       console.error("Error marking all notifications as read:", error);
// // //       throw error;
// // //     }
// // //   }

// // //   async deleteNotification(notificationId, userId) {
// // //     try {
// // //       const result = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
// // //       return result;
// // //     } catch (error) {
// // //       console.error("Error deleting notification:", error);
// // //       throw error;
// // //     }
// // //   }
// // // }

// // // const notificationService = new NotificationService();

// // // const getUserNotifications = async (req, res) => {
// // //   try {
// // //     const userId = req.user._id; 
// // //     const { page, limit, unreadOnly } = req.query;

// // //     const data = await notificationService.getUserNotifications(userId, {
// // //       page: parseInt(page),
// // //       limit: parseInt(limit),
// // //       unreadOnly: unreadOnly === 'true',
// // //     });

// // //     res.status(200).json({ success: true, data });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Failed to fetch notifications." });
// // //   }
// // // };

// // // const markAsRead = async (req, res) => {
// // //   try {
// // //     const userId = req.user._id;
// // //     const { id: notificationId } = req.params;

// // //     const notification = await notificationService.markAsRead(notificationId, userId);

// // //     if (!notification) {
// // //       return res.status(404).json({ success: false, message: "Notification not found or unauthorized." });
// // //     }

// // //     res.status(200).json({ success: true, message: "Notification marked as read.", data: notification });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Failed to mark notification as read." });
// // //   }
// // // };

// // // const markAllAsRead = async (req, res) => {
// // //   try {
// // //     const userId = req.user._id;

// // //     await notificationService.markAllAsRead(userId);

// // //     res.status(200).json({ success: true, message: "All notifications marked as read." });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Failed to mark all notifications as read." });
// // //   }
// // // };

// // // const deleteNotification = async (req, res) => {
// // //   try {
// // //     const userId = req.user._id;
// // //     const { id: notificationId } = req.params;

// // //     const deleted = await notificationService.deleteNotification(notificationId, userId);

// // //     if (!deleted) {
// // //       return res.status(404).json({ success: false, message: "Notification not found or unauthorized." });
// // //     }

// // //     res.status(200).json({ success: true, message: "Notification deleted successfully." });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Failed to delete notification." });
// // //   }
// // // };

// // // router.use(requireAuth); 

// // // router.get("/", getUserNotifications);
// // // router.patch("/:id/read", markAsRead);
// // // router.patch("/read-all", markAllAsRead);
// // // router.delete("/:id", deleteNotification);

// // // export default router;

// // // export { notificationService };




// // /////above is working code/////16/10/25 Below is new claude code



// // //server/src/routes/notificationRoutes.js

// // import express from "express";
// // import {
// //   getUserNotifications,
// //   markAsRead,
// //   markAllAsRead,
// //   deleteNotification,
// // } from "../controllers/notificationController.js";
// // import { requireAuth } from "../middleware/auth.js"

// // const router = express.Router();

// // router.use(requireAuth);

// // router.get("/my-notifications", getUserNotifications);
// // router.patch("/:notificationId/read", markAsRead);
// // router.patch("/mark-all-read", markAllAsRead);
// // router.delete("/:notificationId", deleteNotification);

// // export default router;










// import express from "express"
// import { requireAuth }from "../middleware/auth.js"
// import {
//   getUserNotifications,
//   markAsRead,
//   markAllAsRead,
//   deleteNotification,
// } from "../controllers/notificationController.js"

// const router = express.Router()

// // All routes require authentication
// router.use(requireAuth)

// router.get("/my-notifications", getUserNotifications)
// router.patch("/:id/read", markAsRead)
// router.patch("/mark-all-read", markAllAsRead)
// router.delete("/:id", deleteNotification)

// export default router








import express from "express"
import { requireAuth } from "../middleware/auth.js"
import * as notificationController from "../controllers/notificationController.js"

const router = express.Router()

router.get("/", requireAuth, notificationController.getUserNotifications)
router.patch("/:notificationId/read", requireAuth, notificationController.markNotificationRead)
router.patch("/read-all", requireAuth, notificationController.markAllNotificationsRead)

export default router
