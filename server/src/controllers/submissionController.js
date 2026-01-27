// //server/src/controllers/SubmissionController.js

// import Submission from "../models/Submission.js";
// import Assignment from "../models/Assignment.js";
// import User from "../models/User.js"; // Optional: if you have a User model

// export const createSubmission = async (req, res) => {
//   const { assignmentId, userId, submissionText } = req.body;
//   const filePath = req.file ? req.file.path : null;

//   try {
//     const existing = await Submission.findOne({ assignmentId, userId });
//     if (existing) {
//       return res.status(400).json({ message: "You have already submitted this assignment." });
//     }

//     const submission = new Submission({
//       assignmentId,
//       userId,
//       submissionText,
//       filePath,
//     });

//     await submission.save();
//     res.status(201).json({ message: "Submission saved", submission });
//   } catch (err) {
//     console.error("Error creating submission:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAllSubmissionsForAdmin = async (req, res) => {
//   try {
//     const submissions = await Submission.find()
//       .populate("assignmentId", "title") // Only get assignment title
//       .lean();

//     const enriched = submissions.map((sub) => ({
//       _id: sub._id,
//       assignmentTitle: sub.assignmentId?.title || "Untitled",
//       userId: sub.userId,
//       userName: sub.userName || null, // Optional: if you store userName
//       submissionText: sub.submissionText,
//       fileUrl: sub.filePath ? `/uploads/${sub.filePath.split("/").pop()}` : null,
//       createdAt: sub.createdAt,
//     }));

//     res.status(200).json(enriched);
//   } catch (err) {
//     console.error("Error fetching submissions:", err);
//     res.status(500).json({ message: "Failed to fetch submissions" });
//   }
// };










//server/src/controllers/submissionController.js

import Submission from "../models/Submission.js"
import Assignment from "../models/Assignment.js"
import Enrollment from "../models/Enrollment.js"
import { createNotification } from "../services/notificationService.js"

// User: submit assignment
export const createSubmission = async (req, res, next) => {
  try {
    const assignmentId = req.body.assignment || req.params?.id || req.params?.assignmentId
    const text = req.body.text ?? req.body.content ?? req.body.submissionText ?? ""
    const fileUrl = req.body.fileUrl || ""
    const attachment = req.body.attachment || null // { name, type, data } from UI

    if (!assignmentId) {
      return res.status(400).json({ message: "assignment is required" })
    }

    const assignment = await Assignment.findById(assignmentId).populate("course")
    if (!assignment) return res.status(404).json({ message: "Assignment not found" })

    // must be enrolled to submit
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: assignment.course._id,
      status: "active",
    })
    if (!enrollment) return res.status(403).json({ message: "You are not enrolled in this course" })

    const isLate = assignment.dueDate ? new Date() > new Date(assignment.dueDate) : false

    const submission = await Submission.create({
      assignment: assignment._id,
      course: assignment.course._id,
      user: req.user._id,
      text: String(text || "").trim(),
      content: String(text || "").trim(), // new field
      fileUrl,
      attachment:
        attachment && typeof attachment === "object"
          ? {
              name: attachment.name || "file",
              type: attachment.type || "application/octet-stream",
              data: attachment.data || "",
            }
          : undefined,
      isLate,
      status: "submitted",
      submittedAt: new Date(),
    })

    return res.status(201).json({ message: "Submission created", submission })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "You already submitted for this assignment" })
    }
    next(err)
  }
}

// User: list my submissions
export const listMySubmissions = async (req, res, next) => {
  try {
    const items = await Submission.find({ user: req.user._id })
      .populate({
        path: "assignment",
        select: "title dueDate totalPoints",
        populate: { path: "course", select: "title" },
      })
      .sort({ createdAt: -1 })

    return res.json(items)
  } catch (err) {
    next(err)
  }
}

// Admin: list submissions by assignment
export const listSubmissionsByAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params
    const items = await Submission.find({ assignment: assignmentId })
      .populate("user", "name email")
      .populate("assignment", "title")
      .sort({ createdAt: -1 })

    return res.json(items)
  } catch (err) {
    next(err)
  }
}

// Admin: grade a submission
export const gradeSubmission = async (req, res, next) => {
  try {
    const { id } = req.params
    const { grade, feedback, status } = req.body

    const submission = await Submission.findById(id).populate({
      path: "assignment",
      select: "title totalPoints",
    })
    if (!submission) return res.status(404).json({ message: "Submission not found" })

    if (typeof grade !== "undefined") {
      const g = Number(grade)
      // enforce bounds against assignment totalPoints
      const max = submission.assignment?.totalPoints || 100
      submission.grade = Math.max(0, Math.min(max, isNaN(g) ? 0 : g))
      submission.gradedAt = new Date()
      submission.gradedBy = req.user._id
    }
    if (typeof feedback !== "undefined") submission.feedback = feedback?.trim() || ""
    if (typeof status !== "undefined") submission.status = status

    await submission.save()

    // notify user
    await createNotification({
      recipient: submission.user,
      type: "assignment_graded",
      title: "Assignment Graded",
      message: `Your assignment "${submission.assignment?.title || "Assignment"}" has been graded.`,
      relatedCourse: submission.course,
      priority: "medium",
    })

    return res.json({ message: "Submission graded", submission })
  } catch (err) {
    next(err)
  }
}

export const createSubmissionByParam = (req, res, next) => {
  req.body = { ...(req.body || {}), assignment: req.params.id || req.params.assignmentId }
  return createSubmission(req, res, next)
}



