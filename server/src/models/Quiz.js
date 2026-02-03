// const mongoose = require("mongoose")

// const quizSchema = new mongoose.Schema(
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
//     questions: [
//       {
//         questionText: String,
//         type: {
//           type: String,
//           enum: ["mcq", "multiple", "fillup"],
//         },
//         options: [String],
//         correctAnswer: String,
//         points: Number,
//       },
//     ],
//     totalPoints: Number,
//     passingScore: {
//       type: Number,
//       default: 60,
//     },
//     timeLimit: Number, // in minutes
//     isPublished: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true },
// )

// module.exports = mongoose.model("Quiz", quizSchema)
// export default Quiz;







import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    questions: [
      {
        questionText: String,
        type: { type: String, enum: ["mcq", "multiple", "fillup"] },
        options: [String],
        correctAnswer: String,
        points: Number,
      },
    ],
    totalPoints: Number,
    passingScore: { type: Number, default: 60 },
    timeLimit: Number, // in minutes
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
