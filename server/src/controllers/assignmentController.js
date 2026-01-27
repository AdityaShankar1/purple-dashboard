// // // // // // // // // // // // server/src/controllers/assignmentController.js


// // // // // // // // // // // import Assignment from "../models/Assignment.js";
// // // // // // // // // // // import Submission from "../models/Submission.js";
// // // // // // // // // // // import { encryptFileAtRest } from "../config/upload.js";

// // // // // // // // // // // const toFileMeta = (file) => ({
// // // // // // // // // // //   filename: file.filename,
// // // // // // // // // // //   originalName: file.originalname,
// // // // // // // // // // //   mimetype: file.mimetype,
// // // // // // // // // // //   size: file.size,
// // // // // // // // // // //   url: `/uploads/assignments/${file.filename}`, // secure if behind auth/proxy
// // // // // // // // // // //   checksum: null,
// // // // // // // // // // // });

// // // // // // // // // // // export const createAssignment = async (req, res) => {
// // // // // // // // // // //   const { courseId, title, description, startAt, dueAt, visibility = "published" } = req.body;
// // // // // // // // // // //   if (!courseId || !title || !startAt || !dueAt) {
// // // // // // // // // // //     return res.status(400).json({ message: "Missing required fields" });
// // // // // // // // // // //   }
// // // // // // // // // // //   const start = new Date(startAt), due = new Date(dueAt);
// // // // // // // // // // //   if (isNaN(start) || isNaN(due) || start >= due) {
// // // // // // // // // // //     return res.status(400).json({ message: "Invalid dates: start must be before due" });
// // // // // // // // // // //   }

// // // // // // // // // // //   const questionFiles = (req.files || []).map(toFileMeta);
// // // // // // // // // // //   // Optional: encrypt files at rest
// // // // // // // // // // //   await Promise.all((req.files || []).map(f => encryptFileAtRest(f.path)));

// // // // // // // // // // //   const assignment = await Assignment.create({
// // // // // // // // // // //     courseId,
// // // // // // // // // // //     title,
// // // // // // // // // // //     description,
// // // // // // // // // // //     questionFiles,
// // // // // // // // // // //     startAt: start,
// // // // // // // // // // //     dueAt: due,
// // // // // // // // // // //     visibility,
// // // // // // // // // // //     createdBy: req.user._id,
// // // // // // // // // // //   });

// // // // // // // // // // //   res.status(201).json(assignment);
// // // // // // // // // // // };

// // // // // // // // // // // export const updateAssignment = async (req, res) => {
// // // // // // // // // // //   const { assignmentId } = req.params;
// // // // // // // // // // //   const payload = req.body;
// // // // // // // // // // //   const assignment = await Assignment.findById(assignmentId);
// // // // // // // // // // //   if (!assignment) return res.status(404).json({ message: "Assignment not found" });

// // // // // // // // // // //   if (new Date() >= assignment.startAt) {
// // // // // // // // // // //     return res.status(403).json({ message: "Assignments can only be modified before the start date" });
// // // // // // // // // // //   }

// // // // // // // // // // //   Object.assign(assignment, payload);
// // // // // // // // // // //   await assignment.save();
// // // // // // // // // // //   res.status(200).json(assignment);
// // // // // // // // // // // };

// // // // // // // // // // // export const listAssignmentsAdmin = async (req, res) => {
// // // // // // // // // // //   const { courseId } = req.query;
// // // // // // // // // // //   const match = courseId ? { courseId } : {};
// // // // // // // // // // //   const assignments = await Assignment.find(match).sort({ dueAt: -1 });
// // // // // // // // // // //   res.status(200).json(assignments);
// // // // // // // // // // // };

// // // // // // // // // // // export const listAssignmentsVisible = async (req, res) => {
// // // // // // // // // // //   const { courseId } = req.query;
// // // // // // // // // // //   const now = new Date();
// // // // // // // // // // //   const match = {
// // // // // // // // // // //     visibility: "published",
// // // // // // // // // // //     startAt: { $lte: now },
// // // // // // // // // // //     dueAt: { $gte: now },
// // // // // // // // // // //   };
// // // // // // // // // // //   if (courseId) match.courseId = courseId;
// // // // // // // // // // //   const assignments = await Assignment.find(match).sort({ dueAt: 1 });
// // // // // // // // // // //   res.status(200).json(assignments);
// // // // // // // // // // // };

// // // // // // // // // // // export const submitAssignment = async (req, res) => {
// // // // // // // // // // //   const { assignmentId } = req.params;
// // // // // // // // // // //   const assignment = await Assignment.findById(assignmentId);
// // // // // // // // // // //   if (!assignment) return res.status(404).json({ message: "Assignment not found" });

// // // // // // // // // // //   const now = new Date();
// // // // // // // // // // //   if (now > assignment.dueAt) {
// // // // // // // // // // //     return res.status(400).json({ message: "Deadline missed. Submissions are closed." });
// // // // // // // // // // //   }

// // // // // // // // // // //   // Enforce single submission: if exists, block
// // // // // // // // // // //   const existing = await Submission.findOne({ assignmentId, studentId: req.user._id });
// // // // // // // // // // //   if (existing) return res.status(409).json({ message: "You have already submitted this assignment" });

// // // // // // // // // // //   const files = (req.files || []).map(toFileMeta);
// // // // // // // // // // //   if (files.length === 0) return res.status(400).json({ message: "No files uploaded" });
// // // // // // // // // // //   await Promise.all((req.files || []).map(f => encryptFileAtRest(f.path)));

// // // // // // // // // // //   const status = now <= assignment.dueAt ? "on_time" : "late";

// // // // // // // // // // //   const submission = await Submission.create({
// // // // // // // // // // //     assignmentId,
// // // // // // // // // // //     studentId: req.user._id,
// // // // // // // // // // //     files,
// // // // // // // // // // //     submittedAt: now,
// // // // // // // // // // //     status,
// // // // // // // // // // //   });

// // // // // // // // // // //   const totalSubmitted = await Submission.countDocuments({ assignmentId });
// // // // // // // // // // //   const totalLate = await Submission.countDocuments({ assignmentId, status: "late" });
// // // // // // // // // // //   await Assignment.findByIdAndUpdate(assignmentId, {
// // // // // // // // // // //     $set: { "stats.totalSubmitted": totalSubmitted, "stats.totalLate": totalLate },
// // // // // // // // // // //   });

// // // // // // // // // // //   req.io?.to(String(assignmentId)).emit("submission:update", {
// // // // // // // // // // //     assignmentId,
// // // // // // // // // // //     totals: { totalSubmitted, totalLate },
// // // // // // // // // // //   });

// // // // // // // // // // //   res.status(201).json(submission);
// // // // // // // // // // // };

// // // // // // // // // // // export const getSubmissionReport = async (req, res) => {
// // // // // // // // // // //   const { assignmentId } = req.params;
// // // // // // // // // // //   const submissions = await Submission.find({ assignmentId }).populate("studentId", "name email");
// // // // // // // // // // //   const totals = {
// // // // // // // // // // //     totalSubmitted: submissions.length,
// // // // // // // // // // //     totalLate: submissions.filter(s => s.status === "late").length,
// // // // // // // // // // //   };
// // // // // // // // // // //   res.status(200).json({ submissions, totals });
// // // // // // // // // // // };

// // // // // // // // // // // // CSV export
// // // // // // // // // // // export const exportAssignmentReportCSV = async (req, res) => {
// // // // // // // // // // //   const { assignmentId } = req.params;
// // // // // // // // // // //   const submissions = await Submission.find({ assignmentId }).populate("studentId", "name email");
// // // // // // // // // // //   const header = "Student,Email,SubmittedAt,Status\n";
// // // // // // // // // // //   const rows = submissions.map(s =>
// // // // // // // // // // //     `${s.studentId?.name || ""},${s.studentId?.email || ""},${new Date(s.submittedAt).toISOString()},${s.status}`
// // // // // // // // // // //   ).join("\n");
// // // // // // // // // // //   res.setHeader("Content-Type", "text/csv");
// // // // // // // // // // //   res.setHeader("Content-Disposition", `attachment; filename="assignment_${assignmentId}_report.csv"`);
// // // // // // // // // // //   res.status(200).send(header + rows);
// // // // // // // // // // // };








// // // // // // // // // // //server/src/controllers/assignmentController.js

// // // // // // // // // // import Assignment from "../models/Assignment.js"
// // // // // // // // // // import AssignmentSubmission from "../models/AssignmentSubmission.js"
// // // // // // // // // // import Enrollment from "../models/Enrollment.js"
// // // // // // // // // // import Course from "../models/Course.js"
// // // // // // // // // // import { createHttpError } from "../utils/errors.js"
// // // // // // // // // // import mongoose from "mongoose"

// // // // // // // // // // const assertEnrolled = async (userId, courseId) => {
// // // // // // // // // //   const enrolled = await Enrollment.exists({ user: userId, course: courseId })
// // // // // // // // // //   if (!enrolled) {
// // // // // // // // // //     throw createHttpError(403, "You are not enrolled in this course.")
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: create
// // // // // // // // // // export const createAssignment = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { course, title, description, instructions, dueAt, isPublished, maxAttempts, attachment } = req.body
// // // // // // // // // //     if (!course || !title) return next(createHttpError(400, "course and title are required"))

// // // // // // // // // //     const courseId = await resolveCourseId(course)
// // // // // // // // // //     if (!courseId) return next(createHttpError(404, "Course not found"))

// // // // // // // // // //     const assignment = await Assignment.create({
// // // // // // // // // //       course: courseId,
// // // // // // // // // //       title,
// // // // // // // // // //       description,
// // // // // // // // // //       instructions,
// // // // // // // // // //       dueAt: dueAt ? new Date(dueAt) : undefined,
// // // // // // // // // //       isPublished: !!isPublished,
// // // // // // // // // //       maxAttempts: maxAttempts ?? 1,
// // // // // // // // // //       attachment: attachment || undefined,
// // // // // // // // // //     })
// // // // // // // // // //     res.status(201).json({ data: assignment })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: update
// // // // // // // // // // export const updateAssignment = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { id } = req.params
// // // // // // // // // //     const updates = { ...req.body }
// // // // // // // // // //     if (typeof updates.course === "string" && updates.course) {
// // // // // // // // // //       const courseId = await resolveCourseId(updates.course)
// // // // // // // // // //       if (!courseId) return next(createHttpError(404, "Course not found"))
// // // // // // // // // //       updates.course = courseId
// // // // // // // // // //     }
// // // // // // // // // //     if (updates.dueAt) updates.dueAt = new Date(updates.dueAt)

// // // // // // // // // //     const assignment = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// // // // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"))
// // // // // // // // // //     res.json({ data: assignment })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: delete
// // // // // // // // // // export const deleteAssignment = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { id } = req.params
// // // // // // // // // //     const deleted = await Assignment.findByIdAndDelete(id)
// // // // // // // // // //     if (!deleted) return next(createHttpError(404, "Assignment not found"))
// // // // // // // // // //     await AssignmentSubmission.deleteMany({ assignment: id })
// // // // // // // // // //     res.json({ message: "Assignment deleted" })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: list with stats
// // // // // // // // // // export const getAdminAssignments = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { course } = req.query
// // // // // // // // // //     const filter = {}
// // // // // // // // // //     if (course) filter.course = course

// // // // // // // // // //     const assignments = await Assignment.find(filter).sort({ createdAt: -1 }).lean()
// // // // // // // // // //     const withStats = await Promise.all(
// // // // // // // // // //       assignments.map(async (a) => {
// // // // // // // // // //         const totalEnrollments = await Enrollment.countDocuments({ course: a.course })
// // // // // // // // // //         const submitted = await AssignmentSubmission.countDocuments({ assignment: a._id, submittedAt: { $ne: null } })
// // // // // // // // // //         return { ...a, stats: { totalEnrollments, submitted, notSubmitted: Math.max(totalEnrollments - submitted, 0) } }
// // // // // // // // // //       }),
// // // // // // // // // //     )

// // // // // // // // // //     res.json({ data: withStats })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // User: list available assignments for enrolled courses
// // // // // // // // // // export const getAvailableAssignments = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const userId = req.user.id

// // // // // // // // // //     const enrollments = await Enrollment.find({ user: userId }).select("course")
// // // // // // // // // //     const courseIds = enrollments.map((e) => e.course)

