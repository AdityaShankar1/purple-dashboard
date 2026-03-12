// // // // // // // // server/src/models/Assignment.js
// // // // // // // // import mongoose from "mongoose";

// // // // // // // // const fileSchema = new mongoose.Schema({
// // // // // // // //   filename: String,
// // // // // // // //   originalName: String,
// // // // // // // //   mimetype: String,
// // // // // // // //   size: Number,
// // // // // // // //   url: String,             // public/secured URL
// // // // // // // //   checksum: String,        // optional integrity
// // // // // // // // }, { _id: false });

// // // // // // // // const assignmentSchema = new mongoose.Schema({
// // // // // // // //   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
// // // // // // // //   title: { type: String, required: true, trim: true },
// // // // // // // //   description: { type: String, default: "" },
// // // // // // // //   questionFiles: { type: [fileSchema], default: [] }, // PDF, DOCX, PPT, TXT
// // // // // // // //   startAt: { type: Date, required: true, index: true },
// // // // // // // //   dueAt: { type: Date, required: true, index: true },
// // // // // // // //   visibility: { type: String, enum: ["draft", "published"], default: "published" },
// // // // // // // //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // // // // // //   stats: {
// // // // // // // //     totalAssigned: { type: Number, default: 0 },
// // // // // // // //     totalSubmitted: { type: Number, default: 0 },
// // // // // // // //     totalLate: { type: Number, default: 0 },
// // // // // // // //   },
// // // // // // // // }, { timestamps: true });

// // // // // // // // assignmentSchema.index({ courseId: 1, dueAt: 1 });
// // // // // // // // export default mongoose.model("Assignment", assignmentSchema);















// // // // // // // // server/src/models/Assignment.js

// // // // // // // import mongoose from "mongoose";

// // // // // // // const fileSchema = new mongoose.Schema(
// // // // // // //   {
// // // // // // //     filename: String,
// // // // // // //     originalName: String,
// // // // // // //     mimetype: String,
// // // // // // //     size: Number,
// // // // // // //     url: String,      // local or cloud URL
// // // // // // //     checksum: String, // optional integrity
// // // // // // //   },
// // // // // // //   { _id: false }
// // // // // // // );

// // // // // // // const assignmentSchema = new mongoose.Schema(
// // // // // // //   {
// // // // // // //     courseId: {
// // // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // // //       ref: "Course",
// // // // // // //       required: true,
// // // // // // //       index: true,
// // // // // // //     },
// // // // // // //     title: {
// // // // // // //       type: String,
// // // // // // //       required: true,
// // // // // // //       trim: true,
// // // // // // //       maxlength: [200, "Title cannot exceed 200 characters"],
// // // // // // //     },
// // // // // // //     description: {
// // // // // // //       type: String,
// // // // // // //       default: "",
// // // // // // //     },

// // // // // // //     // ✅ Flexible file handling
// // // // // // //     questionFiles: { type: [fileSchema], default: [] }, // multiple uploads
// // // // // // //     fileUrl: { type: String }, // optional single S3 URL
// // // // // // //     fileType: {
// // // // // // //       type: String,
// // // // // // //       enum: ["PDF", "DOCX", "PPTX", "TXT"],
// // // // // // //     },

// // // // // // //     // ✅ Deadlines
// // // // // // //     startAt: { type: Date, required: true, index: true },
// // // // // // //     dueAt: { type: Date, required: true, index: true },

// // // // // // //     // ✅ Visibility & ownership
// // // // // // //     visibility: {
// // // // // // //       type: String,
// // // // // // //       enum: ["draft", "published"],
// // // // // // //       default: "published",
// // // // // // //     },
// // // // // // //     createdBy: {
// // // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // // //       ref: "User",
// // // // // // //       required: true,
// // // // // // //     },

// // // // // // //     // ✅ Stats for admin dashboards
// // // // // // //     stats: {
// // // // // // //       totalAssigned: { type: Number, default: 0 },
// // // // // // //       totalSubmitted: { type: Number, default: 0 },
// // // // // // //       totalLate: { type: Number, default: 0 },
// // // // // // //     },
// // // // // // //   },
// // // // // // //   { timestamps: true }
// // // // // // // );

// // // // // // // // ✅ Indexes for efficient queries
// // // // // // // assignmentSchema.index({ courseId: 1, dueAt: 1 });
// // // // // // // assignmentSchema.index({ dueAt: 1, courseId: 1 });

// // // // // // // export default mongoose.models.Assignment ||
// // // // // // //   mongoose.model("Assignment", assignmentSchema);





// // // // // // //server/src/models/Assignment.js

// // // // // // import mongoose from "mongoose"

// // // // // // const AssignmentSchema = new mongoose.Schema(
// // // // // //   {
// // // // // //     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
// // // // // //     title: { type: String, required: true },
// // // // // //     description: { type: String },
// // // // // //     instructions: { type: String },
// // // // // //     dueAt: { type: Date },
// // // // // //     isPublished: { type: Boolean, default: false },
// // // // // //     maxAttempts: { type: Number, default: 1 }, // We still enforce single submission in controller
// // // // // //     attachment: {
// // // // // //       // optional admin-provided reference file
// // // // // //       name: { type: String },
// // // // // //       type: { type: String },
// // // // // //       data: { type: String }, // e.g. base64 dataURL if you store inline
// // // // // //     },
// // // // // //   },
// // // // // //   { timestamps: true },
// // // // // // )

// // // // // // export default mongoose.model("Assignment", AssignmentSchema)








