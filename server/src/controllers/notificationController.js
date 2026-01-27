// // // //server/src/controllers/notificationController.js

// // // import Notification from "../models/Notification.js"
// // // import { createHttpError } from "../utils/errors.js"
// // // import { sendResponse } from "../utils/response.js"

// // // // Get user notifications
// // // export const getUserNotifications = async (req, res, next) => {
// // //   try {
// // //     const rawPage = parseInt(req.query.page);
// // //     const rawLimit = parseInt(req.query.limit);

// // //     const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
// // //     const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 20;
// // //     const skip = (page - 1) * limit;

// // //     const query = { recipient: req.user.id };
// // //     if (req.query.isRead !== undefined) {
// // //       query.isRead = req.query.isRead === "true";
// // //     }

// // //     const notifications = await Notification.find(query)
// // //       .populate("sender", "name")
// // //       .populate("relatedCourse", "title")
// // //       .sort({ createdAt: -1 })
// // //       .limit(limit)
// // //       .skip(skip);

// // //     const total = await Notification.countDocuments(query);
// // //     const unreadCount = await Notification.countDocuments({
// // //       recipient: req.user.id,
// // //       isRead: false,
// // //     });

// // //     sendResponse(res, 200, "Notifications fetched successfully", {
// // //       notifications,
// // //       totalPages: Math.ceil(total / limit),
// // //       currentPage: page,
// // //       total,
// // //       unreadCount,
// // //     });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };


// // // // Mark notification as read
// // // export const markAsRead = async (req, res, next) => {
// // //   try {
// // //     const notification = await Notification.findOneAndUpdate(
// // //       { _id: req.params.id, recipient: req.user.id },
// // //       { isRead: true, readAt: new Date() },
// // //       { new: true },
// // //     )

// // //     if (!notification) {
// // //       return next(createHttpError(404, "Notification not found"))
// // //     }

// // //     sendResponse(res, 200, "Notification marked as read", notification)
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Mark all notifications as read
// // // export const markAllAsRead = async (req, res, next) => {
// // //   try {
// // //     await Notification.updateMany({ recipient: req.user.id, isRead: false }, { isRead: true, readAt: new Date() })

// // //     sendResponse(res, 200, "All notifications marked as read")
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Delete notification
// // // export const deleteNotification = async (req, res, next) => {
// // //   try {
// // //     const notification = await Notification.findOneAndDelete({
// // //       _id: req.params.id,
// // //       recipient: req.user.id,
// // //     })

// // //     if (!notification) {
// // //       return next(createHttpError(404, "Notification not found"))
// // //     }

// // //     sendResponse(res, 200, "Notification deleted successfully")
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }






// // ////// above is working code //16/10/25 Below is new claude code




// // //server/src/controllers/notificationController.js
// // import notificationService from "../services/notificationService.js";

// // export const getUserNotifications = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { page = 1, limit = 20, unreadOnly = false } = req.query;

// //     const result = await notificationService.getUserNotifications(userId, {
// //       page: parseInt(page),
// //       limit: parseInt(limit),
// //       unreadOnly: unreadOnly === "true",
// //     });

// //     res.status(200).json({
// //       success: true,
// //       data: result,
// //     });
// //   } catch (error) {
// //     console.error("Get notifications error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch notifications",
// //       error: error.message,
// //     });
// //   }
// // };

// // export const markAsRead = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { notificationId } = req.params;

// //     const notification = await notificationService.markAsRead(notificationId, userId);

// //     if (!notification) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Notification not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: notification,
// //       message: "Notification marked as read",
// //     });
// //   } catch (error) {
// //     console.error("Mark as read error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to mark notification as read",
// //       error: error.message,
// //     });
// //   }
// // };

// // export const markAllAsRead = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     await notificationService.markAllAsRead(userId);

// //     res.status(200).json({
// //       success: true,
// //       message: "All notifications marked as read",
// //     });
// //   } catch (error) {
// //     console.error("Mark all as read error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to mark all notifications as read",
// //       error: error.message,
// //     });
// //   }
// // };

