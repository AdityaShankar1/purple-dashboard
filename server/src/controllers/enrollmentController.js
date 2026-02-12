// // // // // // // // // import Enrollment from "../models/Enrollment.js"
// // // // // // // // // import Course from "../models/Course.js"
// // // // // // // // // import Progress from "../models/Progress.js"
// // // // // // // // // import { createHttpError } from "../utils/errors.js"
// // // // // // // // // import { sendResponse } from "../utils/response.js"
// // // // // // // // // import { logger } from "../config/logger.js"
// // // // // // // // // import { sendEnrollmentNotification } from "../services/notificationService.js"

// // // // // // // // // // Enroll in course
// // // // // // // // // export const enrollInCourse = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { courseId } = req.body
// // // // // // // // //     const userId = req.user.id

// // // // // // // // //     // Check if course exists
// // // // // // // // //     const course = await Course.findById(courseId)
// // // // // // // // //     if (!course || !course.isPublished) {
// // // // // // // // //       return next(createHttpError(404, "Course not found or not available"))
// // // // // // // // //     }

// // // // // // // // //     // Check if already enrolled
// // // // // // // // //     const existingEnrollment = await Enrollment.findOne({
// // // // // // // // //       user: userId,
// // // // // // // // //       course: courseId,
// // // // // // // // //     })

// // // // // // // // //     if (existingEnrollment) {
// // // // // // // // //       return next(createHttpError(400, "Already enrolled in this course"))
// // // // // // // // //     }

// // // // // // // // //     // Create enrollment
// // // // // // // // //     const enrollment = await Enrollment.create({
// // // // // // // // //       user: userId,
// // // // // // // // //       course: courseId,
// // // // // // // // //     })

// // // // // // // // //     // Create initial progress
// // // // // // // // //     await Progress.create({
// // // // // // // // //       user: userId,
// // // // // // // // //       course: courseId,
// // // // // // // // //       enrollment: enrollment._id,
// // // // // // // // //       totalSections: 10, // Default sections, can be dynamic
// // // // // // // // //     })

// // // // // // // // //     // Update course enrollment count
// // // // // // // // //     await Course.findByIdAndUpdate(courseId, {
// // // // // // // // //       $inc: { enrollmentCount: 1 },
// // // // // // // // //     })

// // // // // // // // //     await sendEnrollmentNotification(userId, courseId)

// // // // // // // // //     await enrollment.populate([
// // // // // // // // //       { path: "course", select: "title description duration difficulty" },
// // // // // // // // //       { path: "user", select: "name email" },
// // // // // // // // //     ])

// // // // // // // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`)
// // // // // // // // //     sendResponse(res, 201, "Enrolled successfully", enrollment)
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error)
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Get user enrollments
// // // // // // // // // export const getUserEnrollments = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const { status } = req.query
// // // // // // // // //     const query = { user: req.user.id }

// // // // // // // // //     if (status) query.status = status

// // // // // // // // //     const enrollments = await Enrollment.find(query)
// // // // // // // // //       .populate("course", "title description duration difficulty thumbnail category")
// // // // // // // // //       .sort({ enrolledAt: -1 })

// // // // // // // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments)
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error)
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Get enrollment details
// // // // // // // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // // // //       _id: req.params.id,
// // // // // // // // //       user: req.user.id,
// // // // // // // // //     }).populate([{ path: "course", populate: { path: "instructor", select: "name email" } }])

// // // // // // // // //     if (!enrollment) {
// // // // // // // // //       return next(createHttpError(404, "Enrollment not found"))
// // // // // // // // //     }

// // // // // // // // //     // Get progress
// // // // // // // // //     const progress = await Progress.findOne({
// // // // // // // // //       enrollment: enrollment._id,
// // // // // // // // //     })

// // // // // // // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // // // // // // //       enrollment,
// // // // // // // // //       progress,
// // // // // // // // //     })
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error)
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Drop course
// // // // // // // // // export const dropCourse = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // // // //       _id: req.params.id,
// // // // // // // // //       user: req.user.id,
// // // // // // // // //       status: "active",
// // // // // // // // //     })

// // // // // // // // //     if (!enrollment) {
// // // // // // // // //       return next(createHttpError(404, "Active enrollment not found"))
// // // // // // // // //     }

// // // // // // // // //     enrollment.status = "dropped"
// // // // // // // // //     await enrollment.save()

// // // // // // // // //     // Update course enrollment count
// // // // // // // // //     await Course.findByIdAndUpdate(enrollment.course, {
// // // // // // // // //       $inc: { enrollmentCount: -1 },
// // // // // // // // //     })

// // // // // // // // //     logger.info(`User ${req.user.email} dropped course ${enrollment.course}`)
// // // // // // // // //     sendResponse(res, 200, "Course dropped successfully")
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error)
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // Get all enrollments (Admin)
// // // // // // // // // export const getAllEnrollments = async (req, res, next) => {
// // // // // // // // //   try {
// // // // // // // // //     const enrollments = await Enrollment.find()
// // // // // // // // //       .populate("user", "name email")
// // // // // // // // //       .populate("course", "title category")
// // // // // // // // //       .sort({ enrolledAt: -1 })

// // // // // // // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments)
// // // // // // // // //   } catch (error) {
// // // // // // // // //     next(error)
// // // // // // // // //   }
// // // // // // // // // }


















// // // // // // // // import Enrollment from "../models/Enrollment.js"
// // // // // // // // import Course from "../models/Course.js"
// // // // // // // // import Progress from "../models/Progress.js"
// // // // // // // // import { createHttpError } from "../utils/errors.js"
// // // // // // // // import { sendResponse } from "../utils/response.js"
// // // // // // // // import { logger } from "../config/logger.js"
// // // // // // // // import { sendEnrollmentNotification } from "../services/notificationService.js"

// // // // // // // // // Enroll in course
// // // // // // // // export const enrollInCourse = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.body
// // // // // // // //     // FIX: Using req.user.id (from context) instead of req.user.id, assumes auth sets req.user.id
// // // // // // // //     const userId = req.user.id 

// // // // // // // //     // Check if course exists
// // // // // // // //     const course = await Course.findById(courseId)
// // // // // // // //     // Note: Assuming 'enrollmentCount' field was added to Course model
// // // // // // // //     if (!course || !course.isPublished) {
// // // // // // // //       return next(createHttpError(404, "Course not found or not available"))
// // // // // // // //     }

// // // // // // // //     // Check if already enrolled
// // // // // // // //     const existingEnrollment = await Enrollment.findOne({
// // // // // // // //       user: userId,
// // // // // // // //       course: courseId,
// // // // // // // //     })

// // // // // // // //     if (existingEnrollment) {
// // // // // // // //       return next(createHttpError(400, "Already enrolled in this course"))
// // // // // // // //     }

// // // // // // // //     // Create enrollment
// // // // // // // //     const enrollment = await Enrollment.create({
// // // // // // // //       user: userId,
// // // // // // // //       course: courseId,
// // // // // // // //     })

// // // // // // // //     // Create initial progress
// // // // // // // //     await Progress.create({
// // // // // // // //       user: userId,
// // // // // // // //       course: courseId,
// // // // // // // //       enrollment: enrollment._id,
// // // // // // // //       totalSections: 10, // Default sections, can be dynamic
// // // // // // // //     })

// // // // // // // //     // Update course enrollment count
// // // // // // // //     await Course.findByIdAndUpdate(courseId, {
// // // // // // // //       $inc: { enrollmentCount: 1 },
// // // // // // // //     })

// // // // // // // //     await sendEnrollmentNotification(userId, courseId)

// // // // // // // //     // Populate the enrollment object for the response
// // // // // // // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // // // // // // //       { path: "course", select: "title description duration difficulty" },
// // // // // // // //       { path: "user", select: "name email" },
// // // // // // // //     ])

// // // // // // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`)
// // // // // // // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment)
// // // // // // // //   } catch (error) {
// // // // // // // //     next(error)
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Get user enrollments
// // // // // // // // export const getUserEnrollments = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const { status } = req.query
// // // // // // // //     const query = { user: req.user.id }

// // // // // // // //     if (status) query.status = status

// // // // // // // //     const enrollments = await Enrollment.find(query)
// // // // // // // //       .populate("course", "title description duration difficulty thumbnail category")
// // // // // // // //       .sort({ enrolledAt: -1 })

// // // // // // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments)
// // // // // // // //   } catch (error) {
// // // // // // // //     next(error)
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Get enrollment details
// // // // // // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // // //       _id: req.params.id,
// // // // // // // //       user: req.user.id,
// // // // // // // //     }).populate([{ path: "course", populate: { path: "instructor", select: "name email" } }])

// // // // // // // //     if (!enrollment) {
// // // // // // // //       return next(createHttpError(404, "Enrollment not found"))
// // // // // // // //     }

// // // // // // // //     // Get progress
// // // // // // // //     const progress = await Progress.findOne({
// // // // // // // //       enrollment: enrollment._id,
// // // // // // // //     })

// // // // // // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // // // // // //       enrollment,
// // // // // // // //       progress,
// // // // // // // //     })
// // // // // // // //   } catch (error) {
// // // // // // // //     next(error)
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Drop course
// // // // // // // // export const dropCourse = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // // //       _id: req.params.id,
// // // // // // // //       user: req.user.id,
// // // // // // // //       status: "active",
// // // // // // // //     })

// // // // // // // //     if (!enrollment) {
// // // // // // // //       return next(createHttpError(404, "Active enrollment not found"))
// // // // // // // //     }

// // // // // // // //     enrollment.status = "dropped"
// // // // // // // //     await enrollment.save()

// // // // // // // //     // Update course enrollment count
// // // // // // // //     await Course.findByIdAndUpdate(enrollment.course, {
// // // // // // // //       $inc: { enrollmentCount: -1 },
// // // // // // // //     })

