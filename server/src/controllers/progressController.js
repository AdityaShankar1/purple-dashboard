// // // // import Progress from "../models/Progress.js"
// // // // import Enrollment from "../models/Enrollment.js"
// // // // import Course from "../models/Course.js"
// // // // import { createHttpError } from "../utils/errors.js"
// // // // import { sendResponse } from "../utils/response.js"
// // // // import { generateCertificate } from "../services/certificateService.js"
// // // // import { logger } from "../config/logger.js"
// // // // import { sendCompletionNotification, sendCertificateNotification } from "../services/notificationService.js"

// // // // // Update progress
// // // // export const updateProgress = async (req, res, next) => {
// // // //   try {
// // // //     const { enrollmentId, sectionId, timeSpent = 0, quizScore, notes } = req.body

// // // //     // Find enrollment
// // // //     const enrollment = await Enrollment.findOne({
// // // //       _id: enrollmentId,
// // // //       user: req.user.id,
// // // //       status: "active",
// // // //     }).populate("course")

// // // //     if (!enrollment) {
// // // //       return next(createHttpError(404, "Active enrollment not found"))
// // // //     }

// // // //     // Find or create progress
// // // //     let progress = await Progress.findOne({ enrollment: enrollmentId })

// // // //     if (!progress) {
// // // //       progress = await Progress.create({
// // // //         user: req.user.id,
// // // //         course: enrollment.course._id,
// // // //         enrollment: enrollmentId,
// // // //         totalSections: enrollment.course.sections || 10, // Dynamic based on course
// // // //       })
// // // //     }

// // // //     // Add completed section if not already completed
// // // //     const sectionExists = progress.completedSections.some((section) => section.sectionId === sectionId)

// // // //     if (!sectionExists) {
// // // //       const sectionData = {
// // // //         sectionId,
// // // //         completedAt: new Date(),
// // // //       }

// // // //       // Add quiz score if provided
// // // //       if (quizScore !== undefined) {
// // // //         sectionData.quizScore = quizScore
// // // //       }

// // // //       // Add notes if provided
// // // //       if (notes) {
// // // //         sectionData.notes = notes
// // // //       }

// // // //       progress.completedSections.push(sectionData)
// // // //       progress.timeSpent += timeSpent
// // // //       await progress.save()

// // // //       // Update enrollment progress
// // // //       enrollment.progress = progress.progressPercentage
// // // //       enrollment.lastAccessedAt = new Date()
// // // //       await enrollment.save()

// // // //       // Check if course is completed (100% progress)
// // // //       if (progress.progressPercentage === 100) {
// // // //         enrollment.status = "completed"
// // // //         enrollment.completedAt = new Date()
// // // //         await enrollment.save()

// // // //         // Update course completion count
// // // //         await Course.findByIdAndUpdate(enrollment.course._id, {
// // // //           $inc: { completionCount: 1 },
// // // //         })

// // // //         // Generate certificate
// // // //         const certificate = await generateCertificate(req.user.id, enrollment.course._id, enrollmentId)

// // // //         await sendCompletionNotification(req.user.id, enrollment.course._id)
// // // //         await sendCertificateNotification(req.user.id, enrollment.course._id, certificate._id)

// // // //         logger.info(`User ${req.user.email} completed course ${enrollment.course.title}`)

// // // //         return sendResponse(res, 200, "Course completed! Certificate generated.", {
// // // //           progress,
// // // //           certificate,
// // // //           completed: true,
// // // //         })
// // // //       }
// // // //     }

// // // //     sendResponse(res, 200, "Progress updated successfully", progress)
// // // //   } catch (error) {
// // // //     next(error)
// // // //   }
// // // // }

// // // // // Get progress
// // // // export const getProgress = async (req, res, next) => {
// // // //   try {
// // // //     const { enrollmentId } = req.params

// // // //     const progress = await Progress.findOne({
// // // //       enrollment: enrollmentId,
// // // //       user: req.user.id,
// // // //     }).populate([
// // // //       { path: "course", select: "title duration" },
// // // //       { path: "enrollment", select: "enrolledAt status" },
// // // //     ])

// // // //     if (!progress) {
// // // //       return next(createHttpError(404, "Progress not found"))
// // // //     }

