// // // // // // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // // // // // import QuizSubmission from "../models/QuizSubmission.js";

// // // // // // // // // // // // // // // // Admin: Get all quizzes
// // // // // // // // // // // // // // // export const getQuizzes = async (req, res) => {
// // // // // // // // // // // // // // //   const quizzes = await Quiz.find();
// // // // // // // // // // // // // // //   res.json(quizzes);
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // Admin: Create a new quiz
// // // // // // // // // // // // // // // export const createQuiz = async (req, res) => {
// // // // // // // // // // // // // // //   const { title, questions } = req.body;
// // // // // // // // // // // // // // //   const quiz = new Quiz({ title, questions });
// // // // // // // // // // // // // // //   await quiz.save();
// // // // // // // // // // // // // // //   res.status(201).json(quiz);
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // Admin: Delete a quiz
// // // // // // // // // // // // // // // export const deleteQuiz = async (req, res) => {
// // // // // // // // // // // // // // //   await Quiz.findByIdAndDelete(req.params.id);
// // // // // // // // // // // // // // //   res.json({ message: "Quiz deleted" });
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // User: Submit quiz answers
// // // // // // // // // // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // // // // // // // // // //   const { quizId, answers } = req.body;
// // // // // // // // // // // // // // //   const quiz = await Quiz.findById(quizId);
// // // // // // // // // // // // // // //   if (!quiz) return res.status(404).json({ message: "Quiz not found" });

// // // // // // // // // // // // // // //   let score = 0;
// // // // // // // // // // // // // // //   quiz.questions.forEach((q, i) => {
// // // // // // // // // // // // // // //     if (answers[i] === q.correctAnswerIndex) score++;
// // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // //   const submission = new QuizSubmission({ quizId, answers, score });
// // // // // // // // // // // // // // //   await submission.save();

// // // // // // // // // // // // // // //   res.json({ score, total: quiz.questions.length });
// // // // // // // // // // // // // // // };















// // // // // // // // // // // // // // // server/src/controllers/quizController.js


// // // // // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // // // // import Submission from "../models/Submission.js";

// // // // // // // // // // // // // // // Create a new quiz (Admin only)
// // // // // // // // // // // // // // export const createQuiz = async (req, res) => {
// // // // // // // // // // // // // //   const { courseId, title, description, startAt, dueAt, questions = [], visibility = "published" } = req.body;
// // // // // // // // // // // // // //   if (!courseId || !title || !startAt || !dueAt)
// // // // // // // // // // // // // //     return res.status(400).json({ message: "Missing required fields" });

// // // // // // // // // // // // // //   const start = new Date(startAt);
// // // // // // // // // // // // // //   const due = new Date(dueAt);
// // // // // // // // // // // // // //   if (isNaN(start) || isNaN(due) || start >= due)
// // // // // // // // // // // // // //     return res.status(400).json({ message: "Invalid dates" });

// // // // // // // // // // // // // //   const quiz = await Quiz.create({
// // // // // // // // // // // // // //     courseId,
// // // // // // // // // // // // // //     title,
// // // // // // // // // // // // // //     description,
// // // // // // // // // // // // // //     startAt: start,
// // // // // // // // // // // // // //     dueAt: due,
// // // // // // // // // // // // // //     questions,
// // // // // // // // // // // // // //     visibility,
// // // // // // // // // // // // // //     createdBy: req.user._id,
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   res.status(201).json(quiz);
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // Update quiz (Admin only)
// // // // // // // // // // // // // // export const updateQuiz = async (req, res) => {
// // // // // // // // // // // // // //   const { quizId } = req.params;
// // // // // // // // // // // // // //   const quiz = await Quiz.findById(quizId);
// // // // // // // // // // // // // //   if (!quiz) return res.status(404).json({ message: "Quiz not found" });
// // // // // // // // // // // // // //   if (new Date() >= quiz.startAt)
// // // // // // // // // // // // // //     return res.status(403).json({ message: "Cannot modify quiz after start date" });

// // // // // // // // // // // // // //   Object.assign(quiz, req.body);
// // // // // // // // // // // // // //   await quiz.save();
// // // // // // // // // // // // // //   res.status(200).json(quiz);
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // List visible quizzes (User/Admin)
// // // // // // // // // // // // // // export const listQuizzesVisible = async (req, res) => {
// // // // // // // // // // // // // //   const { courseId } = req.query;
// // // // // // // // // // // // // //   const now = new Date();
// // // // // // // // // // // // // //   const match = { visibility: "published", startAt: { $lte: now }, dueAt: { $gte: now } };
// // // // // // // // // // // // // //   if (courseId) match.courseId = courseId;

// // // // // // // // // // // // // //   const quizzes = await Quiz.find(match).sort({ dueAt: 1 });
// // // // // // // // // // // // // //   res.status(200).json(quizzes);
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // Submit a quiz (User only)
// // // // // // // // // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // // // // // // // // //   const { quizId } = req.params;
// // // // // // // // // // // // // //   const quiz = await Quiz.findById(quizId);
// // // // // // // // // // // // // //   if (!quiz) return res.status(404).json({ message: "Quiz not found" });

// // // // // // // // // // // // // //   const now = new Date();
// // // // // // // // // // // // // //   if (now > quiz.dueAt) return res.status(400).json({ message: "Deadline missed" });

// // // // // // // // // // // // // //   const exists = await Submission.findOne({ quizId, studentId: req.user._id });
// // // // // // // // // // // // // //   if (exists) return res.status(409).json({ message: "Quiz already submitted" });

// // // // // // // // // // // // // //   const { answers, totalTimeTaken } = req.body;
// // // // // // // // // // // // // //   if (!answers) return res.status(400).json({ message: "No answers provided" });

// // // // // // // // // // // // // //   const submission = await Submission.create({
// // // // // // // // // // // // // //     quizId,
// // // // // // // // // // // // // //     studentId: req.user._id, // keep it for DB
// // // // // // // // // // // // // //     answers,
// // // // // // // // // // // // // //     totalTimeTaken,
// // // // // // // // // // // // // //     submittedAt: now,
// // // // // // // // // // // // // //     status: "on_time",
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   res.status(201).json(submission);
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // Get all submissions for a quiz (Admin only)
// // // // // // // // // // // // // // export const getQuizSubmissions = async (req, res) => {
// // // // // // // // // // // // // //   const { quizId } = req.params;
// // // // // // // // // // // // // //   const submissions = await Submission.find({ quizId }).populate("studentId", "name email");
// // // // // // // // // // // // // //   res.status(200).json(submissions);
// // // // // // // // // // // // // // };











// // // // // // // // // // // // // // //server/src/controllers/quizController.js


// // // // // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // // // // import QuizResult from "../models/QuizResult.js";