// // // // // // // //     logger.info(`User ${req.user.email} dropped course ${enrollment.course}`)
// // // // // // // //     sendResponse(res, 200, "Course dropped successfully")
// // // // // // // //   } catch (error) {
// // // // // // // //     next(error)
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // // Get all enrollments (Admin)
// // // // // // // // export const getAllEnrollments = async (req, res, next) => {
// // // // // // // //   try {
// // // // // // // //     const enrollments = await Enrollment.find()
// // // // // // // //       .populate("user", "name email")
// // // // // // // //       .populate("course", "title category")
// // // // // // // //       .sort({ enrolledAt: -1 })

// // // // // // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments)
// // // // // // // //   } catch (error) {
// // // // // // // //     next(error)
// // // // // // // //   }
// // // // // // // // }











// // // // // // // // //server/src/controllers/enrollmentController.js

// // // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // // import Course from "../models/Course.js";
// // // // // // // import Progress from "../models/Progress.js";
// // // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // // import { sendResponse } from "../utils/response.js";
// // // // // // // import { logger } from "../config/logger.js";
// // // // // // // import { sendEnrollmentNotification } from "../services/notificationService.js";

// // // // // // // // Enroll in course
// // // // // // // export const enrollInCourse = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { courseId } = req.body;
// // // // // // //     const userId = req.user.id;

// // // // // // //     const course = await Course.findById(courseId);
// // // // // // //     if (!course || !course.isPublished) {
// // // // // // //       return next(createHttpError(404, "Course not found or not available"));
// // // // // // //     }

// // // // // // //     const existingEnrollment = await Enrollment.findOne({
// // // // // // //       user: userId,
// // // // // // //       course: courseId,
// // // // // // //     });

// // // // // // //     if (existingEnrollment) {
// // // // // // //       return next(createHttpError(400, "Already enrolled in this course"));
// // // // // // //     }

// // // // // // //     const enrollment = await Enrollment.create({
// // // // // // //       user: userId,
// // // // // // //       course: courseId,
// // // // // // //     });

// // // // // // //     await Progress.create({
// // // // // // //       user: userId,
// // // // // // //       course: courseId,
// // // // // // //       enrollment: enrollment._id,
// // // // // // //       totalSections: 10,
// // // // // // //     });

// // // // // // //     await Course.findByIdAndUpdate(courseId, {
// // // // // // //       $inc: { enrollmentCount: 1 },
// // // // // // //     });

// // // // // // //     await sendEnrollmentNotification(userId, courseId);

// // // // // // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // // // // // //       { path: "course", select: "title description duration difficulty category instructor" },
// // // // // // //       { path: "user", select: "name email" },
// // // // // // //     ]);

// // // // // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`);
// // // // // // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment);
// // // // // // //   } catch (error) {
// // // // // // //     next(error);
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get user enrollments
// // // // // // // export const getUserEnrollments = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const { status } = req.query;
// // // // // // //     const query = { user: req.user.id };
// // // // // // //     if (status) query.status = status;

// // // // // // //     const enrollments = await Enrollment.find(query)
// // // // // // //       .populate("course", "title description duration difficulty thumbnail category instructor")
// // // // // // //       .sort({ enrolledAt: -1 });

// // // // // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments);
// // // // // // //   } catch (error) {
// // // // // // //     next(error);
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get enrollment details
// // // // // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // //       _id: req.params.id,
// // // // // // //       user: req.user.id,
// // // // // // //     }).populate([
// // // // // // //       {
// // // // // // //         path: "course",
// // // // // // //         select: "title description duration difficulty category instructor",
// // // // // // //       },
// // // // // // //     ]);

// // // // // // //     if (!enrollment) {
// // // // // // //       return next(createHttpError(404, "Enrollment not found"));
// // // // // // //     }

// // // // // // //     const progress = await Progress.findOne({
// // // // // // //       enrollment: enrollment._id,
// // // // // // //     });

// // // // // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // // // // //       enrollment,
// // // // // // //       progress,
// // // // // // //     });
// // // // // // //   } catch (error) {
// // // // // // //     next(error);
// // // // // // //   }
// // // // // // // };

// // // // // // // // Drop course
// // // // // // // export const dropCourse = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const enrollment = await Enrollment.findOne({
// // // // // // //       _id: req.params.id,
// // // // // // //       user: req.user.id,
// // // // // // //       status: "active",
// // // // // // //     });

// // // // // // //     if (!enrollment) {
// // // // // // //       return next(createHttpError(404, "Active enrollment not found"));
// // // // // // //     }

// // // // // // //     enrollment.status = "dropped";
// // // // // // //     await enrollment.save();

// // // // // // //     await Course.findByIdAndUpdate(enrollment.course, {
// // // // // // //       $inc: { enrollmentCount: -1 },
// // // // // // //     });

// // // // // // //     logger.info(`User ${req.user.email} dropped course ${enrollment.course}`);
// // // // // // //     sendResponse(res, 200, "Course dropped successfully");
// // // // // // //   } catch (error) {
// // // // // // //     next(error);
// // // // // // //   }
// // // // // // // };

// // // // // // // // Get all enrollments (Admin)
// // // // // // // export const getAllEnrollments = async (req, res, next) => {
// // // // // // //   try {
// // // // // // //     const enrollments = await Enrollment.find()
// // // // // // //       .populate("user", "name email")
// // // // // // //       .populate("course", "title category instructor")
// // // // // // //       .sort({ enrolledAt: -1 });

// // // // // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments);
// // // // // // //   } catch (error) {
// // // // // // //     next(error);
// // // // // // //   }
// // // // // // // };













// // // // // // //server/src/controller/enrollmentController.js

// // // // // // import Enrollment from "../models/Enrollment.js";
// // // // // // import Course from "../models/Course.js";
// // // // // // import Progress from "../models/Progress.js";
// // // // // // import { createHttpError } from "../utils/errors.js";
// // // // // // import { sendResponse } from "../utils/response.js";
// // // // // // import { logger } from "../config/logger.js";
// // // // // // import { sendEnrollmentNotification } from "../services/notificationService.js";

// // // // // // // Enroll in course using string courseId
// // // // // // export const enrollInCourse = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { courseId } = req.body;
// // // // // //     const userId = req.user.id;

// // // // // //     // ✅ Match course using custom string ID
// // // // // //     const course = await Course.findOne({ courseId });
// // // // // //     if (!course || !course.isPublished) {
// // // // // //       return next(createHttpError(404, "Course not found or not available"));
// // // // // //     }

// // // // // //     const existingEnrollment = await Enrollment.findOne({
// // // // // //       user: userId,
// // // // // //       course: course._id,
// // // // // //     });

// // // // // //     if (existingEnrollment) {
// // // // // //       return next(createHttpError(400, "Already enrolled in this course"));
// // // // // //     }

// // // // // //     const enrollment = await Enrollment.create({
// // // // // //       user: userId,
// // // // // //       course: course._id,
// // // // // //     });

// // // // // //     await Progress.create({
// // // // // //       user: userId,
// // // // // //       course: course._id,
// // // // // //       enrollment: enrollment._id,
// // // // // //       totalSections: 10,
// // // // // //     });

// // // // // //     await Course.findOneAndUpdate({ courseId }, {
// // // // // //       $inc: { enrollmentCount: 1 },
// // // // // //     });

// // // // // //     await sendEnrollmentNotification(userId, course.courseId);

// // // // // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // // // // //       { path: "course", select: "title description duration difficulty category instructor" },
// // // // // //       { path: "user", select: "name email" },
// // // // // //     ]);

// // // // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`);
// // // // // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment);
// // // // // //   } catch (error) {
// // // // // //     next(error);
// // // // // //   }
// // // // // // }


// // // // // // export const getAllEnrollments = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const enrollments = await Enrollment.find()
// // // // // //       .populate("user", "name email")
// // // // // //       .populate("course", "title category instructor")
// // // // // //       .sort({ enrolledAt: -1 });

// // // // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments);
// // // // // //   } catch (error) {
// // // // // //     next(error);
// // // // // //   }
// // // // // // };

// // // // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const enrollment = await Enrollment.findOne({
// // // // // //       _id: req.params.id,
// // // // // //       user: req.user.id,
// // // // // //     }).populate([
// // // // // //       {
// // // // // //         path: "course",
// // // // // //         select: "title description duration difficulty category instructor",
// // // // // //       },
// // // // // //     ]);

// // // // // //     if (!enrollment) {
// // // // // //       return next(createHttpError(404, "Enrollment not found"));
// // // // // //     }

// // // // // //     const progress = await Progress.findOne({
// // // // // //       enrollment: enrollment._id,
// // // // // //     });

// // // // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // // // //       enrollment,
// // // // // //       progress,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     next(error);
// // // // // //   }
// // // // // // };


// // // // // // export const getUserEnrollments = async (req, res, next) => {
// // // // // //   try {
// // // // // //     const { status } = req.query;
// // // // // //     const query = { user: req.user.id };
// // // // // //     if (status) query.status = status;

// // // // // //     const enrollments = await Enrollment.find(query)
// // // // // //       .populate("course", "title description duration difficulty thumbnail category instructor")
// // // // // //       .sort({ enrolledAt: -1 });

// // // // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments);
// // // // // //   } catch (error) {
// // // // // //     next(error);
// // // // // //   }
// // // // // // };






















// // // // // import Enrollment from "../models/Enrollment.js";
// // // // // import Course from "../models/Course.js";
// // // // // import Progress from "../models/Progress.js";
// // // // // import { createHttpError } from "../utils/errors.js";
// // // // // import { sendResponse } from "../utils/response.js";
// // // // // import { logger } from "../config/logger.js";
// // // // // import { sendEnrollmentNotification } from "../services/notificationService.js";

// // // // // // Enroll in course using string courseId
// // // // // export const enrollInCourse = async (req, res, next) => {
// // // // //   try {
// // // // //     const { courseId } = req.body; // courseId now holds the MongoDB _id from the client
// // // // //     const userId = req.user.id;

// // // // //     // ✅ FIX APPLIED: Match course using MongoDB _id (instead of custom string ID)
// // // // //     const course = await Course.findById(courseId); 

// // // // //     if (!course) {
// // // // //       // isPublished check is redundant on Course.findById, but kept the logic for not available
// // // // //       return next(createHttpError(404, "Course not found or not available"));
// // // // //     }

