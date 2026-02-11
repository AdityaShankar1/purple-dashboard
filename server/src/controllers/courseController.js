// // // // //server/src/controller/courseController.js


// // // // // //server/src/controllers/courseController.js

// // // // import Course from "../models/Course.js";

// // // // export const createCourse = async (req, res) => {
// // // //   try {
// // // //     const { courseId, title, description, content, duration, difficulty, category, instructor } = req.body;

// // // //     if (!courseId || !title || !description || !instructor) {
// // // //       return res.status(400).json({ message: "Course ID, title, description, and instructor are required" });
// // // //     }

// // // //     const existing = await Course.findOne({ courseId });
// // // //     if (existing) {
// // // //       return res.status(409).json({ message: "Course ID already exists" });
// // // //     }

// // // //     const course = await Course.create({ courseId, title, description, content, duration, difficulty, category, instructor });
// // // //     res.status(201).json({ data: course });
// // // //   } catch (err) {
// // // //     console.error("🔥 Error creating course:", err);
// // // //     res.status(500).json({ message: "Failed to create course" });
// // // //   }
// // // // };

// // // // export const updateCourse = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const updates = req.body;
// // // //     const course = await Course.findByIdAndUpdate(id, updates, { new: true });
// // // //     if (!course) return res.status(404).json({ message: "Course not found" });
// // // //     res.json({ data: course });
// // // //   } catch (err) {
// // // //     console.error("🔥 Error updating course:", err);
// // // //     res.status(500).json({ message: "Failed to update course" });
// // // //   }
// // // // };

// // // // export const getAllCoursesAdmin = async (req, res) => {
// // // //   try {
// // // //     const courses = await Course.find().sort({ createdAt: -1 });
// // // //     res.json({ data: { courses } });
// // // //   } catch (err) {
// // // //     console.error("🔥 Error fetching courses:", err);
// // // //     res.status(500).json({ message: "Failed to fetch courses" });
// // // //   }
// // // // };

// // // // export const deleteCourse = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const deleted = await Course.findByIdAndDelete(id);
// // // //     if (!deleted) return res.status(404).json({ message: "Course not found" });
// // // //     res.json({ message: "Course deleted successfully" });
// // // //   } catch (err) {
// // // //     console.error("🔥 Error deleting course:", err);
// // // //     res.status(500).json({ message: "Failed to delete course" });
// // // //   }
// // // // };


// // // // export const getAllCoursesPublic = async (req, res) => {
// // // //   try {
// // // //     const courses = await Course.find().sort({ createdAt: -1 });
// // // //     res.json({ data: { courses } });
// // // //   } catch (err) {
// // // //     console.error("🔥 Error fetching public courses:", err);
// // // //     res.status(500).json({ message: "Failed to fetch courses" });
// // // //   }
// // // // };








// // // //server/src/controllers/courseController.js


// // // import Course from "../models/Course.js";

// // // export const createCourse = async (req, res) => {
// // //   try {
// // //     const { courseId, title, description, content, duration, difficulty, category, instructor } = req.body;

// // //     if (!courseId || !title || !description || !instructor) {
// // //       return res.status(400).json({ message: "Course ID, title, description, and instructor are required" });
// // //     }

// // //     const existing = await Course.findOne({ courseId });
// // //     if (existing) {
// // //       return res.status(409).json({ message: "Course ID already exists" });
// // //     }

// // //     const course = await Course.create({ courseId, title, description, content, duration, difficulty, category, instructor });
// // //     res.status(201).json({ data: course });
// // //   } catch (err) {
// // //     console.error("🔥 Error creating course:", err);
// // //     res.status(500).json({ message: "Failed to create course" });
// // //   }
// // // };

// // // export const updateCourse = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const updates = req.body;
// // //     const course = await Course.findByIdAndUpdate(id, updates, { new: true });
// // //     if (!course) return res.status(404).json({ message: "Course not found" });
// // //     res.json({ data: course });
// // //   } catch (err) {
// // //     console.error("🔥 Error updating course:", err);
// // //     res.status(500).json({ message: "Failed to update course" });
// // //   }
// // // };

// // // export const getAllCoursesAdmin = async (req, res) => {
// // //   try {
// // //     const courses = await Course.find().sort({ createdAt: -1 });
// // //     res.json({ data: { courses } });
// // //   } catch (err) {
// // //     console.error("🔥 Error fetching courses:", err);
// // //     res.status(500).json({ message: "Failed to fetch courses" });
// // //   }
// // // };

// // // export const deleteCourse = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const deleted = await Course.findByIdAndDelete(id);
// // //     if (!deleted) return res.status(404).json({ message: "Course not found" });
// // //     res.json({ message: "Course deleted successfully" });
// // //   } catch (err) {
// // //     console.error("🔥 Error deleting course:", err);
// // //     res.status(500).json({ message: "Failed to delete course" });
// // //   }
// // // };


// // // export const getAllCoursesPublic = async (req, res) => {
// // //   try {
// // //     const courses = await Course.find().sort({ createdAt: -1 });
// // //     res.json({ data: { courses } });
// // //   } catch (err) {
// // //     console.error("🔥 Error fetching public courses:", err);
// // //     res.status(500).json({ message: "Failed to fetch courses" });
// // //   }
// // // };






// // // //above working code 16/10/25///// Below is new claude  code
















// // // server/src/controllers/courseController.js

// // import Course from "../models/Course.js"
// // import Enrollment from "../models/Enrollment.js"
// // import Progress from "../models/Progress.js"
// // import mongoose from "mongoose" // Import mongoose to declare it
// // import { createHttpError } from "../utils/errors.js"
// // import { sendResponse } from "../utils/response.js"
// // import { logger } from "../config/logger.js"
// // import { sendCourseNotification } from "../services/notificationService.js"

// // // Get all courses (with pagination and filters)
// // export const getCourses = async (req, res, next) => {
// //   try {
// //     const { page = 1, limit = 10, category, difficulty, search } = req.query
// //     const query = { isPublished: true }

// //     if (category) query.category = category
// //     if (difficulty) query.difficulty = difficulty
// //     if (search) {
// //       query.$text = { $search: search }
// //     }

// //     const courses = await Course.find(query)
// //       .populate("instructor", "name email")
// //       .populate("ratings.user", "name")
// //       .sort({ createdAt: -1 })
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit)

// //     const total = await Course.countDocuments(query)

// //     sendResponse(res, 200, "Courses fetched successfully", {
// //       courses,
// //       totalPages: Math.ceil(total / limit),
// //       currentPage: page,
// //       total,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Get single course
// // export const getCourse = async (req, res, next) => {
// //   try {
// //     const course = await Course.findById(req.params.id)
// //       .populate("instructor", "name email")
// //       .populate("ratings.user", "name")

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     sendResponse(res, 200, "Course fetched successfully", course)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Create course (Admin only)
// // export const createCourse = async (req, res, next) => {
// //   try {
// //     const safeTitle = (req.body.title || "").trim()
// //     const safeDescription = (req.body.description || "").trim()

// //     if (!safeTitle || !safeDescription) {
// //       return next(createHttpError(400, "Title and description are required"))
// //     }

// //     const courseData = {
// //       title: safeTitle,
// //       description: safeDescription,
// //       content: (req.body.content || "Course content will be added soon.").toString(),
// //       duration:
// //         Number.isFinite(Number(req.body.duration)) && Number(req.body.duration) >= 1 ? Number(req.body.duration) : 1,
// //       difficulty: ["Beginner", "Intermediate", "Advanced"].includes(req.body.difficulty)
// //         ? req.body.difficulty
// //         : "Beginner",
// //       category: (req.body.category || "General").toString(),
// //       isPublished: true,
// //       thumbnail: req.body.thumbnail || "",
// //       tags: Array.isArray(req.body.tags) ? req.body.tags : [],
// //       instructor: req.user.id,
// //       materials: [],
// //       liveSessions: [],
// //       ratings: [],
// //     }

// //     const course = await Course.create(courseData)
// //     await course.populate("instructor", "name email")

// //     await sendCourseNotification("course_created", course._id, req.user.id)

// //     logger.info(`Course created: ${course.title} by ${req.user.email}`)
// //     sendResponse(res, 201, "Course created successfully", course)
// //   } catch (error) {
// //     logger.error("[courseController.createCourse] error:", error)
// //     next(error)
// //   }
// // }

// // // Update course (Admin only)
// // export const updateCourse = async (req, res, next) => {
// //   try {
// //     const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //       runValidators: true,
// //     }).populate("instructor", "name email")

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     await sendCourseNotification("course_updated", course._id, req.user.id)

// //     logger.info(`Course updated: ${course.title} by ${req.user.email}`)
// //     sendResponse(res, 200, "Course updated successfully", course)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Delete course (Admin only)
// // export const deleteCourse = async (req, res, next) => {
// //   try {
// //     const courseId = req.params.id
// //     const course = await Course.findById(courseId)

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     await sendCourseNotification("course_deleted", course._id, req.user.id)

// //     await Promise.all([Enrollment.deleteMany({ course: course._id }), Progress.deleteMany({ course: course._id })])

// //     await Course.findByIdAndDelete(courseId)

// //     logger.info(`Course deleted: ${course.title} by ${req.user.email}`)
// //     sendResponse(res, 200, "Course deleted successfully")
// //   } catch (error) {
// //     logger.error("[courseController.deleteCourse] error:", error)
// //     next(createHttpError(500, "Failed to delete course"))
// //   }
// // }

// // // Get admin courses (all courses for admin)
// // export const getAdminCourses = async (req, res, next) => {
// //   try {
// //     const courses = await Course.find()
// //       .populate("instructor", "name email")
// //       .populate("ratings.user", "name")
// //       .sort({ createdAt: -1 })

// //     sendResponse(res, 200, "Admin courses fetched successfully", courses)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const addMaterial = async (req, res, next) => {
// //   try {
// //     const { title, description, type, url, duration } = req.body
// //     const course = await Course.findById(req.params.id)

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     const material = {
// //       _id: new mongoose.Types.ObjectId(),
// //       title,
// //       description,
// //       type,
// //       url,
// //       duration,
// //       order: course.materials.length + 1,
// //     }

// //     course.materials.push(material)
// //     await course.save()

// //     sendResponse(res, 201, "Material added successfully", course)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const addLiveSession = async (req, res, next) => {
// //   try {
// //     const { title, description, startTime, endTime, meetingLink } = req.body
// //     const course = await Course.findById(req.params.id)

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     const session = {
// //       _id: new mongoose.Types.ObjectId(),
// //       title,
// //       description,
// //       startTime,
// //       endTime,
// //       meetingLink,
// //       isLive: new Date(startTime) <= new Date() && new Date(endTime) >= new Date(),
// //     }

// //     course.liveSessions.push(session)
// //     await course.save()

// //     sendResponse(res, 201, "Live session added successfully", course)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const addRating = async (req, res, next) => {
// //   try {
// //     const { rating, review } = req.body
// //     const course = await Course.findById(req.params.id)

// //     if (!course) {
// //       return next(createHttpError(404, "Course not found"))
// //     }

// //     // Check if user already rated
// //     const existingRating = course.ratings.find((r) => r.user.toString() === req.user.id)
// //     if (existingRating) {
// //       return next(createHttpError(400, "You have already rated this course"))
// //     }

// //     course.ratings.push({
// //       user: req.user.id,
// //       rating,
// //       review,
// //     })

// //     // Calculate average rating
// //     const totalRating = course.ratings.reduce((sum, r) => sum + r.rating, 0)
// //     course.averageRating = (totalRating / course.ratings.length).toFixed(1)
// //     course.totalRatings = course.ratings.length

// //     await course.save()
// //     await course.populate("ratings.user", "name")

// //     sendResponse(res, 201, "Rating added successfully", course)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const getAllCoursesAdmin = async (req, res, next) => {
// //   try {
// //     const courses = await Course.find().populate("createdBy", "name email")
// //     sendResponse(res, 200, "All courses fetched for admin", courses)
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // export const getAllCoursesPublic = async (req, res, next) => {
// //   try {
// //     const courses = await Course.find({ isPublished: true }).populate("createdBy", "name")
// //     sendResponse(res, 200, "Public courses fetched successfully", courses)
// //   } catch (error) {
// //     next(error)
// //   }
// // }













// import mongoose from 'mongoose'
// import Course from '../models/Course.js'
// import { createHttpError } from '../utils/errors.js'
// import { sendResponse } from '../utils/response.js'
// import { logger } from '../config/logger.js'

// // GET /courses/admin/all
// export const getAdminCourses = async (req, res, next) => {
//   try {
//     const courses = await Course.find().sort({ createdAt: -1 })
//     sendResponse(res, 200, 'Admin courses fetched successfully', { courses })
//   } catch (error) {
//     logger.error('[getAdminCourses] error:', error)
//     next(error)
//   }
// }

// // POST /courses
// export const createCourse = async (req, res, next) => {
//   try {
//     const safe = {
//       courseId: (req.body.courseId || '').trim(),
//       title: (req.body.title || '').trim(),
//       description: (req.body.description || '').trim(),
//       content: (req.body.content || '').toString(),
//       duration: Number.isFinite(Number(req.body.duration)) && Number(req.body.duration) >= 1 ? Number(req.body.duration) : 1,
//       difficulty: ['Beginner', 'Intermediate', 'Advanced'].includes(req.body.difficulty) ? req.body.difficulty : 'Beginner',
//       category: ['General', 'Cybersecurity', 'Programming', 'Data Science', 'Networking'].includes(req.body.category)
//         ? req.body.category
//         : 'General',
//       instructor: (req.body.instructor || '').trim()
//     }

//     if (!safe.courseId || !safe.title || !safe.description || !safe.instructor) {
//       return next(createHttpError(400, 'Course ID, title, description, and instructor are required'))
//     }

//     const exists = await Course.findOne({ courseId: safe.courseId })
//     if (exists) {
//       return next(createHttpError(409, 'Course ID already exists'))
//     }

//     const course = await Course.create({
//       ...safe,
//       createdBy: req.user?.id || undefined // optional if auth middleware sets req.user
//     })

//     logger.info(`[createCourse] created ${course.title} (${course.courseId})`)
//     sendResponse(res, 201, 'Course created successfully', course)
//   } catch (error) {
//     logger.error('[createCourse] error:', error)
//     next(error)
//   }
// }

// // PUT /courses/:id
// export const updateCourse = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(createHttpError(400, 'Invalid course id'))
//     }

//     const payload = {
//       title: (req.body.title || '').trim(),
//       description: (req.body.description || '').trim(),
//       content: (req.body.content || '').toString(),
//       instructor: (req.body.instructor || '').trim(),
//       category: req.body.category,
//       difficulty: req.body.difficulty,
//       duration: Number.isFinite(Number(req.body.duration)) ? Number(req.body.duration) : undefined,
//       updatedBy: req.user?.id || undefined
//     }

//     // remove undefineds
//     Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

//     const course = await Course.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
//     if (!course) {
//       return next(createHttpError(404, 'Course not found'))
//     }

//     logger.info(`[updateCourse] updated ${course.title} (${course.courseId})`)
//     sendResponse(res, 200, 'Course updated successfully', course)
//   } catch (error) {
//     logger.error('[updateCourse] error:', error)
//     next(error)
//   }
// }

// // DELETE /courses/:id
// export const deleteCourse = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(createHttpError(400, 'Invalid course id'))
//     }

//     const course = await Course.findById(id)
//     if (!course) {
//       return next(createHttpError(404, 'Course not found'))
//     }

//     await Course.findByIdAndDelete(id)

//     logger.info(`[deleteCourse] deleted ${course.title} (${course.courseId})`)
//     sendResponse(res, 200, 'Course deleted successfully', { id })
//   } catch (error) {
//     logger.error('[deleteCourse] error:', error)
//     next(error)
//   }
// }


// // GET /api/courses
// export const getPublicCourses = async (req, res, next) => {
//   try {
//     const courses = await Course.find({ isActive: true }).sort({ createdAt: -1 })
//     sendResponse(res, 200, "Courses fetched", courses)
//   } catch (err) {
//     next(err)
//   }
// }










import Course from "../models/Course.js"
import Enrollment from "../models/Enrollment.js"
import { createHttpError } from "../utils/errors.js"
import { sendResponse } from "../utils/response.js"
import { logger } from "../config/logger.js"

// GET /api/courses (public list)
export const getPublicCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ isActive: { $ne: false } }).sort({ createdAt: -1 }).lean()

    // If user is authenticated, check enrollments
    if (req.user) {
      try {
        const enrollments = await Enrollment.find({ userId: req.user._id, status: "active" }).select("courseId").lean()
        const enrolledCourseIds = new Set(enrollments.map(e => e.courseId.toString()))

        courses.forEach(course => {
          course.isEnrolled = enrolledCourseIds.has(course._id.toString())
        })
      } catch (enrollErr) {
        logger.error("[getPublicCourses] Enrollment check failed:", enrollErr)
      }
    }

    sendResponse(res, 200, "Courses fetched successfully", { courses })
  } catch (err) {
    next(err)
  }
}