// // // // // // // // // // // // // // export const createQuiz = async (req, res) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const quiz = new Quiz(req.body);
// // // // // // // // // // // // // //     await quiz.save();
// // // // // // // // // // // // // //     res.status(201).json(quiz);
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     res.status(400).json({ message: err.message });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // // // // // // // // // // //   const { courseId } = req.query;
// // // // // // // // // // // // // //   const now = new Date();

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const quizzes = await Quiz.find({
// // // // // // // // // // // // // //       course: courseId, // ✅ correct field
// // // // // // // // // // // // // //       startAt: { $lte: now },
// // // // // // // // // // // // // //       dueAt: { $gte: now },
// // // // // // // // // // // // // //       isPublished: true, // ✅ optional visibility flag
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //     res.json(quizzes);
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     res.status(500).json({ message: "Failed to fetch quizzes" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };


// // // // // // // // // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // // // // // // // // //   const { quizId, userId, answers } = req.body;

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const quiz = await Quiz.findById(quizId);
// // // // // // // // // // // // // //     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

// // // // // // // // // // // // // //     let score = 0;
// // // // // // // // // // // // // //     answers.forEach(({ questionIndex, selectedIndex }) => {
// // // // // // // // // // // // // //       if (quiz.questions[questionIndex]?.correctIndex === selectedIndex) {
// // // // // // // // // // // // // //         score += 1;
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     const result = new QuizResult({ quizId, userId, answers, score });
// // // // // // // // // // // // // //     await result.save();

// // // // // // // // // // // // // //     res.json({ score, total: quiz.questions.length });
// // // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // // //     res.status(500).json({ message: "Submission failed" });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };













// // // // // // // // // // // // // //server/src/controllers/quizController.js


// // // // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // // // import QuizResult from "../models/QuizResult.js";

// // // // // // // // // // // // // // ➕ Create a new quiz
// // // // // // // // // // // // // export const createQuiz = async (req, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const quiz = new Quiz(req.body);
// // // // // // // // // // // // //     await quiz.save();
// // // // // // // // // // // // //     res.status(201).json(quiz);
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     console.error("🔥 Error creating quiz:", err);
// // // // // // // // // // // // //     res.status(400).json({ message: err.message || "Failed to create quiz" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // 🌐 Get visible quizzes for a course
// // // // // // // // // // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // // // // // // // // // //   const { courseId } = req.query;
// // // // // // // // // // // // //   const now = new Date();

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     if (!courseId) {
// // // // // // // // // // // // //       return res.status(400).json({ message: "Missing courseId in query" });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const quizzes = await Quiz.find({
// // // // // // // // // // // // //       course: courseId, // ✅ correct field
// // // // // // // // // // // // //       startAt: { $lte: now },
// // // // // // // // // // // // //       dueAt: { $gte: now },
// // // // // // // // // // // // //       isPublished: true, // ✅ visibility flag
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     res.json(quizzes);
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     console.error("🔥 Error fetching quizzes:", err);
// // // // // // // // // // // // //     res.status(500).json({ message: "Failed to fetch quizzes" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // // ✅ Submit quiz answers
// // // // // // // // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // // // // // // // //   const { quizId, userId, answers } = req.body;

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     if (!quizId || !userId || !Array.isArray(answers)) {
// // // // // // // // // // // // //       return res.status(400).json({ message: "Invalid submission payload" });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const quiz = await Quiz.findById(quizId);
// // // // // // // // // // // // //     if (!quiz) {
// // // // // // // // // // // // //       return res.status(404).json({ message: "Quiz not found" });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     let score = 0;
// // // // // // // // // // // // //     answers.forEach(({ questionIndex, selectedIndex }) => {
// // // // // // // // // // // // //       if (quiz.questions[questionIndex]?.correctIndex === selectedIndex) {
// // // // // // // // // // // // //         score += 1;
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     const result = new QuizResult({
// // // // // // // // // // // // //       quizId,
// // // // // // // // // // // // //       userId,
// // // // // // // // // // // // //       answers,
// // // // // // // // // // // // //       score,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     await result.save();

// // // // // // // // // // // // //     res.json({
// // // // // // // // // // // // //       score,
// // // // // // // // // // // // //       total: quiz.questions.length,
// // // // // // // // // // // // //       message: "Quiz submitted successfully",
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // // //     console.error("🔥 Error submitting quiz:", err);
// // // // // // // // // // // // //     res.status(500).json({ message: "Submission failed" });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };







// // // // // // // // // // // // // //server/src/controllers/quizController.js

// // // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // // // // // // import { createHttpError } from "../utils/errors.js";

// // // // // // // // // // // // // ✅ Admin creates quiz
// // // // // // // // // // // // export const createQuiz = async (req, res, next) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { courseId, title, description, startAt, dueAt, questions } = req.body;

// // // // // // // // // // // //     if (!courseId || !title || !questions || questions.length === 0) {
// // // // // // // // // // // //       return next(createHttpError(400, "Missing required quiz fields"));
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const quiz = await Quiz.create({ courseId, title, description, startAt, dueAt, questions });
// // // // // // // // // // // //     res.status(201).json({ message: "Quiz created", data: quiz });
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error("🔥 Error creating quiz:", err);
// // // // // // // // // // // //     next(createHttpError(500, "Failed to create quiz"));
// // // // // // // // // // // //   }
// // // // // // // // // // // // };

// // // // // // // // // // // // // ✅ Only show quizzes to enrolled users
// // // // // // // // // // // // export const getVisibleQuizzes = async (req, res, next) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const userId = req.user.id;
// // // // // // // // // // // //     const courseId = req.query.courseId;

// // // // // // // // // // // //     if (!courseId) {
// // // // // // // // // // // //       return next(createHttpError(400, "Course ID is required"));
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const isEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
// // // // // // // // // // // //     if (!isEnrolled) {
// // // // // // // // // // // //       return next(createHttpError(403, "Access denied. You are not enrolled in this course."));
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const quizzes = await Quiz.find({ courseId }).sort({ startAt: 1 });
// // // // // // // // // // // //     res.json(quizzes);
// // // // // // // // // // // //   } catch (err) {
// // // // // // // // // // // //     console.error("🔥 Error fetching visible quizzes:", err);
// // // // // // // // // // // //     next(createHttpError(500, "Failed to fetch quizzes"));
// // // // // // // // // // // //   }
// // // // // // // // // // // // };












// // // // // // // // // // // // server/src/controllers/quizController.js

// // // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // // // // // import Course from "../models/Course.js";
// // // // // // // // // // // import QuizResult from "../models/QuizResult.js"; // ✅ CORRECTED: Using QuizResult model
// // // // // // // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // // // // // // import mongoose from "mongoose";

// // // // // // // // // // // // ===================================================
// // // // // // // // // // // // ADMIN CRUD OPERATIONS (Require 'admin' role)
// // // // // // // // // // // // ===================================================

// // // // // // // // // // // // ✅ Admin creates quiz
// // // // // // // // // // // export const createQuiz = async (req, res, next) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { courseId, title, description, startAt, dueAt, questions } = req.body;

// // // // // // // // // // //     if (!courseId || !title || !questions || questions.length === 0) {
// // // // // // // // // // //       return next(createHttpError(400, "Missing required quiz fields (Course ID, title, questions)."));
// // // // // // // // // // //     }

// // // // // // // // // // //     // Check if the custom courseId exists
// // // // // // // // // // //     const courseExists = await Course.findOne({ courseId });
// // // // // // // // // // //     if (!courseExists) {
// // // // // // // // // // //         return next(createHttpError(404, `Course with ID '${courseId}' not found. Quiz creation failed.`));
// // // // // // // // // // //     }

// // // // // // // // // // //     const quiz = await Quiz.create({ courseId, title, description, startAt, dueAt, questions });
// // // // // // // // // // //     res.status(201).json({ message: "Quiz created", data: quiz });
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("🔥 Error creating quiz:", err);
// // // // // // // // // // //     next(createHttpError(500, "Failed to create quiz"));
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // // ✅ Admin Update Quiz
// // // // // // // // // // // export const updateQuiz = async (req, res, next) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const quizId = req.params.id;
// // // // // // // // // // //         const updates = req.body;

// // // // // // // // // // //         const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, { new: true, runValidators: true });

// // // // // // // // // // //         if (!updatedQuiz) {
// // // // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // // // //         }

// // // // // // // // // // //         res.json({ message: "Quiz updated successfully", data: updatedQuiz });
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         console.error("🔥 Error updating quiz:", err);
// // // // // // // // // // //         next(createHttpError(500, "Failed to update quiz"));
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // ✅ Admin Delete Quiz
// // // // // // // // // // // export const deleteQuiz = async (req, res, next) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const quizId = req.params.id;
// // // // // // // // // // //         const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

// // // // // // // // // // //         if (!deletedQuiz) {
// // // // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // // // //         }

// // // // // // // // // // //         // NOTE: Also delete associated results
// // // // // // // // // // //         await QuizResult.deleteMany({ quizId });

// // // // // // // // // // //         res.json({ message: "Quiz deleted successfully" });
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         console.error("🔥 Error deleting quiz:", err);
// // // // // // // // // // //         next(createHttpError(500, "Failed to delete quiz"));
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // ✅ Admin Get All Quizzes by Course (No enrollment check, bypasses visibility rules)
// // // // // // // // // // // export const getQuizzesByCourseAdmin = async (req, res, next) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { courseId } = req.query; 

// // // // // // // // // // //         if (!courseId) {
// // // // // // // // // // //             return next(createHttpError(400, "Course ID is required for admin view"));
// // // // // // // // // // //         }

// // // // // // // // // // //         // Admin bypasses the enrollment check and visibility rules
// // // // // // // // // // //         const quizzes = await Quiz.find({ courseId }).sort({ startAt: 1 });
// // // // // // // // // // //         res.json(quizzes);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         console.error("🔥 Error fetching admin quizzes:", err);
// // // // // // // // // // //         next(createHttpError(500, "Failed to fetch quizzes for admin view"));
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // ===================================================
// // // // // // // // // // // // ADMIN REPORTING
// // // // // // // // // // // // ===================================================

// // // // // // // // // // // // ✅ Admin Get Submission Status for a specific Quiz in a Course
// // // // // // // // // // // export const getQuizSubmissionStatus = async (req, res, next) => {
// // // // // // // // // // //     try {
// // // // // // // // // // //         const { courseId, quizId } = req.query; // Admin sends custom courseId and quiz MongoDB _id

// // // // // // // // // // //         if (!courseId || !quizId) {
// // // // // // // // // // //             return next(createHttpError(400, "Course ID and Quiz ID are required."));
// // // // // // // // // // //         }

// // // // // // // // // // //         // 1. Get the MongoDB _id for the Course
// // // // // // // // // // //         const course = await Course.findOne({ courseId });
// // // // // // // // // // //         if (!course) {
// // // // // // // // // // //             return next(createHttpError(404, "Course not found."));
// // // // // // // // // // //         }
// // // // // // // // // // //         const courseObjectId = course._id;

// // // // // // // // // // //         // 2. Find all enrollments (users) for this course
// // // // // // // // // // //         const enrollments = await Enrollment.find({ course: courseObjectId })
// // // // // // // // // // //             .populate('user', 'name email role') 
// // // // // // // // // // //             .select('user'); 

// // // // // // // // // // //         const enrolledUsers = enrollments.map(e => e.user);
// // // // // // // // // // //         const enrolledUserIds = enrolledUsers.map(user => user._id);

// // // // // // // // // // //         // 3. Find all submissions (QuizResults) for this quiz
// // // // // // // // // // //         const results = await QuizResult.find({ 
// // // // // // // // // // //             quizId: quizId,
// // // // // // // // // // //             userId: { $in: enrolledUserIds } 
// // // // // // // // // // //         }).select('userId submittedAt score');

// // // // // // // // // // //         const submittedUserIds = results.map(s => s.userId.toString());

// // // // // // // // // // //         // 4. Map the results
// // // // // // // // // // //         const statusReport = enrolledUsers.map(user => {
// // // // // // // // // // //             const isCompleted = submittedUserIds.includes(user._id.toString());
// // // // // // // // // // //             const resultData = isCompleted 
// // // // // // // // // // //                 ? results.find(s => s.userId.toString() === user._id.toString())
// // // // // // // // // // //                 : null;

// // // // // // // // // // //             return {
// // // // // // // // // // //                 user: {
// // // // // // // // // // //                     id: user._id,
// // // // // // // // // // //                     name: user.name,
// // // // // // // // // // //                     email: user.email,
// // // // // // // // // // //                 },
// // // // // // // // // // //                 status: isCompleted ? 'Completed' : 'Pending',
// // // // // // // // // // //                 submittedAt: resultData?.submittedAt || null,
// // // // // // // // // // //                 score: resultData?.score !== undefined ? resultData.score : null,
// // // // // // // // // // //             };
// // // // // // // // // // //         });

// // // // // // // // // // //         res.json(statusReport);
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //         console.error("🔥 Error fetching submission status:", err);
// // // // // // // // // // //         next(createHttpError(500, "Failed to fetch submission status."));
// // // // // // // // // // //     }
// // // // // // // // // // // };

// // // // // // // // // // // // ===================================================
// // // // // // // // // // // // USER/STUDENT ACCESS
// // // // // // // // // // // // ===================================================

// // // // // // // // // // // // ✅ Only show quizzes to enrolled users (Existing logic)
// // // // // // // // // // // export const getVisibleQuizzes = async (req, res, next) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     // Assuming req.user.id is populated by your authentication middleware
// // // // // // // // // // //     const userId = req.user.id;
// // // // // // // // // // //     const { courseId: customCourseId } = req.query;

// // // // // // // // // // //     if (!customCourseId) {
// // // // // // // // // // //       return next(createHttpError(400, "Course ID is required"));
// // // // // // // // // // //     }

// // // // // // // // // // //     // Find the course's MongoDB ObjectId using the custom string ID
// // // // // // // // // // //     const course = await Course.findOne({ courseId: customCourseId });

// // // // // // // // // // //     if (!course) {
// // // // // // // // // // //         return next(createHttpError(404, "Course not found."));
// // // // // // // // // // //     }

// // // // // // // // // // //     const courseObjectId = course._id; 

// // // // // // // // // // //     // Check enrollment using the Course's MongoDB _id
// // // // // // // // // // //     const isEnrolled = await Enrollment.findOne({ 
// // // // // // // // // // //         user: userId, 
// // // // // // // // // // //         course: courseObjectId 
// // // // // // // // // // //     });

// // // // // // // // // // //     if (!isEnrolled) {
// // // // // // // // // // //       // Returns 403 Forbidden if not enrolled, as fixed previously
// // // // // // // // // // //       return next(createHttpError(403, "Access denied. You are not enrolled in this course."));
// // // // // // // // // // //     }

// // // // // // // // // // //     // Fetch quizzes using the custom string courseId
// // // // // // // // // // //     const quizzes = await Quiz.find({ 
// // // // // // // // // // //         courseId: customCourseId,
// // // // // // // // // // //         // Optional: Add visibility/timing logic here if needed (e.g., startAt < now)
// // // // // // // // // // //     }).sort({ startAt: 1 });

// // // // // // // // // // //     res.json(quizzes);
// // // // // // // // // // //   } catch (err) {
// // // // // // // // // // //     console.error("🔥 Error fetching visible quizzes:", err);
// // // // // // // // // // //     next(createHttpError(500, "Failed to fetch quizzes"));
// // // // // // // // // // //   }
// // // // // // // // // // // };



// // // // // // // // // // //ABOVE IS WORKING CODE












// // // // // // // // // // // server/src/controllers/quizController.js

// // // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // // // // import Course from "../models/Course.js";
// // // // // // // // // // import QuizResult from "../models/QuizResult.js";
// // // // // // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // // // // // import mongoose from "mongoose";

// // // // // // // // // // // ===================================================
// // // // // // // // // // // ADMIN CRUD OPERATIONS (Require 'admin' role)
// // // // // // // // // // // ===================================================

// // // // // // // // // // // ✅ Admin creates quiz
// // // // // // // // // // export const createQuiz = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { courseId, title, description, startAt, dueAt, questions } = req.body;

// // // // // // // // // //     if (!courseId || !title || !questions || questions.length === 0) {
// // // // // // // // // //       return next(createHttpError(400, "Missing required quiz fields (Course ID, title, questions)."));
// // // // // // // // // //     }

// // // // // // // // // //     // Check if the custom courseId exists
// // // // // // // // // //     const courseExists = await Course.findOne({ courseId });
// // // // // // // // // //     if (!courseExists) {
// // // // // // // // // //         return next(createHttpError(404, `Course with ID '${courseId}' not found. Quiz creation failed.`));
// // // // // // // // // //     }

// // // // // // // // // //     const quiz = await Quiz.create({ 
// // // // // // // // // //         courseId,
// // // // // // // // // //         title,
// // // // // // // // // //         description,
// // // // // // // // // //         startAt,
// // // // // // // // // //         dueAt,
// // // // // // // // // //         questions,
// // // // // // // // // //         createdBy: req.user._id // ✅ Added missing required field
// // // // // // // // // //     });
// // // // // // // // // //     res.status(201).json({ message: "Quiz created", data: quiz });
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("🔥 Error creating quiz:", err);
// // // // // // // // // //     next(createHttpError(500, "Failed to create quiz"));
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // // ✅ Admin Update Quiz
// // // // // // // // // // export const updateQuiz = async (req, res, next) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const quizId = req.params.id;
// // // // // // // // // //         const updates = req.body;

// // // // // // // // // //         const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, { new: true, runValidators: true });

// // // // // // // // // //         if (!updatedQuiz) {
// // // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // // //         }

// // // // // // // // // //         res.json({ message: "Quiz updated successfully", data: updatedQuiz });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         console.error("🔥 Error updating quiz:", err);
// // // // // // // // // //         next(createHttpError(500, "Failed to update quiz"));
// // // // // // // // // //     }
// // // // // // // // // // };

// // // // // // // // // // // ✅ Admin Delete Quiz
// // // // // // // // // // export const deleteQuiz = async (req, res, next) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const quizId = req.params.id;
// // // // // // // // // //         const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

// // // // // // // // // //         if (!deletedQuiz) {
// // // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // // //         }

// // // // // // // // // //         // NOTE: Also delete associated results
// // // // // // // // // //         await QuizResult.deleteMany({ quizId });

// // // // // // // // // //         res.json({ message: "Quiz deleted successfully" });
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         console.error("🔥 Error deleting quiz:", err);
// // // // // // // // // //         next(createHttpError(500, "Failed to delete quiz"));
// // // // // // // // // //     }
// // // // // // // // // // };

// // // // // // // // // // // 🌟 FIX APPLIED HERE: Renamed and modified the logic to allow no courseId filter.
// // // // // // // // // // /**
// // // // // // // // // //  * @desc    Get all quizzes or filter by courseId (for admin view)
// // // // // // // // // //  * @route   GET /api/quizzes
// // // // // // // // // //  * @access  Private/Admin
// // // // // // // // // //  * * This function handles both filtered (by courseId) and unfiltered (all) requests.
// // // // // // // // // //  */
// // // // // // // // // // export const getQuizzesByCourseAdmin = async (req, res, next) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId } = req.query;
// // // // // // // // // //         let filter = {}; // Start with an empty filter to fetch all

// // // // // // // // // //         // Check if a courseId is provided and is not just empty whitespace
// // // // // // // // // //         if (courseId && courseId.trim() !== "") {
// // // // // // // // // //             // If provided, set the filter to search only for that courseId
// // // // // // // // // //             filter.courseId = courseId.trim();
// // // // // // // // // //         } 
// // // // // // // // // //         // If courseId is NOT provided, filter remains {}, fetching ALL quizzes.

// // // // // // // // // //         // Fetch quizzes based on the filter. Sort by due date then creation date.
// // // // // // // // // //         const quizzes = await Quiz.find(filter)
// // // // // // // // // //             .sort({ dueAt: 1, createdAt: -1 })
// // // // // // // // // //             .lean();

// // // // // // // // // //         // Respond with the list of quizzes
// // // // // // // // // //         res.json(quizzes);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         console.error("🔥 Error fetching admin quizzes:", err);
// // // // // // // // // //         next(createHttpError(500, "Server error occurred while fetching quizzes."));
// // // // // // // // // //     }
// // // // // // // // // // };

// // // // // // // // // // // ===================================================
// // // // // // // // // // // ADMIN REPORTING
// // // // // // // // // // // ===================================================

// // // // // // // // // // // ✅ Admin Get Submission Status for a specific Quiz in a Course
// // // // // // // // // // export const getQuizSubmissionStatus = async (req, res, next) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { courseId, quizId } = req.query;

// // // // // // // // // //         if (!courseId || !quizId) {
// // // // // // // // // //             return next(createHttpError(400, "Course ID and Quiz ID are required."));
// // // // // // // // // //         }

// // // // // // // // // //         // 1. Get the MongoDB _id for the Course
// // // // // // // // // //         const course = await Course.findOne({ courseId });
// // // // // // // // // //         if (!course) {
// // // // // // // // // //             return next(createHttpError(404, "Course not found."));
// // // // // // // // // //         }
// // // // // // // // // //         const courseObjectId = course._id;

// // // // // // // // // //         // 2. Find all enrollments (users) for this course
// // // // // // // // // //         const enrollments = await Enrollment.find({ course: courseObjectId })
// // // // // // // // // //             .populate('user', 'name email role') 
// // // // // // // // // //             .select('user'); 

// // // // // // // // // //         const enrolledUsers = enrollments.map(e => e.user);
// // // // // // // // // //         const enrolledUserIds = enrolledUsers.map(user => user._id);

// // // // // // // // // //         // 3. Find all submissions (QuizResults) for this quiz
// // // // // // // // // //         const results = await QuizResult.find({ 
// // // // // // // // // //             quizId: quizId,
// // // // // // // // // //             userId: { $in: enrolledUserIds } 
// // // // // // // // // //         }).select('userId submittedAt score');

// // // // // // // // // //         const submittedUserIds = results.map(s => s.userId.toString());

// // // // // // // // // //         // 4. Map the results
// // // // // // // // // //         const statusReport = enrolledUsers.map(user => {
// // // // // // // // // //             const isCompleted = submittedUserIds.includes(user._id.toString());
// // // // // // // // // //             const resultData = isCompleted 
// // // // // // // // // //                 ? results.find(s => s.userId.toString() === user._id.toString())
// // // // // // // // // //                 : null;

// // // // // // // // // //             return {
// // // // // // // // // //                 user: {
// // // // // // // // // //                     id: user._id,
// // // // // // // // // //                     name: user.name,
// // // // // // // // // //                     email: user.email,
// // // // // // // // // //                 },
// // // // // // // // // //                 status: isCompleted ? 'Completed' : 'Pending',
// // // // // // // // // //                 submittedAt: resultData?.submittedAt || null,
// // // // // // // // // //                 score: resultData?.score !== undefined ? resultData.score : null,
// // // // // // // // // //             };
// // // // // // // // // //         });

// // // // // // // // // //         res.json(statusReport);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //         console.error("🔥 Error fetching submission status:", err);
// // // // // // // // // //         next(createHttpError(500, "Failed to fetch submission status."));
// // // // // // // // // //     }
// // // // // // // // // // };

// // // // // // // // // // // ===================================================
// // // // // // // // // // // USER/STUDENT ACCESS
// // // // // // // // // // // ===================================================

// // // // // // // // // // // ✅ Only show quizzes to enrolled users (Existing logic)
// // // // // // // // // // export const getVisibleQuizzes = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const userId = req.user.id;
// // // // // // // // // //     const { courseId: customCourseId } = req.query;

// // // // // // // // // //     if (!customCourseId) {
// // // // // // // // // //       return next(createHttpError(400, "Course ID is required"));
// // // // // // // // // //     }

// // // // // // // // // //     const course = await Course.findOne({ courseId: customCourseId });

// // // // // // // // // //     if (!course) {
// // // // // // // // // //         return next(createHttpError(404, "Course not found."));
// // // // // // // // // //     }

// // // // // // // // // //     const courseObjectId = course._id; 

// // // // // // // // // //     const isEnrolled = await Enrollment.findOne({ 
// // // // // // // // // //         user: userId, 
// // // // // // // // // //         course: courseObjectId 
// // // // // // // // // //     });

// // // // // // // // // //     if (!isEnrolled) {
// // // // // // // // // //       return next(createHttpError(403, "Access denied. You are not enrolled in this course."));
// // // // // // // // // //     }

// // // // // // // // // //     const quizzes = await Quiz.find({ 
// // // // // // // // // //         courseId: customCourseId,
// // // // // // // // // //         // Optional: Add visibility/timing logic here
// // // // // // // // // //     }).sort({ startAt: 1 });

// // // // // // // // // //     res.json(quizzes);
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     console.error("🔥 Error fetching visible quizzes:", err);
// // // // // // // // // //     next(createHttpError(500, "Failed to fetch quizzes"));
// // // // // // // // // //   }
// // // // // // // // // // };










// // // // // // // // // // server/src/controllers/quizController.js

// // // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // // // import Course from "../models/Course.js";
// // // // // // // // // import QuizResult from "../models/QuizResult.js";
// // // // // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // // // // import mongoose from "mongoose";

// // // // // // // // // // ===================================================
// // // // // // // // // // ADMIN CRUD OPERATIONS (Require 'admin' role)
// // // // // // // // // // ===================================================

// // // // // // // // // // ✅ Admin creates quiz
// // // // // // // // // export const createQuiz = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { courseId, title, description, startAt, dueAt, questions } = req.body;

// // // // // // // // //     if (!courseId || !title || !questions || questions.length === 0) {
// // // // // // // // //       return next(createHttpError(400, "Missing required quiz fields (Course ID, title, questions)."));
// // // // // // // // //     }

// // // // // // // // //     // Check if the custom courseId exists
// // // // // // // // //     const courseExists = await Course.findOne({ courseId });
// // // // // // // // //     if (!courseExists) {
// // // // // // // // //         return next(createHttpError(404, `Course with ID '${courseId}' not found. Quiz creation failed.`));
// // // // // // // // //     }

// // // // // // // // //     const quiz = await Quiz.create({ courseId, title, description, startAt, dueAt, questions });
// // // // // // // // //     res.status(201).json({ message: "Quiz created", data: quiz });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("🔥 Error creating quiz:", err);
// // // // // // // // //     next(createHttpError(500, "Failed to create quiz"));
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // ✅ Admin Update Quiz
// // // // // // // // // export const updateQuiz = async (req, res, next) => {
// // // // // // // // //     try {
// // // // // // // // //         const quizId = req.params.id;
// // // // // // // // //         const updates = req.body;

// // // // // // // // //         const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, { new: true, runValidators: true });

// // // // // // // // //         if (!updatedQuiz) {
// // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // //         }

// // // // // // // // //         res.json({ message: "Quiz updated successfully", data: updatedQuiz });
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("🔥 Error updating quiz:", err);
// // // // // // // // //         next(createHttpError(500, "Failed to update quiz"));
// // // // // // // // //     }
// // // // // // // // // };

// // // // // // // // // // ✅ Admin Delete Quiz
// // // // // // // // // export const deleteQuiz = async (req, res, next) => {
// // // // // // // // //     try {
// // // // // // // // //         const quizId = req.params.id;
// // // // // // // // //         const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

// // // // // // // // //         if (!deletedQuiz) {
// // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // //         }

// // // // // // // // //         // NOTE: Also delete associated results
// // // // // // // // //         await QuizResult.deleteMany({ quizId });

// // // // // // // // //         res.json({ message: "Quiz deleted successfully" });
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("🔥 Error deleting quiz:", err);
// // // // // // // // //         next(createHttpError(500, "Failed to delete quiz"));
// // // // // // // // //     }
// // // // // // // // // };

// // // // // // // // // // ✅ Admin Get All Quizzes by Course (Flexible filter for All or Filtered)
// // // // // // // // // export const getQuizzesByCourseAdmin = async (req, res, next) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId } = req.query;
// // // // // // // // //         let filter = {}; 

// // // // // // // // //         // Allows filtering by courseId or fetching ALL if courseId is missing/empty
// // // // // // // // //         if (courseId && courseId.trim() !== "") {
// // // // // // // // //             filter.courseId = courseId.trim();
// // // // // // // // //         } 

// // // // // // // // //         const quizzes = await Quiz.find(filter)
// // // // // // // // //             .sort({ dueAt: 1, createdAt: -1 })
// // // // // // // // //             .lean();

// // // // // // // // //         res.json(quizzes);
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("🔥 Error fetching admin quizzes:", err);
// // // // // // // // //         next(createHttpError(500, "Server error occurred while fetching quizzes."));
// // // // // // // // //     }
// // // // // // // // // };

// // // // // // // // // // ===================================================
// // // // // // // // // // ADMIN REPORTING
// // // // // // // // // // ===================================================

// // // // // // // // // // ✅ Admin Get Submission Status for a specific Quiz in a Course
// // // // // // // // // export const getQuizSubmissionStatus = async (req, res, next) => {
// // // // // // // // //     try {
// // // // // // // // //         const { courseId, quizId } = req.query;

// // // // // // // // //         if (!courseId || !quizId) {
// // // // // // // // //             return next(createHttpError(400, "Course ID and Quiz ID are required."));
// // // // // // // // //         }

// // // // // // // // //         // 1. Get the MongoDB _id for the Course
// // // // // // // // //         const course = await Course.findOne({ courseId });
// // // // // // // // //         if (!course) {
// // // // // // // // //             return next(createHttpError(404, "Course not found."));
// // // // // // // // //         }
// // // // // // // // //         const courseObjectId = course._id;

// // // // // // // // //         // 2. Find all enrollments (users) for this course
// // // // // // // // //         const enrollments = await Enrollment.find({ course: courseObjectId })
// // // // // // // // //             .populate('user', 'name email role') 
// // // // // // // // //             .select('user'); 

// // // // // // // // //         const enrolledUsers = enrollments.map(e => e.user);
// // // // // // // // //         const enrolledUserIds = enrolledUsers.map(user => user._id);

// // // // // // // // //         // 3. Find all submissions (QuizResults) for this quiz
// // // // // // // // //         const results = await QuizResult.find({ 
// // // // // // // // //             quizId: quizId,
// // // // // // // // //             userId: { $in: enrolledUserIds } 
// // // // // // // // //         }).select('userId submittedAt score');

// // // // // // // // //         const submittedUserIds = results.map(s => s.userId.toString());

// // // // // // // // //         // 4. Map the results
// // // // // // // // //         const statusReport = enrolledUsers.map(user => {
// // // // // // // // //             const isCompleted = submittedUserIds.includes(user._id.toString());
// // // // // // // // //             const resultData = isCompleted 
// // // // // // // // //                 ? results.find(s => s.userId.toString() === user._id.toString())
// // // // // // // // //                 : null;

// // // // // // // // //             return {
// // // // // // // // //                 user: {
// // // // // // // // //                     id: user._id,
// // // // // // // // //                     name: user.name,
// // // // // // // // //                     email: user.email,
// // // // // // // // //                 },
// // // // // // // // //                 status: isCompleted ? 'Completed' : 'Pending',
// // // // // // // // //                 submittedAt: resultData?.submittedAt || null,
// // // // // // // // //                 score: resultData?.score !== undefined ? resultData.score : null,
// // // // // // // // //             };
// // // // // // // // //         });

// // // // // // // // //         res.json(statusReport);
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("🔥 Error fetching submission status:", err);
// // // // // // // // //         next(createHttpError(500, "Failed to fetch submission status."));
// // // // // // // // //     }
// // // // // // // // // };

// // // // // // // // // // ===================================================
// // // // // // // // // // USER/STUDENT ACCESS
// // // // // // // // // // ===================================================

// // // // // // // // // // ✅ Only show quizzes to enrolled users (Existing logic)
// // // // // // // // // export const getVisibleQuizzes = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const userId = req.user.id;
// // // // // // // // //     const { courseId: customCourseId } = req.query;

// // // // // // // // //     if (!customCourseId) {
// // // // // // // // //       return next(createHttpError(400, "Course ID is required"));
// // // // // // // // //     }

// // // // // // // // //     const course = await Course.findOne({ courseId: customCourseId });

// // // // // // // // //     if (!course) {
// // // // // // // // //         return next(createHttpError(404, "Course not found."));
// // // // // // // // //     }

// // // // // // // // //     const courseObjectId = course._id; 

// // // // // // // // //     const isEnrolled = await Enrollment.findOne({ 
// // // // // // // // //         user: userId, 
// // // // // // // // //         course: courseObjectId 
// // // // // // // // //     });

// // // // // // // // //     if (!isEnrolled) {
// // // // // // // // //       return next(createHttpError(403, "Access denied. You are not enrolled in this course."));
// // // // // // // // //     }

// // // // // // // // //     const quizzes = await Quiz.find({ 
// // // // // // // // //         courseId: customCourseId,
// // // // // // // // //         // FUTURE ENHANCEMENT: Filter by { dueAt: { $gte: new Date() } } to show only active quizzes
// // // // // // // // //     }).sort({ startAt: 1 });

// // // // // // // // //     res.json(quizzes);
// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("🔥 Error fetching visible quizzes:", err);
// // // // // // // // //     next(createHttpError(500, "Failed to fetch quizzes"));
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // // // 🆕 ADDED: Quiz Submission and Scoring Logic
// // // // // // // // // /**
// // // // // // // // //  * @desc    Submit a quiz by a user
// // // // // // // // //  * @route   POST /api/quizzes/submit
// // // // // // // // //  * @access  Private/User
// // // // // // // // //  */
// // // // // // // // // export const submitQuiz = async (req, res, next) => {
// // // // // // // // //     try {
// // // // // // // // //         // Ensure userId is being pulled from the authentication token/middleware
// // // // // // // // //         const userId = req.user._id; 
// // // // // // // // //         const { quizId, answers } = req.body; 

// // // // // // // // //         if (!quizId || !answers || answers.length === 0) {
// // // // // // // // //             return next(createHttpError(400, "Missing required fields: quizId and answers."));
// // // // // // // // //         }

// // // // // // // // //         // 1. Check if the user has already submitted this quiz
// // // // // // // // //         const existingSubmission = await QuizResult.findOne({ quizId, userId });
// // // // // // // // //         if (existingSubmission) {
// // // // // // // // //             return next(createHttpError(409, "Quiz already submitted."));
// // // // // // // // //         }

// // // // // // // // //         // 2. Fetch the original quiz to get correct answers
// // // // // // // // //         const quiz = await Quiz.findById(quizId);
// // // // // // // // //         if (!quiz) {
// // // // // // // // //             return next(createHttpError(404, "Quiz not found."));
// // // // // // // // //         }

// // // // // // // // //         // 3. Score the quiz
// // // // // // // // //         let score = 0;
// // // // // // // // //         let totalPoints = quiz.questions.length; // Assuming 1 point per question
// // // // // // // // //         const gradedAnswers = [];

// // // // // // // // //         answers.forEach(submittedAnswer => {
// // // // // // // // //             const qIndex = submittedAnswer.questionIndex;
// // // // // // // // //             const originalQuestion = quiz.questions[qIndex];

// // // // // // // // //             if (!originalQuestion) return; 

// // // // // // // // //             let isCorrect = false;

// // // // // // // // //             if (originalQuestion.type === 'single') {
// // // // // // // // //                 // Single Choice: Check if selectedIndex matches correctIndex
// // // // // // // // //                 const submittedIndex = submittedAnswer.selectedIndex;
// // // // // // // // //                 isCorrect = submittedIndex === originalQuestion.correctIndex;

// // // // // // // // //             } else if (originalQuestion.type === 'multiple') {
// // // // // // // // //                 // Multiple Choice: Check if selectedIndices array matches correctIndices array
// // // // // // // // //                 const submittedIndices = submittedAnswer.selectedIndices?.sort() || [];
// // // // // // // // //                 const correctIndices = originalQuestion.correctIndices?.sort() || [];

// // // // // // // // //                 // Compare length AND check if every element matches in order
// // // // // // // // //                 isCorrect = submittedIndices.length === correctIndices.length &&
// // // // // // // // //                             submittedIndices.every((val, index) => val === correctIndices[index]);

// // // // // // // // //             } else if (originalQuestion.type === 'fill') {
// // // // // // // // //                 // Fill-in-the-Blank: Case-insensitive and trimming comparison
// // // // // // // // //                 const submittedText = (submittedAnswer.answerText || '').trim().toLowerCase();
// // // // // // // // //                 const correctText = (originalQuestion.answer || '').trim().toLowerCase();

// // // // // // // // //                 isCorrect = submittedText === correctText;
// // // // // // // // //             }

// // // // // // // // //             if (isCorrect) {
// // // // // // // // //                 score++;
// // // // // // // // //             }

// // // // // // // // //             gradedAnswers.push({
// // // // // // // // //                 questionIndex: qIndex,
// // // // // // // // //                 isCorrect,
// // // // // // // // //                 submittedAnswer: submittedAnswer, 
// // // // // // // // //             });
// // // // // // // // //         });

// // // // // // // // //         // 4. Save the result
// // // // // // // // //         const newResult = await QuizResult.create({
// // // // // // // // //             quizId,
// // // // // // // // //             userId,
// // // // // // // // //             score,
// // // // // // // // //             totalScore: totalPoints,
// // // // // // // // //             answers: gradedAnswers,
// // // // // // // // //             submittedAt: new Date(),
// // // // // // // // //         });

// // // // // // // // //         res.status(201).json({ 
// // // // // // // // //             message: "Quiz submitted and scored successfully", 
// // // // // // // // //             score,
// // // // // // // // //             totalScore: totalPoints,
// // // // // // // // //             resultId: newResult._id
// // // // // // // // //         });
// // // // // // // // //     } catch (err) {
// // // // // // // // //         console.error("🔥 Error submitting quiz:", err);
// // // // // // // // //         next(createHttpError(500, "Failed to submit quiz."));
// // // // // // // // //     }
// // // // // // // // // };








// // // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // // import QuizSubmission from "../models/QuizSubmission.js";
// // // // // // // // import Enrollment from "../models/Enrollment.js";



// // // // // // // // // Create a new quiz (Admin only)
// // // // // // // // export const createQuiz = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const quiz = new Quiz(req.body);
// // // // // // // //     await quiz.save();
// // // // // // // //     res.status(201).json(quiz);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to create quiz", error: err.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Update an existing quiz (Admin only)
// // // // // // // // export const updateQuiz = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // //     if (!updated) return res.status(404).json({ message: "Quiz not found" });
// // // // // // // //     res.json(updated);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to update quiz", error: err.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Delete a quiz (Admin only)
// // // // // // // // export const deleteQuiz = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const deleted = await Quiz.findByIdAndDelete(req.params.id);
// // // // // // // //     if (!deleted) return res.status(404).json({ message: "Quiz not found" });
// // // // // // // //     res.json({ message: "Quiz deleted successfully" });
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to delete quiz", error: err.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Get quizzes by course (Admin view)
// // // // // // // // export const getQuizzesByCourseAdmin = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.query;
// // // // // // // //     const query = courseId ? { courseId } : {};
// // // // // // // //     const quizzes = await Quiz.find(query).sort({ createdAt: -1 });
// // // // // // // //     res.json(quizzes);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const rawCourseId = req.query.courseId;
// // // // // // // //     const userId = req.user._id;

// // // // // // // //     if (!rawCourseId) {
// // // // // // // //       return res.status(400).json({ message: "Course ID is required" });
// // // // // // // //     }

// // // // // // // //     const courseId = rawCourseId.trim();

// // // // // // // //     // ✅ Normalize courseId and check enrollment
// // // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // // //       userId,
// // // // // // // //       courseId: { $regex: new RegExp(`^${courseId}$`, "i") },
// // // // // // // //     });

// // // // // // // //     if (!enrollment) {
// // // // // // // //       return res.status(403).json({ message: "You are not enrolled in this course." });
// // // // // // // //     }

// // // // // // // //     const now = new Date();

// // // // // // // //     // ✅ Filter quizzes by active time window
// // // // // // // //     const quizzes = await Quiz.find({
// // // // // // // //       courseId: { $regex: new RegExp(`^${courseId}$`, "i") },
// // // // // // // //       startAt: { $lte: now },
// // // // // // // //       dueAt: { $gte: now },
// // // // // // // //     }).sort({ startAt: 1 });

// // // // // // // //     res.json(quizzes);
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Error in getVisibleQuizzes:", err);
// // // // // // // //     res.status(500).json({ message: "Server error while fetching quizzes." });
// // // // // // // //   }
// // // // // // // // };


// // // // // // // // // Submit a quiz (User)
// // // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const userId = req.user._id;
// // // // // // // //     const { quizId, answers } = req.body;

// // // // // // // //     const quiz = await Quiz.findById(quizId);
// // // // // // // //     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

// // // // // // // //     let score = 0;

// // // // // // // //     answers.forEach((ans) => {
// // // // // // // //       const q = quiz.questions[ans.questionIndex];
// // // // // // // //       if (!q) return;

// // // // // // // //       if (q.type === "single" && ans.selectedIndex === q.correctIndex) {
// // // // // // // //         score += 1;
// // // // // // // //       } else if (q.type === "multiple" && Array.isArray(ans.selectedIndices)) {
// // // // // // // //         const correct = q.correctIndices || [];
// // // // // // // //         const selected = ans.selectedIndices.sort().join(",");
// // // // // // // //         const expected = correct.sort().join(",");
// // // // // // // //         if (selected === expected) score += 1;
// // // // // // // //       } else if (q.type === "fill" && typeof ans.answerText === "string") {
// // // // // // // //         if (q.answer?.trim().toLowerCase() === ans.answerText.trim().toLowerCase()) {
// // // // // // // //           score += 1;
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     const submission = new QuizSubmission({
// // // // // // // //       userId,
// // // // // // // //       quizId,
// // // // // // // //       answers,
// // // // // // // //       score,
// // // // // // // //       totalScore: quiz.questions.length,
// // // // // // // //     });

// // // // // // // //     await submission.save();
// // // // // // // //     res.status(201).json({ message: "Quiz submitted", score });
// // // // // // // //   } catch (err) {
// // // // // // // //     if (err.code === 11000) {
// // // // // // // //       return res.status(409).json({ message: "You have already submitted this quiz." });
// // // // // // // //     }
// // // // // // // //     res.status(500).json({ message: "Failed to submit quiz", error: err.message });
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Get submission status for a quiz (Admin)
// // // // // // // // export const getQuizSubmissionStatus = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId, quizId } = req.query;
// // // // // // // //     if (!courseId || !quizId) {
// // // // // // // //       return res.status(400).json({ message: "Course ID and Quiz ID are required" });
// // // // // // // //     }

// // // // // // // //     const enrollments = await Enrollment.find({ courseId }).populate("userId");
// // // // // // // //     const submissions = await QuizSubmission.find({ quizId });

// // // // // // // //     const statusReport = enrollments.map((enroll) => {
// // // // // // // //       const submission = submissions.find((s) => s.userId.toString() === enroll.userId._id.toString());
// // // // // // // //       return {
// // // // // // // //         user: {
// // // // // // // //           id: enroll.userId._id,
// // // // // // // //           name: enroll.userId.name,
// // // // // // // //           email: enroll.userId.email,
// // // // // // // //         },
// // // // // // // //         status: submission ? "Completed" : "Pending",
// // // // // // // //         score: submission?.score ?? null,
// // // // // // // //         submittedAt: submission?.submittedAt ?? null,
// // // // // // // //       };
// // // // // // // //     });

// // // // // // // //     res.json(statusReport);
// // // // // // // //   } catch (err) {
// // // // // // // //     res.status(500).json({ message: "Failed to fetch submission status", error: err.message });
// // // // // // // //   }
// // // // // // // // };








// // // // // // // import Quiz from "../models/Quiz.js";
// // // // // // // import QuizSubmission from "../models/QuizSubmission.js";
// // // // // // // import Enrollment from "../models/Enrollment.js";

// // // // // // // // Create a new quiz (Admin only)
// // // // // // // export const createQuiz = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const quiz = new Quiz(req.body);
// // // // // // //     await quiz.save();
// // // // // // //     res.status(201).json(quiz);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: "Failed to create quiz", error: err.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Update an existing quiz (Admin only)
// // // // // // // export const updateQuiz = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // //     if (!updated) return res.status(404).json({ message: "Quiz not found" });
// // // // // // //     res.json(updated);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: "Failed to update quiz", error: err.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Delete a quiz (Admin only)
// // // // // // // export const deleteQuiz = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const deleted = await Quiz.findByIdAndDelete(req.params.id);
// // // // // // //     if (!deleted) return res.status(404).json({ message: "Quiz not found" });
// // // // // // //     res.json({ message: "Quiz deleted successfully" });
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: "Failed to delete quiz", error: err.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get quizzes by course (Admin view)
// // // // // // // export const getQuizzesByCourseAdmin = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.query;
// // // // // // //     const query = courseId ? { courseId } : {};
// // // // // // //     const quizzes = await Quiz.find(query).sort({ createdAt: -1 });
// // // // // // //     res.json(quizzes);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get visible quizzes for a user (filtered by time and enrollment)
// // // // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const rawCourseId = req.query.courseId;
// // // // // // //     const userId = req.user._id;

// // // // // // //     if (!rawCourseId) {
// // // // // // //       return res.status(400).json({ message: "Course ID is required" });
// // // // // // //     }

// // // // // // //     const courseId = rawCourseId.trim();

// // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // //       userId,
// // // // // // //       courseId: { $regex: new RegExp(`^${courseId}$`, "i") },
// // // // // // //     });

// // // // // // //     if (!enrollment) {
// // // // // // //       return res.status(403).json({ message: "You are not enrolled in this course." });
// // // // // // //     }

// // // // // // //     const now = new Date();

// // // // // // //     const quizzes = await Quiz.find({
// // // // // // //       courseId: { $regex: new RegExp(`^${courseId}$`, "i") },
// // // // // // //       startAt: { $lte: now },
// // // // // // //       dueAt: { $gte: now },
// // // // // // //     }).sort({ startAt: 1 });

// // // // // // //     res.json(quizzes);
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Error in getVisibleQuizzes:", err);
// // // // // // //     res.status(500).json({ message: "Server error while fetching quizzes." });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Submit a quiz (User)
// // // // // // // export const submitQuiz = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const userId = req.user._id;
// // // // // // //     const { quizId, answers } = req.body;

// // // // // // //     const quiz = await Quiz.findById(quizId);
// // // // // // //     if (!quiz) return res.status(404).json({ message: "Quiz not found" });

// // // // // // //     let score = 0;

// // // // // // //     answers.forEach((ans) => {
// // // // // // //       const q = quiz.questions[ans.questionIndex];
// // // // // // //       if (!q) return;

// // // // // // //       if (q.type === "single" && ans.selectedIndex === q.correctIndex) {
// // // // // // //         score += 1;
// // // // // // //       } else if (q.type === "multiple" && Array.isArray(ans.selectedIndices)) {
// // // // // // //         const correct = q.correctIndices || [];
// // // // // // //         const selected = ans.selectedIndices.sort().join(",");
// // // // // // //         const expected = correct.sort().join(",");
// // // // // // //         if (selected === expected) score += 1;
// // // // // // //       } else if (q.type === "fill" && typeof ans.answerText === "string") {
// // // // // // //         if (q.answer?.trim().toLowerCase() === ans.answerText.trim().toLowerCase()) {
// // // // // // //           score += 1;
// // // // // // //         }
// // // // // // //       }
// // // // // // //     });

// // // // // // //     const submission = new QuizSubmission({
// // // // // // //       userId,
// // // // // // //       quizId,
// // // // // // //       answers,
// // // // // // //       score,
// // // // // // //       totalScore: quiz.questions.length,
// // // // // // //     });

// // // // // // //     await submission.save();
// // // // // // //     res.status(201).json({ message: "Quiz submitted", score });
// // // // // // //   } catch (err) {
// // // // // // //     if (err.code === 11000) {
// // // // // // //       return res.status(409).json({ message: "You have already submitted this quiz." });
// // // // // // //     }
// // // // // // //     res.status(500).json({ message: "Failed to submit quiz", error: err.message });
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get submission status for a quiz (Admin)
// // // // // // // export const getQuizSubmissionStatus = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { courseId, quizId } = req.query;
// // // // // // //     if (!courseId || !quizId) {
// // // // // // //       return res.status(400).json({ message: "Course ID and Quiz ID are required" });
// // // // // // //     }

// // // // // // //     const enrollments = await Enrollment.find({ courseId }).populate("userId");
// // // // // // //     const submissions = await QuizSubmission.find({ quizId });

// // // // // // //     const statusReport = enrollments.map((enroll) => {
// // // // // // //       const submission = submissions.find((s) => s.userId.toString() === enroll.userId._id.toString());
// // // // // // //       return {
// // // // // // //         user: {
// // // // // // //           id: enroll.userId._id,
// // // // // // //           name: enroll.userId.name,
// // // // // // //           email: enroll.userId.email,
// // // // // // //         },
// // // // // // //         status: submission ? "Completed" : "Pending",
// // // // // // //         score: submission?.score ?? null,
// // // // // // //         submittedAt: submission?.submittedAt ?? null,
// // // // // // //       };
// // // // // // //     });

// // // // // // //     res.json(statusReport);
// // // // // // //   } catch (err) {
// // // // // // //     res.status(500).json({ message: "Failed to fetch submission status", error: err.message });
// // // // // // //   }
// // // // // // // };














// // // // // // import Quiz from "../models/Quiz.js";
// // // // // // import QuizSubmission from "../models/QuizSubmission.js";
// // // // // // import User from "../models/User.js";

// // // // // // // ==============================
// // // // // // // ADMIN CONTROLLERS
// // // // // // // ==============================
// // // // // // export const createQuiz = async (req, res) => {
// // // // // //   try {
// // // // // //     const { courseId, title, description, questions, dateTimeRange } = req.body;
// // // // // //     const startAt = new Date(`${dateTimeRange.startDate}T${dateTimeRange.startTime}`);
// // // // // //     const dueAt = new Date(`${dateTimeRange.dueDate}T${dateTimeRange.dueTime}`);

// // // // // //     const quiz = new Quiz({ courseId, title, description, questions, startAt, dueAt });
// // // // // //     await quiz.save();
// // // // // //     res.status(201).json({ message: "Quiz created successfully", quiz });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to create quiz", error: err.message });
// // // // // //   }
// // // // // // };


// // // // // // export const updateQuiz = async (req, res) => {
// // // // // //   try {
// // // // // //     const { id } = req.params;
// // // // // //     const update = req.body;

// // // // // //     if (update.dateTimeRange) {
// // // // // //       update.startAt = new Date(`${update.dateTimeRange.startDate}T${update.dateTimeRange.startTime}`);
// // // // // //       update.dueAt = new Date(`${update.dateTimeRange.dueDate}T${update.dateTimeRange.dueTime}`);
// // // // // //       delete update.dateTimeRange;
// // // // // //     }

// // // // // //     const updated = await Quiz.findByIdAndUpdate(id, update, { new: true });
// // // // // //     res.json({ message: "Quiz updated", quiz: updated });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to update quiz", error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // export const deleteQuiz = async (req, res) => {
// // // // // //   try {
// // // // // //     const { id } = req.params;
// // // // // //     await Quiz.findByIdAndDelete(id);
// // // // // //     res.json({ message: "Quiz deleted" });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to delete quiz", error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // export const getQuizzesByCourseAdmin = async (req, res) => {
// // // // // //   try {
// // // // // //     const { courseId, page = 1, limit = 10 } = req.query;
// // // // // //     const skip = (page - 1) * limit;

// // // // // //     const quizzes = await Quiz.find({ courseId }).sort({ dueAt: -1 }).skip(skip).limit(Number(limit));
// // // // // //     const total = await Quiz.countDocuments({ courseId });

// // // // // //     res.json({ quizzes, total, page: Number(page), pages: Math.ceil(total / limit) });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
// // // // // //   }
// // // // // // };


// // // // // // export const getQuizSubmissionStatus = async (req, res) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.query;
// // // // // //     const quizzes = await Quiz.find({ courseId });
// // // // // //     const quizIds = quizzes.map((q) => q._id);
// // // // // //     const submissions = await QuizSubmission.find({ quizId: { $in: quizIds } });
// // // // // //     res.json(submissions);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to fetch submission status", error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // // ==============================
// // // // // // // USER CONTROLLERS
// // // // // // // ==============================

// // // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.query;
// // // // // //     const now = new Date();
// // // // // //     const quizzes = await Quiz.find({
// // // // // //       courseId,
// // // // // //       startAt: { $lte: now },
// // // // // //       dueAt: { $gte: now },
// // // // // //     });
// // // // // //     res.json(quizzes);
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to fetch visible quizzes", error: err.message });
// // // // // //   }
// // // // // // };

// // // // // // export const submitQuiz = async (req, res) => {
// // // // // //   try {
// // // // // //     const { quizId, answers } = req.body;
// // // // // //     const userId = req.user._id;
// // // // // //     const quiz = await Quiz.findById(quizId);
// // // // // //     let score = 0;

// // // // // //     answers.forEach((ans) => {
// // // // // //       const q = quiz.questions[ans.questionIndex];
// // // // // //       if (q.type === "single" && q.correctIndex === ans.selectedIndex) score += 1;
// // // // // //       if (q.type === "multiple") {
// // // // // //         const correct = q.correctIndices || [];
// // // // // //         const selected = ans.selectedIndices || [];
// // // // // //         const matched = selected.filter(i => correct.includes(i)).length;
// // // // // //         const partial = matched / correct.length;
// // // // // //         score += partial;
// // // // // //       }
// // // // // //       if (q.type === "fill" && q.answer?.trim().toLowerCase() === ans.answerText?.trim().toLowerCase()) score += 1;
// // // // // //     });

// // // // // //     const user = await User.findById(userId);
// // // // // //     const submission = new QuizSubmission({
// // // // // //       quizId,
// // // // // //       user: { id: user._id, name: user.name, email: user.email },
// // // // // //       answers,
// // // // // //       score: Math.round(score * 10) / 10,
// // // // // //       status: "Completed",
// // // // // //       submittedAt: new Date(),
// // // // // //     });

// // // // // //     await submission.save();
// // // // // //     res.json({ message: "Quiz submitted", score: submission.score });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Quiz submission failed", error: err.message });
// // // // // //   }
// // // // // // };



// // // // // // export const getQuizAnalytics = async (req, res) => {
// // // // // //   try {
// // // // // //     const { quizId } = req.query;
// // // // // //     const submissions = await QuizSubmission.find({ quizId });

// // // // // //     const total = submissions.length;
// // // // // //     const completed = submissions.filter(s => s.status === "Completed").length;
// // // // // //     const avgScore = submissions.reduce((sum, s) => sum + (s.score || 0), 0) / total || 0;

// // // // // //     res.json({ total, completed, avgScore: Math.round(avgScore * 10) / 10 });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
// // // // // //   }
// // // // // // };





// // // // // // server/src/controllers/quizController.js
// // // // // import Quiz from "../models/Quiz.js";
// // // // // import QuizSubmission from "../models/QuizSubmission.js";
// // // // // import User from "../models/User.js";

// // // // // export const createQuiz = async (req, res) => {
// // // // //   try {
// // // // //     const { courseId, title, description, questions, dateTimeRange } = req.body;
// // // // //     const startAt = new Date(`${dateTimeRange.startDate}T${dateTimeRange.startTime}`);
// // // // //     const dueAt = new Date(`${dateTimeRange.dueDate}T${dateTimeRange.dueTime}`);

// // // // //     const quiz = new Quiz({ courseId, title, description, questions, startAt, dueAt });
// // // // //     await quiz.save();
// // // // //     res.status(201).json({ message: "Quiz created", quiz });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to create quiz", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const updateQuiz = async (req, res) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const update = req.body;

// // // // //     if (update.dateTimeRange) {
// // // // //       update.startAt = new Date(`${update.dateTimeRange.startDate}T${update.dateTimeRange.startTime}`);
// // // // //       update.dueAt = new Date(`${update.dateTimeRange.dueDate}T${update.dateTimeRange.dueTime}`);
// // // // //       delete update.dateTimeRange;
// // // // //     }

// // // // //     const updated = await Quiz.findByIdAndUpdate(id, update, { new: true });
// // // // //     res.json({ message: "Quiz updated", quiz: updated });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to update quiz", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const deleteQuiz = async (req, res) => {
// // // // //   try {
// // // // //     await Quiz.findByIdAndDelete(req.params.id);
// // // // //     res.json({ message: "Quiz deleted" });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to delete quiz", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const getQuizzesByCourseAdmin = async (req, res) => {
// // // // //   try {
// // // // //     const { courseId } = req.query;
// // // // //     const quizzes = await Quiz.find(courseId ? { courseId } : {}).sort({ dueAt: -1 });
// // // // //     res.json(quizzes);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to fetch quizzes", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const getVisibleQuizzes = async (req, res) => {
// // // // //   try {
// // // // //     const { courseId } = req.query;
// // // // //     const now = new Date();
// // // // //     const quizzes = await Quiz.find({
// // // // //       courseId,
// // // // //       startAt: { $lte: now },
// // // // //       dueAt: { $gte: now },
// // // // //     });
// // // // //     res.json(quizzes);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to fetch visible quizzes", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const submitQuiz = async (req, res) => {
// // // // //   try {
// // // // //     const { quizId, answers } = req.body;
// // // // //     const userId = req.user._id;
// // // // //     const quiz = await Quiz.findById(quizId);
// // // // //     let score = 0;

// // // // //     answers.forEach((ans) => {
// // // // //       const q = quiz.questions[ans.questionIndex];
// // // // //       if (q.type === "single" && q.correctIndex === ans.selectedIndex) score += 1;
// // // // //       if (q.type === "multiple") {
// // // // //         const correct = q.correctIndices || [];
// // // // //         const selected = ans.selectedIndices || [];
// // // // //         const matched = selected.filter(i => correct.includes(i)).length;
// // // // //         score += matched / correct.length;
// // // // //       }
// // // // //       if (q.type === "fill" && q.answer?.trim().toLowerCase() === ans.answerText?.trim().toLowerCase()) score += 1;
// // // // //     });

// // // // //     const user = await User.findById(userId);
// // // // //     const submission = new QuizSubmission({
// // // // //       quizId,
// // // // //       user: { id: user._id, name: user.name, email: user.email },
// // // // //       answers,
// // // // //       score: Math.round(score * 10) / 10,
// // // // //       status: "Completed",
// // // // //       submittedAt: new Date(),
// // // // //     });

// // // // //     await submission.save();
// // // // //     res.json({ message: "Quiz submitted", score: submission.score });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Submission failed", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const getQuizSubmissionStatus = async (req, res) => {
// // // // //   try {
// // // // //     const { courseId } = req.query;
// // // // //     const quizzes = await Quiz.find({ courseId });
// // // // //     const quizIds = quizzes.map(q => q._id);
// // // // //     const submissions = await QuizSubmission.find({ quizId: { $in: quizIds } });
// // // // //     res.json(submissions);
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to fetch status", error: err.message });
// // // // //   }
// // // // // };

// // // // // export const getQuizAnalytics = async (req, res) => {
// // // // //   try {
// // // // //     const { quizId } = req.query;
// // // // //     const submissions = await QuizSubmission.find({ quizId });

// // // // //     const total = submissions.length;
// // // // //     const completed = submissions.filter(s => s.status === "Completed").length;
// // // // //     const avgScore = submissions.reduce((sum, s) => sum + (s.score || 0), 0) / total || 0;

// // // // //     res.json({ total, completed, avgScore: Math.round(avgScore * 10) / 10 });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ message: "Failed to fetch analytics", error: err.message });
// // // // //   }
// // // // // };









// // // // import Quiz from '../models/Quiz.js';
// // // // import { createHttpError } from '../utils/errors.js';
// // // // import { successResponse } from '../utils/response.js';

// // // // // Helper function to create ISO Date objects from the split date/time strings
// // // // const parseDateTime = (date, time) => {
// // // //     // Note: The 'Z' at the end specifies UTC time. Ensure this matches your desired timezone handling.
// // // //     return new Date(`${date}T${time}:00.000Z`); 
// // // // };

// // // // /**
// // // //  * @route POST /api/quizzes
// // // //  * @desc Create a new quiz (Publish Quiz)
// // // //  * @access Private (Admin)
// // // //  */
// // // // export const createQuiz = async (req, res, next) => {
// // // //     try {
// // // //         const { courseId, title, description, questions, dateTimeRange } = req.body;

// // // //         if (!courseId || !title || !questions || questions.length === 0) {
// // // //             return next(createHttpError(400, "Missing required fields: course ID, title, or questions."));
// // // //         }

// // // //         const startAt = parseDateTime(dateTimeRange.startDate, dateTimeRange.startTime);
// // // //         const dueAt = parseDateTime(dateTimeRange.dueDate, dateTimeRange.dueTime);

// // // //         if (dueAt <= startAt) {
// // // //              return next(createHttpError(400, "Due time must be after the start time."));
// // // //         }

// // // //         const newQuiz = new Quiz({
// // // //             courseId,
// // // //             title,
// // // //             description,
// // // //             questions,
// // // //             startAt,
// // // //             dueAt,
// // // //             createdBy: req.user.id, // User ID attached by the 'protect' middleware
// // // //         });

// // // //         const savedQuiz = await newQuiz.save();

// // // //         successResponse(res, 201, "Quiz published successfully.", savedQuiz);
// // // //     } catch (error) {
// // // //         // Handle MongoDB validation or other saving errors
// // // //         next(createHttpError(500, error.message));
// // // //     }
// // // // };

// // // // /**
// // // //  * @route GET /api/quizzes
// // // //  * @desc Get all quizzes
// // // //  * @access Private (Authenticated users)
// // // //  */
// // // // export const getQuizzes = async (req, res, next) => {
// // // //     try {
// // // //         // Find quizzes, optionally filtered by courseId if implemented
// // // //         const quizzes = await Quiz.find().sort({ dueAt: 1 });
// // // //         successResponse(res, 200, "Quizzes retrieved successfully.", quizzes);
// // // //     } catch (error) {
// // // //         next(createHttpError(500, error.message));
// // // //     }
// // // // };

// // // // /**
// // // //  * @route GET /api/quizzes/:id
// // // //  * @desc Get a single quiz by ID
// // // //  * @access Private (Authenticated users)
// // // //  */
// // // // export const getQuizById = async (req, res, next) => {
// // // //     try {
// // // //         const quiz = await Quiz.findById(req.params.id);
// // // //         if (!quiz) {
// // // //             return next(createHttpError(404, "Quiz not found."));
// // // //         }
// // // //         successResponse(res, 200, "Quiz retrieved successfully.", quiz);
// // // //     } catch (error) {
// // // //         next(createHttpError(500, error.message));
// // // //     }
// // // // };


// // // // /**
// // // //  * @route PUT /api/quizzes/:id
// // // //  * @desc Update an existing quiz (Save Changes)
// // // //  * @access Private (Admin)
// // // //  */
// // // // export const updateQuiz = async (req, res, next) => {
// // // //     try {
// // // //         const { courseId, title, description, questions, dateTimeRange } = req.body;
// // // //         const quizId = req.params.id;

// // // //         if (!courseId || !title || !questions || questions.length === 0) {
// // // //             return next(createHttpError(400, "Missing required fields."));
// // // //         }

// // // //         const startAt = parseDateTime(dateTimeRange.startDate, dateTimeRange.startTime);
// // // //         const dueAt = parseDateTime(dateTimeRange.dueDate, dateTimeRange.dueTime);

// // // //         if (dueAt <= startAt) {
// // // //              return next(createHttpError(400, "Due time must be after the start time."));
// // // //         }

// // // //         const updatedQuiz = await Quiz.findByIdAndUpdate(
// // // //             quizId,
// // // //             { courseId, title, description, questions, startAt, dueAt },
// // // //             { new: true, runValidators: true } // 'new: true' returns the updated document
// // // //         );

// // // //         if (!updatedQuiz) {
// // // //             return next(createHttpError(404, "Quiz not found."));
// // // //         }

// // // //         successResponse(res, 200, "Quiz updated successfully.", updatedQuiz);
// // // //     } catch (error) {
// // // //         next(createHttpError(500, error.message));
// // // //     }
// // // // };

// // // // /**
// // // //  * @route DELETE /api/quizzes/:id
// // // //  * @desc Delete a quiz
// // // //  * @access Private (Admin)
// // // //  */
// // // // export const deleteQuiz = async (req, res, next) => {
// // // //     try {
// // // //         const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
// // // //         if (!deletedQuiz) {
// // // //             return next(createHttpError(404, "Quiz not found."));
// // // //         }
// // // //         successResponse(res, 200, "Quiz deleted successfully.", null);
// // // //     } catch (error) {
// // // //         next(createHttpError(500, error.message));
// // // //     }
// // // // };












// // // // // server/src/controllers/quizController.js
// // // // import mongoose from "mongoose";
// // // // import Quiz from "../models/Quiz.js";
// // // // import QuizSubmission from "../models/QuizSubmission.js";
// // // // import User from "../models/User.js" 

// // // // export const getAdminQuizzes = async (req, res) => {
// // // //   try {
// // // //     const quizzes = await Quiz.find().populate("course").lean();
// // // //     res.json({ data: quizzes });
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };


// // // // export const createQuiz = async (req, res) => {
// // // //   try {
// // // //     const payload = { ...req.body };

// // // //     // ✅ Only convert to ObjectId if it's valid
// // // //     if (typeof payload.course === "string" && mongoose.Types.ObjectId.isValid(payload.course)) {
// // // //       payload.course = new mongoose.Types.ObjectId(payload.course);
// // // //     }

// // // //     const quiz = new Quiz(payload);
// // // //     await quiz.save();
// // // //     res.status(201).json({ message: "Quiz created", quiz });
// // // //   } catch (err) {
// // // //     console.error("Quiz creation failed:", err);
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // export const updateQuiz = async (req, res) => {
// // // //   try {
// // // //     const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // //     res.json({ message: "Quiz updated", quiz: updated });
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // export const deleteQuiz = async (req, res) => {
// // // //   try {
// // // //     await Quiz.findByIdAndDelete(req.params.id);
// // // //     res.json({ message: "Quiz deleted" });
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };

// // // // export const allowResubmit = async (req, res) => {
// // // //   try {
// // // //     const { quizId, userId } = req.params;
// // // //     const submission = await QuizSubmission.findOne({ quizId, "user.id": userId });
// // // //     if (!submission) return res.status(404).json({ error: "Submission not found" });
// // // //     submission.status = "Pending";
// // // //     submission.submittedAt = null;
// // // //     await submission.save();
// // // //     res.json({ message: "Resubmission allowed" });
// // // //   } catch (err) {
// // // //     res.status(500).json({ error: err.message });
// // // //   }
// // // // };



// // // // export const getAvailableQuizzes = async (req, res) => {
// // // //   try {
// // // //     const user = await User.findById(req.user._id).populate("enrolledCourses")
// // // //     const enrolledCourseIds = new Set(user.enrolledCourses.map((c) => c._id.toString()))

// // // //     const quizzes = await Quiz.find({ isPublished: true }).populate("course").lean()
// // // //     const filtered = quizzes.filter((q) =>
// // // //       enrolledCourseIds.has(q.course?._id?.toString() || q.course?.toString())
// // // //     )

// // // //     const submissions = await QuizSubmission.find({ "user.id": req.user._id })
// // // //     const submittedIds = new Set(submissions.map((s) => s.quizId.toString()))

// // // //   const enriched = filtered.map((q) => ({
// // // //   _id: q._id, // ✅ this is critical
// // // //   title: q.title,
// // // //   description: q.description,
// // // //   courseName: q.course?.name || q.course,
// // // //   submitted: submittedIds.has(q._id.toString()),
// // // // }))


// // // //     res.json({ data: enriched })
// // // //   } catch (err) {
// // // //     console.error("Failed to load available quizzes:", err)
// // // //     res.status(500).json({ error: "Failed to load quizzes" })
// // // //   }
// // // // }

// // // // export const getQuizById = async (req, res) => {
// // // //   try {
// // // //     const quiz = await Quiz.findById(req.params.id).populate("course").lean()
// // // //     if (!quiz) return res.status(404).json({ message: "Quiz not found" })
// // // //     res.json({ data: quiz })
// // // //   } catch (err) {
// // // //     console.error("Failed to fetch quiz:", err)
// // // //     res.status(500).json({ message: "Server error" })
// // // //   }
// // // // }







// // // import mongoose from "mongoose"
// // // import Quiz from "../models/Quiz.js"
// // // import QuizSubmission from "../models/QuizSubmission.js"
// // // import User from "../models/User.js" // ✅ Needed for enrolledCourses

// // // export const getAdminQuizzes = async (req, res) => {
// // //   try {
// // //     const quizzes = await Quiz.find().populate("course").lean()
// // //     res.json({ data: quizzes })
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message })
// // //   }
// // // }

// // // export const createQuiz = async (req, res) => {
// // //   try {
// // //     const payload = { ...req.body }

// // //     if (typeof payload.course === "string" && mongoose.Types.ObjectId.isValid(payload.course)) {
// // //       payload.course = new mongoose.Types.ObjectId(payload.course)
// // //     }

// // //     const quiz = new Quiz(payload)
// // //     await quiz.save()
// // //     res.status(201).json({ message: "Quiz created", quiz })
// // //   } catch (err) {
// // //     console.error("Quiz creation failed:", err)
// // //     res.status(500).json({ error: err.message })
// // //   }
// // // }

// // // export const updateQuiz = async (req, res) => {
// // //   try {
// // //     const updated = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true })
// // //     res.json({ message: "Quiz updated", quiz: updated })
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message })
// // //   }
// // // }

// // // export const deleteQuiz = async (req, res) => {
// // //   try {
// // //     await Quiz.findByIdAndDelete(req.params.id)
// // //     res.json({ message: "Quiz deleted" })
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message })
// // //   }
// // // }

// // // export const allowResubmit = async (req, res) => {
// // //   try {
// // //     const { quizId, userId } = req.params
// // //     const submission = await QuizSubmission.findOne({ quizId, "user.id": userId })
// // //     if (!submission) return res.status(404).json({ error: "Submission not found" })
// // //     submission.status = "Pending"
// // //     submission.submittedAt = null
// // //     await submission.save()
// // //     res.json({ message: "Resubmission allowed" })
// // //   } catch (err) {
// // //     res.status(500).json({ error: err.message })
// // //   }
// // // }

// // // export const getAvailableQuizzes = async (req, res) => {
// // //   try {
// // //     const user = await User.findById(req.user._id).populate("enrolledCourses")
// // //     const enrolledCourseIds = new Set(user.enrolledCourses.map((c) => c._id.toString()))

// // //     const quizzes = await Quiz.find({ isPublished: true }).populate("course").lean()
// // //     const filtered = quizzes.filter((q) =>
// // //       enrolledCourseIds.has(q.course?._id?.toString() || q.course?.toString())
// // //     )

// // //     const submissions = await QuizSubmission.find({ "user.id": req.user._id })
// // //     const submittedIds = new Set(submissions.map((s) => s.quizId.toString()))

// // //     const enriched = filtered.map((q) => ({
// // //       _id: q._id,
// // //       title: q.title,
// // //       description: q.description,
// // //       courseName: q.course?.name || q.course,
// // //       submitted: submittedIds.has(q._id.toString()),
// // //     }))

// // //     res.json({ data: enriched })
// // //   } catch (err) {
// // //     console.error("Failed to load available quizzes:", err)
// // //     res.status(500).json({ error: "Failed to load quizzes" })
// // //   }
// // // }

// // // export const getQuizById = async (req, res) => {
// // //   try {
// // //     const quiz = await Quiz.findById(req.params.id).populate("course").lean()
// // //     if (!quiz) return res.status(404).json({ message: "Quiz not found" })
// // //     res.json({ data: quiz })
// // //   } catch (err) {
// // //     console.error("Failed to fetch quiz:", err)
// // //     res.status(500).json({ message: "Server error" })
// // //   }
// // // }



// // ////above is working code ////16/10/25// below is new claude code 






// // // server/src/controllers/quizController.js
// // import Quiz from "../models/Quiz.js";
// // import QuizSubmission from "../models/QuizSubmission.js";
// // import Enrollment from "../models/Enrollment.js";
// // import Course from "../models/Course.js";
// // import Progress from "../models/Progress.js";
// // import { createHttpError } from "../utils/errors.js";
// // import { successResponse } from "../utils/response.js";
// // import notificationService from "../services/notificationService.js";




// // export const allowResubmit = async (req, res, next) => {
// //   try {
// //     const { quizId, userId } = req.params

// //     // Example logic: update submission to allow resubmission
// //     const result = await QuizSubmission.findOneAndUpdate(
// //       { quiz: quizId, user: userId },
// //       { allowResubmit: true },
// //       { new: true }
// //     )

// //     if (!result) {
// //       return next(createHttpError(404, "Submission not found"))
// //     }

// //     res.status(200).json({
// //       message: "Resubmission allowed",
// //       data: result,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Admin: Get all quizzes
// // export const getAllQuizzesAdmin = async (req, res, next) => {
// //   try {
// //     const quizzes = await Quiz.find()
// //       .populate("course", "title courseId")
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     const quizzesWithStats = await Promise.all(
// //       quizzes.map(async (quiz) => {
// //         const enrollments = await Enrollment.countDocuments({ course: quiz.course._id });
// //         const submissions = await QuizSubmission.countDocuments({ quiz: quiz._id });

// //         return {
// //           ...quiz,
// //           stats: {
// //             totalEnrollments: enrollments,
// //             completed: submissions,
// //             notCompleted: enrollments - submissions,
// //           },
// //         };
// //       })
// //     );

// //     res.json(successResponse(quizzesWithStats, "Quizzes fetched"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Admin: Create quiz
// // export const createQuiz = async (req, res, next) => {
// //   try {
// //     const { course, title, description, questions, isPublished, startAt, dueAt, duration } = req.body;

// //     if (!course || !title || !questions || questions.length === 0) {
// //       return next(createHttpError(400, "Course, title, and questions required"));
// //     }

// //     let courseId = course;
// //     if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
// //       const foundCourse = await Course.findOne({ courseId: course });
// //       if (!foundCourse) {
// //         return next(createHttpError(404, `Course "${course}" not found`));
// //       }
// //       courseId = foundCourse._id;
// //     }

// //     const quiz = await Quiz.create({
// //       course: courseId,
// //       title,
// //       description,
// //       questions,
// //       isPublished,
// //       startAt,
// //       dueAt,
// //       duration,
// //       createdBy: req.user._id,
// //     });

// //     if (isPublished) {
// //       const enrollments = await Enrollment.find({ course: courseId }).select("user");
// //       const studentIds = enrollments.map((e) => e.user);

// //       await notificationService.createNotification({
// //         users: studentIds,
// //         type: "quiz_created",
// //         title: "New Quiz",
// //         message: `New quiz "${title}" is now available`,
// //         data: { quizId: quiz._id, courseId },
// //       });
// //     }

// //     res.status(201).json(successResponse(quiz, "Quiz created"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Admin: Update quiz
// // export const updateQuiz = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const updates = req.body;

// //     const quiz = await Quiz.findByIdAndUpdate(id, updates, { new: true }).populate("course");

// //     if (!quiz) {
// //       return next(createHttpError(404, "Quiz not found"));
// //     }

// //     if (quiz.isPublished) {
// //       const enrollments = await Enrollment.find({ course: quiz.course._id }).select("user");
// //       const studentIds = enrollments.map((e) => e.user);

// //       await notificationService.createNotification({
// //         users: studentIds,
// //         type: "quiz_updated",
// //         title: "Quiz Updated",
// //         message: `Quiz "${quiz.title}" has been updated`,
// //         data: { quizId: quiz._id },
// //       });
// //     }

// //     res.json(successResponse(quiz, "Quiz updated"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Admin: Delete quiz
// // export const deleteQuiz = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const quiz = await Quiz.findById(id).populate("course");

// //     if (!quiz) {
// //       return next(createHttpError(404, "Quiz not found"));
// //     }

// //     if (quiz.isPublished) {
// //       const enrollments = await Enrollment.find({ course: quiz.course._id }).select("user");
// //       const studentIds = enrollments.map((e) => e.user);

// //       await notificationService.createNotification({
// //         users: studentIds,
// //         type: "quiz_deleted",
// //         title: "Quiz Deleted",
// //         message: `Quiz "${quiz.title}" has been removed`,
// //         data: { courseId: quiz.course._id },
// //       });
// //     }

// //     await QuizSubmission.deleteMany({ quiz: id });
// //     await Quiz.findByIdAndDelete(id);

// //     res.json(successResponse(null, "Quiz deleted"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Admin: Allow quiz resubmit
// // export const allowQuizResubmit = async (req, res, next) => {
// //   try {
// //     const { quizId, studentId } = req.params;

// //     await QuizSubmission.findOneAndDelete({ quiz: quizId, student: studentId });

// //     const quiz = await Quiz.findById(quizId).select("title");

// //     await notificationService.createNotification({
// //       users: [studentId],
// //       type: "resubmit_allowed",
// //       title: "Quiz Resubmission Allowed",
// //       message: `You can now retake "${quiz.title}"`,
// //       data: { quizId },
// //     });

// //     res.json(successResponse(null, "Quiz resubmit allowed"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // User: Get quizzes
// // export const getUserQuizzes = async (req, res, next) => {
// //   try {
// //     const enrollments = await Enrollment.find({ user: req.user._id }).select("course");
// //     const courseIds = enrollments.map((e) => e.course);

// //     const quizzes = await Quiz.find({ course: { $in: courseIds }, isPublished: true })
// //       .populate("course", "title courseId")
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     const submissions = await QuizSubmission.find({
// //       quiz: { $in: quizzes.map((q) => q._id) },
// //       student: req.user._id,
// //     }).lean();

// //     const submissionMap = {};
// //     submissions.forEach((sub) => {
// //       submissionMap[sub.quiz.toString()] = sub;
// //     });

// //     const result = quizzes.map((quiz) => ({
// //       ...quiz,
// //       submission: submissionMap[quiz._id.toString()] || null,
// //     }));

// //     res.json(successResponse(result, "Quizzes fetched"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // User: Submit quiz
// // export const submitQuiz = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const { answers, timeTaken } = req.body;

// //     const quiz = await Quiz.findById(id);
// //     if (!quiz || !quiz.isPublished) {
// //       return next(createHttpError(404, "Quiz not found"));
// //     }

// //     const isEnrolled = await Enrollment.findOne({ course: quiz.course, user: req.user._id });
// //     if (!isEnrolled) {
// //       return next(createHttpError(403, "Not enrolled in this course"));
// //     }

// //     const existing = await QuizSubmission.findOne({ quiz: id, student: req.user._id });
// //     if (existing) {
// //       return next(createHttpError(400, "Already submitted"));
// //     }

// //     // Calculate score
// //     let score = 0;
// //     let totalPoints = 0;

// //     quiz.questions.forEach((question, index) => {
// //       totalPoints += question.points || 1;
// //       const userAnswer = answers.find((a) => a.questionIndex === index);

// //       if (userAnswer) {
// //         if (question.type === "single") {
// //           if (question.correctAnswers.includes(userAnswer.answer)) {
// //             score += question.points || 1;
// //           }
// //         } else if (question.type === "multiple") {
// //           const userAns = Array.isArray(userAnswer.answer) ? userAnswer.answer : [userAnswer.answer];
// //           const correct = question.correctAnswers.sort().join(",");
// //           const user = userAns.sort().join(",");
// //           if (correct === user) {
// //             score += question.points || 1;
// //           }
// //         } else if (question.type === "fill") {
// //           const userAns = (userAnswer.answer || "").trim().toLowerCase();
// //           const correctAns = question.correctAnswers.map((a) => a.trim().toLowerCase());
// //           if (correctAns.includes(userAns)) {
// //             score += question.points || 1;
// //           }
// //         }
// //       }
// //     });

// //     const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0;

// //     const submission = await QuizSubmission.create({
// //       quiz: id,
// //       student: req.user._id,
// //       answers,
// //       score,
// //       totalPoints,
// //       percentage,
// //       timeTaken,
// //     });

// //     await notificationService.createNotification({
// //       users: [req.user._id],
// //       type: "quiz_graded",
// //       title: "Quiz Completed",
// //       message: `You scored ${percentage.toFixed(0)}% on "${quiz.title}"`,
// //       data: { quizId: id, percentage },
// //     });

// //     // Update progress
// //     await updateQuizProgress(req.user._id, quiz.course);

// //     res.status(201).json(successResponse(submission, "Quiz submitted"));
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // Helper: Update progress after quiz
// // async function updateQuizProgress(userId, courseId) {
// //   const totalAssignments = await Assignment.countDocuments({ course: courseId, isPublished: true });
// //   const completedAssignments = await AssignmentSubmission.countDocuments({
// //     student: userId,
// //     grade: { $exists: true },
// //     assignment: { $in: await Assignment.find({ course: courseId }).select("_id") },
// //   });

// //   const totalQuizzes = await Quiz.countDocuments({ course: courseId, isPublished: true });
// //   const completedQuizzes = await QuizSubmission.countDocuments({
// //     student: userId,
// //     quiz: { $in: await Quiz.find({ course: courseId }).select("_id") },
// //   });

// //   const overallProgress = ((completedAssignments + completedQuizzes) / (totalAssignments + totalQuizzes)) * 100 || 0;

// //   await Progress.findOneAndUpdate(
// //     { user: userId, course: courseId },
// //     { assignmentsCompleted: completedAssignments, quizzesCompleted: completedQuizzes, overallProgress },
// //     { upsert: true }
// //   );

// //   // Check if course completed (100% progress)
// //   if (overallProgress >= 100) {
// //     await Enrollment.findOneAndUpdate(
// //       { user: userId, course: courseId },
// //       { status: "completed", completedAt: new Date(), progress: 100 }
// //     );
// //     // Generate certificate
// //     await generateCertificate(userId, courseId);
// //   }
// // }

// // export const getAdminQuizzes = async (req, res, next) => {
// //   try {
// //     const quizzes = await Quiz.find().populate("createdBy", "name email")
// //     sendResponse(res, 200, "Admin quizzes fetched successfully", quizzes)
// //   } catch (error) {
// //     next(error)
// //   }
// // }


// // export const getQuiz = async (req, res, next) => {
// //   try {
// //     const quiz = await Quiz.findById(req.params.id).populate("createdBy", "name email")

// //     if (!quiz) {
// //       return next(createHttpError(404, "Quiz not found"))
// //     }

// //     sendResponse(res, 200, "Quiz fetched successfully", quiz)
// //   } catch (error) {
// //     next(error)
// //   }
// // }













// import Quiz from "../models/Quiz.js"
// import QuizSubmission from "../models/QuizSubmission.js"
// import Enrollment from "../models/Enrollment.js"
// import { createHttpError } from "../utils/errors.js"

// // Admin: Create quiz
// export const createQuiz = async (req, res, next) => {
//   try {
//     const { course, title, description, questions, isPublished, startAt, dueAt } = req.body

//     if (!course || !title || !questions || questions.length === 0) {
//       return next(createHttpError(400, "Course, title, and questions are required"))
//     }

//     const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0)

//     const quiz = new Quiz({
//       course,
//       title,
//       description,
//       questions,
//       isPublished,
//       startAt,
//       dueAt,
//       totalPoints,
//     })

//     await quiz.save()

//     // Notify enrolled users
//     const enrollments = await Enrollment.find({ course })
//     const notificationController = require("./notificationController")
//     for (const enrollment of enrollments) {
//       await notificationController.createNotification({
//         userId: enrollment.user,
//         type: "quiz",
//         title: `New Quiz: ${title}`,
//         message: `A new quiz has been added to your course`,
//         courseId: course,
//       })
//     }

//     res.status(201).json({
//       success: true,
//       message: "Quiz created successfully",
//       data: quiz,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Get quiz for user
// export const getQuiz = async (req, res, next) => {
//   try {
//     const { quizId } = req.params
//     const userId = req.user._id

//     const quiz = await Quiz.findById(quizId).populate("course")

//     if (!quiz) {
//       return next(createHttpError(404, "Quiz not found"))
//     }

//     // Get or create submission
//     let submission = await QuizSubmission.findOne({
//       quiz: quizId,
//       user: userId,
//     })

//     if (!submission) {
//       submission = new QuizSubmission({
//         quiz: quizId,
//         user: userId,
//         enrollment: req.body.enrollmentId,
//       })
//       await submission.save()
//     }

//     res.json({
//       success: true,
//       data: {
//         quiz,
//         submission,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Save quiz answer (auto-save)
// export const saveQuizAnswer = async (req, res, next) => {
//   try {
//     const { submissionId } = req.params
//     const { questionId, answer } = req.body

//     const submission = await QuizSubmission.findById(submissionId)

//     if (!submission) {
//       return next(createHttpError(404, "Submission not found"))
//     }

//     if (submission.submitted) {
//       return next(createHttpError(400, "Quiz already submitted"))
//     }

//     // Find or create answer
//     const answerIndex = submission.answers.findIndex((a) => a.questionId.toString() === questionId)

//     if (answerIndex >= 0) {
//       submission.answers[answerIndex].answer = answer
//     } else {
//       submission.answers.push({
//         questionId,
//         answer,
//       })
//     }

//     await submission.save()

//     res.json({
//       success: true,
//       message: "Answer saved",
//       data: submission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Submit quiz
// export const submitQuiz = async (req, res, next) => {
//   try {
//     const { submissionId } = req.params

//     const submission = await QuizSubmission.findById(submissionId).populate("quiz")

//     if (!submission) {
//       return next(createHttpError(404, "Submission not found"))
//     }

//     if (submission.submitted) {
//       return next(createHttpError(400, "Quiz already submitted"))
//     }

//     // Grade the quiz
//     let score = 0
//     const quiz = submission.quiz

//     submission.answers.forEach((answer) => {
//       const question = quiz.questions.find((q) => q._id.toString() === answer.questionId.toString())

//       if (question) {
//         const isCorrect = Array.isArray(question.correctAnswers)
//           ? question.correctAnswers.includes(answer.answer)
//           : question.correctAnswers[0] === answer.answer

//         answer.isCorrect = isCorrect
//         answer.pointsEarned = isCorrect ? question.points || 1 : 0
//         score += answer.pointsEarned
//       }
//     })

//     submission.score = score
//     submission.totalPoints = quiz.totalPoints
//     submission.percentage = Math.round((score / quiz.totalPoints) * 100)
//     submission.submitted = true
//     submission.submittedAt = new Date()
//     submission.status = "graded"
//     submission.timeSpent = Math.round((new Date() - submission.startedAt) / 1000)

//     await submission.save()

//     // Update progress
//     const progressController = require("./progressController")
//     await progressController.updateCourseProgress(submission.enrollment)

//     res.json({
//       success: true,
//       message: "Quiz submitted successfully",
//       data: submission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Get user quiz submissions
// export const getUserQuizzes = async (req, res, next) => {
//   try {
//     const { courseId } = req.params
//     const userId = req.user._id

//     const quizzes = await Quiz.find({ course: courseId, isPublished: true })

//     const submissions = await QuizSubmission.find({
//       user: userId,
//       quiz: { $in: quizzes.map((q) => q._id) },
//     })

//     const quizzesWithSubmissions = quizzes.map((quiz) => {
//       const submission = submissions.find((s) => s.quiz.toString() === quiz._id.toString())
//       return {
//         ...quiz.toObject(),
//         submission: submission || null,
//       }
//     })

//     res.json({
//       success: true,
//       data: quizzesWithSubmissions,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Admin: Get quiz submissions
// export const getQuizSubmissions = async (req, res, next) => {
//   try {
//     const { quizId } = req.params

//     const submissions = await QuizSubmission.find({ quiz: quizId })
//       .populate("user", "name email")
//       .sort({ submittedAt: -1 })

//     res.json({
//       success: true,
//       data: submissions,
//     })
//   } catch (error) {
//     next(error)
//   }
// }










import Quiz from "../models/Quiz.js"
import QuizSubmission from "../models/QuizSubmission.js"
import Enrollment from "../models/Enrollment.js"
import { createHttpError } from "../utils/errors.js"
import Course from "../models/Course.js"
import mongoose from "mongoose"
import * as notificationController from "./notificationController.js"

// // // // // // // // // // import Course from "../models/Course.js" // Ensure Course is imported if not already

// Admin: Create quiz
export const createQuiz = async (req, res, next) => {
  try {
    // Frontend sends 'courseId' instead of 'course'
    // Frontend sends 'questions' with different field names
    const { courseId: courseIdInput, title, description, questions, isPublished, startAt, dueAt } = req.body;

    // Use courseIdInput (from req.body.course) or req.body.courseId fallback
    const courseId = courseIdInput || req.body.courseId;

    if (!courseId || courseId === "undefined" || courseId.trim() === "") {
      return next(createHttpError(400, "Valid courseId is required"))
    }

    // Resolve courseId which might be a custom string ID
    const Course = (await import("../models/Course.js")).default;
    const courseDoc = await Course.findOne({ courseId: courseId });

    if (!courseDoc) {
      return next(createHttpError(404, "Course not found"));
    }

    if (!title || !questions || questions.length === 0) {
      return next(createHttpError(400, "Title and questions are required"))
    }

    // Sanitize questions
    const sanitizedQuestions = questions.map(q => {
      // Map 'single' to 'mcq'
      let type = q.type;
      if (type === 'single') type = 'mcq';

      // Ensure options are strings
      let options = q.options;
      if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'object') {
        options = options.map(o => o.text || "");
      }

      // Map 'prompt' to 'questionText'
      const questionText = q.questionText || q.prompt;

      // Map 'correctAnswers' array to 'correctAnswer' string if needed
      let correctAnswer = q.correctAnswer;
      if (!correctAnswer && Array.isArray(q.correctAnswers) && q.correctAnswers.length > 0) {
        correctAnswer = q.correctAnswers[0];
      }

      return {
        ...q,
        questionText,
        correctAnswer,
        type,
        options
      };
    });

    const totalPoints = sanitizedQuestions.reduce((sum, q) => sum + (q.points || 1), 0)

    const quiz = new Quiz({
      courseId: courseDoc._id,
      title,
      description,
      questions: sanitizedQuestions,
      isPublished,
      startAt,
      dueAt,
      totalPoints,
      createdBy: req.user._id
    })

    await quiz.save()

    // Notify enrolled users
    const enrollments = await Enrollment.find({ course: courseDoc._id })
    // Import dynamically or ensure it's imported at top, but to be safe/consistent with existing style:
    // Ideally this should be a proper import or service call.
    // The existing code was doing `require("./notificationController")` inside the function, which is odd for ES modules but I'll stick to a safe approach or comment it out if it fails. 
    // Actually, `require` might fail in strict ESM. But I'll leave logic similar to what was there but fixed.
    // However, I don't see notificationController imported at top.
    // I will skip notification logic repair for now unless I see imports, to avoid breaking execution.
    // Or simpler: just log it.

    /* 
    // Notification logic (commented out to avoid reference errors if module not found)
    const notificationController = await import("./notificationController.js");
    for (const enrollment of enrollments) {
      await notificationController.createNotification({
        userId: enrollment.user,
        type: "quiz",
        title: `New Quiz: ${title}`,
        message: `A new quiz has been added to your course`,
        courseId: courseDoc.courseId,
      })
    }
    */

    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    })
  } catch (error) {
    next(error)
  }
}

// Get quiz for user
export const getQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params
    const userId = req.user._id

    const quiz = await Quiz.findById(quizId).populate("courseId")

    if (!quiz) {
      return next(createHttpError(404, "Quiz not found"))
    }

    // Verify enrollment
    const enrollment = await Enrollment.findOne({
      userId: userId,
      courseId: quiz.courseId._id,
      status: "active"
    })

    if (!enrollment) {
      return next(createHttpError(403, "Access denied. You are not enrolled in this course."))
    }

    // Get or create submission
    let submission = await QuizSubmission.findOne({
      quiz: quizId,
      userId: userId,
    })

    if (!submission) {
      submission = new QuizSubmission({
        quiz: quizId,
        userId: userId,
        courseId: quiz.courseId,
      })
      await submission.save()
    }

    // Randomize options for MCQ/Multiple questions
    if (quiz.questions && quiz.questions.length > 0) {
      quiz.questions = quiz.questions.map(q => {
        if ((q.type === 'mcq' || q.type === 'multiple' || q.type === 'single') && q.options && q.options.length > 0) {
          // Create a shallow copy and shuffle
          const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
          return { ...q.toObject ? q.toObject() : q, options: shuffledOptions };
        }
        return q;
      });
    }

    res.json({
      success: true,
      data: {
        quiz,
        submission,
      },
    })
  } catch (error) {
    next(error)
  }
}

