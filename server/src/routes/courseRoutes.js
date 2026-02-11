// // // // // // import express from "express";
// // // // // // import { celebrate, Joi } from "celebrate";
// // // // // // import auth from "../middleware/auth.js";
// // // // // // import { rbac } from "../middleware/rbac.js";
// // // // // // import {
// // // // // //   getCourses,
// // // // // //   getCourse,
// // // // // //   createCourse,
// // // // // //   updateCourse,
// // // // // //   deleteCourse,
// // // // // //   getAdminCourses,
// // // // // //   getCoursesWithAssignments,
// // // // // // } from "../controllers/courseController.js";

// // // // // // const router = express.Router();

// // // // // // // 🟢 Public routes
// // // // // // router.get("/courses-with-assignments", getCoursesWithAssignments); // ✅ must come before /:id
// // // // // // router.get("/", getCourses);
// // // // // // router.get("/:id", getCourse); // ✅ keep this last among GETs

// // // // // // // 🔐 Protected routes (requires authentication)
// // // // // // router.use(auth);

// // // // // // // 🔒 Admin-only routes
// // // // // // router.get("/admin/all", rbac(["admin"]), getAdminCourses);

// // // // // // router.post(
// // // // // //   "/",
// // // // // //   rbac(["admin"]),
// // // // // //   celebrate({
// // // // // //     body: Joi.object({
// // // // // //       title: Joi.string().required().max(100),
// // // // // //       description: Joi.string().required().max(1000),
// // // // // //       content: Joi.string().optional(),
// // // // // //       duration: Joi.number().optional().min(1),
// // // // // //       difficulty: Joi.string().valid("Beginner", "Intermediate", "Advanced").optional(),
// // // // // //       category: Joi.string().optional(),
// // // // // //       isPublished: Joi.boolean().optional(),
// // // // // //       thumbnail: Joi.string().uri().optional(),
// // // // // //       tags: Joi.array().items(Joi.string()).optional(),
// // // // // //     }),
// // // // // //   }),
// // // // // //   createCourse
// // // // // // );

// // // // // // router.put(
// // // // // //   "/:id",
// // // // // //   rbac(["admin"]),
// // // // // //   celebrate({
// // // // // //     body: Joi.object({
// // // // // //       title: Joi.string().max(100),
// // // // // //       description: Joi.string().max(1000),
// // // // // //       content: Joi.string(),
// // // // // //       duration: Joi.number().min(1),
// // // // // //       difficulty: Joi.string().valid("Beginner", "Intermediate", "Advanced"),
// // // // // //       category: Joi.string(),
// // // // // //       isPublished: Joi.boolean(),
// // // // // //       thumbnail: Joi.string().uri(),
// // // // // //       tags: Joi.array().items(Joi.string()),
// // // // // //     }),
// // // // // //   }),
// // // // // //   updateCourse
// // // // // // );

// // // // // // router.delete("/:id", rbac(["admin"]), deleteCourse);

// // // // // // export default router;










// // // // // //server/src/routes/courseRoute.js


// // // // // import express from "express";
// // // // // import { celebrate, Joi } from "celebrate";
// // // // // import { requireAuth, requireRole } from "../middleware/auth.js";  // Named import for requireAuth and requireRole
// // // // // import { rbac } from "../middleware/rbac.js";
// // // // // import {
// // // // //   getCourses,
// // // // //   getCourse,
// // // // //   createCourse,
// // // // //   updateCourse,
// // // // //   deleteCourse,
// // // // //   getAdminCourses,
// // // // //   getCoursesWithAssignments,
// // // // // } from "../controllers/courseController.js";

// // // // // const router = express.Router();

// // // // // // 🟢 Public routes
// // // // // router.get("/courses-with-assignments", getCoursesWithAssignments); // ✅ must come before /:id
// // // // // router.get("/", getCourses);
// // // // // router.get("/:id", getCourse); // ✅ keep this last among GETs

// // // // // // 🔐 Protected routes (requires authentication)
// // // // // router.use(requireAuth);  // Protect all routes below with authentication

// // // // // // 🔒 Admin-only routes
// // // // // router.get("/admin/all", rbac(["admin"]), getAdminCourses);

// // // // // router.post(
// // // // //   "/",
// // // // //   rbac(["admin"]),
// // // // //   celebrate({
// // // // //     body: Joi.object({
// // // // //       title: Joi.string().required().max(100),
// // // // //       description: Joi.string().required().max(1000),
// // // // //       content: Joi.string().optional(),
// // // // //       duration: Joi.number().optional().min(1),
// // // // //       difficulty: Joi.string().valid("Beginner", "Intermediate", "Advanced").optional(),
// // // // //       category: Joi.string().optional(),
// // // // //       isPublished: Joi.boolean().optional(),
// // // // //       thumbnail: Joi.string().uri().optional(),
// // // // //       tags: Joi.array().items(Joi.string()).optional(),
// // // // //     }),
// // // // //   }),
// // // // //   createCourse
// // // // // );


