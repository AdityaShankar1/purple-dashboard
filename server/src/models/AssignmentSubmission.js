// // // // // // // //server/src/models/AssignmentSubmission.js
// // // // // // // import mongoose from "mongoose"

// // // // // // // const AssignmentSubmissionSchema = new mongoose.Schema(
// // // // // // //   {
// // // // // // //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
// // // // // // //     course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
// // // // // // //     assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true, index: true },
// // // // // // //     fileUrl: { type: String },
// // // // // // //     file: {
// // // // // // //       name: { type: String },
// // // // // // //       type: { type: String },
// // // // // // //       data: { type: String }, // base64 dataURL when sent from client; replace with real uploader in prod
// // // // // // //     },
// // // // // // //     textAnswer: { type: String },
// // // // // // //     submittedAt: { type: Date },
// // // // // // //     allowResubmit: { type: Boolean, default: false },
// // // // // // //     grade: { type: Number }, // optional
// // // // // // //     feedback: { type: String }, // optional
// // // // // // //   },
// // // // // // //   { timestamps: true },
// // // // // // // )

// // // // // // // export default mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema)










// // // // // // // ============================================
// // // // // // // server/src/models/AssignmentSubmission.js
// // // // // // // ============================================
// // // // // // import mongoose from "mongoose";

// // // // // // const assignmentSubmissionSchema = new mongoose.Schema(
// // // // // //   {
// // // // // //     assignment: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "Assignment",
// // // // // //       required: true,
// // // // // //     },
// // // // // //     student: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "User",
// // // // // //       required: true,
// // // // // //     },
// // // // // //     text: {
// // // // // //       type: String,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     attachment: {
// // // // // //       name: String,
// // // // // //       type: String,
// // // // // //       data: String, // base64 or URL
// // // // // //     },
// // // // // //     submittedAt: {
// // // // // //       type: Date,
// // // // // //       default: Date.now,
// // // // // //     },
// // // // // //     grade: {
// // // // // //       type: Number,
// // // // // //       min: 0,
// // // // // //       max: 100,
// // // // // //     },
// // // // // //     feedback: {
// // // // // //       type: String,
// // // // // //       trim: true,
// // // // // //     },
// // // // // //     gradedBy: {
// // // // // //       type: mongoose.Schema.Types.ObjectId,
// // // // // //       ref: "User",
// // // // // //     },
// // // // // //     gradedAt: {
// // // // // //       type: Date,
// // // // // //     },
// // // // // //     canResubmit: {
// // // // // //       type: Boolean,
// // // // // //       default: false,
// // // // // //     },
// // // // // //   },
// // // // // //   {
// // // // // //     timestamps: true,
// // // // // //   }
// // // // // // );

// // // // // // // Compound index to ensure one submission per student per assignment
// // // // // // assignmentSubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

// // // // // // export default mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);







// // // // // import mongoose from "mongoose"

// // // // // const AttachmentSchema = new mongoose.Schema(
// // // // //   {
// // // // //     name: String,
// // // // //     type: String,
// // // // //     data: String, // Data URL / base64 string
// // // // //   },
// // // // //   { _id: false },
// // // // // )

// // // // // const AssignmentSubmissionSchema = new mongoose.Schema(
// // // // //   {
// // // // //     assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true, index: true },
// // // // //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
// // // // //     text: { type: String, default: "" },
// // // // //     attachment: { type: AttachmentSchema, default: null },
// // // // //     submittedAt: { type: Date, default: Date.now },
// // // // //     grade: { type: Number, min: 0, max: 100 },
// // // // //     feedback: { type: String },
// // // // //   },
// // // // //   { timestamps: true },
// // // // // )

// // // // // AssignmentSubmissionSchema.index({ assignment: 1, user: 1 }, { unique: true })

// // // // // export default mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema)






// // // // //above is working code ///// 16/10/25 Below is new claude code





// // // // // server/src/models/AssignmentSubmission.js
// // // // import mongoose from "mongoose";

