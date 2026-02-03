// // // //server/src/models/Enrollment.js

// // // import mongoose from "mongoose"

// // // const enrollmentSchema = new mongoose.Schema(
// // //   {
// // //     user: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //     course: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Course",
// // //       required: true,
// // //     },
// // //     enrolledAt: {
// // //       type: Date,
// // //       default: Date.now,
// // //     },
// // //     status: {
// // //       type: String,
// // //       enum: ["active", "completed", "dropped"],
// // //       default: "active",
// // //     },
// // //     progress: {
// // //       type: Number,
// // //       default: 0,
// // //       min: 0,
// // //       max: 100,
// // //     },
// // //     completedAt: Date,
// // //     lastAccessedAt: {
// // //       type: Date,
// // //       default: Date.now,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   },
// // // )

// // // // Compound index to prevent duplicate enrollments
// // // enrollmentSchema.index({ user: 1, course: 1 }, { unique: true })

// // // export default mongoose.model("Enrollment", enrollmentSchema)








// // //// above is workig code ///// 16/10/25 Below is new claude code






// // // server/src/models/Enrollment.js
// // import mongoose from "mongoose";

// // const enrollmentSchema = new mongoose.Schema(
// //   {
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     course: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //       required: true,
// //     },
// //     status: {
// //       type: String,
// //       enum: ["active", "completed", "dropped"],
// //       default: "active",
// //     },
// //     progress: {
// //       type: Number,
// //       default: 0,
// //       min: 0,
// //       max: 100,
// //     },
// //     completedAt: {
// //       type: Date,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// // enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// // export default mongoose.model("Enrollment", enrollmentSchema);









// // const mongoose = require("mongoose")

// // const enrollmentSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     courseId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //       required: true,
// //     },
// //     status: {
// //       type: String,
// //       enum: ["ongoing", "completed", "dropped"],
// //       default: "ongoing",
// //     },
// //     enrolledAt: {
// //       type: Date,
// //       default: Date.now,
// //     },
// //     completedAt: Date,
// //     progress: {
// //       type: Number,
// //       default: 0,
// //     },
// //     materialsViewed: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Material",
// //       },
// //     ],
// //     quizzesAttempted: [
// //       {
// //         quizId: mongoose.Schema.Types.ObjectId,
// //         score: Number,
// //         attemptedAt: Date,
// //       },
// //     ],
// //     assignmentsSubmitted: [
// //       {
// //         assignmentId: mongoose.Schema.Types.ObjectId,
// //         submittedAt: Date,
// //         grade: String,
// //       },
// //     ],
// //   },
// //   { timestamps: true },
// // )

// // module.exports = mongoose.model("Enrollment", enrollmentSchema)
// // export default Enrollment;  







// import mongoose from "mongoose";

// const enrollmentSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
//     status: { type: String, enum: ["ongoing", "completed", "dropped"], default: "ongoing" },
//     enrolledAt: { type: Date, default: Date.now },
//     completedAt: Date,
//     progress: { type: Number, default: 0 },
//     materialsViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
//     quizzesAttempted: [
//       {
//         quizId: mongoose.Schema.Types.ObjectId,
//         score: Number,
//         attemptedAt: Date,
//       },
//     ],
//     assignmentsSubmitted: [
//       {
//         assignmentId: mongoose.Schema.Types.ObjectId,
//         submittedAt: Date,
//         grade: String,
//       },
//     ],
//   },
//   { timestamps: true },
// );

// const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
// export default Enrollment;








// server/src/models/Enrollment.js
// server/src/models/Enrollment.js
import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped', 'suspended'],
    default: 'active'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  lastAccessedAt: {
    type: Date
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
})

// Compound index to ensure a user can only enroll once per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })
enrollmentSchema.index({ status: 1 })

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment
