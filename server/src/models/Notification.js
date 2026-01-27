// // // // import mongoose from "mongoose"

// // // // const notificationSchema = new mongoose.Schema(
// // // //   {
// // // //     recipient: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     sender: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //     },
// // // //     type: {
// // // //       type: String,
// // // //       enum: [
// // // //         "course_created",
// // // //         "course_updated",
// // // //         "course_deleted",
// // // //         "enrollment_success",
// // // //         "course_completed",
// // // //         "certificate_issued",
// // // //         "system",
// // // //       ],
// // // //       required: true,
// // // //     },
// // // //     title: {
// // // //       type: String,
// // // //       required: true,
// // // //       maxlength: [100, "Title cannot exceed 100 characters"],
// // // //     },
// // // //     message: {
// // // //       type: String,
// // // //       required: true,
// // // //       maxlength: [500, "Message cannot exceed 500 characters"],
// // // //     },
// // // //     relatedCourse: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "Course",
// // // //     },
// // // //     isRead: {
// // // //       type: Boolean,
// // // //       default: false,
// // // //     },
// // // //     readAt: Date,
// // // //     priority: {
// // // //       type: String,
// // // //       enum: ["low", "medium", "high"],
// // // //       default: "medium",
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   },
// // // // )

// // // // // Index for efficient querying
// // // // notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 })

// // // // export default mongoose.model("Notification", notificationSchema)









// // // //above is working code ///// 16/10/25 Below is new claude code





// // // //server/src/models/Notification.js
// // // import mongoose from "mongoose";

// // // const notificationSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //       index: true,
// // //     },
// // //     type: {
// // //       type: String,
// // //       required: true,
// // //       enum: [
// // //         "course_enrolled",
// // //         "assignment_created",
// // //         "assignment_updated",
// // //         "assignment_deleted",
// // //         "assignment_graded",
// // //         "quiz_created",
// // //         "quiz_updated",
// // //         "quiz_deleted",
// // //         "quiz_graded",
// // //         "certificate_issued",
// // //         "resubmit_allowed",
// // //       ],
// // //     },
// // //     title: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     message: {
// // //       type: String,
// // //       required: true,
// // //     },
// // //     data: {
// // //       type: mongoose.Schema.Types.Mixed,
// // //       default: {},
// // //     },
// // //     isRead: {
// // //       type: Boolean,
// // //       default: false,
// // //       index: true,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   }
// // // );

// // // notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });

// // // const Notification = mongoose.model("Notification", notificationSchema);

// // // export default Notification;











// // import mongoose from "mongoose"

// // const notificationSchema = new mongoose.Schema(
// //   {
// //     recipient: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     sender: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //     },
// //     type: {
// //       type: String,
// //       enum: [
// //         "course_enrolled",
// //         "assignment_created",
// //         "assignment_updated",
// //         "assignment_deleted",
// //         "assignment_graded",
// //         "quiz_created",
// //         "quiz_updated",
// //         "quiz_deleted",
// //         "quiz_graded",
// //         "certificate_issued",
// //         "resubmit_allowed",
// //         "course_completed",
// //         "system",
// //       ],
// //       required: true,
// //     },
// //     title: {
// //       type: String,
// //       required: true,
// //       maxlength: [100, "Title cannot exceed 100 characters"],
// //     },
// //     message: {
// //       type: String,
// //       required: true,
// //       maxlength: [500, "Message cannot exceed 500 characters"],
// //     },
// //     relatedCourse: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //     },
// //     isRead: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     readAt: Date,
// //     priority: {
// //       type: String,
// //       enum: ["low", "medium", "high"],
// //       default: "medium",
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   },
// // )

// // // Index for efficient querying
// // notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 })

// // export default mongoose.model("Notification", notificationSchema)








// const mongoose = require("mongoose")

// const notificationSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["material", "quiz", "assignment", "certificate", "course", "general"],
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     relatedCourse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },
//     relatedItem: {
//       type: mongoose.Schema.Types.ObjectId,
//     },
//     read: {
//       type: Boolean,
//       default: false,
//     },
//     readAt: Date,
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("Notification", notificationSchema)
// export default Notification;









import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["material", "quiz", "assignment", "certificate", "course", "general"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    relatedItem: { type: mongoose.Schema.Types.ObjectId },
    read: { type: Boolean, default: false },
    readAt: Date,
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
