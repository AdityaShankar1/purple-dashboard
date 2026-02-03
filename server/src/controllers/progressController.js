import Progress from "../models/Progress.js"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"

// Helper to update progress - can be called from any controller
export const updateCourseProgress = async (userId, courseId) => {
  try {
    const Material = (await import("../models/Material.js")).default
    const Quiz = (await import("../models/Quiz.js")).default
    const Assignment = (await import("../models/Assignment.js")).default
    const QuizSubmission = (await import("../models/QuizSubmission.js")).default
    const AssignmentSubmission = (await import("../models/AssignmentSubmission.js")).default
    const Enrollment = (await import("../models/Enrollment.js")).default

    console.log(`[Progress] Updating progress for User: ${userId}, Course: ${courseId}`);

    // 1. Find or create progress record
    let progress = await Progress.findOne({ userId, courseId })
    if (!progress) {
      // Try fallback for different schema mapping if any
      progress = await Progress.findOne({ user: userId, course: courseId })
      if (!progress) {
        progress = new Progress({
          userId,
          courseId,
          completedMaterials: [],
          completedQuizzes: [],
          completedAssignments: []
        })
      }
    }

    // 2. Get completed items from submissions (for Quizzes and Assignments)
    // We use distinct to get unique IDs of completed items
    const [completedQuizIds, completedAssignmentIds] = await Promise.all([
      QuizSubmission.find({ userId, courseId, submitted: true }).distinct("quiz").catch(() => []),
      AssignmentSubmission.find({ userId, courseId, submitted: true }).distinct("assignment").catch(() => [])
    ])

    progress.completedQuizzes = completedQuizIds
    progress.completedAssignments = completedAssignmentIds

    // 3. Recalculate totals
    // Handle potential field name inconsistencies in counts
    const [totalMaterials, totalQuizzes, totalAssignments] = await Promise.all([
      Material.countDocuments({ course: courseId, isPublished: true }).catch(() => 0),
      Quiz.countDocuments({ courseId: courseId, isPublished: true }).catch(() => 0),
      Assignment.countDocuments({ courseId: courseId, isPublished: true }).catch(() => 0),
    ])

    progress.totalMaterials = totalMaterials
    progress.totalQuizzes = totalQuizzes
    progress.totalAssignments = totalAssignments

    // 4. Update counts
    progress.materialsCompleted = (progress.completedMaterials || []).length
    progress.quizzesCompleted = (progress.completedQuizzes || []).length
    progress.assignmentsCompleted = (progress.completedAssignments || []).length

    // 5. Calculate overall progress
    const totalItems = totalMaterials + totalQuizzes + totalAssignments
    const completedItems =
      progress.materialsCompleted + progress.quizzesCompleted + progress.assignmentsCompleted

    progress.overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
    progress.lastUpdated = new Date()

    await progress.save()

    console.log(`[Progress] Calculated Overall: ${progress.overallProgress}% (Items: ${completedItems}/${totalItems})`);

    // 6. Update Enrollment record
    const enrollmentUpdate = { progress: progress.overallProgress }

    // Check if progress reached 100%
    if (progress.overallProgress >= 100) {
      enrollmentUpdate.status = "completed"
      enrollmentUpdate.completedAt = new Date()

      try {
        // Also update Course completion count
        const Course = (await import("../models/Course.js")).default
        await Course.findByIdAndUpdate(courseId, { $inc: { completionCount: 1 } })

        // Generate Certificate
        const { generateCertificate } = await import("./certificateController.js")
        await generateCertificate(userId, courseId)
      } catch (certErr) {
        console.error("Error in post-completion tasks:", certErr);
      }
    }

    // Try to update enrollment
    const updatedEnrollment = await Enrollment.findOneAndUpdate(
      { userId, courseId },
      enrollmentUpdate,
      { new: true }
    ).catch(err => {
      console.warn(`[Progress] Could not update enrollment:`, err.message);
      return null;
    });

    if (updatedEnrollment) {
      console.log(`[Progress] Successfully updated enrollment for User: ${userId}`);
    } else {
      console.warn(`[Progress] No enrollment found to update for User: ${userId}, Course: ${courseId}`);
    }

    return progress
  } catch (error) {
    console.error("Error in updateCourseProgress:", error)
    // Return a minimal progress object so callers don't crash
    return {
      userId,
      courseId,
      overallProgress: 0,
      materialsCompleted: 0,
      quizzesCompleted: 0,
      assignmentsCompleted: 0
    }
  }
}

// GET /api/progress/:courseId
export const getCourseProgress = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id
    let { courseId } = req.params

    // Resolve courseId string to proper ObjectId
    const Course = (await import("../models/Course.js")).default;
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      const course = await Course.findOne({ courseId: courseId });
      if (course) {
        courseId = course._id;
      } else {
        return next(createHttpError(404, "Course not found"));
      }
    }

    const progress = await Progress.findOne({ userId, courseId })

    // If no progress found, return a default empty progress object instead of 404
    if (!progress) {
      return sendResponse(res, 200, "Progress fetched", {
        userId,
        courseId,
        overallProgress: 0,
        materialsCompleted: 0,
        quizzesCompleted: 0,
        assignmentsCompleted: 0,
        totalMaterials: 0,
        totalQuizzes: 0,
        totalAssignments: 0
      })
    }

    sendResponse(res, 200, "Progress fetched", progress)
  } catch (err) {
    next(err)
  }
}