// // // // // // // // // //     const assignments = await Assignment.find({
// // // // // // // // // //       course: { $in: courseIds },
// // // // // // // // // //       isPublished: true,
// // // // // // // // // //     })
// // // // // // // // // //       .select("title description instructions course dueAt")
// // // // // // // // // //       .populate("course", "title")
// // // // // // // // // //       .sort({ createdAt: -1 })

// // // // // // // // // //     res.json({ data: assignments })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // User: submit assignment (single submission unless allowResubmit)
// // // // // // // // // // export const submitAssignment = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const userId = req.user.id
// // // // // // // // // //     const { id } = req.params
// // // // // // // // // //     const { fileUrl, file, textAnswer } = req.body

// // // // // // // // // //     const assignment = await Assignment.findById(id)
// // // // // // // // // //     if (!assignment || !assignment.isPublished) return next(createHttpError(404, "Assignment not available"))

// // // // // // // // // //     await assertEnrolled(userId, assignment.course)

// // // // // // // // // //     const existing = await AssignmentSubmission.findOne({ user: userId, assignment: id })
// // // // // // // // // //     if (existing && !existing.allowResubmit) {
// // // // // // // // // //       return next(createHttpError(400, "You have already submitted this assignment."))
// // // // // // // // // //     }

// // // // // // // // // //     const payload = {
// // // // // // // // // //       user: userId,
// // // // // // // // // //       course: assignment.course,
// // // // // // // // // //       assignment: id,
// // // // // // // // // //       fileUrl: fileUrl || undefined,
// // // // // // // // // //       file: file || undefined,
// // // // // // // // // //       textAnswer,
// // // // // // // // // //       submittedAt: new Date(),
// // // // // // // // // //       allowResubmit: false,
// // // // // // // // // //     }

// // // // // // // // // //     let saved
// // // // // // // // // //     if (existing) {
// // // // // // // // // //       existing.fileUrl = payload.fileUrl
// // // // // // // // // //       existing.file = payload.file
// // // // // // // // // //       existing.textAnswer = payload.textAnswer
// // // // // // // // // //       existing.submittedAt = payload.submittedAt
// // // // // // // // // //       existing.allowResubmit = false
// // // // // // // // // //       saved = await existing.save()
// // // // // // // // // //     } else {
// // // // // // // // // //       saved = await AssignmentSubmission.create(payload)
// // // // // // // // // //     }

// // // // // // // // // //     res.status(201).json({ data: { id: saved._id } })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: allow resubmission for a specific user+assignment
// // // // // // // // // // export const allowAssignmentResubmit = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { assignmentId, userId } = req.params

// // // // // // // // // //     let sub = await AssignmentSubmission.findOne({ assignment: assignmentId, user: userId })
// // // // // // // // // //     if (!sub) {
// // // // // // // // // //       const assignment = await Assignment.findById(assignmentId)
// // // // // // // // // //       if (!assignment) return next(createHttpError(404, "Assignment not found"))
// // // // // // // // // //       sub = await AssignmentSubmission.create({
// // // // // // // // // //         user: userId,
// // // // // // // // // //         course: assignment.course,
// // // // // // // // // //         assignment: assignmentId,
// // // // // // // // // //         allowResubmit: true,
// // // // // // // // // //       })
// // // // // // // // // //     } else {
// // // // // // // // // //       sub.allowResubmit = true
// // // // // // // // // //       await sub.save()
// // // // // // // // // //     }

// // // // // // // // // //     res.json({ message: "User can resubmit this assignment now." })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // // Admin: basic assignment stats
// // // // // // // // // // export const getAssignmentStats = async (req, res, next) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { id } = req.params
// // // // // // // // // //     const assignment = await Assignment.findById(id)
// // // // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"))

// // // // // // // // // //     const totalEnrollments = await Enrollment.countDocuments({ course: assignment.course })
// // // // // // // // // //     const submitted = await AssignmentSubmission.countDocuments({ assignment: id, submittedAt: { $ne: null } })

// // // // // // // // // //     res.json({ data: { totalEnrollments, submitted, notSubmitted: Math.max(totalEnrollments - submitted, 0) } })
// // // // // // // // // //   } catch (err) {
// // // // // // // // // //     next(err)
// // // // // // // // // //   }
// // // // // // // // // // }

// // // // // // // // // // const resolveCourseId = async (courseInput) => {
// // // // // // // // // //   if (!courseInput) return null
// // // // // // // // // //   if (mongoose.Types.ObjectId.isValid(courseInput)) return courseInput
// // // // // // // // // //   const found = await Course.findOne({
// // // // // // // // // //     $or: [{ title: courseInput }, { code: courseInput }, { name: courseInput }],
// // // // // // // // // //   }).select("_id")
// // // // // // // // // //   return found?._id || null
// // // // // // // // // // }















// // // // // // // // // // ============================================
// // // // // // // // // // server/src/controllers/assignmentController.js
// // // // // // // // // // ============================================
// // // // // // // // // import Assignment from "../models/Assignment.js";
// // // // // // // // // import AssignmentSubmission from "../models/AssignmentSubmission.js";
// // // // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // // // import User from "../models/User.js";
// // // // // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // // // // import { successResponse } from "../utils/response.js";
// // // // // // // // // import * as notificationService from "../services/notificationService.js";

// // // // // // // // // // ========== ADMIN CONTROLLERS ==========

// // // // // // // // // // Get all assignments (Admin only)
// // // // // // // // // export const getAllAssignments = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const assignments = await Assignment.find()
// // // // // // // // //       .populate("course", "title courseId")
// // // // // // // // //       .populate("createdBy", "name email")
// // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // //       .lean();

// // // // // // // // //     // Get submission stats for each assignment
// // // // // // // // //     const assignmentsWithStats = await Promise.all(
// // // // // // // // //       assignments.map(async (assignment) => {
// // // // // // // // //         const enrollments = await Enrollment.countDocuments({
// // // // // // // // //           course: assignment.course._id,
// // // // // // // // //         });
        
// // // // // // // // //         const submissions = await AssignmentSubmission.countDocuments({
// // // // // // // // //           assignment: assignment._id,
// // // // // // // // //         });

// // // // // // // // //         return {
// // // // // // // // //           ...assignment,
// // // // // // // // //           stats: {
// // // // // // // // //             totalEnrollments: enrollments,
// // // // // // // // //             submitted: submissions,
// // // // // // // // //             notSubmitted: enrollments - submissions,
// // // // // // // // //           },
// // // // // // // // //         };
// // // // // // // // //       })
// // // // // // // // //     );

// // // // // // // // //     res.json(successResponse(assignmentsWithStats, "Assignments fetched successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Create assignment (Admin only)
// // // // // // // // // export const createAssignment = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { course, title, description, instructions, attachment, dueAt, isPublished } = req.body;

// // // // // // // // //     if (!course || !title) {
// // // // // // // // //       return next(createHttpError(400, "Course and title are required"));
// // // // // // // // //     }

// // // // // // // // //     const assignment = await Assignment.create({
// // // // // // // // //       course,
// // // // // // // // //       title,
// // // // // // // // //       description,
// // // // // // // // //       instructions,
// // // // // // // // //       attachment,
// // // // // // // // //       dueAt,
// // // // // // // // //       isPublished,
// // // // // // // // //       createdBy: req.user._id,
// // // // // // // // //     });

// // // // // // // // //     const populatedAssignment = await Assignment.findById(assignment._id)
// // // // // // // // //       .populate("course", "title courseId")
// // // // // // // // //       .populate("createdBy", "name email");

// // // // // // // // //     // Notify enrolled students if published
// // // // // // // // //     if (isPublished) {
// // // // // // // // //       const enrolledStudents = await Enrollment.find({ course })
// // // // // // // // //         .populate("user", "_id")
// // // // // // // // //         .lean();

// // // // // // // // //       const studentIds = enrolledStudents.map((e) => e.user._id);

