// // // // // import express from "express"
// // // // // import { celebrate, Joi } from "celebrate"
// // // // // import auth  from "../middleware/auth.js"
// // // // // import {
// // // // //   updateProgress,
// // // // //   getProgress,
// // // // //   getUserProgress,
// // // // //   getProgressAnalytics,
// // // // //   getLearningStreak,
// // // // // } from "../controllers/progressController.js"

// // // // // const router = express.Router()

// // // // // // All routes require authentication
// // // // // router.use(auth)

// // // // // router.post(
// // // // //   "/update",
// // // // //   celebrate({
// // // // //     body: Joi.object({
// // // // //       enrollmentId: Joi.string().required(),
// // // // //       sectionId: Joi.string().required(),
// // // // //       timeSpent: Joi.number().min(0),
// // // // //     }),
// // // // //   }),
// // // // //   updateProgress,
// // // // // )

// // // // // router.get("/enrollment/:enrollmentId", getProgress)
// // // // // router.get("/user", getUserProgress)

// // // // // router.get("/analytics", getProgressAnalytics)
// // // // // router.get("/streak", getLearningStreak)

// // // // // export default router












// // // // import express from "express";
// // // // import { celebrate, Joi } from "celebrate";
// // // // import { requireAuth } from "../middleware/auth.js"; // Use named import for requireAuth
// // // // import {
// // // //   updateProgress,
// // // //   getProgress,
// // // //   getUserProgress,
// // // //   getProgressAnalytics,
// // // //   getLearningStreak,
// // // // } from "../controllers/progressController.js";

// // // // const router = express.Router();

// // // // // All routes require authentication
// // // // router.use(requireAuth); // Protect all routes below with authentication

// // // // router.post(
// // // //   "/update",
// // // //   celebrate({
// // // //     body: Joi.object({
// // // //       enrollmentId: Joi.string().required(),
// // // //       sectionId: Joi.string().required(),
// // // //       timeSpent: Joi.number().min(0),
// // // //     }),
// // // //   }),
// // // //   updateProgress
// // // // );

// // // // router.get("/enrollment/:enrollmentId", getProgress);
// // // // router.get("/user", getUserProgress);

// // // // router.get("/analytics", getProgressAnalytics);
// // // // router.get("/streak", getLearningStreak);

// // // // export default router;





// // // ///above is working code 16/10/25 Below is new claude code




// // // // server/src/routes/progressRoutes.js
// // // import express from "express";
// // // import { getMyProgress, getCourseProgress, getCourseProgressAdmin } from "../controllers/progressController.js";
// // // import { requireAuth } from "../middleware/auth.js";
// // // import { rbac } from "../middleware/rbac.js";

// // // const router = express.Router();

// // // router.get("/my-progress", requireAuth, getMyProgress);
// // // router.get("/course/:courseId", requireAuth, getCourseProgress);
// // // router.get("/admin/course/:courseId", requireAuth, rbac(["admin"]), getCourseProgressAdmin);

// // // export default router;



















// // import express from "express"
// // import { requireAuth } from "../middleware/auth.js"
// // import { rbac } from "../middleware/rbac.js"
// // import * as progressController from "../controllers/progressController.js"

// // const router = express.Router()

// // // User routes
// // router.get("/course/:courseId", requireAuth, progressController.getCourseProgress)

// // router.get("/:enrollmentId", requireAuth, progressController.getUserProgress)

// // // Admin routes
// // router.get("/admin/course/:courseId", requireAuth, rbac(["admin"]), progressController.getAdminCourseProgress)

// // export default router








// import express from "express"
// import { requireAuth } from "../middleware/auth.js"
// import { rbac } from "../middleware/rbac.js"
// import * as progressController from "../controllers/progressController.js"

// const router = express.Router()

// // User routes
// router.get("/course/:courseId", requireAuth, progressController.getCourseProgress)
// router.get("/my-progress", requireAuth, progressController.getMyProgress)
// router.get("/:enrollmentId", requireAuth, progressController.getUserProgress)

// // Admin routes
// router.get("/admin/course/:courseId", requireAuth, rbac(["admin"]), progressController.getCourseProgressAdmin)

// export default router









import { Router } from "express"
import { getCourseProgress } from "../controllers/progressController.js"
// import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/:courseId", /* requireAuth, */ getCourseProgress)

export default router