// // export const deleteNotification = async (req, res) => {
// //   try {
// //     const userId = req.user.id;
// //     const { notificationId } = req.params;

// //     const notification = await notificationService.deleteNotification(notificationId, userId);

// //     if (!notification) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Notification not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Notification deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error("Delete notification error:", error);
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to delete notification",
// //       error: error.message,
// //     });
// //   }
// // };






// //server/src/controllers/notificationController.js

// import Notification from "../models/Notification.js"
// import { createHttpError } from "../utils/errors.js"
// import { sendResponse } from "../utils/response.js"

// // Get user notifications with pagination
// export const getUserNotifications = async (req, res, next) => {
//   try {
//     const { page = 1, limit = 20, unreadOnly = false } = req.query
//     const query = { recipient: req.user.id }

//     if (unreadOnly === "true") {
//       query.isRead = false
//     }

//     const notifications = await Notification.find(query)
//       .populate("sender", "name")
//       .populate("relatedCourse", "title")
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit)

//     const total = await Notification.countDocuments(query)
//     const unreadCount = await Notification.countDocuments({
//       recipient: req.user.id,
//       isRead: false,
//     })

//     sendResponse(res, 200, "Notifications fetched successfully", {
//       notifications,
//       pages: Math.ceil(total / limit),
//       currentPage: page,
//       total,
//       unreadCount,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Mark notification as read
// export const markAsRead = async (req, res, next) => {
//   try {
//     const notification = await Notification.findOneAndUpdate(
//       { _id: req.params.id, recipient: req.user.id },
//       { isRead: true, readAt: new Date() },
//       { new: true }
//     )

//     if (!notification) {
//       return next(createHttpError(404, "Notification not found"))
//     }

//     sendResponse(res, 200, "Notification marked as read", notification)
//   } catch (error) {
//     next(error)
//   }
// }

// // Mark all notifications as read
// export const markAllAsRead = async (req, res, next) => {
//   try {
//     await Notification.updateMany(
//       { recipient: req.user.id, isRead: false },
//       { isRead: true, readAt: new Date() }
//     )

//     sendResponse(res, 200, "All notifications marked as read")
//   } catch (error) {
//     next(error)
//   }
// }

// // Delete notification
// export const deleteNotification = async (req, res, next) => {
//   try {
//     const notification = await Notification.findOneAndDelete({
//       _id: req.params.id,
//       recipient: req.user.id,
//     })

//     if (!notification) {
//       return next(createHttpError(404, "Notification not found"))
//     }

//     sendResponse(res, 200, "Notification deleted successfully")
//   } catch (error) {
//     next(error)
//   }
// }













import Notification from "../models/Notification.js"

export const createNotification = async (options) => {
  try {
    const { userId, type, title, message, courseId, itemId } = options

    const notification = new Notification({
      user: userId,
      type,
      title,
      message,
      relatedCourse: courseId,
      relatedItem: itemId,
    })

    await notification.save()
    return notification
  } catch (error) {
    console.error("Error creating notification:", error)
  }
}

export const getUserNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { unreadOnly } = req.query

    const query = { user: userId }
    if (unreadOnly === "true") {
      query.read = false
    }

    const notifications = await Notification.find(query)
      .populate("relatedCourse", "title")
      .sort({ createdAt: -1 })
      .limit(50)

    const unreadCount = await Notification.countDocuments({
      user: userId,
      read: false,
    })

    res.json({
      success: true,
      data: notifications,
      unreadCount,
    })
  } catch (error) {
    next(error)
  }
}

export const markNotificationRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true, readAt: new Date() },
      { new: true },
    )

    res.json({
      success: true,
      data: notification,
    })
  } catch (error) {
    next(error)
  }
}

export const markAllNotificationsRead = async (req, res, next) => {
  try {
    const userId = req.user._id

    await Notification.updateMany({ user: userId, read: false }, { read: true, readAt: new Date() })

    res.json({
      success: true,
      message: "All notifications marked as read",
    })
  } catch (error) {
    next(error)
  }
}