// // // // //     const existingEnrollment = await Enrollment.findOne({
// // // // //       user: userId,
// // // // //       course: course._id, // use the MongoDB _id from the found course
// // // // //     });

// // // // //     if (existingEnrollment) {
// // // // //       return next(createHttpError(400, "Already enrolled in this course"));
// // // // //     }

// // // // //     const enrollment = await Enrollment.create({
// // // // //       user: userId,
// // // // //       course: course._id,
// // // // //     });

// // // // //     await Progress.create({
// // // // //       user: userId,
// // // // //       course: course._id,
// // // // //       enrollment: enrollment._id,
// // // // //       totalSections: 10,
// // // // //     });

// // // // //     // ✅ FIX APPLIED: Increment enrollmentCount using the MongoDB _id
// // // // //     await Course.findByIdAndUpdate(course._id, {
// // // // //       $inc: { enrollmentCount: 1 },
// // // // //     });

// // // // //     await sendEnrollmentNotification(userId, course.courseId);

// // // // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // // // //       { path: "course", select: "title description duration difficulty category instructor" },
// // // // //       { path: "user", select: "name email" },
// // // // //     ]);

// // // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`);
// // // // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment);
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // }


// // // // // export const getAllEnrollments = async (req, res, next) => {
// // // // //   try {
// // // // //     const enrollments = await Enrollment.find()
// // // // //       .populate("user", "name email")
// // // // //       .populate("course", "title category instructor")
// // // // //       .sort({ enrolledAt: -1 });

// // // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments);
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // // //   try {
// // // // //     const enrollment = await Enrollment.findOne({
// // // // //       _id: req.params.id,
// // // // //       user: req.user.id,
// // // // //     }).populate([
// // // // //       {
// // // // //         path: "course",
// // // // //         select: "title description duration difficulty category instructor",
// // // // //       },
// // // // //     ]);

// // // // //     if (!enrollment) {
// // // // //       return next(createHttpError(404, "Enrollment not found"));
// // // // //     }

// // // // //     const progress = await Progress.findOne({
// // // // //       enrollment: enrollment._id,
// // // // //     });

// // // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // // //       enrollment,
// // // // //       progress,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };


// // // // // export const getUserEnrollments = async (req, res, next) => {
// // // // //   try {
// // // // //     const { status } = req.query;
// // // // //     const query = { user: req.user.id };
// // // // //     if (status) query.status = status;

// // // // //     const enrollments = await Enrollment.find(query)
// // // // //       .populate("course", "title description duration difficulty thumbnail category instructor")
// // // // //       .sort({ enrolledAt: -1 });

// // // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments);
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };




// // // // //server/src/controller/enrollmentController.js

// // // // import Enrollment from "../models/Enrollment.js";
// // // // import Course from "../models/Course.js";
// // // // import Progress from "../models/Progress.js";
// // // // import { createHttpError } from "../utils/errors.js";
// // // // import { sendResponse } from "../utils/response.js";
// // // // import { logger } from "../config/logger.js";
// // // // import { sendEnrollmentNotification } from "../services/notificationService.js";
// // // // import mongoose from "mongoose"; // Import mongoose to check for valid ObjectId

// // // // // Enroll in course
// // // // export const enrollInCourse = async (req, res, next) => {
// // // //   try {
// // // //     const { courseId } = req.body; // This must be the MongoDB _id from the client
// // // //     const userId = req.user.id;

// // // //     // Check if the received ID is at least a valid looking ObjectId before querying
// // // //     if (!mongoose.Types.ObjectId.isValid(courseId)) {
// // // //         return next(createHttpError(400, "Invalid Course ID format."));
// // // //     }

// // // //     // ✅ FIX: Match course using MongoDB _id
// // // //     const course = await Course.findById(courseId); 

// // // //     // Using findById implies checking for a published status might be separate or handled in your schema
// // // //     if (!course) { 
// // // //       return next(createHttpError(404, "Course not found."));
// // // //     }

// // // //     const existingEnrollment = await Enrollment.findOne({
// // // //       user: userId,
// // // //       course: course._id, // use the MongoDB _id from the found course
// // // //     });

// // // //     if (existingEnrollment) {
// // // //       return next(createHttpError(400, "Already enrolled in this course"));
// // // //     }

// // // //     const enrollment = await Enrollment.create({
// // // //       user: userId,
// // // //       course: course._id,
// // // //     });

// // // //     await Progress.create({
// // // //       user: userId,
// // // //       course: course._id,
// // // //       enrollment: enrollment._id,
// // // //       totalSections: 10,
// // // //     });

// // // //     // ✅ FIX: Increment enrollmentCount using the MongoDB _id
// // // //     await Course.findByIdAndUpdate(course._id, {
// // // //       $inc: { enrollmentCount: 1 },
// // // //     });

// // // //     await sendEnrollmentNotification(userId, course.courseId);

// // // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // // //       { path: "course", select: "title description duration difficulty category instructor" },
// // // //       { path: "user", select: "name email" },
// // // //     ]);

// // // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`);
// // // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment);
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // }


// // // // export const getAllEnrollments = async (req, res, next) => {
// // // //   try {
// // // //     const enrollments = await Enrollment.find()
// // // //       .populate("user", "name email")
// // // //       .populate("course", "title category instructor")
// // // //       .sort({ enrolledAt: -1 });

// // // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments);
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // };

// // // // export const getEnrollmentDetails = async (req, res, next) => {
// // // //   try {
// // // //     const enrollment = await Enrollment.findOne({
// // // //       _id: req.params.id,
// // // //       user: req.user.id,
// // // //     }).populate([
// // // //       {
// // // //         path: "course",
// // // //         select: "title description duration difficulty category instructor",
// // // //       },
// // // //     ]);

// // // //     if (!enrollment) {
// // // //       return next(createHttpError(404, "Enrollment not found"));
// // // //     }

// // // //     const progress = await Progress.findOne({
// // // //       enrollment: enrollment._id,
// // // //     });

// // // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // // //       enrollment,
// // // //       progress,
// // // //     });
// // // //   } catch (error) {
// // // //     next(error);
// // // //   }
// // // // };


// // // // export const getUserEnrollments = async (req, res, next) => {
// // // //   try {
// // // //     const { status } = req.query;
// // // //     const query = { user: req.user.id };
// // // //     if (status) query.status = status;

// // // //     // Use lean() and then manually filter for more resilient population 
// // // //     // to avoid a full crash on a single bad ObjectId
// // // //     const enrollments = await Enrollment.find(query)
// // // //       .populate("course", "title description duration difficulty thumbnail category instructor")
// // // //       .sort({ enrolledAt: -1 });

// // // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments);
// // // //   } catch (error) {
// // // //     // This is where the ObjectId error originates. 
// // // //     // If you see the error, you must clean your database.
// // // //     next(error); 
// // // //   }
// // // // };











// // // // server/src/controllers/enrollmentController.js

// // // import Enrollment from "../models/Enrollment.js";
// // // import Course from "../models/Course.js";
// // // import Progress from "../models/Progress.js";
// // // import { createHttpError } from "../utils/errors.js";
// // // import { sendResponse } from "../utils/response.js";
// // // import { logger } from "../config/logger.js";
// // // import { sendEnrollmentNotification } from "../services/notificationService.js";
// // // // Removed: import mongoose from "mongoose"; // No longer needed for isValid check

// // // // Enroll in course
// // // export const enrollInCourse = async (req, res, next) => {
// // //   try {
// // //     // courseId here is the MongoDB _id from the client (CourseList.js)
// // //     const { courseId } = req.body; 
// // //     const userId = req.user.id;

// // //     // 1. Find Course by MongoDB _id
// // //     // This correctly handles the lookup if the client sends the proper ID.
// // //     const course = await Course.findById(courseId); 

// // //     if (!course) {
// // //       return next(createHttpError(404, "Course not found."));
// // //     }

// // //     // 2. Check for existing enrollment using the Course's MongoDB _id
// // //     const existingEnrollment = await Enrollment.findOne({
// // //       user: userId,
// // //       course: course._id, 
// // //     });

// // //     if (existingEnrollment) {
// // //       return next(createHttpError(400, "Already enrolled in this course"));
// // //     }

// // //     // 3. Create Enrollment and Progress records
// // //     const enrollment = await Enrollment.create({
// // //       user: userId,
// // //       course: course._id, // Save the MongoDB _id to the Enrollment model
// // //     });

// // //     await Progress.create({
// // //       user: userId,
// // //       course: course._id,
// // //       enrollment: enrollment._id,
// // //       totalSections: 10,
// // //     });

// // //     // 4. Update Course enrollment count
// // //     await Course.findByIdAndUpdate(course._id, {
// // //       $inc: { enrollmentCount: 1 },
// // //     });

// // //     // 5. Send notification
// // //     // Uses the custom courseId string (e.g., "SOC12") from the Course document
// // //     await sendEnrollmentNotification(userId, course.courseId); 

// // //     // 6. Respond with populated enrollment
// // //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// // //       { path: "course", select: "title description duration difficulty category instructor" },
// // //       { path: "user", select: "name email" },
// // //     ]);

// // //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`);
// // //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment);
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // }

// // // // Get all enrollments (Admin use)
// // // export const getAllEnrollments = async (req, res, next) => {
// // //   try {
// // //     const enrollments = await Enrollment.find()
// // //       .populate("user", "name email")
// // //       .populate("course", "title category instructor")
// // //       .sort({ enrolledAt: -1 });

// // //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments);
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };

// // // // Get single enrollment details (User use)
// // // export const getEnrollmentDetails = async (req, res, next) => {
// // //   try {
// // //     const enrollment = await Enrollment.findOne({
// // //       _id: req.params.id,
// // //       user: req.user.id,
// // //     }).populate([
// // //       {
// // //         path: "course",
// // //         select: "title description duration difficulty category instructor",
// // //       },
// // //     ]);

// // //     if (!enrollment) {
// // //       return next(createHttpError(404, "Enrollment not found"));
// // //     }

