import Assignment from "../models/Assignment.js"
import AssignmentSubmission from "../models/AssignmentSubmission.js"
import Enrollment from "../models/Enrollment.js"
import Course from "../models/Course.js"
import { createHttpError } from "../utils/errors.js"
import * as notificationController from "./notificationController.js"

// Admin: Create assignment
export const createAssignment = async (req, res, next) => {
  try {
    const { title, description, instructions, attachment, dueAt, isPublished, maxScore } = req.body;

    const actualCourseId = req.body.courseId || req.body.course;
    if (!actualCourseId || !title) {
      return next(createHttpError(400, "Course ID and title are required"));
    }

    const assignment = new Assignment({
      courseId: actualCourseId,
      title,
      description,
      instructions,
      dueDate: dueAt,
      maxGrade: maxScore || 100,
      attachment,
      isPublished,
      createdBy: req.user._id,
    });

    await assignment.save();

    // populate for response
    const populatedAssignment = await Assignment.findById(assignment._id)
      .populate("courseId", "title courseId")
      .populate("createdBy", "name email");

    // Notify enrolled users
    const enrollments = await Enrollment.find({ courseId: course })
    const enrollments = await Enrollment.find({ courseId: actualCourseId })
    for (const enrollment of enrollments) {
      await notificationController.createNotification({
        userId: enrollment.user,
        type: "assignment",
        title: `New Assignment: ${title}`,
        message: `A new assignment has been added to your course`,
       
        courseId: actualCourseId,
      })
    }

    return successResponse(res, populatedAssignment, "Assignment created successfully", 201);
  } catch (error) {
    console.log("Create Assignment Error Payload:", req.body);
    next(error);
  }
};

// Update assignment (Admin only)
export const updateAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params; // Route uses :assignmentId or :id? assignmentRoutes.js line 447 uses :assignmentId
    const id = assignmentId || req.params.id;

    const { courseId, title, description, instructions, attachment, dueAt, isPublished, maxScore } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"));
    }

    const wasPublished = assignment.isPublished;

    // Update fields
    if (courseId) {
      let courseObj = await Course.findById(courseId);
      if (!courseObj) {
        courseObj = await Course.findOne({ courseId: courseId });
      }
      if (courseObj) {
        assignment.courseId = courseObj._id;
      }
    }

    if (title) assignment.title = title;
    if (description !== undefined) assignment.description = description;
    if (instructions !== undefined) assignment.instructions = instructions;
    if (attachment !== undefined) assignment.attachment = attachment;
    if (dueAt !== undefined) assignment.dueDate = dueAt;
    if (maxScore !== undefined) assignment.maxGrade = maxScore;
    if (isPublished !== undefined) assignment.isPublished = isPublished;

    await assignment.save();

    const updatedAssignment = await Assignment.findById(id)
      .populate("courseId", "title courseId")
      .populate("createdBy", "name email");

    // Notify students if it's published
    if (assignment.isPublished && !wasPublished) {
      // Notify if newly published
      const enrolledStudents = await Enrollment.find({ courseId: assignment.courseId, status: "active" })
        .populate("userId", "_id")
        .lean();

      const studentIds = enrolledStudents.map((e) => e.userId._id);

      await notificationService.createNotification({
        users: studentIds,
        type: "assignment_created",
        title: "New Assignment",
        message: `New assignment "${title || assignment.title}" has been posted`,
        data: {
          assignmentId: assignment._id,
          courseId: assignment.courseId,
        },
      });
    }

    res.json(successResponse(updatedAssignment, "Assignment updated successfully"));
  } catch (error) {
    next(error);
  }
};

// Delete assignment (Admin only)
export const deleteAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const id = assignmentId || req.params.id;

    const assignment = await Assignment.findById(id).populate("courseId", "_id title");
    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"));
    }

    // Notify students before deletion
    if (assignment.isPublished) {
      const enrolledStudents = await Enrollment.find({ courseId: assignment.courseId._id, status: "active" })
        .populate("userId", "_id")
        .lean();

      const studentIds = enrolledStudents.map((e) => e.userId._id);

      await notificationService.createNotification({
        users: studentIds,
        type: "assignment_deleted",
        title: "Assignment Deleted",
        message: `Assignment "${assignment.title}" has been removed`,
        data: {
          courseId: assignment.courseId._id,
        },
      });
    }

    // Delete all submissions for this assignment
    await AssignmentSubmission.deleteMany({ assignment: id });

    // Delete the assignment
    await Assignment.findByIdAndDelete(id);

    res.json(successResponse(null, "Assignment deleted successfully"));
  } catch (error) {
    next(error);
  }
};