// // // // // router.put(
// // // // //   "/:id",
// // // // //   rbac(["admin"]),
// // // // //   celebrate({
// // // // //     body: Joi.object({
// // // // //       title: Joi.string().max(100),
// // // // //       description: Joi.string().max(1000),
// // // // //       content: Joi.string(),
// // // // //       duration: Joi.number().min(1),
// // // // //       difficulty: Joi.string().valid("Beginner", "Intermediate", "Advanced"),
// // // // //       category: Joi.string(),
// // // // //       isPublished: Joi.boolean(),
// // // // //       thumbnail: Joi.string().uri(),
// // // // //       tags: Joi.array().items(Joi.string()),
// // // // //     }),
// // // // //   }),
// // // // //   updateCourse
// // // // // );

// // // // // router.delete("/:id", rbac(["admin"]), deleteCourse);

// // // // // export default router;















// // // // //server/src/routes/courseRoute.js
// // // // import express from 'express';
// // // // const router = express.Router();

// // // // import {
// // // //   getAllAdminCourses,
// // // //   createCourse,
// // // //   updateCourse,
// // // //   deleteCourse,
// // // // } from '../controllers/courseController.js';

// // // // import { requireAuth } from '../middleware/auth.js';
// // // // import { rbac } from '../middleware/rbac.js';

// // // // router.use(requireAuth);

// // // // router.get('/admin/all', rbac(['admin']), getAllAdminCourses);
// // // // router.post('/', rbac(['admin']), createCourse);
// // // // router.put('/:id', rbac(['admin']), updateCourse);
// // // // router.delete('/:id', rbac(['admin']), deleteCourse);

// // // // export default router;









// // // import express from 'express';
// // // const router = express.Router();

// // // import {
// // //   getPublicCourses,
// // //   getAllAdminCourses,
// // //   createCourse,
// // //   updateCourse,
// // //   deleteCourse,
// // // } from '../controllers/courseController.js';

// // // import { requireAuth } from '../middleware/auth.js';
// // // import { rbac } from '../middleware/rbac.js';

// // // // 🌐 Public route for users
// // // router.get("/", getPublicCourses);

// // // // 🔐 Protected admin routes
// // // router.use(requireAuth);

// // // router.get("/admin/all", rbac(["admin"]), getAllAdminCourses);
// // // router.post("/", rbac(["admin"]), createCourse);
// // // router.put("/:id", rbac(["admin"]), updateCourse);
// // // router.delete("/:id", rbac(["admin"]), deleteCourse);

// // // export default router;






// // // server/src/routes/courseRoutes.js
// // import Course from "../models/Course.js"

// // import express from "express";
// // import {
// //   createCourse,
// //   updateCourse,
// //   getAllCoursesAdmin,
// //   deleteCourse,
// //   getAllCoursesPublic, // ✅ Add this line
// // } from "../controllers/courseController.js";
// // import { requireAuth, rbac } from "../middleware/auth.js";

// // const router = express.Router();


// // router.get("/", getAllCoursesPublic); // ✅ Public route for users
// // router.get("/admin/all", requireAuth, rbac(["admin"]), getAllCoursesAdmin);
// // router.post("/", requireAuth, rbac(["admin"]), createCourse);
// // router.put("/:id", requireAuth, rbac(["admin"]), updateCourse);
// // router.delete("/:id", requireAuth, rbac(["admin"]), deleteCourse);

// // router.get("/admin/all", requireAuth, rbac(["admin"]), async (req, res, next) => {
// //   try {
// //     const courses = await Course.find().select("code title _id")
// //     res.json({ courses }) // ✅ must return { courses: [...] }
// //   } catch (err) {
// //     next(err)
// //   }
// // })

// // export default router;








// import { Router } from 'express'
// import {
//   getAdminCourses,
//   createCourse,
//   updateCourse,
//   deleteCourse,getPublicCourses
// } from '../controllers/courseController.js'

// // If you have auth middleware, uncomment and use it:
// // import { requireAuth } from '../middleware/authMiddleware.js'
// // import { requireRole } from '../middleware/rbac.js'

// const router = Router()

// // Admin list
// router.get('/admin/all',
//   // requireAuth, requireRole(['admin']),
//   getAdminCourses
// )

// // Create
// router.post('/',
//   // requireAuth, requireRole(['admin']),
//   createCourse
// )

// // Update
// router.put('/:id',
//   // requireAuth, requireRole(['admin']),
//   updateCourse
// )

// // Delete
// router.delete('/:id',
//   // requireAuth, requireRole(['admin']),
//   deleteCourse
// )


// router.get("/", getPublicCourses)
// export default router








import { Router } from "express"
import { protect, adminOnly, optionalProtect } from "../middleware/authMiddleware.js"
import {
  getPublicCourses, createCourse, updateCourse, deleteCourse,
  getAdminCourses,
} from "../controllers/courseController.js"

const router = Router()

// Public (with optional auth for enrollment status)
router.get("/", optionalProtect, getPublicCourses)

// Admin
router.post("/", protect, adminOnly, createCourse)
router.put("/:id", protect, adminOnly, updateCourse)
router.delete("/:id", protect, adminOnly, deleteCourse)
router.get("/admin/all", protect, adminOnly, getAdminCourses)



export default router