// // //     const progress = await Progress.findOne({
// // //       enrollment: enrollment._id,
// // //     });

// // //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// // //       enrollment,
// // //       progress,
// // //     });
// // //   } catch (error) {
// // //     next(error);
// // //   }
// // // };

// // // // Get user's list of enrollments
// // // export const getUserEnrollments = async (req, res, next) => {
// // //   try {
// // //     const { status } = req.query;
// // //     const query = { user: req.user.id };
// // //     if (status) query.status = status;

// // //     // This function will throw the 'Cast to ObjectId failed' error if any 
// // //     // Enrollment document has a non-ObjectId string in the 'course' field.
// // //     const enrollments = await Enrollment.find(query)
// // //       .populate("course", "title description duration difficulty thumbnail category instructor")
// // //       .sort({ enrolledAt: -1 });

// // //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments);
// // //   } catch (error) {
// // //     // If the error is the Cast error, you must clean your database.
// // //     next(error); 
// // //   }
// // // };





// // ///above is working //////16/10/25/   //////below is new claude code


// // // server/src/controllers/enrollmentController.js
// // import Enrollment from "../models/Enrollment.js"
// // import Course from "../models/Course.js"
// // import Progress from "../models/Progress.js"
// // import { createHttpError } from "../utils/errors.js"
// // import { sendResponse } from "../utils/response.js"
// // import { logger } from "../config/logger.js"
// // import { sendEnrollmentNotification } from "../services/notificationService.js"

// // // ✅ Enroll in a course
// // export const enrollInCourse = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.body
// //     const userId = req.user.id

// //     const course = await Course.findById(courseId)
// //     if (!course) return next(createHttpError(404, "Course not found"))

// //     const existingEnrollment = await Enrollment.findOne({ user: userId, course: course._id })
// //     if (existingEnrollment) return next(createHttpError(400, "Already enrolled in this course"))

// //     const enrollment = await Enrollment.create({ user: userId, course: course._id })

// //     await Progress.create({
// //       user: userId,
// //       course: course._id,
// //       enrollment: enrollment._id,
// //       totalSections: 10,
// //     })

// //     await Course.findByIdAndUpdate(course._id, { $inc: { enrollmentCount: 1 } })

// //     await sendEnrollmentNotification(userId, course.courseId)

// //     const populatedEnrollment = await Enrollment.findById(enrollment._id).populate([
// //       { path: "course", select: "title description duration difficulty category instructor" },
// //       { path: "user", select: "name email" },
// //     ])

// //     logger.info(`User ${req.user.email} enrolled in course ${course.title}`)
// //     sendResponse(res, 201, "Enrolled successfully", populatedEnrollment)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // ✅ Get all enrollments (Admin)
// // export const getAllEnrollments = async (req, res, next) => {
// //   try {
// //     const enrollments = await Enrollment.find()
// //       .populate("user", "name email")
// //       .populate("course", "title category instructor")
// //       .sort({ enrolledAt: -1 })

// //     sendResponse(res, 200, "All enrollments fetched successfully", enrollments)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // ✅ Get single enrollment details (User)
// // export const getEnrollmentDetails = async (req, res, next) => {
// //   try {
// //     const enrollment = await Enrollment.findOne({
// //       _id: req.params.id,
// //       user: req.user.id,
// //     }).populate([
// //       {
// //         path: "course",
// //         select: "title description duration difficulty category instructor",
// //       },
// //     ])

// //     if (!enrollment) return next(createHttpError(404, "Enrollment not found"))

// //     const progress = await Progress.findOne({ enrollment: enrollment._id })

// //     sendResponse(res, 200, "Enrollment details fetched successfully", {
// //       enrollment,
// //       progress,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // ✅ Get user's enrollments
// // export const getUserEnrollments = async (req, res, next) => {
// //   try {
// //     const { status } = req.query
// //     const query = { user: req.user.id }
// //     if (status) query.status = status

// //     const enrollments = await Enrollment.find(query)
// //       .populate("course", "title description duration difficulty thumbnail category instructor")
// //       .sort({ enrolledAt: -1 })

// //     sendResponse(res, 200, "Enrollments fetched successfully", enrollments)
// //   } catch (error) {
// //     next(error)
// //   }
// // }









// // server/src/controllers/enrollmentController.js

// import Enrollment from "../models/Enrollment.js"
// import Course from "../models/Course.js"
// import { createHttpError } from "../utils/errors.js"
// import { sendResponse } from "../utils/response.js"

// // GET /api/enrollments/ongoing
// export const getOngoingEnrollments = async (req, res, next) => {
//   try {
//     const userId = req.user?.id
//     const enrollments = await Enrollment.find({ userId, status: "active" })
//       .populate("courseId")

//     const courses = enrollments.map(e => ({
//       ...e.courseId.toObject(),
//       progress: e.progress || 0
//     }))

//     sendResponse(res, 200, "Ongoing courses fetched", courses)
//   } catch (err) {
//     next(err)
//   }
// }

// // GET /api/enrollments/completed
// export const getCompletedEnrollments = async (req, res, next) => {
//   try {
//     const userId = req.user?.id
//     const enrollments = await Enrollment.find({ userId, status: "completed" })
//       .populate("courseId")

