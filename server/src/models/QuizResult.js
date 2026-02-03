//server/src/models/QuizResult.js

import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionIndex: Number,
      selectedIndex: Number,
    },
  ],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("QuizResult", quizResultSchema);