// // // //     sendResponse(res, 200, "Progress fetched successfully", progress)
// // // //   } catch (error) {
// // // //     next(error)
// // // //   }
// // // // }

// // // // // Get user's all progress
// // // // export const getUserProgress = async (req, res, next) => {
// // // //   try {
// // // //     const progress = await Progress.find({ user: req.user.id })
// // // //       .populate("course", "title description thumbnail category")
// // // //       .populate("enrollment", "status enrolledAt completedAt")
// // // //       .sort({ lastUpdated: -1 })

// // // //     sendResponse(res, 200, "User progress fetched successfully", progress)
// // // //   } catch (error) {
// // // //     next(error)
// // // //   }
// // // // }

// // // // export const getProgressAnalytics = async (req, res, next) => {
// // // //   try {
// // // //     const userId = req.user.id

// // // //     // Get all user progress
// // // //     const allProgress = await Progress.find({ user: userId })
// // // //       .populate("course", "title category difficulty duration")
// // // //       .populate("enrollment", "status enrolledAt completedAt")

// // // //     // Calculate analytics
// // // //     const analytics = {
// // // //       totalCourses: allProgress.length,
// // // //       completedCourses: allProgress.filter((p) => p.progressPercentage === 100).length,
// // // //       inProgressCourses: allProgress.filter((p) => p.progressPercentage > 0 && p.progressPercentage < 100).length,
// // // //       totalTimeSpent: allProgress.reduce((sum, p) => sum + p.timeSpent, 0),
// // // //       averageProgress:
// // // //         allProgress.length > 0
// // // //           ? Math.round(allProgress.reduce((sum, p) => sum + p.progressPercentage, 0) / allProgress.length)
// // // //           : 0,
// // // //       categoryBreakdown: {},
// // // //       difficultyBreakdown: {},
// // // //       monthlyProgress: [],
// // // //     }

// // // //     // Category and difficulty breakdown
// // // //     allProgress.forEach((progress) => {
// // // //       const category = progress.course.category
// // // //       const difficulty = progress.course.difficulty

// // // //       analytics.categoryBreakdown[category] = (analytics.categoryBreakdown[category] || 0) + 1
// // // //       analytics.difficultyBreakdown[difficulty] = (analytics.difficultyBreakdown[difficulty] || 0) + 1
// // // //     })

// // // //     // Monthly progress for the last 6 months
// // // //     const sixMonthsAgo = new Date()
// // // //     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

// // // //     const monthlyData = {}
// // // //     allProgress.forEach((progress) => {
// // // //       progress.completedSections.forEach((section) => {
// // // //         const date = new Date(section.completedAt)
// // // //         if (date >= sixMonthsAgo) {
// // // //           const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
// // // //           monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1
// // // //         }
// // // //       })
// // // //     })

// // // //     analytics.monthlyProgress = Object.entries(monthlyData)
// // // //       .map(([month, count]) => ({ month, sectionsCompleted: count }))
// // // //       .sort((a, b) => a.month.localeCompare(b.month))

// // // //     sendResponse(res, 200, "Progress analytics fetched successfully", analytics)
// // // //   } catch (error) {
// // // //     next(error)
// // // //   }
// // // // }

// // // // export const getLearningStreak = async (req, res, next) => {
// // // //   try {
// // // //     const userId = req.user.id

// // // //     // Get all progress records
// // // //     const allProgress = await Progress.find({ user: userId })

// // // //     // Get all completion dates
// // // //     const completionDates = []
// // // //     allProgress.forEach((progress) => {
// // // //       progress.completedSections.forEach((section) => {
// // // //         const date = new Date(section.completedAt)
// // // //         const dateString = date.toISOString().split("T")[0]
// // // //         if (!completionDates.includes(dateString)) {
// // // //           completionDates.push(dateString)
// // // //         }
// // // //       })
// // // //     })

// // // //     completionDates.sort()

// // // //     // Calculate current streak
// // // //     let currentStreak = 0
// // // //     let longestStreak = 0
// // // //     let tempStreak = 0

// // // //     const today = new Date().toISOString().split("T")[0]
// // // //     const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

// // // //     // Check if user has activity today or yesterday to maintain streak
// // // //     const hasRecentActivity = completionDates.includes(today) || completionDates.includes(yesterday)