//     const courses = enrollments.map(e => ({
//       ...e.courseId.toObject(),
//       completedAt: e.completedAt
//     }))

//     sendResponse(res, 200, "Completed courses fetched", courses)
//   } catch (err) {
//     next(err)
//   }
// }

// // POST /api/enrollments/:courseId
// export const enrollInCourse = async (req, res, next) => {
//   try {
//     const userId = req.user._id   // ✅ correct field
//     const { courseId } = req.params

//     const existing = await Enrollment.findOne({ userId, courseId })
//     if (existing) {
//       return res.status(400).json({ message: "Already enrolled in this course" })
//     }

//     const enrollment = await Enrollment.create({
//       userId,
//       courseId,
//       status: "active",
//       enrolledAt: new Date()
//     })

//     res.status(201).json({ message: "Enrolled successfully", data: enrollment })
//   } catch (err) {
//     next(err)
//   }
// }




import mongoose from "mongoose"
import Enrollment from "../models/Enrollment.js"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"

// POST /api/enrollments/:courseId
// POST /api/enrollments/
export const enrollInCourse = async (req, res, next) => {
  try {
    const userId = req.user._id

    // Accept courseId from body (preferred) or params (fallback)
    // The frontend might be sending it as 'courseId' or just 'course'
    const courseIdInput = req.body.courseId || req.body.course || req.params.courseId;

    if (!courseIdInput) {
      return next(createHttpError(400, "Course ID is required"))
    }

    // Resolve courseId string to MongoDB _id
    // We import Course dynamically to avoid potential circular dependency issues if any, 
    // though top-level import is usually fine.
    const Course = (await import("../models/Course.js")).default;

    // Find by the custom string ID first
    let course = await Course.findOne({ courseId: courseIdInput });

    // If not found, and it looks like an ObjectId, try finding by _id
    if (!course && courseIdInput.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(courseIdInput);
    }

    if (!course) {
      return next(createHttpError(404, "Course not found"))
    }

    // Check if duplicate enrollment
    // Schema has 'courseId' as ObjectId ref, 'userId' as ObjectId ref
    const existing = await Enrollment.findOne({ userId, courseId: course._id });

    if (existing) {
      return next(createHttpError(400, "Already enrolled in this course"))
    }

    // Create enrollment using Ref
    const enrollment = await Enrollment.create({
      userId,
      courseId: course._id, // Must be ObjectId according to schema
      status: "active",
      enrolledAt: new Date()
    })

    // Increment count
    await Course.findByIdAndUpdate(course._id, { $inc: { enrollmentCount: 1 } });

    sendResponse(res, 201, "Enrolled successfully", enrollment)
  } catch (err) {
    next(err)
  }
}

// GET /api/enrollments/ongoing
export const getOngoingEnrollments = async (req, res, next) => {
  try {
    const userId = req.user._id
    console.log(`[Enrollment] Fetching ongoing courses for User: ${userId}`);

    const enrollments = await Enrollment.find({ userId, status: "active" })
      .populate("courseId")

    console.log(`[Enrollment] Found ${enrollments.length} enrollments`);

    // Trigger a background progress sync for each enrollment to ensure dashboard is accurate
    const { updateCourseProgress } = await import("./progressController.js")
    const courses = await Promise.all(enrollments.map(async (e) => {
      if (!e.courseId) {
        console.warn(`[Enrollment] Enrollment ${e._id} has no courseId`);
        return null;
      }

      try {
        // Background sync - ensure progress is up to date
        const p = await updateCourseProgress(userId, e.courseId._id)

        return {
          ...e.courseId.toObject(),
          progress: p ? p.overallProgress : (e.progress || 0)
        }
      } catch (err) {
        console.error(`[Enrollment] Error syncing progress for course ${e.courseId._id}:`, err);
        // Return course data even if progress sync fails
        return {
          ...e.courseId.toObject(),
          progress: e.progress || 0
        }
      }
    }))

    const validCourses = courses.filter(c => c !== null);
    console.log(`[Enrollment] Returning ${validCourses.length} ongoing courses`);

    sendResponse(res, 200, "Ongoing courses fetched", validCourses)
  } catch (err) {
    console.error("[Enrollment] Error in getOngoingEnrollments:", err);
    next(err)
  }
}

// GET /api/enrollments/completed
export const getCompletedEnrollments = async (req, res, next) => {
  try {
    const userId = req.user._id
    const enrollments = await Enrollment.find({ userId, status: "completed" })
      .populate("courseId")

    const courses = enrollments.map(e => ({
      ...e.courseId.toObject(),
      completedAt: e.completedAt
    }))

    sendResponse(res, 200, "Completed courses fetched", courses)
  } catch (err) {
    next(err)
  }
}

// GET /api/enrollments/admin/all
export const getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({})
      .populate("userId", "name email")
      .populate("courseId", "title")
      .sort({ enrolledAt: -1 })

    sendResponse(res, 200, "All enrollments fetched successfully", enrollments)
  } catch (error) {
    next(error)
  }
}