// // // // const assignmentSubmissionSchema = new mongoose.Schema(
// // // //   {
// // // //     assignment: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "Assignment",
// // // //       required: true,
// // // //     },
// // // //     student: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //       required: true,
// // // //     },
// // // //     text: {
// // // //       type: String,
// // // //       trim: true,
// // // //     },
// // // //     attachment: {
// // // //       name: String,
// // // //       type: String,
// // // //       data: String,
// // // //     },
// // // //     submittedAt: {
// // // //       type: Date,
// // // //       default: Date.now,
// // // //     },
// // // //     grade: {
// // // //       type: Number,
// // // //       min: 0,
// // // //       max: 100,
// // // //     },
// // // //     feedback: {
// // // //       type: String,
// // // //       trim: true,
// // // //     },
// // // //     gradedBy: {
// // // //       type: mongoose.Schema.Types.ObjectId,
// // // //       ref: "User",
// // // //     },
// // // //     gradedAt: {
// // // //       type: Date,
// // // //     },
// // // //   },
// // // //   {
// // // //     timestamps: true,
// // // //   }
// // // // );

// // // // assignmentSubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

// // // // export default mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);












// // // //server/src/models/AssignmentSubmission.js
// // // import mongoose from "mongoose"

// // // const AttachmentSchema = new mongoose.Schema(
// // //   {
// // //     name: String,
// // //     type: String,
// // //     data: String, // Data URL / base64 string
// // //   },
// // //   { _id: false },
// // // )

// // // const AssignmentSubmissionSchema = new mongoose.Schema(
// // //   {
// // //     assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true, index: true },
// // //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
// // //     text: { type: String, default: "" },
// // //     attachment: { type: AttachmentSchema, default: null },
// // //     submittedAt: { type: Date, default: Date.now },
// // //     grade: { type: Number, min: 0, max: 100 },
// // //     feedback: { type: String },
// // //   },
// // //   { timestamps: true },
// // // )

// // // AssignmentSubmissionSchema.index({ assignment: 1, user: 1 }, { unique: true })

// // // export default mongoose.model("AssignmentSubmission", AssignmentSubmissionSchema)





// // import mongoose from "mongoose"

// // const assignmentSubmissionSchema = new mongoose.Schema(
// //   {
// //     assignment: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Assignment",
// //       required: true,
// //     },
// //     enrollment: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Enrollment",
// //       required: true,
// //     },
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     submissionText: String,
// //     submissionFile: String,
// //     fileSize: Number,
// //     submitted: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     submittedAt: Date,
// //     dueDate: Date,
// //     isLate: Boolean,
// //     grade: Number,
// //     maxGrade: Number,
// //     feedback: String,
// //     status: {
// //       type: String,
// //       enum: ["draft", "submitted", "graded"],
// //       default: "draft",
// //     },
// //   },
// //   { timestamps: true },
// // )

// // export default mongoose.model("AssignmentSubmission", assignmentSubmissionSchema)









// const mongoose = require("mongoose")

// const assignmentSubmissionSchema = new mongoose.Schema(
//   {
//     assignment: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Assignment",
//       required: true,
//     },
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
//     submissionText: String,
//     submissionFile: String,
//     fileSize: Number,
//     submitted: {
//       type: Boolean,
//       default: false,
//     },
//     submittedAt: Date,
//     dueDate: Date,
//     isLate: Boolean,
//     grade: Number,
//     maxGrade: {
//       type: Number,
//       default: 100,
//     },
//     feedback: String,
//     status: {
//       type: String,
//       enum: ["draft", "submitted", "graded"],
//       default: "draft",
//     },
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema)













import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    submissionText: String,
    submissionFile: String,
    fileSize: Number,
    submitted: { type: Boolean, default: false },
    submittedAt: Date,
    dueDate: Date,
    isLate: Boolean,
    grade: Number,
    maxGrade: { type: Number, default: 100 },
    feedback: String,
    status: { type: String, enum: ["draft", "submitted", "graded"], default: "draft" },
  },
  { timestamps: true }
);

const AssignmentSubmission = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);
export default AssignmentSubmission;