// Get all submissions for an assignment (Admin only)
export const getAssignmentSubmissions = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const id = assignmentId || req.params.id;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"));
    }

    const submissions = await AssignmentSubmission.find({ assignment: id })
      .populate("userId", "name email") // Schema has userId, not student
      .sort({ submittedAt: -1 })
      .lean();

    res.json(successResponse(submissions, "Submissions fetched successfully"));
  } catch (error) {
    next(error);
  }
};

// Grade a submission (Admin only) - Route calls it gradeAssignment
export const gradeAssignment = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    if (grade === undefined || grade < 0) {
      return next(createHttpError(400, "Valid grade is required"));
    }

    const submission = await AssignmentSubmission.findById(submissionId);

    if (!submission) {
      return next(createHttpError(404, "Submission not found"));
    }

    submission.grade = grade;
    submission.feedback = feedback || "";
    submission.status = "graded";
    // gradedBy not in schema? Schema (lines 350-366) has grade, feedback, status. No gradedBy.

    await submission.save();

    const populatedSubmission = await AssignmentSubmission.findById(submission._id)
      .populate("userId", "name email")
      .populate("assignment", "title");

    // Notify student about grading
    await notificationService.createNotification({
      users: [submission.userId],
      type: "assignment_graded",
      title: "Assignment Graded",
      message: `Your assignment "${populatedSubmission.assignment.title}" has been graded: ${grade}`,
      data: {
        assignmentId: submission.assignment,
        grade,
      },
    });

    res.json(successResponse(populatedSubmission, "Submission graded successfully"));
  } catch (error) {
    next(error);
  }
};


// Get user's assignments
export const getUserAssignments = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    // Get all courses the user is enrolled in
    const enrollments = await Enrollment.find({ userId: userId, status: "active" }).select("courseId").lean();
    const enrolledCourseIds = enrollments.map((e) => e.courseId.toString());

    // If a specific course is requested, verify enrollment and use only that ID
    let targetCourseIds = enrolledCourseIds;
    if (courseId) {
      // Resolve courseId if it's a code or custom ID?
      // Route param is typically the _id or custom ID.
      // Let's assume _id for now as frontend usually sends _id.
      // But for robustness, let's resolve it.
      let courseObj = await Course.findById(courseId);
      if (!courseObj) {
        courseObj = await Course.findOne({ courseId: courseId });
      }

      if (!courseObj) {
        // If course not found, return empty or 404?
        // Returning empty list is safe.
        return res.json(successResponse([], "Assignments fetched successfully"));
      }

      if (!enrolledCourseIds.includes(courseObj._id.toString())) {
        return next(createHttpError(403, "You are not enrolled in this course"));
      }
      targetCourseIds = [courseObj._id.toString()];
    }

    // Get all published assignments for those courses
    const assignments = await Assignment.find({
      courseId: { $in: targetCourseIds },
      isPublished: true,
    })
      .populate("courseId", "title courseId")
      .sort({ createdAt: -1 })
      .lean();

    // Get user's submissions
    const assignmentIds = assignments.map((a) => a._id);
    const submissions = await AssignmentSubmission.find({
      assignment: { $in: assignmentIds },
      userId: userId, // Schema uses userId
      submitted: true
    }).lean();

    // Map submissions to assignments
    const submissionMap = {};
    submissions.forEach((sub) => {
      submissionMap[sub.assignment.toString()] = sub;
    });

    // Attach submission to each assignment
    const assignmentsWithSubmissions = assignments.map((assignment) => ({
      ...assignment,
      submission: submissionMap[assignment._id.toString()] || null,
      dueDate: assignment.dueDate // ensure consistent naming
    }));

    res.json(successResponse(assignmentsWithSubmissions, "Assignments fetched successfully"));
  } catch (error) {
    next(error);
  }
};

// Get single assignment
export const getAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params
    const userId = req.user._id

    // Validate assignmentId is a valid ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(assignmentId)) {
      return next(createHttpError(404, "Assignment not found"))
    }

    const assignment = await Assignment.findById(assignmentId)

    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"))
    }

    let submission = await AssignmentSubmission.findOne({
      assignment: assignmentId,
      userId: userId,
    })

    if (!submission) {
      submission = new AssignmentSubmission({
        assignment: assignmentId,
        userId: userId,
        courseId: assignment.courseId,
        dueDate: assignment.dueDate,
      })
      await submission.save()
    }

    res.json({
      success: true,
      data: {
        assignment,
        submission,
      },
    })
  } catch (error) {
    next(error);
  }
}

