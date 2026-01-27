// // // // server/src/controllers/materialController.js

// // // import Material from "../models/Material.js"
// // // import CourseMaterial from "../models/CourseMaterial.js"
// // // import Enrollment from "../models/Enrollment.js"
// // // import { createHttpError } from "../utils/errors.js"

// // // // Admin: Upload material
// // // export const uploadMaterial = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params
// // //     const { title, description, type, fileUrl, duration } = req.body

// // //     if (!title || !type) {
// // //       return next(createHttpError(400, "Title and type are required"))
// // //     }

// // //     const material = new Material({
// // //       course: courseId,
// // //       title,
// // //       description,
// // //       type,
// // //       fileUrl,
// // //       duration,
// // //       uploadedBy: req.user._id,
// // //     })

// // //     await material.save()

// // //     // Notify all enrolled users
// // //     const enrollments = await Enrollment.find({ course: courseId })
// // //     const notificationController = require("./notificationController")
// // //     for (const enrollment of enrollments) {
// // //       await notificationController.createNotification({
// // //         userId: enrollment.user,
// // //         type: "material",
// // //         title: `New Material: ${title}`,
// // //         message: `A new ${type} has been added to your course`,
// // //         courseId,
// // //       })
// // //     }

// // //     res.status(201).json({
// // //       success: true,
// // //       message: "Material uploaded successfully",
// // //       data: material,
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Get course materials
// // // export const getCourseMaterials = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params
// // //     const materials = await Material.find({ course: courseId, isPublished: true })
// // //       .sort({ order: 1 })
// // //       .populate("uploadedBy", "name email")

// // //     res.json({
// // //       success: true,
// // //       data: materials,
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // User: Get materials with progress
// // // export const getUserCourseMaterials = async (req, res, next) => {
// // //   try {
// // //     const { courseId } = req.params
// // //     const userId = req.user._id

// // //     const enrollment = await Enrollment.findOne({
// // //       user: userId,
// // //       course: courseId,
// // //     })

// // //     if (!enrollment) {
// // //       return next(createHttpError(404, "Enrollment not found"))
// // //     }

// // //     const materials = await Material.find({ course: courseId, isPublished: true }).sort({ order: 1 })

// // //     const materialProgress = await CourseMaterial.find({
// // //       enrollment: enrollment._id,
// // //     })

// // //     const materialsWithProgress = materials.map((material) => {
// // //       const progress = materialProgress.find((p) => p.material.toString() === material._id.toString())
// // //       return {
// // //         ...material.toObject(),
// // //         viewed: progress?.viewed || false,
// // //         timeSpent: progress?.timeSpent || 0,
// // //       }
// // //     })

// // //     res.json({
// // //       success: true,
// // //       data: materialsWithProgress,
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Mark material as viewed
// // // export const markMaterialViewed = async (req, res, next) => {
// // //   try {
// // //     const { courseId, materialId } = req.params
// // //     const { timeSpent } = req.body
// // //     const userId = req.user._id

// // //     const enrollment = await Enrollment.findOne({
// // //       user: userId,
// // //       course: courseId,
// // //     })

// // //     if (!enrollment) {
// // //       return next(createHttpError(404, "Enrollment not found"))
// // //     }

// // //     let courseMaterial = await CourseMaterial.findOne({
// // //       enrollment: enrollment._id,
// // //       material: materialId,
// // //     })

// // //     if (!courseMaterial) {
// // //       courseMaterial = new CourseMaterial({
// // //         enrollment: enrollment._id,
// // //         material: materialId,
// // //         viewed: true,
// // //         viewedAt: new Date(),
// // //         timeSpent: timeSpent || 0,
// // //       })
// // //     } else {
// // //       courseMaterial.viewed = true
// // //       courseMaterial.viewedAt = new Date()
// // //       courseMaterial.timeSpent = (courseMaterial.timeSpent || 0) + (timeSpent || 0)
// // //     }

// // //     await courseMaterial.save()

// // //     // Update progress
// // //     const progressController = require("./progressController")
// // //     await progressController.updateCourseProgress(enrollment._id)

// // //     res.json({
// // //       success: true,
// // //       message: "Material marked as viewed",
// // //       data: courseMaterial,
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }

// // // // Admin: Delete material
// // // export const deleteMaterial = async (req, res, next) => {
// // //   try {
// // //     const { materialId } = req.params
// // //     await Material.findByIdAndDelete(materialId)

// // //     res.json({
// // //       success: true,
// // //       message: "Material deleted successfully",
// // //     })
// // //   } catch (error) {
// // //     next(error)
// // //   }
// // // }












