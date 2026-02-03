// // const mongoose = require("mongoose")

// // const materialSchema = new mongoose.Schema(
// //   {
// //     course: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Course",
// //       required: true,
// //     },
// //     title: {
// //       type: String,
// //       required: true,
// //     },
// //     description: String,
// //     type: {
// //       type: String,
// //       enum: ["pdf", "video", "document", "image", "link"],
// //       required: true,
// //     },
// //     fileUrl: String,
// //     fileSize: Number,
// //     duration: Number, // for videos in seconds
// //     uploadedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     order: {
// //       type: Number,
// //       default: 0,
// //     },
// //     isPublished: {
// //       type: Boolean,
// //       default: true,
// //     },
// //   },
// //   { timestamps: true },
// // )

// // module.exports = mongoose.model("Material", materialSchema)
// // export default Material;    







// import mongoose from "mongoose";

// const materialSchema = new mongoose.Schema(
//   {
//     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
//     title: { type: String, required: true },
//     description: String,
//     type: { type: String, enum: ["pdf", "video", "document", "image", "link"], required: true },
//     fileUrl: String,
//     fileSize: Number,
//     duration: Number, // for videos in seconds
//     uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     order: { type: Number, default: 0 },
//     isPublished: { type: Boolean, default: true },
//   },
//   { timestamps: true },
// );

// const Material = mongoose.model("Material", materialSchema);
// export default Material;









// // server/src/models/Material.js
// import mongoose from 'mongoose'

// const materialSchema = new mongoose.Schema({
//   courseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Course',
//     required: true
//   },
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['video', 'pdf', 'document', 'link', 'other'],
//     required: true
//   },
//   url: {
//     type: String
//   },
//   fileUrl: {
//     type: String
//   },
//   duration: {
//     type: Number, // in seconds
//     default: 0
//   },
//   order: {
//     type: Number,
//     default: 0
//   },
//   isPublished: {
//     type: Boolean,
//     default: true
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, {
//   timestamps: true
// })

// // Indexes
// materialSchema.index({ courseId: 1, order: 1 })

// const Material = mongoose.model('Material', materialSchema)
// export default Material







import mongoose from "mongoose"

const materialSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ["video", "pdf", "document", "link", "other"],
      required: true,
    },
    url: { type: String },       // external link
    fileUrl: { type: String },   // uploaded file path
    duration: { type: Number, default: 0 }, // in seconds
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true }, // ✅ visible to users by default
  },
  { timestamps: true }
)

export default mongoose.model("Material", materialSchema)