// // // //     if (hasRecentActivity && completionDates.length > 0) {
// // // //       // Calculate current streak from the end
// // // //       for (let i = completionDates.length - 1; i >= 0; i--) {
// // // //         const currentDate = new Date(completionDates[i])
// // // //         const expectedDate = new Date()
// // // //         expectedDate.setDate(expectedDate.getDate() - (completionDates.length - 1 - i))

// // // //         if (Math.abs(currentDate - expectedDate) <= 86400000) {
// // // //           // Within 1 day
// // // //           currentStreak++
// // // //         } else {
// // // //           break
// // // //         }
// // // //       }
// // // //     }

// // // //     // Calculate longest streak
// // // //     for (let i = 0; i < completionDates.length; i++) {
// // // //       if (i === 0) {
// // // //         tempStreak = 1
// // // //       } else {
// // // //         const prevDate = new Date(completionDates[i - 1])
// // // //         const currentDate = new Date(completionDates[i])
// // // //         const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24)

// // // //         if (dayDiff <= 1) {
// // // //           tempStreak++
// // // //         } else {
// // // //           longestStreak = Math.max(longestStreak, tempStreak)
// // // //           tempStreak = 1
// // // //         }
// // // //       }
// // // //     }
// // // //     longestStreak = Math.max(longestStreak, tempStreak)

// // // //     const streakData = {
// // // //       currentStreak,
// // // //       longestStreak,
// // // //       totalActiveDays: completionDates.length,
// // // //       lastActivityDate: completionDates.length > 0 ? completionDates[completionDates.length - 1] : null,
// // // //     }

// // // //     sendResponse(res, 200, "Learning streak fetched successfully", streakData)
// // // //   } catch (error) {
// // // //     next(error)
// // // //   }
// // // // }




// // // ///above is working code ///// 16/10/25 Below is new claude code


// // // // server/src/controllers/progressController.js
// // // import Progress from "../models/Progress.js";
// // // import Enrollment from "../models/Enrollment.js";
// // // import { successResponse } from "../utils/response.js";

// // // // Get user progress for all courses
// // // export const getMyProgress = async (req, res, next) => {
// // //   try {
// // //     const progress = await Progress.find({ user: req.user._id })
// // //       .populate("course", "title courseId instructor")
// // //       .lean();

// // //     res.json(successResponse(progress, "Progress fetched"));
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };

// // // // Get progress for specific course
// // // export const getCourseProgress = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params;

// // //     const progress = await Progress.findOne({ user: req.user._id, course: courseId })
// // //       .populate("course", "title courseId instructor")
// // //       .lean();

// // //     if (!progress) {
// // //       return res.json(
// // //         successResponse(
// // //           {
// // //             course: courseId,
// // //             assignmentsCompleted: 0,
// // //             quizzesCompleted: 0,
// // //             overallProgress: 0,
// // //           },
// // //           "No progress yet"
// // //         )
// // //       );
// // //     }

// // //     res.json(successResponse(progress, "Progress fetched"));
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };

// // // // Admin: Get all users progress for a course
// // // export const getCourseProgressAdmin = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params;

// // //     const progress = await Progress.find({ course: courseId })
// // //       .populate("user", "name email")
// // //       .populate("course", "title courseId")
// // //       .sort({ overallProgress: -1 })
// // //       .lean();

// // //     res.json(successResponse(progress, "Course progress fetched"));
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };









// // import Progress from "../models/Progress.js"
// // import Enrollment from "../models/Enrollment.js"
// // import CourseMaterial from "../models/CourseMaterial.js"
// // import QuizSubmission from "../models/QuizSubmission.js"
// // import AssignmentSubmission from "../models/AssignmentSubmission.js"
// // import Material from "../models/Material.js"
// // import Quiz from "../models/Quiz.js"
// // import Assignment from "../models/Assignment.js"
// // import { createHttpError } from "../utils/errors.js"

// // export const updateCourseProgress = async (enrollmentId) => {
// //   try {
// //     const enrollment = await Enrollment.findById(enrollmentId).populate("course")

// //     if (!enrollment) return

// //     let progress = await Progress.findOne({ enrollment: enrollmentId })

// //     if (!progress) {
// //       progress = new Progress({
// //         enrollment: enrollmentId,
// //         user: enrollment.user,
// //         course: enrollment.course._id,
// //       })
// //     }