// // // server/src/controllers/materialController.js

// // import Material from "../models/Material.js"
// // import CourseMaterial from "../models/CourseMaterial.js"
// // import Enrollment from "../models/Enrollment.js"
// // import { createHttpError } from "../utils/errors.js"

// // // Admin: Create/Upload material
// // export const createMaterial = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.body
// //     const { title, description, type, fileUrl, duration } = req.body

// //     if (!courseId || !title || !type) {
// //       return next(createHttpError(400, "Course, title and type are required"))
// //     }

// //     const material = new Material({
// //       course: courseId,
// //       title,
// //       description,
// //       type,
// //       fileUrl,
// //       duration,
// //       uploadedBy: req.user._id,
// //     })

// //     await material.save()

// //     // Notify enrolled users
// //     const enrollments = await Enrollment.find({ course: courseId })
// //     const notificationController = await import("./notificationController.js")
// //     for (const enrollment of enrollments) {
// //       await notificationController.createNotification({
// //         userId: enrollment.user,
// //         type: "material",
// //         title: `New Material: ${title}`,
// //         message: `A new ${type} has been added to your course`,
// //         courseId,
// //       })
// //     }

// //     res.status(201).json({
// //       success: true,
// //       message: "Material created successfully",
// //       data: material,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Admin: Update material
// // export const updateMaterial = async (req, res, next) => {
// //   try {
// //     const { id } = req.params
// //     const { title, description, type, fileUrl, duration, isPublished } = req.body

// //     const material = await Material.findById(id)
// //     if (!material) {
// //       return next(createHttpError(404, "Material not found"))
// //     }

// //     material.title = title ?? material.title
// //     material.description = description ?? material.description
// //     material.type = type ?? material.type
// //     material.fileUrl = fileUrl ?? material.fileUrl
// //     material.duration = duration ?? material.duration
// //     if (typeof isPublished === "boolean") {
// //       material.isPublished = isPublished
// //     }

// //     await material.save()

// //     res.json({
// //       success: true,
// //       message: "Material updated successfully",
// //       data: material,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Admin: Delete material
// // export const deleteMaterial = async (req, res, next) => {
// //   try {
// //     const { id } = req.params
// //     await Material.findByIdAndDelete(id)

// //     res.json({
// //       success: true,
// //       message: "Material deleted successfully",
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Admin: Get all materials
// // export const getAllMaterials = async (_req, res, next) => {
// //   try {
// //     const materials = await Material.find()
// //       .populate("uploadedBy", "name email")
// //       .sort({ createdAt: -1 })

// //     res.json({
// //       success: true,
// //       data: materials,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Public: Get course materials
// // export const getCourseMaterials = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.params
// //     const materials = await Material.find({ course: courseId, isPublished: true })
// //       .sort({ order: 1 })
// //       .populate("uploadedBy", "name email")

// //     res.json({
// //       success: true,
// //       data: materials,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // Public: Get single material
// // export const getMaterial = async (req, res, next) => {
// //   try {
// //     const { id } = req.params
// //     const material = await Material.findById(id).populate("uploadedBy", "name email")

// //     if (!material) {
// //       return next(createHttpError(404, "Material not found"))
// //     }

// //     res.json({
// //       success: true,
// //       data: material,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // User: Get materials with progress
// // export const getUserCourseMaterials = async (req, res, next) => {
// //   try {
// //     const { courseId } = req.params
// //     const userId = req.user._id

// //     const enrollment = await Enrollment.findOne({ user: userId, course: courseId })
// //     if (!enrollment) {
// //       return next(createHttpError(404, "Enrollment not found"))
// //     }

// //     const materials = await Material.find({ course: courseId, isPublished: true }).sort({ order: 1 })
// //     const materialProgress = await CourseMaterial.find({ enrollment: enrollment._id })

// //     const materialsWithProgress = materials.map((material) => {
// //       const progress = materialProgress.find((p) => p.material.toString() === material._id.toString())
// //       return {
// //         ...material.toObject(),
// //         viewed: progress?.viewed || false,
// //         timeSpent: progress?.timeSpent || 0,
// //       }
// //     })

// //     res.json({
// //       success: true,
// //       data: materialsWithProgress,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }

// // // User: Mark material as viewed
// // export const markMaterialViewed = async (req, res, next) => {
// //   try {
// //     const { courseId, materialId } = req.params
// //     const { timeSpent } = req.body
// //     const userId = req.user._id

// //     const enrollment = await Enrollment.findOne({ user: userId, course: courseId })
// //     if (!enrollment) {
// //       return next(createHttpError(404, "Enrollment not found"))
// //     }