// // // // // // // // //       // Send notifications to all enrolled students
// // // // // // // // //       await notificationService.createNotification({
// // // // // // // // //         users: studentIds,
// // // // // // // // //         type: "assignment_created",
// // // // // // // // //         title: "New Assignment",
// // // // // // // // //         message: `New assignment "${title}" has been posted`,
// // // // // // // // //         data: {
// // // // // // // // //           assignmentId: assignment._id,
// // // // // // // // //           courseId: course,
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     res.status(201).json(successResponse(populatedAssignment, "Assignment created successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.log("📥 Incoming assignment payload:", req.body);
// // // // // // // // //     console.log("👤 Authenticated user:", req.user);

// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // // export const getAdminAssignments = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const assignments = await Assignment.find({ createdBy: req.user._id })
// // // // // // // // //       .populate("course")
// // // // // // // // //       .lean();

// // // // // // // // //     res.status(200).json({ success: true, data: assignments });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     next(err);
// // // // // // // // //   }
// // // // // // // // // };


// // // // // // // // // // Update assignment (Admin only)
// // // // // // // // // export const updateAssignment = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { id } = req.params;
// // // // // // // // //     const { course, title, description, instructions, attachment, dueAt, isPublished } = req.body;

// // // // // // // // //     const assignment = await Assignment.findById(id);
// // // // // // // // //     if (!assignment) {
// // // // // // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // // // // // //     }

// // // // // // // // //     const wasPublished = assignment.isPublished;

// // // // // // // // //     // Update fields
// // // // // // // // //     assignment.course = course || assignment.course;
// // // // // // // // //     assignment.title = title || assignment.title;
// // // // // // // // //     assignment.description = description !== undefined ? description : assignment.description;
// // // // // // // // //     assignment.instructions = instructions !== undefined ? instructions : assignment.instructions;
// // // // // // // // //     assignment.attachment = attachment !== undefined ? attachment : assignment.attachment;
// // // // // // // // //     assignment.dueAt = dueAt !== undefined ? dueAt : assignment.dueAt;
// // // // // // // // //     assignment.isPublished = isPublished !== undefined ? isPublished : assignment.isPublished;

// // // // // // // // //     await assignment.save();

// // // // // // // // //     const updatedAssignment = await Assignment.findById(id)
// // // // // // // // //       .populate("course", "title courseId")
// // // // // // // // //       .populate("createdBy", "name email");

// // // // // // // // //     // Notify students if it's published
// // // // // // // // //     if (assignment.isPublished) {
// // // // // // // // //       const enrolledStudents = await Enrollment.find({ course: assignment.course })
// // // // // // // // //         .populate("user", "_id")
// // // // // // // // //         .lean();

// // // // // // // // //       const studentIds = enrolledStudents.map((e) => e.user._id);

// // // // // // // // //       await notificationService.createNotification({
// // // // // // // // //         users: studentIds,
// // // // // // // // //         type: wasPublished ? "assignment_updated" : "assignment_created",
// // // // // // // // //         title: wasPublished ? "Assignment Updated" : "New Assignment",
// // // // // // // // //         message: wasPublished
// // // // // // // // //           ? `Assignment "${title}" has been updated`
// // // // // // // // //           : `New assignment "${title}" has been posted`,
// // // // // // // // //         data: {
// // // // // // // // //           assignmentId: assignment._id,
// // // // // // // // //           courseId: assignment.course,
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     res.json(successResponse(updatedAssignment, "Assignment updated successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Delete assignment (Admin only)
// // // // // // // // // export const deleteAssignment = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { id } = req.params;

// // // // // // // // //     const assignment = await Assignment.findById(id).populate("course", "_id title");
// // // // // // // // //     if (!assignment) {
// // // // // // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // // // // // //     }

// // // // // // // // //     // Notify students before deletion
// // // // // // // // //     if (assignment.isPublished) {
// // // // // // // // //       const enrolledStudents = await Enrollment.find({ course: assignment.course._id })
// // // // // // // // //         .populate("user", "_id")
// // // // // // // // //         .lean();

// // // // // // // // //       const studentIds = enrolledStudents.map((e) => e.user._id);

// // // // // // // // //       await notificationService.createNotification({
// // // // // // // // //         users: studentIds,
// // // // // // // // //         type: "assignment_deleted",
// // // // // // // // //         title: "Assignment Deleted",
// // // // // // // // //         message: `Assignment "${assignment.title}" has been removed`,
// // // // // // // // //         data: {
// // // // // // // // //           courseId: assignment.course._id,
// // // // // // // // //         },
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     // Delete all submissions for this assignment
// // // // // // // // //     await AssignmentSubmission.deleteMany({ assignment: id });

// // // // // // // // //     // Delete the assignment
// // // // // // // // //     await Assignment.findByIdAndDelete(id);

// // // // // // // // //     res.json(successResponse(null, "Assignment deleted successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Get all submissions for an assignment (Admin only)
// // // // // // // // // export const getAssignmentSubmissions = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { id } = req.params;

// // // // // // // // //     const assignment = await Assignment.findById(id);
// // // // // // // // //     if (!assignment) {
// // // // // // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // // // // // //     }

// // // // // // // // //     const submissions = await AssignmentSubmission.find({ assignment: id })
// // // // // // // // //       .populate("student", "name email")
// // // // // // // // //       .populate("gradedBy", "name email")
// // // // // // // // //       .sort({ submittedAt: -1 })
// // // // // // // // //       .lean();

// // // // // // // // //     res.json(successResponse(submissions, "Submissions fetched successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Grade a submission (Admin only)
// // // // // // // // // export const gradeSubmission = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { assignmentId, studentId } = req.params;
// // // // // // // // //     const { grade, feedback } = req.body;

// // // // // // // // //     if (grade === undefined || grade < 0 || grade > 100) {
// // // // // // // // //       return next(createHttpError(400, "Grade must be between 0 and 100"));
// // // // // // // // //     }

// // // // // // // // //     const submission = await AssignmentSubmission.findOne({
// // // // // // // // //       assignment: assignmentId,
// // // // // // // // //       student: studentId,
// // // // // // // // //     });

// // // // // // // // //     if (!submission) {
// // // // // // // // //       return next(createHttpError(404, "Submission not found"));
// // // // // // // // //     }

// // // // // // // // //     submission.grade = grade;
// // // // // // // // //     submission.feedback = feedback || "";
// // // // // // // // //     submission.gradedBy = req.user._id;
// // // // // // // // //     submission.gradedAt = new Date();
// // // // // // // // //     submission.canResubmit = false;

// // // // // // // // //     await submission.save();

// // // // // // // // //     const populatedSubmission = await AssignmentSubmission.findById(submission._id)
// // // // // // // // //       .populate("student", "name email")
// // // // // // // // //       .populate("gradedBy", "name email")
// // // // // // // // //       .populate("assignment", "title");

// // // // // // // // //     // Notify student about grading
// // // // // // // // //     await notificationService.createNotification({
// // // // // // // // //       users: [studentId],
// // // // // // // // //       type: "assignment_graded",
// // // // // // // // //       title: "Assignment Graded",
// // // // // // // // //       message: `Your assignment "${populatedSubmission.assignment.title}" has been graded: ${grade}%`,
// // // // // // // // //       data: {
// // // // // // // // //         assignmentId,
// // // // // // // // //         grade,
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     res.json(successResponse(populatedSubmission, "Submission graded successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Allow resubmit (Admin only)
// // // // // // // // // export const allowResubmit = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { assignmentId, studentId } = req.params;

// // // // // // // // //     const submission = await AssignmentSubmission.findOneAndDelete({
// // // // // // // // //       assignment: assignmentId,
// // // // // // // // //       student: studentId,
// // // // // // // // //     });

// // // // // // // // //     if (!submission) {
// // // // // // // // //       return next(createHttpError(404, "Submission not found"));
// // // // // // // // //     }

// // // // // // // // //     const assignment = await Assignment.findById(assignmentId).select("title");

// // // // // // // // //     // Notify student
// // // // // // // // //     await notificationService.createNotification({
// // // // // // // // //       users: [studentId],
// // // // // // // // //       type: "resubmit_allowed",
// // // // // // // // //       title: "Resubmission Allowed",
// // // // // // // // //       message: `You can now resubmit "${assignment.title}"`,
// // // // // // // // //       data: {
// // // // // // // // //         assignmentId,
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     res.json(successResponse(null, "Student can now resubmit the assignment"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };




// // // // // // // // // // ========== STUDENT CONTROLLERS ==========

// // // // // // // // // // Get user's assignments
// // // // // // // // // export const getUserAssignments = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const userId = req.user._id;

// // // // // // // // //     // Get all courses the user is enrolled in
// // // // // // // // //     const enrollments = await Enrollment.find({ user: userId }).select("course").lean();
// // // // // // // // //     const courseIds = enrollments.map((e) => e.course);

// // // // // // // // //     // Get all published assignments for those courses
// // // // // // // // //     const assignments = await Assignment.find({
// // // // // // // // //       course: { $in: courseIds },
// // // // // // // // //       isPublished: true,
// // // // // // // // //     })
// // // // // // // // //       .populate("course", "title courseId")
// // // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // // //       .lean();

// // // // // // // // //     // Get user's submissions
// // // // // // // // //     const assignmentIds = assignments.map((a) => a._id);
// // // // // // // // //     const submissions = await AssignmentSubmission.find({
// // // // // // // // //       assignment: { $in: assignmentIds },
// // // // // // // // //       student: userId,
// // // // // // // // //     }).lean();

// // // // // // // // //     // Map submissions to assignments
// // // // // // // // //     const submissionMap = {};
// // // // // // // // //     submissions.forEach((sub) => {
// // // // // // // // //       submissionMap[sub.assignment.toString()] = sub;
// // // // // // // // //     });

// // // // // // // // //     // Attach submission to each assignment
// // // // // // // // //     const assignmentsWithSubmissions = assignments.map((assignment) => ({
// // // // // // // // //       ...assignment,
// // // // // // // // //       submission: submissionMap[assignment._id.toString()] || null,
// // // // // // // // //     }));

// // // // // // // // //     res.json(successResponse(assignmentsWithSubmissions, "Assignments fetched successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Submit assignment
// // // // // // // // // export const submitAssignment = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { id } = req.params;
// // // // // // // // //     const { text, attachment } = req.body;
// // // // // // // // //     const studentId = req.user._id;

// // // // // // // // //     if (!text && !attachment) {
// // // // // // // // //       return next(createHttpError(400, "Please provide text or attachment"));
// // // // // // // // //     }

// // // // // // // // //     const assignment = await Assignment.findById(id);
// // // // // // // // //     if (!assignment) {
// // // // // // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // // // // // //     }

// // // // // // // // //     if (!assignment.isPublished) {
// // // // // // // // //       return next(createHttpError(400, "Assignment is not published yet"));
// // // // // // // // //     }

// // // // // // // // //     // Check if already submitted
// // // // // // // // //     const existingSubmission = await AssignmentSubmission.findOne({
// // // // // // // // //       assignment: id,
// // // // // // // // //       student: studentId,
// // // // // // // // //     });

// // // // // // // // //     if (existingSubmission) {
// // // // // // // // //       return next(createHttpError(400, "You have already submitted this assignment"));
// // // // // // // // //     }

// // // // // // // // //     // Check enrollment
// // // // // // // // //     const isEnrolled = await Enrollment.findOne({
// // // // // // // // //       course: assignment.course,
// // // // // // // // //       user: studentId,
// // // // // // // // //     });

// // // // // // // // //     if (!isEnrolled) {
// // // // // // // // //       return next(createHttpError(403, "You are not enrolled in this course"));
// // // // // // // // //     }

// // // // // // // // //     const submission = await AssignmentSubmission.create({
// // // // // // // // //       assignment: id,
// // // // // // // // //       student: studentId,
// // // // // // // // //       text,
// // // // // // // // //       attachment,
// // // // // // // // //     });

// // // // // // // // //     const populatedSubmission = await AssignmentSubmission.findById(submission._id)
// // // // // // // // //       .populate("assignment", "title")
// // // // // // // // //       .populate("student", "name email");

// // // // // // // // //     res.status(201).json(successResponse(populatedSubmission, "Assignment submitted successfully"));
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error);
// // // // // // // // //   }
// // // // // // // // // };













// // // // // // // // import Course from "../models/Course.js";
// // // // // // // // import Assignment from "../models/Assignment.js";
// // // // // // // // import { createHttpError } from "../utils/errors.js";

// // // // // // // // // Admin: Get all assignments created by this admin
// // // // // // // // export const getAdminAssignments = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignments = await Assignment.find({ createdBy: req.user._id })
// // // // // // // //       .populate("course")
// // // // // // // //       .lean();

// // // // // // // //     const enriched = assignments.map((a) => ({
// // // // // // // //       ...a,
// // // // // // // //       stats: {
// // // // // // // //         totalEnrollments: a.submissions.length,
// // // // // // // //         submitted: a.submissions.filter((s) => s.text || s.attachment).length,
// // // // // // // //         notSubmitted: a.submissions.filter((s) => !s.text && !s.attachment).length,
// // // // // // // //       },
// // // // // // // //     }));

// // // // // // // //     res.json({ data: enriched });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Student: Get assignments assigned to this user
// // // // // // // // export const getUserAssignments = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignments = await Assignment.find({ isPublished: true })
// // // // // // // //       .populate("course")
// // // // // // // //       .lean();

// // // // // // // //     const enriched = assignments.map((a) => {
// // // // // // // //       const submission = a.submissions.find((s) => s.student.toString() === req.user._id.toString());
// // // // // // // //       return { ...a, submission };
// // // // // // // //     });

// // // // // // // //     res.json({ data: enriched });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Admin: Create assignment
// // // // // // // // // export const createAssignment = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const assignment = new Assignment({ ...req.body, createdBy: req.user._id });
// // // // // // // // //     await assignment.save();
// // // // // // // // //     res.status(201).json({ success: true, data: assignment });
// // // // // // // // //   } catch (err) {
// // // // // // // // //     next(err);
// // // // // // // // //   }
// // // // // // // // // };




// // // // // // // // export const createAssignment = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const { course, ...rest } = req.body;

// // // // // // // //     // 🔍 Lookup course by code or name
// // // // // // // //     const courseDoc = await Course.findOne({ code: course }); // or { title: course } if you're using title

// // // // // // // //     if (!courseDoc) {
// // // // // // // //       return next(createHttpError(400, `Course "${course}" not found`));
// // // // // // // //     }

// // // // // // // //     const assignment = new Assignment({
// // // // // // // //       ...rest,
// // // // // // // //       course: courseDoc._id,
// // // // // // // //       createdBy: req.user._id,
// // // // // // // //     });

// // // // // // // //     await assignment.save();
// // // // // // // //     res.status(201).json({ success: true, data: assignment });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };
// // // // // // // // // Admin: Update assignment
// // // // // // // // export const updateAssignment = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));
// // // // // // // //     res.json({ success: true, data: assignment });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Admin: Delete assignment
// // // // // // // // export const deleteAssignment = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findByIdAndDelete(req.params.id);
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));
// // // // // // // //     res.json({ success: true });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Student: Submit assignment
// // // // // // // // export const submitAssignment = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findById(req.params.id);
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));

// // // // // // // //     const existing = assignment.submissions.find(
// // // // // // // //       (s) => s.student.toString() === req.user._id.toString()
// // // // // // // //     );

// // // // // // // //     if (existing && !existing.allowResubmit) {
// // // // // // // //       return next(createHttpError(403, "Resubmission not allowed"));
// // // // // // // //     }

// // // // // // // //     const submission = {
// // // // // // // //       student: req.user._id,
// // // // // // // //       text: req.body.text,
// // // // // // // //       attachment: req.body.attachment,
// // // // // // // //       submittedAt: new Date(),
// // // // // // // //     };

// // // // // // // //     if (existing) {
// // // // // // // //       Object.assign(existing, submission);
// // // // // // // //     } else {
// // // // // // // //       assignment.submissions.push(submission);
// // // // // // // //     }

// // // // // // // //     await assignment.save();
// // // // // // // //     res.json({ success: true });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Admin: Get all submissions for an assignment
// // // // // // // // export const getSubmissions = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findById(req.params.id).populate("submissions.student", "name email");
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));
// // // // // // // //     res.json({ data: assignment.submissions });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Admin: Grade a submission
// // // // // // // // export const gradeSubmission = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findById(req.params.id);
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));

// // // // // // // //     const submission = assignment.submissions.find(
// // // // // // // //       (s) => s.student.toString() === req.params.studentId
// // // // // // // //     );

// // // // // // // //     if (!submission) return next(createHttpError(404, "Submission not found"));

// // // // // // // //     submission.grade = req.body.grade;
// // // // // // // //     submission.feedback = req.body.feedback;