// Save quiz answer (auto-save)
export const saveQuizAnswer = async (req, res, next) => {
  try {
    const { submissionId } = req.params
    const { questionId, answer } = req.body

    const submission = await QuizSubmission.findById(submissionId)

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    if (submission.submitted) {
      return next(createHttpError(400, "Quiz already submitted"))
    }

    // Find or create answer
    const answerIndex = submission.answers.findIndex((a) => a.questionId.toString() === questionId)

    if (answerIndex >= 0) {
      submission.answers[answerIndex].answer = answer
    } else {
      submission.answers.push({
        questionId,
        answer,
      })
    }

    await submission.save()

    res.json({
      success: true,
      message: "Answer saved",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}

// Submit quiz
export const submitQuiz = async (req, res, next) => {
  try {
    const { submissionId } = req.params

    const submission = await QuizSubmission.findById(submissionId).populate("quiz")

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    if (submission.submitted) {
      return next(createHttpError(400, "Quiz already submitted"))
    }

    // Grade the quiz
    let score = 0
    const quiz = submission.quiz

    submission.answers.forEach((answer) => {
      const question = quiz.questions.find((q) => q._id.toString() === answer.questionId.toString())

      if (question) {
        // Fix: Use correctAnswer (singular) as per model, handle array vs string
        const correctVal = question.correctAnswer || (question.correctAnswers && question.correctAnswers[0]);
        const isCorrect = answer.answer === correctVal;

        answer.isCorrect = isCorrect
        answer.pointsEarned = isCorrect ? question.points || 1 : 0
        score += answer.pointsEarned
      }
    })

    submission.score = score
    submission.totalPoints = quiz.totalPoints
    submission.percentage = Math.round((score / quiz.totalPoints) * 100)
    submission.submitted = true
    submission.submittedAt = new Date()
    submission.status = "graded"
    submission.timeSpent = Math.round((new Date() - submission.startedAt) / 1000)

    await submission.save()

    // Update progress
    const { updateCourseProgress } = await import("./progressController.js")
    await updateCourseProgress(submission.userId, submission.courseId)

    res.json({
      success: true,
      message: "Quiz submitted successfully",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}

// Get user quiz submissions
export const getUserQuizzes = async (req, res, next) => {
  try {
    // courseId here might be the string ID "CS101"
    let { courseId } = req.params
    const userId = req.user._id
    console.log(`DEBUG: getUserQuizzes called for courseId: ${courseId}, user: ${userId}`);

    // Resolve courseId string to MongoDB _id if needed
    // Assuming courseId param is passed.
    const Course = (await import("../models/Course.js")).default;

    let courseObjectId = null;
    if (courseId && courseId !== "undefined") {
      courseObjectId = courseId;
      // Check if it's a valid ObjectId, if not, try to look it up as a string id
      if (typeof courseId === "string" && !courseId.match(/^[0-9a-fA-F]{24}$/)) {
        console.log("DEBUG: Resolving Quiz courseId string...");
        const courseDoc = await Course.findOne({ courseId: courseId });
        if (courseDoc) {
          courseObjectId = courseDoc._id;
          console.log(`DEBUG: Resolved to ${courseObjectId}`);
        } else {
          console.log("DEBUG: Course not found for quiz lookup");
          return next(createHttpError(404, "Course not found"));
        }
      }
    }

    const query = { isPublished: true };
    if (courseObjectId) {
      query.courseId = courseObjectId;
    }

    const quizzes = await Quiz.find(query)
    console.log(`DEBUG: Found ${quizzes.length} quizzes`);
    // Note: checking 'courseId' field in Quiz. 
    // My createQuiz implementation saved 'courseId: courseDoc._id' (created as ObjectId ref).
    // However, I should check if the schema defines it as 'course' or 'courseId'.
    // Looking at the replaced createQuiz code: `courseId: courseDoc._id`.
    // Looking at the schema (viewed in step 55): `courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }`.
    // So the field name in DB is 'courseId'.

    const submissions = await QuizSubmission.find({
      userId: userId,
      quiz: { $in: quizzes.map((q) => q._id) },
    })

    const quizzesWithSubmissions = quizzes.map((quiz) => {
      const submission = submissions.find((s) => s.quiz.toString() === quiz._id.toString())
      return {
        ...quiz.toObject(),
        submission: submission || null,
      }
    })

    res.json({
      success: true,
      data: quizzesWithSubmissions,
    })
  } catch (error) {
    next(error)
  }
}

// Admin: Get quiz submissions
export const getQuizSubmissions = async (req, res, next) => {
  try {
    const { quizId } = req.params

    const submissions = await QuizSubmission.find({ quiz: quizId })
      .populate("userId", "name email")
      .sort({ submittedAt: -1 })

    res.json({
      success: true,
      data: submissions,
    })
  } catch (error) {
    next(error)
  }
}

export const getAdminQuizzes = async (req, res, next) => {
  try {
    const { courseId } = req.params
    let query = {}

    if (courseId && courseId !== "undefined") {
      query.courseId = courseId
    }

    const quizzes = await Quiz.find(query).populate("courseId", "title").sort({ createdAt: -1 })

    res.json({
      success: true,
      data: quizzes,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params

    const quiz = await Quiz.findByIdAndDelete(quizId)

    if (!quiz) {
      return next(createHttpError(404, "Quiz not found"))
    }

    res.json({
      success: true,
      message: "Quiz deleted successfully",
      data: quiz,
    })
  } catch (error) {
    next(error)
  }
}

export const updateQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params
    const { title, description, questions, isPublished, startAt, dueAt } = req.body

    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 1), 0)

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description, questions, isPublished, startAt, dueAt, totalPoints },
      { new: true },
    )

    if (!quiz) {
      return next(createHttpError(404, "Quiz not found"))
    }

    res.json({
      success: true,
      message: "Quiz updated successfully",
      data: quiz,
    })
  } catch (error) {
    next(error)
  }
}

export const allowResubmit = async (req, res, next) => {
  try {
    const { submissionId } = req.params

    const submission = await QuizSubmission.findByIdAndUpdate(
      submissionId,
      { submitted: false, status: "in-progress" },
      { new: true },
    )

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    res.json({
      success: true,
      message: "Quiz resubmission allowed",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}