// //     let courseMaterial = await CourseMaterial.findOne({
// //       enrollment: enrollment._id,
// //       material: materialId,
// //     })

// //     if (!courseMaterial) {
// //       courseMaterial = new CourseMaterial({
// //         enrollment: enrollment._id,
// //         material: materialId,
// //         viewed: true,
// //         viewedAt: new Date(),
// //         timeSpent: timeSpent || 0,
// //       })
// //     } else {
// //       courseMaterial.viewed = true
// //       courseMaterial.viewedAt = new Date()
// //       courseMaterial.timeSpent = (courseMaterial.timeSpent || 0) + (timeSpent || 0)
// //     }

// //     await courseMaterial.save()

// //     // Update progress
// //     const progressController = await import("./progressController.js")
// //     await progressController.updateCourseProgress(enrollment._id)

// //     res.json({
// //       success: true,
// //       message: "Material marked as viewed",
// //       data: courseMaterial,
// //     })
// //   } catch (error) {
// //     next(error)
// //   }
// // }









// import Material from "../models/Material.js"
// import { createHttpError } from "../utils/errors.js"

// // Get materials for a course
// export const getCourseMaterials = async (req, res, next) => {
//   try {
//     const { courseId } = req.params
//     const materials = await Material.find({ course: courseId }).sort({ createdAt: -1 })
//     res.json({ success: true, data: materials })
//   } catch (err) {
//     next(err)
//   }
// }

// // Create material (file or URL)
// export const createMaterial = async (req, res, next) => {
//   try {
//     const { courseId, title, description, type, url, duration } = req.body

//     if (!courseId || !title || !type) {
//       return next(createHttpError(400, "Course, title, and type are required"))
//     }

//     const material = new Material({
//       course: courseId,
//       title,
//       description,
//       type,
//       url,
//       duration,
//       uploadedBy: req.user._id,
//     })

//     if (req.file) {
//       material.fileUrl = `/uploads/${req.file.filename}`
//     }

//     await material.save()
//     res.status(201).json({ success: true, data: material })
//   } catch (err) {
//     next(err)
//   }
// }

// // Delete material
// export const deleteMaterial = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     await Material.findByIdAndDelete(id)
//     res.json({ success: true, message: "Material deleted" })
//   } catch (err) {
//     next(err)
//   }
// }









import Material from "../models/Material.js"
import { createHttpError } from "../utils/errors.js"

// Get materials for a course (user-facing)
export const getCourseMaterials = async (req, res, next) => {
  try {
    const { courseId } = req.params
    const materials = await Material.find({ course: courseId, isPublished: true })
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name email")

    res.json({ success: true, data: materials })
  } catch (err) {
    next(err)
  }
}

// Admin: Create material (file or URL)
export const createMaterial = async (req, res, next) => {
  try {
    const { courseId, title, description, type, url, duration } = req.body

    if (!courseId || !title || !type) {
      return next(createHttpError(400, "Course, title, and type are required"))
    }

    const material = new Material({
      course: courseId,
      title,
      description,
      type,
      url,
      duration,
      uploadedBy: req.user._id,
      isPublished: true, // ✅ ensure visible
    })

    if (req.file) {
      material.fileUrl = `/uploads/${req.file.filename}`
    }

    await material.save()
    res.status(201).json({ success: true, data: material })
  } catch (err) {
    next(err)
  }
}

// Admin: Delete material
export const deleteMaterial = async (req, res, next) => {
  try {
    const { id } = req.params
    await Material.findByIdAndDelete(id)
    res.json({ success: true, message: "Material deleted" })
  } catch (err) {
    next(err)
  }
}

// Admin: Get all materials
export const getAllMaterials = async (_req, res, next) => {
  try {
    const materials = await Material.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 })

    res.json({ success: true, data: materials })
  } catch (err) {
    next(err)
  }
}

// Admin: Update material (publish/unpublish, edit fields)
export const updateMaterial = async (req, res, next) => {
  try {
    const { id } = req.params
    const { title, description, type, url, duration, isPublished } = req.body

    const material = await Material.findById(id)
    if (!material) return next(createHttpError(404, "Material not found"))

    material.title = title ?? material.title
    material.description = description ?? material.description
    material.type = type ?? material.type
    material.url = url ?? material.url
    material.duration = duration ?? material.duration
    if (typeof isPublished === "boolean") material.isPublished = isPublished

    if (req.file) {
      material.fileUrl = `/uploads/${req.file.filename}`
    }

    await material.save()
    res.json({ success: true, data: material })
  } catch (err) {
    next(err)
  }
}