// // // // // // // //     await assignment.save();
// // // // // // // //     res.json({ success: true });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Admin: Allow resubmission
// // // // // // // // export const allowResubmit = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const assignment = await Assignment.findById(req.params.id);
// // // // // // // //     if (!assignment) return next(createHttpError(404, "Assignment not found"));

// // // // // // // //     const submission = assignment.submissions.find(
// // // // // // // //       (s) => s.student.toString() === req.params.studentId
// // // // // // // //     );

// // // // // // // //     if (!submission) return next(createHttpError(404, "Submission not found"));

// // // // // // // //     submission.allowResubmit = true;
// // // // // // // //     await assignment.save();
// // // // // // // //     res.json({ success: true });
// // // // // // // //   } catch (err) {
// // // // // // // //     next(err);
// // // // // // // //   }
// // // // // // // // };






// // // // // // // import Assignment from "../models/Assignment.js"
// // // // // // // import Course from "../models/Course.js"
// // // // // // // import Enrollment from "../models/Enrollment.js"
// // // // // // // import Submission from "../models/Submission.js"
// // // // // // // import { createBulkNotifications } from "../services/notificationService.js"
// // // // // // // import { logger } from "../config/logger.js"

// // // // // // // const parseDate = (value) => (value ? new Date(value) : null)

// // // // // // // // Admin: create assignment
// // // // // // // export const createAssignment = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { course, title, description, dueDate, totalPoints, attachments } = req.body

// // // // // // //     if (!course || !title || !dueDate) {
// // // // // // //       return res.status(400).json({ message: "course, title, and dueDate are required" })
// // // // // // //     }

// // // // // // //     const courseDoc = await Course.findById(course)
// // // // // // //     if (!courseDoc) return res.status(404).json({ message: "Course not found" })

// // // // // // //     const assignment = await Assignment.create({
// // // // // // //       course,
// // // // // // //       title: title.trim(),
// // // // // // //       description: description?.trim() || "",
// // // // // // //       dueDate: parseDate(dueDate),
// // // // // // //       totalPoints: Number(totalPoints) || 100,
// // // // // // //       attachments: Array.isArray(attachments) ? attachments : [],
// // // // // // //       isPublished: true,
// // // // // // //       createdBy: req.user._id,
// // // // // // //     })

// // // // // // //     // notify enrolled users
// // // // // // //     const enrollments = await Enrollment.find({ course, status: "active" }).select("user")
// // // // // // //     const notifications = enrollments.map((e) => ({
// // // // // // //       recipient: e.user,
// // // // // // //       type: "assignment_created",
// // // // // // //       title: "New Assignment",
// // // // // // //       message: `A new assignment "${assignment.title}" is available.`,
// // // // // // //       relatedCourse: course,
// // // // // // //       priority: "medium",
// // // // // // //     }))
// // // // // // //     if (notifications.length) await createBulkNotifications(notifications)

// // // // // // //     return res.status(201).json({ message: "Assignment created", assignment })
// // // // // // //   } catch (err) {
// // // // // // //     logger.error("createAssignment error:", err)
// // // // // // //     if (err.code === 11000) return res.status(409).json({ message: "Duplicate assignment" })
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }

// // // // // // // // Admin/User: get assignments for a course (published only for users)
// // // // // // // export const getAssignmentsByCourse = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.params
// // // // // // //     const isAdmin = req.user?.role === "admin"

// // // // // // //     const query = { course: courseId }
// // // // // // //     if (!isAdmin) query.isPublished = true

// // // // // // //     const items = await Assignment.find(query).populate("course", "title").sort({ dueDate: 1, createdAt: -1 })

// // // // // // //     return res.json(items)
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }

// // // // // // // // Admin: list all assignments
// // // // // // // export const listAssignments = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const items = await Assignment.find({})
// // // // // // //       .populate("course", "title")
// // // // // // //       .populate("createdBy", "name email")
// // // // // // //       .sort({ createdAt: -1 })

// // // // // // //     return res.json(items)
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }

// // // // // // // // Admin: update assignment
// // // // // // // export const updateAssignment = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { id } = req.params
// // // // // // //     const updates = { ...req.body }

// // // // // // //     if (updates.title) updates.title = updates.title.trim()
// // // // // // //     if (typeof updates.totalPoints !== "undefined") updates.totalPoints = Number(updates.totalPoints)
// // // // // // //     if (updates.dueDate) updates.dueDate = parseDate(updates.dueDate)
// // // // // // //     if (updates.attachments && !Array.isArray(updates.attachments)) updates.attachments = []

// // // // // // //     const updated = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// // // // // // //     if (!updated) return res.status(404).json({ message: "Assignment not found" })

// // // // // // //     return res.json({ message: "Assignment updated", assignment: updated })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }

// // // // // // // // Admin: delete assignment (and related submissions)
// // // // // // // export const deleteAssignment = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { id } = req.params
// // // // // // //     const assignment = await Assignment.findById(id)
// // // // // // //     if (!assignment) return res.status(404).json({ message: "Assignment not found" })

// // // // // // //     await Submission.deleteMany({ assignment: id })
// // // // // // //     await assignment.deleteOne()

// // // // // // //     return res.json({ message: "Assignment deleted" })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }

// // // // // // // // User: get assignments for a user
// // // // // // // export const getUserAssignments = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     // get courses user is actively enrolled in
// // // // // // //     const enrollments = await Enrollment.find({
// // // // // // //       user: req.user._id,
// // // // // // //       status: "active",
// // // // // // //     }).select("course")

// // // // // // //     const courseIds = enrollments.map((e) => e.course)

// // // // // // //     // published assignments only for users
// // // // // // //     const assignments = await Assignment.find({
// // // // // // //       course: { $in: courseIds },
// // // // // // //       isPublished: true,
// // // // // // //     })
// // // // // // //       .populate("course", "title")
// // // // // // //       .sort({ dueDate: 1, createdAt: -1 })

// // // // // // //     const assignmentIds = assignments.map((a) => a._id)
// // // // // // //     const submissions = await Submission.find({
// // // // // // //       user: req.user._id,
// // // // // // //       assignment: { $in: assignmentIds },
// // // // // // //     }).select("assignment grade feedback status submittedAt text attachment")

// // // // // // //     const submissionMap = new Map(
// // // // // // //       submissions.map((s) => [
// // // // // // //         String(s.assignment),
// // // // // // //         {
// // // // // // //           grade: s.grade ?? undefined,
// // // // // // //           feedback: s.feedback ?? "",
// // // // // // //           status: s.status ?? "submitted",
// // // // // // //           submittedAt: s.submittedAt,
// // // // // // //           text: s.text || s.content || "",
// // // // // // //           attachment: s.attachment || (s.fileUrl ? { name: "file", data: s.fileUrl } : null),
// // // // // // //         },
// // // // // // //       ]),
// // // // // // //     )

// // // // // // //     const data = assignments.map((a) => ({
// // // // // // //       _id: a._id,
// // // // // // //       title: a.title,
// // // // // // //       description: a.description,
// // // // // // //       dueAt: a.dueDate,
// // // // // // //       createdAt: a.createdAt,
// // // // // // //       course: a.course,
// // // // // // //       submission: submissionMap.get(String(a._id)) || null,
// // // // // // //       attachment:
// // // // // // //         Array.isArray(a.attachments) && a.attachments.length > 0 ? { name: "reference", data: a.attachments[0] } : null,
// // // // // // //     }))

// // // // // // //     return res.json({ data })
// // // // // // //   } catch (err) {
// // // // // // //     next(err)
// // // // // // //   }
// // // // // // // }




// // // // // // import Assignment from "../models/Assignment.js"
// // // // // // import Course from "../models/Course.js"
// // // // // // import Enrollment from "../models/Enrollment.js"
// // // // // // import Submission from "../models/Submission.js"
// // // // // // import { createBulkNotifications } from "../services/notificationService.js"
// // // // // // import { logger } from "../config/logger.js"

// // // // // // const parseDate = (value) => {
// // // // // //   if (!value) return null
// // // // // //   const d = new Date(value)
// // // // // //   return isNaN(d.getTime()) ? null : d
// // // // // // }

// // // // // // // Admin: create assignment
// // // // // // export const createAssignment = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { title, description, totalPoints } = req.body

// // // // // //     // Accept multiple input keys from frontend (id or code)
// // // // // //     const rawCourse = (req.body.course ?? req.body.courseId ?? req.body.courseCode ?? req.body.code ?? "")
// // // // // //       .toString()
// // // // // //       .trim()
// // // // // //     const rawDue = req.body.dueDate || req.body.dueAt

// // // // // //     if (!rawCourse || !title || !rawDue) {
// // // // // //       return res.status(400).json({ message: "course, title, and dueDate are required" })
// // // // // //     }

// // // // // //     // Resolve course: ObjectId first, then code/courseId (case-insensitive)
// // // // // //     let courseDoc = null
// // // // // //     const isObjectId = /^[a-f0-9]{24}$/i.test(rawCourse)
// // // // // //     if (isObjectId) {
// // // // // //       courseDoc = await Course.findById(rawCourse)
// // // // // //     }
// // // // // //     if (!courseDoc) {
// // // // // //       const candidate = rawCourse.toUpperCase()
// // // // // //       courseDoc =
// // // // // //         (await Course.findOne({ code: candidate })) ||
// // // // // //         (await Course.findOne({ courseId: candidate })) ||
// // // // // //         (await Course.findOne({ code: rawCourse })) ||
// // // // // //         (await Course.findOne({ courseId: rawCourse }))
// // // // // //     }
// // // // // //     if (!courseDoc) {
// // // // // //       return res.status(404).json({ message: `Course not found for "${rawCourse}"` })
// // // // // //     }

// // // // // //     const dueDate = parseDate(rawDue)
// // // // // //     if (!dueDate) {
// // // // // //       return res.status(400).json({ message: "Invalid dueDate" })
// // // // // //     }

// // // // // //     // Normalize attachments from various payload shapes
// // // // // //     let normalizedAttachments = []
// // // // // //     if (Array.isArray(req.body.attachments)) {
// // // // // //       normalizedAttachments = req.body.attachments.filter(Boolean)
// // // // // //     } else if (typeof req.body.attachment === "string") {
// // // // // //       normalizedAttachments = [req.body.attachment]
// // // // // //     } else if (req.body.attachment?.data) {
// // // // // //       normalizedAttachments = [req.body.attachment.data]
// // // // // //     }

// // // // // //     const assignment = await Assignment.create({
// // // // // //       course: courseDoc._id,
// // // // // //       title: title.trim(),
// // // // // //       description: description?.trim() || "",
// // // // // //       dueDate,
// // // // // //       totalPoints: Number(totalPoints) || 100,
// // // // // //       attachments: normalizedAttachments,
// // // // // //       isPublished: true,
// // // // // //       createdBy: req.user._id,
// // // // // //     })

// // // // // //     // notify actively enrolled users in this course
// // // // // //     const enrollments = await Enrollment.find({ course: courseDoc._id, status: "active" }).select("user")
// // // // // //     const notifications = enrollments.map((e) => ({
// // // // // //       recipient: e.user,
// // // // // //       type: "assignment_created",
// // // // // //       title: "New Assignment",
// // // // // //       message: `A new assignment "${assignment.title}" is available.`,
// // // // // //       relatedCourse: courseDoc._id,
// // // // // //       priority: "medium",
// // // // // //     }))
// // // // // //     if (notifications.length) await createBulkNotifications(notifications)

// // // // // //     return res.status(201).json({ message: "Assignment created", assignment })
// // // // // //   } catch (err) {
// // // // // //     logger.error("[v0] createAssignment error:", { msg: err.message, stack: err.stack })
// // // // // //     if (err.code === 11000) return res.status(409).json({ message: "Duplicate assignment" })
// // // // // //     next(err)
// // // // // //   }
// // // // // // }

// // // // // // // Admin/User: get assignments for a course (published only for users)
// // // // // // export const getAssignmentsByCourse = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.params
// // // // // //     const isAdmin = req.user?.role === "admin"

// // // // // //     let resolvedCourseId = courseId
// // // // // //     if (!/^[a-f0-9]{24}$/i.test(courseId)) {
// // // // // //       const courseDoc =
// // // // // //         (await Course.findOne({ courseId: courseId }).select("_id")) ||
// // // // // //         (await Course.findOne({ code: courseId }).select("_id"))
// // // // // //       resolvedCourseId = courseDoc?._id || null
// // // // // //       if (!resolvedCourseId) return res.json([]) // no matches
// // // // // //     }