// POST /api/courses (admin only)
export const createCourse = async (req, res, next) => {
  try {
    logger.info("[createCourse] Request received", {
      bodyKeys: Object.keys(req.body),
      user: req.user?._id
    });

    const safe = {
      courseId: (req.body.courseId || "").trim(),
      title: (req.body.title || "").trim(),
      description: (req.body.description || "").trim(),
      content: (req.body.content || "").toString(),
      duration: Number.isFinite(Number(req.body.duration)) && Number(req.body.duration) >= 1 ? Number(req.body.duration) : 1,
      difficulty: ["Beginner", "Intermediate", "Advanced"].includes(req.body.difficulty) ? req.body.difficulty : "Beginner",
      category: req.body.category || "General",
      instructor: (req.body.instructor || "").trim(),
      isActive: true   // ✅ ensure course is visible
    }

    logger.info("[createCourse] Safe payload prepared", { safe });

    if (!safe.courseId || !safe.title || !safe.description || !safe.instructor) {
      logger.warn("[createCourse] Validation failed", { safe });
      return next(createHttpError(400, "Course ID, title, description, and instructor are required"))
    }

    const exists = await Course.findOne({ courseId: safe.courseId })
    if (exists) {
      logger.warn("[createCourse] Course ID exists", { courseId: safe.courseId });
      return next(createHttpError(409, "Course ID already exists"))
    }

    logger.info("[createCourse] Creating course document...");
    const course = await Course.create({
      ...safe,
      createdBy: req.user._id
    })

    logger.info(`[createCourse] created ${course.title} (${course.courseId})`)
    sendResponse(res, 201, "Course created successfully", course)
  } catch (err) {
    logger.error('[createCourse] Unexpected error:', err)
    next(err)
  }
}

// PUT /api/courses/:id
export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!course) return next(createHttpError(404, "Course not found"))

    sendResponse(res, 200, "Course updated successfully", course)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/courses/:id
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return next(createHttpError(404, "Course not found"))

    await Course.findByIdAndDelete(req.params.id)
    sendResponse(res, 200, "Course deleted successfully")
  } catch (err) {
    next(err)
  }
}

export const getAdminCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "Admin courses fetched successfully",
      data: { courses }   // ✅ matches frontend expectation
    })
  } catch (error) {
    next(error)
  }
}
