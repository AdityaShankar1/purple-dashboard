// // server/src/models/Submission.js
// import mongoose from "mongoose";

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   originalName: String,
//   mimetype: String,
//   size: Number,
//   url: String,
//   checksum: String,
// }, { _id: false });

// const submissionSchema = new mongoose.Schema({
//   assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", index: true },
//   quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", index: true },
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
//   files: { type: [fileSchema], default: [] },   // for assignment uploads
//   answers: { type: Object, default: null },     // for quiz answers
//   submittedAt: { type: Date, default: Date.now, index: true },
//   status: { type: String, enum: ["on_time", "late"], required: true },
//   grade: { type: Number, min: 0, max: 100 },
//   feedback: { type: String, default: "" },
// }, { timestamps: true });

// // ✅ Guard: reuse existing model if already compiled
// export default mongoose.models.Submission || mongoose.model("Submission", submissionSchema);







import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Text answers
    text: { type: String, default: "" }, // new
    content: { type: String, default: "" }, // kept for backward compatibility

    // File links and embedded attachment (base64 or URL)
    fileUrl: { type: String, default: "" },
    attachment: {
      name: { type: String, default: "" },
      type: { type: String, default: "" },
      data: { type: String, default: "" }, // can store data URL or signed URL
    },

    submittedAt: { type: Date, default: Date.now },
    isLate: { type: Boolean, default: false },

    // grading
    grade: { type: Number, min: 0, default: null },
    feedback: { type: String, default: "" },
    status: { type: String, enum: ["submitted", "graded", "returned"], default: "submitted" },
    gradedAt: { type: Date },
    gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
)

// One submission per user per assignment
submissionSchema.index({ assignment: 1, user: 1 }, { unique: true })

export default mongoose.model("Submission", submissionSchema)