// // // // // //     const query = { course: resolvedCourseId }
// // // // // //     if (!isAdmin) query.isPublished = true

// // // // // //     const items = await Assignment.find(query).populate("course", "title").sort({ dueDate: 1, createdAt: -1 })
// // // // // //     return res.json(items)
// // // // // //   } catch (err) {
// // // // // //     next(err)
// // // // // //   }
// // // // // // }

// // // // // // // Admin: list all assignments
// // // // // // export const listAssignments = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const items = await Assignment.find({})
// // // // // //       .populate("course", "title")
// // // // // //       .populate("createdBy", "name email")
// // // // // //       .sort({ createdAt: -1 })

// // // // // //     return res.json(items)
// // // // // //   } catch (err) {
// // // // // //     next(err)
// // // // // //   }
// // // // // // }

// // // // // // // Admin: update assignment
// // // // // // export const updateAssignment = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { id } = req.params
// // // // // //     const updates = { ...req.body }

// // // // // //     if (updates.title) updates.title = updates.title.trim()
// // // // // //     if (typeof updates.totalPoints !== "undefined") updates.totalPoints = Number(updates.totalPoints)
// // // // // //     if (updates.dueDate) updates.dueDate = parseDate(updates.dueDate)
// // // // // //     if (updates.attachments && !Array.isArray(updates.attachments)) updates.attachments = []

// // // // // //     const updated = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// // // // // //     if (!updated) return res.status(404).json({ message: "Assignment not found" })

// // // // // //     return res.json({ message: "Assignment updated", assignment: updated })
// // // // // //   } catch (err) {
// // // // // //     next(err)
// // // // // //   }
// // // // // // }

// // // // // // // Admin: delete assignment (and related submissions)
// // // // // // export const deleteAssignment = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { id } = req.params
// // // // // //     const assignment = await Assignment.findById(id)
// // // // // //     if (!assignment) return res.status(404).json({ message: "Assignment not found" })

// // // // // //     await Submission.deleteMany({ assignment: id })
// // // // // //     await assignment.deleteOne()

// // // // // //     return res.json({ message: "Assignment deleted" })
// // // // // //   } catch (err) {
// // // // // //     next(err)
// // // // // //   }
// // // // // // }

// // // // // // // User: get assignments for a user
// // // // // // export const getUserAssignments = async (req, res, next) => {
// // // // // //   try {
// // // // // //     // get courses user is actively enrolled in
// // // // // //     const enrollments = await Enrollment.find({
// // // // // //       user: req.user._id,
// // // // // //       status: "active",
// // // // // //     }).select("course")

// // // // // //     const courseIds = enrollments.map((e) => e.course)

// // // // // //     // published assignments only for users
// // // // // //     const assignments = await Assignment.find({
// // // // // //       course: { $in: courseIds },
// // // // // //       isPublished: true,
// // // // // //     })
// // // // // //       .populate("course", "title")
// // // // // //       .sort({ dueDate: 1, createdAt: -1 })

// // // // // //     const assignmentIds = assignments.map((a) => a._id)
// // // // // //     const submissions = await Submission.find({
// // // // // //       user: req.user._id,
// // // // // //       assignment: { $in: assignmentIds },
// // // // // //     }).select("assignment grade feedback status submittedAt text attachment")

// // // // // //     const submissionMap = new Map(
// // // // // //       submissions.map((s) => [
// // // // // //         String(s.assignment),
// // // // // //         {
// // // // // //           grade: s.grade ?? undefined,
// // // // // //           feedback: s.feedback ?? "",
// // // // // //           status: s.status ?? "submitted",
// // // // // //           submittedAt: s.submittedAt,
// // // // // //           text: s.text || s.content || "",
// // // // // //           attachment: s.attachment || (s.fileUrl ? { name: "file", data: s.fileUrl } : null),
// // // // // //         },
// // // // // //       ]),
// // // // // //     )

// // // // // //     const data = assignments.map((a) => ({
// // // // // //       _id: a._id,
// // // // // //       title: a.title,
// // // // // //       description: a.description,
// // // // // //       dueAt: a.dueDate,
// // // // // //       createdAt: a.createdAt,
// // // // // //       course: a.course,
// // // // // //       submission: submissionMap.get(String(a._id)) || null,
// // // // // //       attachment:
// // // // // //         Array.isArray(a.attachments) && a.attachments.length > 0 ? { name: "reference", data: a.attachments[0] } : null,
// // // // // //     }))

// // // // // //     return res.json({ data })
// // // // // //   } catch (err) {
// // // // // //     next(err)
// // // // // //   }
// // // // // // }




// // // // // //above is working code ///16/10/25////// below is new claude code ////////////







// // // // // // server/src/controllers/assignmentController.js
// // // // // import Assignment from "../models/Assignment.js";
// // // // // import AssignmentSubmission from "../models/AssignmentSubmission.js";
// // // // // import Enrollment from "../models/Enrollment.js";
// // // // // import Course from "../models/Course.js";
// // // // // import Progress from "../models/Progress.js";
// // // // // import { createHttpError } from "../utils/errors.js";
// // // // // import { successResponse } from "../utils/response.js";
// // // // // import notificationService from "../services/notificationService.js";

// // // // // // Admin: Get all assignments with stats
// // // // // export const getAllAssignmentsAdmin = async (req, res, next) => {
// // // // //   try {
// // // // //     const assignments = await Assignment.find()
// // // // //       .populate("course", "title courseId")
// // // // //       .populate("createdBy", "name email")
// // // // //       .sort({ createdAt: -1 })
// // // // //       .lean();

// // // // //     const assignmentsWithStats = await Promise.all(
// // // // //       assignments.map(async (assignment) => {
// // // // //         const enrollments = await Enrollment.countDocuments({ course: assignment.course._id });
// // // // //         const submissions = await AssignmentSubmission.countDocuments({ assignment: assignment._id });

// // // // //         return {
// // // // //           ...assignment,
// // // // //           stats: {
// // // // //             totalEnrollments: enrollments,
// // // // //             submitted: submissions,
// // // // //             notSubmitted: enrollments - submissions,
// // // // //           },
// // // // //         };
// // // // //       })
// // // // //     );

// // // // //     res.json(successResponse(assignmentsWithStats, "Assignments fetched"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Admin: Create assignment
// // // // // export const createAssignment = async (req, res, next) => {
// // // // //   try {
// // // // //     const { course, title, description, instructions, attachment, dueAt, isPublished } = req.body;

// // // // //     if (!course || !title) {
// // // // //       return next(createHttpError(400, "Course and title required"));
// // // // //     }

// // // // //     let courseId = course;
// // // // //     if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
// // // // //       const foundCourse = await Course.findOne({ courseId: course });
// // // // //       if (!foundCourse) {
// // // // //         return next(createHttpError(404, `Course "${course}" not found`));
// // // // //       }
// // // // //       courseId = foundCourse._id;
// // // // //     }

// // // // //     const assignment = await Assignment.create({
// // // // //       course: courseId,
// // // // //       title,
// // // // //       description,
// // // // //       instructions,
// // // // //       attachment,
// // // // //       dueAt,
// // // // //       isPublished,
// // // // //       createdBy: req.user._id,
// // // // //     });

// // // // //     if (isPublished) {
// // // // //       const enrollments = await Enrollment.find({ course: courseId }).select("user");
// // // // //       const studentIds = enrollments.map((e) => e.user);

// // // // //       await notificationService.createNotification({
// // // // //         users: studentIds,
// // // // //         type: "assignment_created",
// // // // //         title: "New Assignment",
// // // // //         message: `New assignment "${title}" has been posted`,
// // // // //         data: { assignmentId: assignment._id, courseId },
// // // // //       });
// // // // //     }

// // // // //     res.status(201).json(successResponse(assignment, "Assignment created"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Admin: Update assignment
// // // // // export const updateAssignment = async (req, res, next) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const updates = req.body;

// // // // //     const assignment = await Assignment.findByIdAndUpdate(id, updates, { new: true }).populate("course");

// // // // //     if (!assignment) {
// // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // //     }

// // // // //     if (assignment.isPublished) {
// // // // //       const enrollments = await Enrollment.find({ course: assignment.course._id }).select("user");
// // // // //       const studentIds = enrollments.map((e) => e.user);

// // // // //       await notificationService.createNotification({
// // // // //         users: studentIds,
// // // // //         type: "assignment_updated",
// // // // //         title: "Assignment Updated",
// // // // //         message: `Assignment "${assignment.title}" has been updated`,
// // // // //         data: { assignmentId: assignment._id },
// // // // //       });
// // // // //     }

// // // // //     res.json(successResponse(assignment, "Assignment updated"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Admin: Delete assignment
// // // // // export const deleteAssignment = async (req, res, next) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const assignment = await Assignment.findById(id).populate("course");

// // // // //     if (!assignment) {
// // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // //     }

// // // // //     if (assignment.isPublished) {
// // // // //       const enrollments = await Enrollment.find({ course: assignment.course._id }).select("user");
// // // // //       const studentIds = enrollments.map((e) => e.user);

// // // // //       await notificationService.createNotification({
// // // // //         users: studentIds,
// // // // //         type: "assignment_deleted",
// // // // //         title: "Assignment Deleted",
// // // // //         message: `Assignment "${assignment.title}" has been removed`,
// // // // //         data: { courseId: assignment.course._id },
// // // // //       });
// // // // //     }

// // // // //     await AssignmentSubmission.deleteMany({ assignment: id });
// // // // //     await Assignment.findByIdAndDelete(id);

// // // // //     res.json(successResponse(null, "Assignment deleted"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Admin: Grade submission
// // // // // export const gradeSubmission = async (req, res, next) => {
// // // // //   try {
// // // // //     const { assignmentId, studentId } = req.params;
// // // // //     const { grade, feedback } = req.body;

// // // // //     if (grade < 0 || grade > 100) {
// // // // //       return next(createHttpError(400, "Grade must be 0-100"));
// // // // //     }

// // // // //     const submission = await AssignmentSubmission.findOneAndUpdate(
// // // // //       { assignment: assignmentId, student: studentId },
// // // // //       { grade, feedback, gradedBy: req.user._id, gradedAt: new Date() },
// // // // //       { new: true }
// // // // //     ).populate("assignment", "title");

// // // // //     if (!submission) {
// // // // //       return next(createHttpError(404, "Submission not found"));
// // // // //     }

// // // // //     await notificationService.createNotification({
// // // // //       users: [studentId],
// // // // //       type: "assignment_graded",
// // // // //       title: "Assignment Graded",
// // // // //       message: `Your assignment "${submission.assignment.title}" has been graded: ${grade}%`,
// // // // //       data: { assignmentId, grade },
// // // // //     });

// // // // //     // Update progress
// // // // //     await updateCourseProgress(studentId, submission.assignment);

// // // // //     res.json(successResponse(submission, "Graded successfully"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Admin: Allow resubmit
// // // // // export const allowResubmit = async (req, res, next) => {
// // // // //   try {
// // // // //     const { assignmentId, studentId } = req.params;

// // // // //     await AssignmentSubmission.findOneAndDelete({ assignment: assignmentId, student: studentId });

// // // // //     const assignment = await Assignment.findById(assignmentId).select("title");

// // // // //     await notificationService.createNotification({
// // // // //       users: [studentId],
// // // // //       type: "resubmit_allowed",
// // // // //       title: "Resubmission Allowed",
// // // // //       message: `You can now resubmit "${assignment.title}"`,
// // // // //       data: { assignmentId },
// // // // //     });

// // // // //     res.json(successResponse(null, "Resubmit allowed"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // User: Get assignments
// // // // // export const getUserAssignments = async (req, res, next) => {
// // // // //   try {
// // // // //     const enrollments = await Enrollment.find({ user: req.user._id }).select("course");
// // // // //     const courseIds = enrollments.map((e) => e.course);

// // // // //     const assignments = await Assignment.find({ course: { $in: courseIds }, isPublished: true })
// // // // //       .populate("course", "title courseId")
// // // // //       .sort({ createdAt: -1 })
// // // // //       .lean();

// // // // //     const submissions = await AssignmentSubmission.find({
// // // // //       assignment: { $in: assignments.map((a) => a._id) },
// // // // //       student: req.user._id,
// // // // //     }).lean();

// // // // //     const submissionMap = {};
// // // // //     submissions.forEach((sub) => {
// // // // //       submissionMap[sub.assignment.toString()] = sub;
// // // // //     });