// //     // Count materials
// //     const totalMaterials = await Material.countDocuments({
// //       course: enrollment.course._id,
// //     })
// //     const viewedMaterials = await CourseMaterial.countDocuments({
// //       enrollment: enrollmentId,
// //       viewed: true,
// //     })

// //     // Count quizzes
// //     const totalQuizzes = await Quiz.countDocuments({
// //       course: enrollment.course._id,
// //       isPublished: true,
// //     })
// //     const completedQuizzes = await QuizSubmission.countDocuments({
// //       enrollment: enrollmentId,
// //       submitted: true,
// //     })

// //     // Count assignments
// //     const totalAssignments = await Assignment.countDocuments({
// //       course: enrollment.course._id,
// //       isPublished: true,
// //     })
// //     const completedAssignments = await AssignmentSubmission.countDocuments({
// //       enrollment: enrollmentId,
// //       submitted: true,
// //     })

// //     progress.totalMaterials = totalMaterials
// //     progress.materialsCompleted = viewedMaterials
// //     progress.totalQuizzes = totalQuizzes
// //     progress.quizzesCompleted = completedQuizzes
// //     progress.totalAssignments = totalAssignments
// //     progress.assignmentsCompleted = completedAssignments

// //     // Calculate overall progress
// //     const totalItems = totalMaterials + totalQuizzes + totalAssignments
// //     const completedItems = viewedMaterials + completedQuizzes + completedAssignments
// //     progress.overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

// //     progress.lastAccessedAt = new Date()

// //     // Check if course is completed
// //     if (totalItems > 0 && completedItems === totalItems && !progress.completedAt) {
// //       progress.completedAt = new Date()
// //       progress.certificateGenerated = true

// //       // Auto-generate certificate
// //       const certificateController = require("./certificateController")
// //       await certificateController.generateCertificate(enrollmentId)
// //     }

// //     await progress.save()
// //     return progress
// //   } catch (error) {
// //     console.error("Error updating progress:", error)
// //   }
// // }

// // export const getUserProgress = async (req, res, next) => {
// //   try {
// //     const { enrollmentId } = req.params

// //     const progress = await Progress.findOne({ enrollment: enrollmentId })
// //       .populate("user", "name email")
// //       .populate("course", "title")

// //     if (!progress) {
// //       return next(createHttpError(404, "Progress not found"))
// //     }

// //     res.json({
// //       success: true,
// //       data: progress,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const getCourseProgress = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.params
// //     const userId = req.user._id

// //     const enrollment = await Enrollment.findOne({
// //       user: userId,
// //       course: courseId,
// //     })

// //     if (!enrollment) {
// //       return next(createHttpError(404, "Enrollment not found"))
// //     }

// //     const progress = await updateCourseProgress(enrollment._id)

// //     res.json({
// //       success: true,
// //       data: progress,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const getAdminCourseProgress = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.params

// //     const enrollments = await Enrollment.find({ course: courseId })
// //     const progressData = await Progress.find({
// //       enrollment: { $in: enrollments.map((e) => e._id) },
// //     })
// //       .populate("user", "name email")
// //       .sort({ overallProgress: -1 })

// //     res.json({
// //       success: true,
// //       data: progressData,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }







// // server/src/controllers/progressController.js

// import Progress from "../models/Progress.js"
// import Enrollment from "../models/Enrollment.js"
// import CourseMaterial from "../models/CourseMaterial.js"
// import QuizSubmission from "../models/QuizSubmission.js"
// import AssignmentSubmission from "../models/AssignmentSubmission.js"
// import Material from "../models/Material.js"
// import Quiz from "../models/Quiz.js"
// import Assignment from "../models/Assignment.js"
// import { createHttpError } from "../utils/errors.js"

// export const updateCourseProgress = async (enrollmentId) => {
//   try {
//     const enrollment = await Enrollment.findById(enrollmentId).populate("course")

//     if (!enrollment) return

//     let progress = await Progress.findOne({ enrollment: enrollmentId })

//     if (!progress) {
//       progress = new Progress({
//         enrollment: enrollmentId,
//         user: enrollment.user,
//         course: enrollment.course._id,
//       })
//     }

