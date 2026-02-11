// // // import express from "express"
// // // import { celebrate, Joi } from "celebrate"
// // // import auth  from "../middleware/auth.js"
// // // import { rbac } from "../middleware/rbac.js"
// // // import {
// // //   enrollInCourse,
// // //   getUserEnrollments,
// // //   getEnrollmentDetails,
// // //   dropCourse,
// // //   getAllEnrollments,
// // // } from "../controllers/enrollmentController.js"

// // // const router = express.Router()

// // // // All routes require authentication
// // // router.use(auth)

// // // // User routes
// // // router.post(
// // //   "/",
// // //   celebrate({
// // //     body: Joi.object({
// // //       courseId: Joi.string().required(),
// // //     }),
// // //   }),
// // //   enrollInCourse,
// // // )

// // // router.get("/", getUserEnrollments)
// // // router.get("/:id", getEnrollmentDetails)
// // // router.patch("/:id/drop", dropCourse)

// // // // Admin routes
// // // router.get("/admin/all", rbac(["admin"]), getAllEnrollments)

// // // export default router






// // //server/src/routes/enrollmentRoutess
// // import express from "express";
// // import { celebrate, Joi } from "celebrate";
// // import { requireAuth } from "../middleware/auth.js";
// // import { rbac } from "../middleware/rbac.js";
// // import {
// //   enrollInCourse,
// //   getUserEnrollments,
// //   getEnrollmentDetails,
// //   getAllEnrollments,
// // } from "../controllers/enrollmentController.js";

// // const router = express.Router();

// // // ✅ Protect all routes with authentication
// // router.use(requireAuth);

// // // ✅ Enroll in a course using custom courseId (e.g. "SOC1234")
// // router.post(
// //   "/",
// //   celebrate({
// //     body: Joi.object({
// //       courseId: Joi.string().required(), // Accepts string-based courseId
// //     }),
// //   }),
// //   enrollInCourse
// // );

// // // ✅ Get all enrollments for the logged-in user
// // router.get("/", getUserEnrollments);

// // // ✅ Get details of a specific enrollment
// // router.get("/:id", getEnrollmentDetails);

// // // ✅ Drop a course
// // // router.patch("/:id/drop", dropCourse);

// // // ✅ Admin: Get all enrollments
// // router.get("/admin/all", rbac(["admin"]), getAllEnrollments);

// // export default router;






// import { Router } from "express"
// import { protect } from "../middleware/authMiddleware.js"
// import { getOngoingEnrollments, 
//   enrollInCourse,
//   getCompletedEnrollments } from "../controllers/enrollmentController.js"
// // import { requireAuth } from "../middleware/authMiddleware.js"

// const router = Router()

// router.post("/:courseId", protect, enrollInCourse)
// router.get("/ongoing", protect, getOngoingEnrollments)
// router.get("/completed", protect, getCompletedEnrollments)
// export default router







import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { enrollInCourse, getOngoingEnrollments, getCompletedEnrollments } from "../controllers/enrollmentController.js"

const router = Router()

// Enroll using body payload (preferred)
router.post("/enroll", protect, enrollInCourse)

// Legacy support: enroll by courseId in URL
router.post("/:courseId", protect, enrollInCourse)

router.get("/ongoing", protect, getOngoingEnrollments)
router.get("/completed", protect, getCompletedEnrollments)

export default router