// // // // //     const result = assignments.map((assignment) => ({
// // // // //       ...assignment,
// // // // //       submission: submissionMap[assignment._id.toString()] || null,
// // // // //     }));

// // // // //     res.json(successResponse(result, "Assignments fetched"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // User: Submit assignment
// // // // // export const submitAssignment = async (req, res, next) => {
// // // // //   try {
// // // // //     const { id } = req.params;
// // // // //     const { text, attachment } = req.body;

// // // // //     if (!text && !attachment) {
// // // // //       return next(createHttpError(400, "Provide text or attachment"));
// // // // //     }

// // // // //     const assignment = await Assignment.findById(id);
// // // // //     if (!assignment || !assignment.isPublished) {
// // // // //       return next(createHttpError(404, "Assignment not found"));
// // // // //     }

// // // // //     const isEnrolled = await Enrollment.findOne({ course: assignment.course, user: req.user._id });
// // // // //     if (!isEnrolled) {
// // // // //       return next(createHttpError(403, "Not enrolled in this course"));
// // // // //     }

// // // // //     const existing = await AssignmentSubmission.findOne({ assignment: id, student: req.user._id });
// // // // //     if (existing) {
// // // // //       return next(createHttpError(400, "Already submitted"));
// // // // //     }

// // // // //     const submission = await AssignmentSubmission.create({
// // // // //       assignment: id,
// // // // //       student: req.user._id,
// // // // //       text,
// // // // //       attachment,
// // // // //     });

// // // // //     res.status(201).json(successResponse(submission, "Submitted successfully"));
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // Helper: Update progress
// // // // // async function updateCourseProgress(userId, assignmentId) {
// // // // //   const assignment = await Assignment.findById(assignmentId).select("course");
// // // // //   const totalAssignments = await Assignment.countDocuments({ course: assignment.course, isPublished: true });
// // // // //   const completedAssignments = await AssignmentSubmission.countDocuments({
// // // // //     student: userId,
// // // // //     grade: { $exists: true },
// // // // //   });

// // // // //   const totalQuizzes = await Quiz.countDocuments({ course: assignment.course, isPublished: true });
// // // // //   const completedQuizzes = await QuizSubmission.countDocuments({
// // // // //     student: userId,
// // // // //     quiz: { $in: await Quiz.find({ course: assignment.course }).select("_id") },
// // // // //   });

// // // // //   const overallProgress = ((completedAssignments + completedQuizzes) / (totalAssignments + totalQuizzes)) * 100 || 0;

// // // // //   await Progress.findOneAndUpdate(
// // // // //     { user: userId, course: assignment.course },
// // // // //     { assignmentsCompleted: completedAssignments, quizzesCompleted: completedQuizzes, overallProgress },
// // // // //     { upsert: true }
// // // // //   );

// // // // //   // Check if course completed
// // // // //   if (overallProgress >= 100) {
// // // // //     await Enrollment.findOneAndUpdate({ user: userId, course: assignment.course }, { status: "completed", completedAt: new Date() });
// // // // //     // Generate certificate
// // // // //     await generateCertificate(userId, assignment.course);
// // // // //   }
// // // // // }


















// // // // import Assignment from "../models/Assignment.js"
// // // // import Course from "../models/Course.js"
// // // // import Enrollment from "../models/Enrollment.js"
// // // // import Submission from "../models/Submission.js"
// // // // import { createBulkNotifications } from "../services/notificationService.js"
// // // // import { logger } from "../config/logger.js"

// // // // const parseDate = (value) => {
// // // //   if (!value) return null
// // // //   const d = new Date(value)
// // // //   return isNaN(d.getTime()) ? null : d
// // // // }

// // // // // Admin: create assignment
// // // // export const createAssignment = async (req, res, next) => {
// // // //   try {
// // // //     const { title, description, totalPoints } = req.body

// // // //     // Accept multiple input keys from frontend (id or code)
// // // //     const rawCourse = (req.body.course ?? req.body.courseId ?? req.body.courseCode ?? req.body.code ?? "")
// // // //       .toString()
// // // //       .trim()
// // // //     const rawDue = req.body.dueDate || req.body.dueAt

// // // //     if (!rawCourse || !title || !rawDue) {
// // // //       return res.status(400).json({ message: "course, title, and dueDate are required" })
// // // //     }

// // // //     // Resolve course: ObjectId first, then code/courseId (case-insensitive)
// // // //     let courseDoc = null
// // // //     const isObjectId = /^[a-f0-9]{24}$/i.test(rawCourse)
// // // //     if (isObjectId) {
// // // //       courseDoc = await Course.findById(rawCourse)
// // // //     }
// // // //     if (!courseDoc) {
// // // //       const candidate = rawCourse.toUpperCase()
// // // //       courseDoc =
// // // //         (await Course.findOne({ code: candidate })) ||
// // // //         (await Course.findOne({ courseId: candidate })) ||
// // // //         (await Course.findOne({ code: rawCourse })) ||
// // // //         (await Course.findOne({ courseId: rawCourse }))
// // // //     }
// // // //     if (!courseDoc) {
// // // //       return res.status(404).json({ message: `Course not found for "${rawCourse}"` })
// // // //     }

// // // //     const dueDate = parseDate(rawDue)
// // // //     if (!dueDate) {
// // // //       return res.status(400).json({ message: "Invalid dueDate" })
// // // //     }

// // // //     // Normalize attachments from various payload shapes
// // // //     let normalizedAttachments = []
// // // //     if (Array.isArray(req.body.attachments)) {
// // // //       normalizedAttachments = req.body.attachments.filter(Boolean)
// // // //     } else if (typeof req.body.attachment === "string") {
// // // //       normalizedAttachments = [req.body.attachment]
// // // //     } else if (req.body.attachment?.data) {
// // // //       normalizedAttachments = [req.body.attachment.data]
// // // //     }

// // // //     const assignment = await Assignment.create({
// // // //       course: courseDoc._id,
// // // //       title: title.trim(),
// // // //       description: description?.trim() || "",
// // // //       dueDate,
// // // //       totalPoints: Number(totalPoints) || 100,
// // // //       attachments: normalizedAttachments,
// // // //       isPublished: true,
// // // //       createdBy: req.user._id,
// // // //     })

// // // //     // notify actively enrolled users in this course
// // // //     const enrollments = await Enrollment.find({ course: courseDoc._id, status: "active" }).select("user")
// // // //     const notifications = enrollments.map((e) => ({
// // // //       recipient: e.user,
// // // //       type: "assignment_created",
// // // //       title: "New Assignment",
// // // //       message: `A new assignment "${assignment.title}" is available.`,
// // // //       relatedCourse: courseDoc._id,
// // // //       priority: "medium",
// // // //     }))
// // // //     if (notifications.length) await createBulkNotifications(notifications)

// // // //     return res.status(201).json({ message: "Assignment created", assignment })
// // // //   } catch (err) {
// // // //     logger.error("[v0] createAssignment error:", { msg: err.message, stack: err.stack })
// // // //     if (err.code === 11000) return res.status(409).json({ message: "Duplicate assignment" })
// // // //     next(err)
// // // //   }
// // // // }

// // // // // Admin/User: get assignments for a course (published only for users)
// // // // export const getAssignmentsByCourse = async (req, res, next) => {
// // // //   try {
// // // //     const { courseId } = req.params
// // // //     const isAdmin = req.user?.role === "admin"

// // // //     let resolvedCourseId = courseId
// // // //     if (!/^[a-f0-9]{24}$/i.test(courseId)) {
// // // //       const courseDoc =
// // // //         (await Course.findOne({ courseId: courseId }).select("_id")) ||
// // // //         (await Course.findOne({ code: courseId }).select("_id"))
// // // //       resolvedCourseId = courseDoc?._id || null
// // // //       if (!resolvedCourseId) return res.json([]) // no matches
// // // //     }

// // // //     const query = { course: resolvedCourseId }
// // // //     if (!isAdmin) query.isPublished = true

// // // //     const items = await Assignment.find(query).populate("course", "title").sort({ dueDate: 1, createdAt: -1 })
// // // //     return res.json(items)
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // }

// // // // // Admin: list all assignments
// // // // export const listAssignments = async (req, res, next) => {
// // // //   try {
// // // //     const items = await Assignment.find({})
// // // //       .populate("course", "title")
// // // //       .populate("createdBy", "name email")
// // // //       .sort({ createdAt: -1 })

// // // //     return res.json(items)
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // }

// // // // // Admin: update assignment
// // // // export const updateAssignment = async (req, res, next) => {
// // // //   try {
// // // //     const { id } = req.params
// // // //     const updates = { ...req.body }

// // // //     if (updates.title) updates.title = updates.title.trim()
// // // //     if (typeof updates.totalPoints !== "undefined") updates.totalPoints = Number(updates.totalPoints)
// // // //     if (updates.dueDate) updates.dueDate = parseDate(updates.dueDate)
// // // //     if (updates.attachments && !Array.isArray(updates.attachments)) updates.attachments = []

// // // //     const updated = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// // // //     if (!updated) return res.status(404).json({ message: "Assignment not found" })

// // // //     return res.json({ message: "Assignment updated", assignment: updated })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // }

// // // // // Admin: delete assignment (and related submissions)
// // // // export const deleteAssignment = async (req, res, next) => {
// // // //   try {
// // // //     const { id } = req.params
// // // //     const assignment = await Assignment.findById(id)
// // // //     if (!assignment) return res.status(404).json({ message: "Assignment not found" })

// // // //     await Submission.deleteMany({ assignment: id })
// // // //     await assignment.deleteOne()

// // // //     return res.json({ message: "Assignment deleted" })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // }

// // // // // User: get assignments for a user
// // // // export const getUserAssignments = async (req, res, next) => {
// // // //   try {
// // // //     // get courses user is actively enrolled in
// // // //     const enrollments = await Enrollment.find({
// // // //       user: req.user._id,
// // // //       status: "active",
// // // //     }).select("course")

// // // //     const courseIds = enrollments.map((e) => e.course)

// // // //     // published assignments only for users
// // // //     const assignments = await Assignment.find({
// // // //       course: { $in: courseIds },
// // // //       isPublished: true,
// // // //     })
// // // //       .populate("course", "title")
// // // //       .sort({ dueDate: 1, createdAt: -1 })

// // // //     const assignmentIds = assignments.map((a) => a._id)
// // // //     const submissions = await Submission.find({
// // // //       user: req.user._id,
// // // //       assignment: { $in: assignmentIds },
// // // //     }).select("assignment grade feedback status submittedAt text attachment")

// // // //     const submissionMap = new Map(
// // // //       submissions.map((s) => [
// // // //         String(s.assignment),
// // // //         {
// // // //           grade: s.grade ?? undefined,
// // // //           feedback: s.feedback ?? "",
// // // //           status: s.status ?? "submitted",
// // // //           submittedAt: s.submittedAt,
// // // //           text: s.text || s.content || "",
// // // //           attachment: s.attachment || (s.fileUrl ? { name: "file", data: s.fileUrl } : null),
// // // //         },
// // // //       ]),
// // // //     )

// // // //     const data = assignments.map((a) => ({
// // // //       _id: a._id,
// // // //       title: a.title,
// // // //       description: a.description,
// // // //       dueAt: a.dueDate,
// // // //       createdAt: a.createdAt,
// // // //       course: a.course,
// // // //       submission: submissionMap.get(String(a._id)) || null,
// // // //       attachment:
// // // //         Array.isArray(a.attachments) && a.attachments.length > 0 ? { name: "reference", data: a.attachments[0] } : null,
// // // //     }))

// // // //     return res.json({ data })
// // // //   } catch (err) {
// // // //     next(err)
// // // //   }
// // // // }














// // // import Assignment from "../models/Assignment.js"
// // // import Course from "../models/Course.js"
// // // import Enrollment from "../models/Enrollment.js"
// // // import Submission from "../models/Submission.js"
// // // import { createBulkNotifications } from "../services/notificationService.js"
// // // import { logger } from "../config/logger.js"

// // // const parseDate = (value) => {
// // //   if (!value) return null
// // //   const d = new Date(value)
// // //   return isNaN(d.getTime()) ? null : d
// // // }

// // // // Admin: create assignment
// // // export const createAssignment = async (req, res, next) => {
// // //   try {
// // //     const { title, description, totalPoints } = req.body