//     // Count materials
//     const totalMaterials = await Material.countDocuments({
//       course: enrollment.course._id,
//     })
//     const viewedMaterials = await CourseMaterial.countDocuments({
//       enrollment: enrollmentId,
//       viewed: true,
//     })

//     // Count quizzes
//     const totalQuizzes = await Quiz.countDocuments({
//       course: enrollment.course._id,
//       isPublished: true,
//     })
//     const completedQuizzes = await QuizSubmission.countDocuments({
//       enrollment: enrollmentId,
//       submitted: true,
//     })

//     // Count assignments
//     const totalAssignments = await Assignment.countDocuments({
//       course: enrollment.course._id,
//       isPublished: true,
//     })
//     const completedAssignments = await AssignmentSubmission.countDocuments({
//       enrollment: enrollmentId,
//       submitted: true,
//     })

//     progress.totalMaterials = totalMaterials
//     progress.materialsCompleted = viewedMaterials
//     progress.totalQuizzes = totalQuizzes
//     progress.quizzesCompleted = completedQuizzes
//     progress.totalAssignments = totalAssignments
//     progress.assignmentsCompleted = completedAssignments

//     // Calculate overall progress
//     const totalItems = totalMaterials + totalQuizzes + totalAssignments
//     const completedItems = viewedMaterials + completedQuizzes + completedAssignments
//     progress.overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

//     progress.lastAccessedAt = new Date()

//     // Check if course is completed
//     if (totalItems > 0 && completedItems === totalItems && !progress.completedAt) {
//       progress.completedAt = new Date()
//       progress.certificateGenerated = true

//       // Auto-generate certificate
//       const certificateController = require("./certificateController")
//       await certificateController.generateCertificate(enrollmentId)
//     }

//     await progress.save()
//     return progress
//   } catch (error) {
//     console.error("Error updating progress:", error)
//   }
// }

// export const getUserProgress = async (req, res, next) => {
//   try {
//     const { enrollmentId } = req.params

//     const progress = await Progress.findOne({ enrollment: enrollmentId })
//       .populate("user", "name email")
//       .populate("course", "title")

//     if (!progress) {
//       return next(createHttpError(404, "Progress not found"))
//     }

//     res.json({
//       success: true,
//       data: progress,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getCourseProgress = async (req, res, next) => {
//   try {
//     const { courseId } = req.params
//     const userId = req.user._id

//     const enrollment = await Enrollment.findOne({
//       user: userId,
//       course: courseId,
//     })

//     if (!enrollment) {
//       return next(createHttpError(404, "Enrollment not found"))
//     }

//     const progress = await updateCourseProgress(enrollment._id)

//     res.json({
//       success: true,
//       data: progress,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getAdminCourseProgress = async (req, res, next) => {
//   try {
//     const { courseId } = req.params

//     const enrollments = await Enrollment.find({ course: courseId })
//     const progressData = await Progress.find({
//       enrollment: { $in: enrollments.map((e) => e._id) },
//     })
//       .populate("user", "name email")
//       .sort({ overallProgress: -1 })

//     res.json({
//       success: true,
//       data: progressData,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getCourseProgressAdmin = async (req, res, next) => {
//   try {
//     const { courseId } = req.params

//     const enrollments = await Enrollment.find({ course: courseId })
//     const progressData = await Progress.find({
//       enrollment: { $in: enrollments.map((e) => e._id) },
//     })
//       .populate("user", "name email")
//       .sort({ overallProgress: -1 })

//     res.json({
//       success: true,
//       data: progressData,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// export const getMyProgress = async (req, res, next) => {
//   try {
//     const userId = req.user._id

//     const enrollments = await Enrollment.find({ user: userId })
//     const progressData = await Progress.find({
//       enrollment: { $in: enrollments.map((e) => e._id) },
//     })
//       .populate("course", "title")
//       .sort({ lastAccessedAt: -1 })

//     res.json({
//       success: true,
//       data: progressData,
//     })
//   } catch (error) {
//     next(error)
//   }
// }







import Progress from "../models/Progress.js"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"

// GET /api/progress/:courseId
export const getCourseProgress = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const { courseId } = req.params

    const progress = await Progress.findOne({ userId, courseId })
    if (!progress) {
      return next(createHttpError(404, "Progress not found"))
    }

    sendResponse(res, 200, "Progress fetched", progress)
  } catch (err) {
    next(err)
  }
}
