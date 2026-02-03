// // // // // import mongoose from "mongoose"

// // // // // const certificateSchema = new mongoose.Schema(
// // // // //   {
// // // // //     user: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: "User",
// // // // //       required: true,
// // // // //     },
// // // // //     course: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: "Course",
// // // // //       required: true,
// // // // //     },
// // // // //     enrollment: {
// // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // //       ref: "Enrollment",
// // // // //       required: true,
// // // // //     },
// // // // //     certificateId: {
// // // // //       type: String,
// // // // //       required: true,
// // // // //       unique: true,
// // // // //     },
// // // // //     issuedAt: {
// // // // //       type: Date,
// // // // //       default: Date.now,
// // // // //     },
// // // // //     validUntil: {
// // // // //       type: Date,
// // // // //       default: () => {
// // // // //         return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
// // // // //       },
// // // // //     },
// // // // //     certificateUrl: String,
// // // // //     grade: {
// // // // //       type: String,
// // // // //       enum: ["A+", "A", "B+", "B", "C+", "C", "Pass"],
// // // // //       default: "Pass",
// // // // //     },
// // // // //     isVerified: {
// // // // //       type: Boolean,
// // // // //       default: true,
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     timestamps: true,
// // // // //   },
// // // // // )

// // // // // // Generate certificate ID before saving
// // // // // certificateSchema.pre("save", function (next) {
// // // // //   if (!this.certificateId) {
// // // // //     this.certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
// // // // //   }
// // // // //   next()
// // // // // })

// // // // // export default mongoose.model("Certificate", certificateSchema)





// // // // ///above is working code ///// 16/10/25 Below is new claude code






// // // // // server/src/models/Certificate.js
// // // // import mongoose from "mongoose";

// // // // const certificateSchema = new mongoose.Schema(
// // // //   {
// // // //     user: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     course: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "Course",
// // // //       required: true,
// // // //     },
// // // //     certificateId: {
// // // //       type: String,
// // // //       unique: true,
// // // //       required: true,
// // // //     },
// // // //     issuedAt: {
// // // //       type: Date,
// // // //       default: Date.now,
// // // //     },
// // // //     imageData: {
// // // //       type: String,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   }
// // // // );

// // // // certificateSchema.index({ user: 1, course: 1 }, { unique: true });

// // // // export default mongoose.model("Certificate", certificateSchema);













// // // import mongoose from "mongoose"

// // // const certificateSchema = new mongoose.Schema(
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
// // //     enrollment: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Enrollment",
// // //       required: true,
// // //     },
// // //     certificateId: {
// // //       type: String,
// // //       required: true,
// // //       unique: true,
// // //     },
// // //     issuedAt: {
// // //       type: Date,
// // //       default: Date.now,
// // //     },
// // //     validUntil: {
// // //       type: Date,
// // //       default: () => {
// // //         return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
// // //       },
// // //     },
// // //     certificateUrl: String,
// // //     grade: {
// // //       type: String,
// // //       enum: ["A+", "A", "B+", "B", "C+", "C", "Pass"],
// // //       default: "Pass",
// // //     },
// // //     isVerified: {
// // //       type: Boolean,
// // //       default: true,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   },
// // // )

// // // // Generate certificate ID before saving
// // // certificateSchema.pre("save", function (next) {
// // //   if (!this.certificateId) {
// // //     this.certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
// // //   }
// // //   next()
// // // })

// // // export default mongoose.model("Certificate", certificateSchema)







// // import mongoose from "mongoose"

// // const certificateSchema = new mongoose.Schema(
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
// //     enrollment: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Enrollment",
// //       required: true,
// //     },
// //     certificateId: {
// //       type: String,
// //       unique: true,
// //       required: true,
// //     },
// //     issuedAt: {
// //       type: Date,
// //       default: Date.now,
// //     },
// //     validUntil: Date,
// //     grade: String,
// //     score: Number,
// //     isVerified: {
// //       type: Boolean,
// //       default: true,
// //     },
// //     certificateUrl: String,
// //     shareToken: String,
// //   },
// //   { timestamps: true },
// // )

// // export default mongoose.model("Certificate", certificateSchema)








// const mongoose = require("mongoose")

// const certificateSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     certificateId: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     issuedDate: {
//       type: Date,
//       default: Date.now,
//     },
//     validUntil: Date,
//     grade: String,
//     score: Number,
//     isVerified: {
//       type: Boolean,
//       default: true,
//     },
//     certificateUrl: String,
//     shareToken: String,
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("Certificate", certificateSchema)
// export default Certificate;





import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    certificateId: { type: String, unique: true, required: true },
    issuedDate: { type: Date, default: Date.now },
    validUntil: Date,
    grade: String,
    score: Number,
    isVerified: { type: Boolean, default: true },
    certificateUrl: String,
    shareToken: String,
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