// // //     // Accept multiple input keys from frontend (id or code)
// // //     const rawCourse = (req.body.course ?? req.body.courseId ?? req.body.courseCode ?? req.body.code ?? "")
// // //       .toString()
// // //       .trim()
// // //     const rawDue = req.body.dueDate || req.body.dueAt

// // //     if (!rawCourse || !title || !rawDue) {
// // //       return res.status(400).json({ message: "course, title, and dueDate are required" })
// // //     }

// // //     // Resolve course: ObjectId first, then code/courseId (case-insensitive)
// // //     let courseDoc = null
// // //     const isObjectId = /^[a-f0-9]{24}$/i.test(rawCourse)
// // //     if (isObjectId) {
// // //       courseDoc = await Course.findById(rawCourse)
// // //     }
// // //     if (!courseDoc) {
// // //       const candidate = rawCourse.toUpperCase()
// // //       courseDoc =
// // //         (await Course.findOne({ code: candidate })) ||
// // //         (await Course.findOne({ courseId: candidate })) ||
// // //         (await Course.findOne({ code: rawCourse })) ||
// // //         (await Course.findOne({ courseId: rawCourse }))
// // //     }
// // //     if (!courseDoc) {
// // //       return res.status(404).json({ message: `Course not found for "${rawCourse}"` })
// // //     }

// // //     const dueDate = parseDate(rawDue)
// // //     if (!dueDate) {
// // //       return res.status(400).json({ message: "Invalid dueDate" })
// // //     }

// // //     // Normalize attachments from various payload shapes
// // //     let normalizedAttachments = []
// // //     if (Array.isArray(req.body.attachments)) {
// // //       normalizedAttachments = req.body.attachments.filter(Boolean)
// // //     } else if (typeof req.body.attachment === "string") {
// // //       normalizedAttachments = [req.body.attachment]
// // //     } else if (req.body.attachment?.data) {
// // //       normalizedAttachments = [req.body.attachment.data]
// // //     }

// // //     const assignment = await Assignment.create({
// // //       course: courseDoc._id,
// // //       title: title.trim(),
// // //       description: description?.trim() || "",
// // //       dueDate,
// // //       totalPoints: Number(totalPoints) || 100,
// // //       attachments: normalizedAttachments,
// // //       isPublished: true,
// // //       createdBy: req.user._id,
// // //     })

// // //     // notify actively enrolled users in this course
// // //     const enrollments = await Enrollment.find({ course: courseDoc._id, status: "active" }).select("user")
// // //     const notifications = enrollments.map((e) => ({
// // //       recipient: e.user,
// // //       type: "assignment_created",
// // //       title: "New Assignment",
// // //       message: `A new assignment "${assignment.title}" is available.`,
// // //       relatedCourse: courseDoc._id,
// // //       priority: "medium",
// // //     }))
// // //     if (notifications.length) await createBulkNotifications(notifications)

// // //     return res.status(201).json({ message: "Assignment created", assignment })
// // //   } catch (err) {
// // //     logger.error("[v0] createAssignment error:", { msg: err.message, stack: err.stack })
// // //     if (err.code === 11000) return res.status(409).json({ message: "Duplicate assignment" })
// // //     next(err)
// // //   }
// // // }

// // // // Admin/User: get assignments for a course (published only for users)
// // // export const getAssignmentsByCourse = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params
// // //     const isAdmin = req.user?.role === "admin"

// // //     let resolvedCourseId = courseId
// // //     if (!/^[a-f0-9]{24}$/i.test(courseId)) {
// // //       const courseDoc =
// // //         (await Course.findOne({ courseId: courseId }).select("_id")) ||
// // //         (await Course.findOne({ code: courseId }).select("_id"))
// // //       resolvedCourseId = courseDoc?._id || null
// // //       if (!resolvedCourseId) return res.json([])
// // //     }

// // //     const query = { course: resolvedCourseId }
// // //     if (!isAdmin) query.isPublished = true

// // //     const items = await Assignment.find(query).populate("course", "title").sort({ dueDate: 1, createdAt: -1 })
// // //     return res.json(items)
// // //   } catch (err) {
// // //     next(err)
// // //   }
// // // }

// // // // Admin: list all assignments
// // // export const listAssignments = async (req, res, next) => {
// // //   try {
// // //     const items = await Assignment.find({})
// // //       .populate("course", "title")
// // //       .populate("createdBy", "name email")
// // //       .sort({ createdAt: -1 })

// // //     return res.json(items)
// // //   } catch (err) {
// // //     next(err)
// // //   }
// // // }

// // // // Admin: update assignment
// // // export const updateAssignment = async (req, res, next) => {
// // //   try {
// // //     const { id } = req.params
// // //     const updates = { ...req.body }

// // //     if (updates.title) updates.title = updates.title.trim()
// // //     if (typeof updates.totalPoints !== "undefined") updates.totalPoints = Number(updates.totalPoints)
// // //     if (updates.dueDate) updates.dueDate = parseDate(updates.dueDate)
// // //     if (updates.attachments && !Array.isArray(updates.attachments)) updates.attachments = []

// // //     const updated = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// // //     if (!updated) return res.status(404).json({ message: "Assignment not found" })

// // //     return res.json({ message: "Assignment updated", assignment: updated })
// // //   } catch (err) {
// // //     next(err)
// // //   }
// // // }

// // // // Admin: delete assignment (and related submissions)
// // // export const deleteAssignment = async (req, res, next) => {
// // //   try {
// // //     const { id } = req.params
// // //     const assignment = await Assignment.findById(id)
// // //     if (!assignment) return res.status(404).json({ message: "Assignment not found" })

// // //     await Submission.deleteMany({ assignment: id })
// // //     await assignment.deleteOne()

// // //     return res.json({ message: "Assignment deleted" })
// // //   } catch (err) {
// // //     next(err)
// // //   }
// // // }

// // // // User: get assignments for a user
// // // export const getUserAssignments = async (req, res, next) => {
// // //   try {
// // //     // get courses user is actively enrolled in
// // //     const enrollments = await Enrollment.find({
// // //       user: req.user._id,
// // //       status: "active",
// // //     }).select("course")

// // //     const courseIds = enrollments.map((e) => e.course)

// // //     // published assignments only for users
// // //     const assignments = await Assignment.find({
// // //       course: { $in: courseIds },
// // //       isPublished: true,
// // //     })
// // //       .populate("course", "title")
// // //       .sort({ dueDate: 1, createdAt: -1 })

// // //     const assignmentIds = assignments.map((a) => a._id)
// // //     const submissions = await Submission.find({
// // //       user: req.user._id,
// // //       assignment: { $in: assignmentIds },
// // //     }).select("assignment grade feedback status submittedAt text attachment")

// // //     const submissionMap = new Map(
// // //       submissions.map((s) => [
// // //         String(s.assignment),
// // //         {
// // //           grade: s.grade ?? undefined,
// // //           feedback: s.feedback ?? "",
// // //           status: s.status ?? "submitted",
// // //           submittedAt: s.submittedAt,
// // //           text: s.text || s.content || "",
// // //           attachment: s.attachment || (s.fileUrl ? { name: "file", data: s.fileUrl } : null),
// // //         },
// // //       ]),
// // //     )

// // //     const data = assignments.map((a) => ({
// // //       _id: a._id,
// // //       title: a.title,
// // //       description: a.description,
// // //       dueAt: a.dueDate,
// // //       createdAt: a.createdAt,
// // //       course: a.course,
// // //       submission: submissionMap.get(String(a._id)) || null,
// // //       attachment:
// // //         Array.isArray(a.attachments) && a.attachments.length > 0 ? { name: "reference", data: a.attachments[0] } : null,
// // //     }))

// // //     return res.json({ data })
// // //   } catch (err) {
// // //     next(err)
// // //   }
// // // }














// // import Assignment from "../models/Assignment.js"
// // import Course from "../models/Course.js"
// // import Enrollment from "../models/Enrollment.js"
// // import Submission from "../models/Submission.js"
// // import { createBulkNotifications } from "../services/notificationService.js"
// // import { logger } from "../config/logger.js"

// // const parseDate = (value) => {
// //   if (!value) return null
// //   const d = new Date(value)
// //   return isNaN(d.getTime()) ? null : d
// // }

// // // Admin: create assignment
// // export const createAssignment = async (req, res, next) => {
// //   try {
// //     const { title, description, totalPoints } = req.body

// //     const rawCourse = (req.body.course ?? req.body.courseId ?? req.body.courseCode ?? req.body.code ?? "")
// //       .toString()
// //       .trim()
// //     const rawDue = req.body.dueDate || req.body.dueAt

// //     if (!rawCourse || !title || !rawDue) {
// //       return res.status(400).json({ message: "course, title, and dueDate are required" })
// //     }

// //     let courseDoc = null
// //     const isObjectId = /^[a-f0-9]{24}$/i.test(rawCourse)
// //     if (isObjectId) {
// //       courseDoc = await Course.findById(rawCourse)
// //     }
// //     if (!courseDoc) {
// //       const candidate = rawCourse.toUpperCase()
// //       courseDoc = (await Course.findOne({ courseId: candidate })) || (await Course.findOne({ courseId: rawCourse }))
// //     }
// //     if (!courseDoc) {
// //       return res.status(404).json({ message: `Course not found for "${rawCourse}"` })
// //     }

// //     const dueDate = parseDate(rawDue)
// //     if (!dueDate) {
// //       return res.status(400).json({ message: "Invalid dueDate" })
// //     }

// //     // Normalize attachments from various payload shapes
// //     let normalizedAttachments = []
// //     if (Array.isArray(req.body.attachments)) {
// //       normalizedAttachments = req.body.attachments.filter(Boolean)
// //     } else if (typeof req.body.attachment === "string") {
// //       normalizedAttachments = [req.body.attachment]
// //     } else if (req.body.attachment?.data) {
// //       normalizedAttachments = [req.body.attachment.data]
// //     }

// //     const assignment = await Assignment.create({
// //       course: courseDoc._id,
// //       title: title.trim(),
// //       description: description?.trim() || "",
// //       dueDate,
// //       totalPoints: Number(totalPoints) || 100,
// //       attachments: normalizedAttachments,
// //       isPublished: true,
// //       createdBy: req.user._id,
// //     })

// //     // notify actively enrolled users in this course
// //     const enrollments = await Enrollment.find({ course: courseDoc._id, status: "active" }).select("user")
// //     const notifications = enrollments.map((e) => ({
// //       recipient: e.user,
// //       type: "assignment_created",
// //       title: "New Assignment",
// //       message: `A new assignment "${assignment.title}" is available.`,
// //       relatedCourse: courseDoc._id,
// //       priority: "medium",
// //     }))
// //     if (notifications.length) await createBulkNotifications(notifications)

// //     return res.status(201).json({ message: "Assignment created", assignment })
// //   } catch (err) {
// //     logger.error("[v0] createAssignment error:", { msg: err.message, stack: err.stack })
// //     if (err.code === 11000) return res.status(409).json({ message: "Duplicate assignment" })
// //     next(err)
// //   }
// // }

// // // Admin/User: get assignments for a course (published only for users)
// // export const getAssignmentsByCourse = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.params
// //     const isAdmin = req.user?.role === "admin"

// //     let resolvedCourseId = courseId
// //     if (!/^[a-f0-9]{24}$/i.test(courseId)) {
// //       const courseDoc =
// //         (await Course.findOne({ courseId: courseId }).select("_id")) ||
// //         (await Course.findOne({ code: courseId }).select("_id"))
// //       resolvedCourseId = courseDoc?._id || null
// //       if (!resolvedCourseId) return res.json([])
// //     }

// //     const query = { course: resolvedCourseId }
// //     if (!isAdmin) query.isPublished = true

// //     const items = await Assignment.find(query).populate("course", "title").sort({ dueDate: 1, createdAt: -1 })
// //     return res.json(items)
// //   } catch (err) {
// //     next(err)
// //   }
// // }

// // // Admin: list all assignments
// // export const listAssignments = async (req, res, next) => {
// //   try {
// //     const items = await Assignment.find({})
// //       .populate("course", "title")
// //       .populate("createdBy", "name email")
// //       .sort({ createdAt: -1 })

// //     return res.json(items)
// //   } catch (err) {
// //     next(err)
// //   }
// // }

// // // Admin: update assignment
// // export const updateAssignment = async (req, res, next) => {
// //   try {
// //     const { id } = req.params
// //     const updates = { ...req.body }