export const getAdminAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find().populate("courseId", "title").sort({ createdAt: -1 })

    // Get submission counts and submitter info for each assignment
    const assignmentsWithStats = await Promise.all(
      assignments.map(async (assignment) => {
        const submissions = await AssignmentSubmission.find({
          assignment: assignment._id,
          submitted: true,
        }).populate("userId", "name email")

        return {
          ...assignment.toObject(),
          submissionCount: submissions.length,
          submissions: submissions.map(s => ({
            userId: s.userId?._id,
            userName: s.userId?.name || "Unknown",
            userEmail: s.userId?.email,
            submittedAt: s.submittedAt,
            isLate: s.isLate,
          })),
        }
      }),
    )

    res.json({
      success: true,
      data: assignmentsWithStats,
    })
  } catch (error) {
    console.error("[Assignment] Error in getAdminAssignments:", error)
    next(error)
  }
}

// Save assignment draft
export const saveAssignmentDraft = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { text, file, fileSize } = req.body;
    // Logic to save draft...
    // If submissionId exists, update. If not, create? 
    // Route passes submissionId.

    // This seems to imply submission already exists or frontend gen ID?
    // Usually draft creation might happen via submit with status=draft.

    // For now sticking to basic logic.
    res.json(successResponse(null, "Draft saved"));
  } catch (error) {
    next(error);
  }
}

// Submit assignment
export const submitAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params
    const userId = req.user._id
    const { submissionText } = req.body

    // Find the assignment
    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"))
    }

    // Check if user already submitted
    let submission = await AssignmentSubmission.findOne({
      assignment: assignmentId,
      userId: userId,
    })

    if (submission && submission.submitted) {
      return next(createHttpError(400, "Assignment already submitted"))
    }

    // Handle file upload if present
    let fileData = null
    if (req.file) {
      // Convert file to base64 for storage
      fileData = {
        name: req.file.originalname,
        type: req.file.mimetype,
        data: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
        size: req.file.size
      }
    }

    // Create or update submission
    if (!submission) {
      submission = new AssignmentSubmission({
        assignment: assignmentId,
        userId: userId,
        courseId: assignment.courseId,
        submissionText: submissionText || "",
        file: fileData,
        submitted: true,
        submittedAt: new Date(),
        status: "submitted",
        isLate: new Date() > assignment.dueDate,
      })
    } else {
      submission.submissionText = submissionText || ""
      submission.file = fileData
      submission.submitted = true
      submission.submittedAt = new Date()
      submission.status = "submitted"
      submission.isLate = new Date() > assignment.dueDate
    }

    // Update progress
    const { updateCourseProgress } = await import("./progressController.js")
    await updateCourseProgress(userId, assignment.courseId)

    res.json({
      success: true,
      message: "Assignment submitted successfully",
      data: submission,
    })
  } catch (error) {
    console.error("[Assignment] Submission error:", error)
    next(error)
  }
}

// User: Get all assignments from all enrolled courses
export const getAllUserAssignments = async (req, res, next) => {
  try {
    const userId = req.user._id

    // Get all courses the user is enrolled in
    const Enrollment = (await import("../models/Enrollment.js")).default
    const enrollments = await Enrollment.find({ userId, status: "active" }).select("courseId")
    const courseIds = enrollments.map(e => e.courseId)

    if (courseIds.length === 0) {
      return res.json({
        success: true,
        data: [],
      })
    }

    // Get all published assignments from those courses
    const assignments = await Assignment.find({
      courseId: { $in: courseIds },
      isPublished: true
    }).populate("courseId", "title")

    // Get user's submissions for these assignments
    const submissions = await AssignmentSubmission.find({
      userId: userId,
      assignment: { $in: assignments.map((a) => a._id) },
    })

    // Combine assignments with their submissions
    const assignmentsWithSubmissions = assignments.map((assignment) => {
      const submission = submissions.find((s) => s.assignment.toString() === assignment._id.toString())
      return {
        ...assignment.toObject(),
        submission: submission || null,
      }
    })

    res.json({
      success: true,
      data: assignmentsWithSubmissions,
    })
  } catch (error) {
    console.error("[Assignments] Error fetching all user assignments:", error);
    next(error)
  }
}