// // // // // // ============================================
// // // // // // server/src/models/Assignment.js
// // // // // // ============================================
// // // // // // import mongoose from "mongoose";

// // // // // // const assignmentSchema = new mongoose.Schema(
// // // // // //   {
// // // // // //     course: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "Course",
// // // // // //       required: true,
// // // // // //     },
// // // // // //     title: {
// // // // // //       type: String,
// // // // // //       required: true,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     description: {
// // // // // //       type: String,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     instructions: {
// // // // // //       type: String,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     attachment: {
// // // // // //       name: String,
// // // // // //       type: String,
// // // // // //       data: String, // base64 or URL
// // // // // //     },
// // // // // //     dueAt: {
// // // // // //       type: Date,
// // // // // //     },
// // // // // //     isPublished: {
// // // // // //       type: Boolean,
// // // // // //       default: false,
// // // // // //     },
// // // // // //     createdBy: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "User",
// // // // // //       required: true,
// // // // // //     },
// // // // // //   },
// // // // // //   {
// // // // // //     timestamps: true,
// // // // // //   }
// // // // // // );

// // // // // // // Index for efficient queries
// // // // // // assignmentSchema.index({ course: 1, isPublished: 1 });
// // // // // // assignmentSchema.index({ createdBy: 1 });

// // // // // // export default mongoose.model("Assignment", assignmentSchema);



// // // // // import mongoose from "mongoose";

// // // // // const attachmentSchema = new mongoose.Schema({
// // // // //   name: String,
// // // // //   type: String,
// // // // //   data: String, // base64 string
// // // // // });

// // // // // const submissionSchema = new mongoose.Schema({
// // // // //   student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // // //   text: String,
// // // // //   attachment: attachmentSchema,
// // // // //   submittedAt: { type: Date, default: Date.now },
// // // // //   grade: Number,
// // // // //   feedback: String,
// // // // //   allowResubmit: { type: Boolean, default: false },
// // // // // });

// // // // // const assignmentSchema = new mongoose.Schema(
// // // // //   {
// // // // //     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
// // // // //     title: { type: String, required: true },
// // // // //     description: String,
// // // // //     instructions: String,
// // // // //     dueAt: Date,
// // // // //     isPublished: { type: Boolean, default: false },
// // // // //     attachment: attachmentSchema,
// // // // //     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // // //     submissions: [submissionSchema],
// // // // //   },
// // // // //   { timestamps: true }
// // // // // );

// // // // // export default mongoose.model("Assignment", assignmentSchema);









// // // // import mongoose from "mongoose"

// // // // const assignmentSchema = new mongoose.Schema(
// // // //   {
// // // //     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
// // // //     title: { type: String, required: true, trim: true, maxlength: 140 },
// // // //     description: { type: String, default: "" },
// // // //     dueDate: { type: Date, required: true },
// // // //     totalPoints: { type: Number, default: 100, min: 1, max: 1000 },
// // // //     attachments: [{ type: String }],
// // // //     isPublished: { type: Boolean, default: true },
// // // //     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // //   },
// // // //   { timestamps: true },
// // // // )

// // // // assignmentSchema.index({ course: 1, dueDate: 1 })
// // // // assignmentSchema.index({ createdBy: 1, course: 1 })

// // // // export default mongoose.model("Assignment", assignmentSchema)







// // // //////above is working code ///// 16/10/25 Below is new claude code








// // // // server/src/models/Assignment.js
// // // import mongoose from "mongoose";

// // // const assignmentSchema = new mongoose.Schema(
// // //   {
// // //     course: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Course",
// // //       required: true,
// // //     },
// // //     title: {
// // //       type: String,
// // //       required: true,
// // //       trim: true,
// // //     },
// // //     description: {
// // //       type: String,
// // //       trim: true,
// // //     },
// // //     instructions: {
// // //       type: String,
// // //       trim: true,
// // //     },
// // //     attachment: {
// // //       name: String,
// // //       type: String,
// // //       data: String,
// // //     },
// // //     dueAt: {
// // //       type: Date,
// // //     },
// // //     isPublished: {
// // //       type: Boolean,
// // //       default: false,
// // //     },
// // //     createdBy: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "User",
// // //       required: true,
// // //     },
// // //   },
// // //   {
// // //     timestamps: true,
// // //   }
// // // );

// // // assignmentSchema.index({ course: 1, isPublished: 1 });

// // // export default mongoose.model("Assignment", assignmentSchema);








// // // server/src/models/Assignment.js
// // import mongoose from "mongoose"

// // const assignmentSchema = new mongoose.Schema(
// //   {
// //     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
// //     title: { type: String, required: true, trim: true, maxlength: 140 },
// //     description: { type: String, default: "" },
// //     dueDate: { type: Date, required: true },
// //     totalPoints: { type: Number, default: 100, min: 1, max: 1000 },
// //     attachments: [{ type: String }],
// //     isPublished: { type: Boolean, default: true },
// //     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //   },
// //   { timestamps: true },
// // )

// // assignmentSchema.index({ course: 1, dueDate: 1 })
// // assignmentSchema.index({ createdBy: 1, course: 1 })

// // export default mongoose.model("Assignment", assignmentSchema)







// const mongoose = require("mongoose")

// const assignmentSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: String,
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     dueDate: Date,
//     maxScore: {
//       type: Number,
//       default: 100,
//     },
//     isPublished: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("Assignment", assignmentSchema)
// export default Assignment;








import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    instructions: String,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dueDate: Date,
    maxGrade: { type: Number, default: 100 },
    attachment: String,
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
