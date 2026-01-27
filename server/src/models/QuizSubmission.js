// const mongoose = require("mongoose")

// const quizSubmissionSchema = new mongoose.Schema(
//   {
//     quiz: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Quiz",
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
//     answers: [
//       {
//         questionId: mongoose.Schema.Types.ObjectId,
//         answer: mongoose.Schema.Types.Mixed,
//         isCorrect: Boolean,
//         pointsEarned: Number,
//       },
//     ],
//     score: Number,
//     totalPoints: Number,
//     percentage: Number,
//     submitted: {
//       type: Boolean,
//       default: false,
//     },
//     submittedAt: Date,
//     startedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     timeSpent: Number,
//     status: {
//       type: String,
//       enum: ["in-progress", "submitted", "graded"],
//       default: "in-progress",
//     },
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("QuizSubmission", quizSubmissionSchema)
// export default QuizSubmission;  







import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    answers: [
      {
        questionId: mongoose.Schema.Types.ObjectId,
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        pointsEarned: Number,
      },
    ],
    score: Number,
    totalPoints: Number,
    percentage: Number,
    submitted: { type: Boolean, default: false },
    submittedAt: Date,
    startedAt: { type: Date, default: Date.now },
    timeSpent: Number,
    status: { type: String, enum: ["in-progress", "submitted", "graded"], default: "in-progress" },
  },
  { timestamps: true }
);

const QuizSubmission = mongoose.model("QuizSubmission", quizSubmissionSchema);
export default QuizSubmission;