// //     if (updates.title) updates.title = updates.title.trim()
// //     if (typeof updates.totalPoints !== "undefined") updates.totalPoints = Number(updates.totalPoints)
// //     if (updates.dueDate) updates.dueDate = parseDate(updates.dueDate)
// //     if (updates.attachments && !Array.isArray(updates.attachments)) updates.attachments = []

// //     const updated = await Assignment.findByIdAndUpdate(id, updates, { new: true })
// //     if (!updated) return res.status(404).json({ message: "Assignment not found" })

// //     return res.json({ message: "Assignment updated", assignment: updated })
// //   } catch (err) {
// //     next(err)
// //   }
// // }

// // // Admin: delete assignment (and related submissions)
// // export const deleteAssignment = async (req, res, next) => {
// //   try {
// //     const { id } = req.params
// //     const assignment = await Assignment.findById(id)
// //     if (!assignment) return res.status(404).json({ message: "Assignment not found" })

// //     await Submission.deleteMany({ assignment: id })
// //     await assignment.deleteOne()

// //     return res.json({ message: "Assignment deleted" })
// //   } catch (err) {
// //     next(err)
// //   }
// // }

// // // User: get assignments for a user
// // export const getUserAssignments = async (req, res, next) => {
// //   try {
// //     // get courses user is actively enrolled in
// //     const enrollments = await Enrollment.find({
// //       user: req.user._id,
// //       status: "active",
// //     }).select("course")

// //     const courseIds = enrollments.map((e) => e.course)

// //     // published assignments only for users
// //     const assignments = await Assignment.find({
// //       course: { $in: courseIds },
// //       isPublished: true,
// //     })
// //       .populate("course", "title")
// //       .sort({ dueDate: 1, createdAt: -1 })

// //     const assignmentIds = assignments.map((a) => a._id)
// //     const submissions = await Submission.find({
// //       user: req.user._id,
// //       assignment: { $in: assignmentIds },
// //     }).select("assignment grade feedback status submittedAt text attachment")

// //     const submissionMap = new Map(
// //       submissions.map((s) => [
// //         String(s.assignment),
// //         {
// //           grade: s.grade ?? undefined,
// //           feedback: s.feedback ?? "",
// //           status: s.status ?? "submitted",
// //           submittedAt: s.submittedAt,
// //           text: s.text || s.content || "",
// //           attachment: s.attachment || (s.fileUrl ? { name: "file", data: s.fileUrl } : null),
// //         },
// //       ]),
// //     )

// //     const data = assignments.map((a) => ({
// //       _id: a._id,
// //       title: a.title,
// //       description: a.description,
// //       dueAt: a.dueDate,
// //       createdAt: a.createdAt,
// //       course: a.course,
// //       submission: submissionMap.get(String(a._id)) || null,
// //       attachment:
// //         Array.isArray(a.attachments) && a.attachments.length > 0 ? { name: "reference", data: a.attachments[0] } : null,
// //     }))

// //     return res.json({ data })
// //   } catch (err) {
// //     next(err)
// //   }
// // }













// import Assignment from "../models/Assignment.js"
// import AssignmentSubmission from "../models/AssignmentSubmission.js"
// import Enrollment from "../models/Enrollment.js"
// import { createHttpError } from "../utils/errors.js"

// // Admin: Create assignment
// export const createAssignment = async (req, res, next) => {
//   try {
//     const { course, title, description, instructions, dueDate, maxGrade, isPublished } = req.body

//     if (!course || !title || !instructions) {
//       return next(createHttpError(400, "Course, title, and instructions are required"))
//     }

//     const assignment = new Assignment({
//       course,
//       title,
//       description,
//       instructions,
//       dueDate,
//       maxGrade: maxGrade || 100,
//       isPublished,
//       createdBy: req.user._id,
//     })

//     await assignment.save()

//     // Notify enrolled users
//     const enrollments = await Enrollment.find({ course })
//     const notificationController = require("./notificationController")
//     for (const enrollment of enrollments) {
//       await notificationController.createNotification({
//         userId: enrollment.user,
//         type: "assignment",
//         title: `New Assignment: ${title}`,
//         message: `A new assignment has been added to your course`,
//         courseId: course,
//       })
//     }

//     res.status(201).json({
//       success: true,
//       message: "Assignment created successfully",
//       data: assignment,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Get assignment for user
// export const getAssignment = async (req, res, next) => {
//   try {
//     const { assignmentId } = req.params
//     const userId = req.user._id

//     const assignment = await Assignment.findById(assignmentId)

//     if (!assignment) {
//       return next(createHttpError(404, "Assignment not found"))
//     }

//     let submission = await AssignmentSubmission.findOne({
//       assignment: assignmentId,
//       user: userId,
//     })

//     if (!submission) {
//       submission = new AssignmentSubmission({
//         assignment: assignmentId,
//         user: userId,
//         enrollment: req.body.enrollmentId,
//         dueDate: assignment.dueDate,
//       })
//       await submission.save()
//     }

//     res.json({
//       success: true,
//       data: {
//         assignment,
//         submission,
//       },
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Save assignment draft
// export const saveAssignmentDraft = async (req, res, next) => {
//   try {
//     const { submissionId } = req.params
//     const { submissionText } = req.body

//     const submission = await AssignmentSubmission.findById(submissionId)

//     if (!submission) {
//       return next(createHttpError(404, "Submission not found"))
//     }

//     submission.submissionText = submissionText
//     submission.status = "draft"

//     await submission.save()

//     res.json({
//       success: true,
//       message: "Draft saved",
//       data: submission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Submit assignment
// export const submitAssignment = async (req, res, next) => {
//   try {
//     const { submissionId } = req.params
//     const { submissionText } = req.body

//     const submission = await AssignmentSubmission.findById(submissionId)

//     if (!submission) {
//       return next(createHttpError(404, "Submission not found"))
//     }

//     if (submission.submitted) {
//       return next(createHttpError(400, "Assignment already submitted"))
//     }

//     submission.submissionText = submissionText
//     submission.submitted = true
//     submission.submittedAt = new Date()
//     submission.status = "submitted"
//     submission.isLate = new Date() > submission.dueDate

//     await submission.save()

//     // Update progress
//     const progressController = require("./progressController")
//     await progressController.updateCourseProgress(submission.enrollment)

//     res.json({
//       success: true,
//       message: "Assignment submitted successfully",
//       data: submission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Get user assignments
// export const getUserAssignments = async (req, res, next) => {
//   try {
//     const { courseId } = req.params
//     const userId = req.user._id

//     const assignments = await Assignment.find({ course: courseId, isPublished: true })

//     const submissions = await AssignmentSubmission.find({
//       user: userId,
//       assignment: { $in: assignments.map((a) => a._id) },
//     })

//     const assignmentsWithSubmissions = assignments.map((assignment) => {
//       const submission = submissions.find((s) => s.assignment.toString() === assignment._id.toString())
//       return {
//         ...assignment.toObject(),
//         submission: submission || null,
//       }
//     })

//     res.json({
//       success: true,
//       data: assignmentsWithSubmissions,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// // Admin: Get assignment submissions
// export const getAssignmentSubmissions = async (req, res, next) => {
//   try {
//     const { assignmentId } = req.params

//     const submissions = await AssignmentSubmission.find({ assignment: assignmentId })
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

// // Admin: Grade assignment
// export const gradeAssignment = async (req, res, next) => {
//   try {
//     const { submissionId } = req.params
//     const { grade, feedback } = req.body

//     const submission = await AssignmentSubmission.findById(submissionId)

//     if (!submission) {
//       return next(createHttpError(404, "Submission not found"))
//     }

//     submission.grade = grade
//     submission.feedback = feedback
//     submission.status = "graded"

//     await submission.save()

//     res.json({
//       success: true,
//       message: "Assignment graded successfully",
//       data: submission,
//     })
//   } catch (error) {
//     next(error)
//   }
// }








import Assignment from "../models/Assignment.js"
import AssignmentSubmission from "../models/AssignmentSubmission.js"
import Enrollment from "../models/Enrollment.js"
import { createHttpError } from "../utils/errors.js"

// Admin: Create assignment
export const createAssignment = async (req, res, next) => {
  try {
    const { course, title, description, instructions, dueDate, maxGrade, isPublished } = req.body

    if (!course || !title || !instructions) {
      return next(createHttpError(400, "Course, title, and instructions are required"))
    }

    const assignment = new Assignment({
      course,
      title,
      description,
      instructions,
      dueDate,
      maxGrade: maxGrade || 100,
      isPublished,
      createdBy: req.user._id,
    })

    await assignment.save()

    // Notify enrolled users
    const enrollments = await Enrollment.find({ course })
    const notificationController = require("./notificationController")
    for (const enrollment of enrollments) {
      await notificationController.createNotification({
        userId: enrollment.user,
        type: "assignment",
        title: `New Assignment: ${title}`,
        message: `A new assignment has been added to your course`,
        courseId: course,
      })
    }

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      data: assignment,
    })
  } catch (error) {
    next(error)
  }
}

// Get assignment for user
export const getAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params
    const userId = req.user._id

    const assignment = await Assignment.findById(assignmentId)

    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"))
    }

    let submission = await AssignmentSubmission.findOne({
      assignment: assignmentId,
      user: userId,
    })

    if (!submission) {
      submission = new AssignmentSubmission({
        assignment: assignmentId,
        user: userId,
        enrollment: req.body.enrollmentId,
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
    next(error)
  }
}

// Save assignment draft
export const saveAssignmentDraft = async (req, res, next) => {
  try {
    const { submissionId } = req.params
    const { submissionText } = req.body

    const submission = await AssignmentSubmission.findById(submissionId)

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    submission.submissionText = submissionText
    submission.status = "draft"

    await submission.save()

    res.json({
      success: true,
      message: "Draft saved",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}

// Submit assignment
export const submitAssignment = async (req, res, next) => {
  try {
    const { submissionId } = req.params
    const { submissionText } = req.body

    const submission = await AssignmentSubmission.findById(submissionId)

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    if (submission.submitted) {
      return next(createHttpError(400, "Assignment already submitted"))
    }

    submission.submissionText = submissionText
    submission.submitted = true
    submission.submittedAt = new Date()
    submission.status = "submitted"
    submission.isLate = new Date() > submission.dueDate

    await submission.save()

    // Update progress
    const progressController = require("./progressController")
    await progressController.updateCourseProgress(submission.enrollment)

    res.json({
      success: true,
      message: "Assignment submitted successfully",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}

// Get user assignments
export const getUserAssignments = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const userId = req.user._id

    const assignments = await Assignment.find({ course: courseId, isPublished: true })

    const submissions = await AssignmentSubmission.find({
      user: userId,
      assignment: { $in: assignments.map((a) => a._id) },
    })

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
    next(error)
  }
}

// Admin: Get assignment submissions
export const getAssignmentSubmissions = async (req, res, next) => {
  try {
    const { assignmentId } = req.params

    const submissions = await AssignmentSubmission.find({ assignment: assignmentId })
      .populate("user", "name email")
      .sort({ submittedAt: -1 })

    res.json({
      success: true,
      data: submissions,
    })
  } catch (error) {
    next(error)
  }
}

// Admin: Grade assignment
export const gradeAssignment = async (req, res, next) => {
  try {
    const { submissionId } = req.params
    const { grade, feedback } = req.body

    const submission = await AssignmentSubmission.findById(submissionId)

    if (!submission) {
      return next(createHttpError(404, "Submission not found"))
    }

    submission.grade = grade
    submission.feedback = feedback
    submission.status = "graded"

    await submission.save()

    res.json({
      success: true,
      message: "Assignment graded successfully",
      data: submission,
    })
  } catch (error) {
    next(error)
  }
}

// Admin: Delete assignment
export const deleteAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params

    const assignment = await Assignment.findByIdAndDelete(assignmentId)

    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"))
    }

    res.json({
      success: true,
      message: "Assignment deleted successfully",
      data: assignment,
    })
  } catch (error) {
    next(error)
  }
}

// Admin: Update assignment
export const updateAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params
    const { title, description, instructions, dueDate, maxGrade, isPublished } = req.body

    const assignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { title, description, instructions, dueDate, maxGrade, isPublished },
      { new: true },
    )

    if (!assignment) {
      return next(createHttpError(404, "Assignment not found"))
    }

    res.json({
      success: true,
      message: "Assignment updated successfully",
      data: assignment,
    })
  } catch (error) {
    next(error)
  }
}
