// // // // // // // // // // // // // // server/src/routes/quizRoutes.js


// // // // // // // // // // // // // import { Router } from "express";
// // // // // // // // // // // // // import { requireAuth, requireRole } from "../middleware/auth.js";
// // // // // // // // // // // // // import {
// // // // // // // // // // // // //   createQuiz,
// // // // // // // // // // // // //   updateQuiz,
// // // // // // // // // // // // //   listQuizzesVisible,
// // // // // // // // // // // // //   submitQuiz,
// // // // // // // // // // // // //   getQuizSubmissions,
// // // // // // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // // // // // const router = Router();

// // // // // // // // // // // // // // ✅ Admin routes
// // // // // // // // // // // // // router.post("/create", requireAuth, requireRole("admin"), createQuiz);
// // // // // // // // // // // // // router.put("/:quizId", requireAuth, requireRole("admin"), updateQuiz);
// // // // // // // // // // // // // router.get("/:quizId/submissions", requireAuth, requireRole("admin"), getQuizSubmissions);

// // // // // // // // // // // // // // ✅ User/Admin routes
// // // // // // // // // // // // // router.get("/visible", requireAuth, listQuizzesVisible); // both roles can view published quizzes
// // // // // // // // // // // // // router.post("/:quizId/submit", requireAuth, requireRole("user"), submitQuiz); // only 'user' role can submit

// // // // // // // // // // // // // export default router;










// // // // // // // // // // // // import express from "express";
// // // // // // // // // // // // import {
// // // // // // // // // // // //   createQuiz,
// // // // // // // // // // // //   getVisibleQuizzes,
// // // // // // // // // // // //   submitQuiz,
// // // // // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // router.post("/", createQuiz); // Admin creates quiz
// // // // // // // // // // // // router.get("/visible", getVisibleQuizzes); // User fetches active quizzes
// // // // // // // // // // // // router.post("/submit", submitQuiz); // User submits quiz

// // // // // // // // // // // // export default router;





// // // // // // // // // // // // // // server/src/routes/quizRoutes.js


// // // // // // // // // // // import express from "express";
// // // // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // // // // import {
// // // // // // // // // // //   createQuiz,
// // // // // // // // // // //   getVisibleQuizzes,
// // // // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz); // ✅ Admin only
// // // // // // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes); // ✅ Enrolled users only

// // // // // // // // // // // export default router;







// // // // // // // // // // // server/src/routes/quizRoutes.js

// // // // // // // // // // import express from "express";
// // // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // // // import {
// // // // // // // // // //   createQuiz,
// // // // // // // // // //   updateQuiz,
// // // // // // // // // //   deleteQuiz,
// // // // // // // // // //   getQuizzesByCourseAdmin,
// // // // // // // // // //   getVisibleQuizzes,
// // // // // // // // // //   getQuizSubmissionStatus, // 🆕 NEW
// // // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // // const router = express.Router();

// // // // // // // // // // // ADMIN ROUTES (CRUD operations)
// // // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // // // // // // router.get("/", requireAuth, rbac(["admin"]), getQuizzesByCourseAdmin);
// // // // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);

// // // // // // // // // // // 🆕 NEW: Admin route to view submission status for a specific quiz
// // // // // // // // // // router.get("/status", requireAuth, rbac(["admin"]), getQuizSubmissionStatus);

// // // // // // // // // // // USER ROUTES (Read/Submit)
// // // // // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes); 

// // // // // // // // // // export default router;






// // // // // // // // // // server/src/routes/quizRoutes.js

// // // // // // // // // import express from "express";
// // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // // import {
// // // // // // // // //   createQuiz,
// // // // // // // // //   updateQuiz,
// // // // // // // // //   deleteQuiz,
// // // // // // // // //   getQuizzesByCourseAdmin,
// // // // // // // // //   getVisibleQuizzes,
// // // // // // // // //   getQuizSubmissionStatus, 
// // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // const router = express.Router();

// // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // // // // // router.get("/", requireAuth, rbac(["admin"]), getQuizzesByCourseAdmin); 
// // // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);

// // // // // // // // // // Admin route to view submission status for a specific quiz
// // // // // // // // // router.get("/status", requireAuth, rbac(["admin"]), getQuizSubmissionStatus);

// // // // // // // // // // USER ROUTES (Read/Submit)
// // // // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes); 

// // // // // // // // // export default router;












// // // // // // // // // // server/src/routes/quizRoutes.js

// // // // // // // // // import express from "express";
// // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // // import {
// // // // // // // // //   createQuiz,
// // // // // // // // //   updateQuiz,
// // // // // // // // //   deleteQuiz,
// // // // // // // // //   getQuizzesByCourseAdmin,
// // // // // // // // //   getVisibleQuizzes,
// // // // // // // // //   getQuizSubmissionStatus,
// // // // // // // // //   submitQuiz, // 🆕 ADDED: Import the new controller function
// // // // // // // // // } from "../controllers/quizController.js";

// // // // // // // // // const router = express.Router();

// // // // // // // // // // ADMIN ROUTES (CRUD operations)
// // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // // // // // router.get("/", requireAuth, rbac(["admin"]), getQuizzesByCourseAdmin);
// // // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);

// // // // // // // // // // Admin route to view submission status for a specific quiz
// // // // // // // // // router.get("/status", requireAuth, rbac(["admin"]), getQuizSubmissionStatus);

// // // // // // // // // // USER ROUTES (Read/Submit)
// // // // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes);

// // // // // // // // // // 🆕 ADDED ROUTE: Handles the submission of a quiz
// // // // // // // // // router.post("/submit", requireAuth, submitQuiz); // Calls the submitQuiz controller

// // // // // // // // // export default router;








// // // // // // // // import express from "express";
// // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // import {
// // // // // // // //   createQuiz,
// // // // // // // //   updateQuiz,
// // // // // // // //   deleteQuiz,
// // // // // // // //   getQuizzesByCourseAdmin,
// // // // // // // //   getVisibleQuizzes,
// // // // // // // //   getQuizSubmissionStatus,
// // // // // // // //   submitQuiz
// // // // // // // // } from "../controllers/quizController.js"; // ✅ Named imports only

// // // // // // // // const router = express.Router();

// // // // // // // // // ==============================
// // // // // // // // // ADMIN ROUTES
// // // // // // // // // ==============================

// // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // // // // router.get("/", requireAuth, rbac(["admin"]), getQuizzesByCourseAdmin);
// // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);
// // // // // // // // router.get("/status", requireAuth, rbac(["admin"]), getQuizSubmissionStatus);

// // // // // // // // // ==============================
// // // // // // // // // USER ROUTES
// // // // // // // // // ==============================

// // // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes);
// // // // // // // // router.post("/submit", requireAuth, submitQuiz);

// // // // // // // // export default router;
















// // // // // // // // server/src/routes/quizRoutes.js
// // // // // // // import express from "express";
// // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // import {
// // // // // // //   createQuiz,
// // // // // // //   updateQuiz,
// // // // // // //   deleteQuiz,
// // // // // // //   getQuizzesByCourseAdmin,
// // // // // // //   getVisibleQuizzes,
// // // // // // //   getQuizSubmissionStatus,
// // // // // // //   submitQuiz,
// // // // // // //   getQuizAnalytics
// // // // // // // } from "../controllers/quizController.js";

// // // // // // // const router = express.Router();

// // // // // // // // Admin routes
// // // // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);
// // // // // // // router.get("/", requireAuth, rbac(["admin"]), getQuizzesByCourseAdmin);
// // // // // // // router.get("/status", requireAuth, rbac(["admin"]), getQuizSubmissionStatus);
// // // // // // // router.get("/analytics", requireAuth, rbac(["admin"]), getQuizAnalytics);

// // // // // // // // User routes
// // // // // // // router.get("/visible", requireAuth, getVisibleQuizzes);
// // // // // // // router.post("/submit", requireAuth, submitQuiz);

// // // // // // // export default router;













// // // // // // import express from 'express';
// // // // // // import { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } from '../controllers/quizController.js';
// // // // // // import { protect, adminOnly } from '../middleware/authMiddleware.js'; // Use your provided middleware names

// // // // // // const router = express.Router();

// // // // // // // Get all quizzes (e.g., for general viewing or a list) - Protected for simplicity
// // // // // // router.get('/', protect, getQuizzes);

// // // // // // // Protected routes (Admin only)
// // // // // // router.post('/', protect, adminOnly, createQuiz);
// // // // // // router.get('/:id', protect, getQuizById); // Can be viewed by any authenticated user
// // // // // // router.put('/:id', protect, adminOnly, updateQuiz);
// // // // // // router.delete('/:id', protect, adminOnly, deleteQuiz);

// // // // // // export default router;














// // // // // // server/src/routes/quizRoutes.js
// // // // // import express from "express";
// // // // // import {
// // // // //   getAdminQuizzes,
// // // // //   createQuiz,
// // // // //   updateQuiz,
// // // // //   deleteQuiz,
// // // // //   allowResubmit,
// // // // //   getAvailableQuizzes,
// // // // //   getQuizById,
// // // // // } from "../controllers/quizController.js";
// // // // // import { requireAuth } from "../middleware/auth.js";
// // // // // import { rbac } from "../middleware/rbac.js";

// // // // // const router = express.Router();

// // // // // router.get("/admin", requireAuth, rbac(["admin"]), getAdminQuizzes);
// // // // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);
// // // // // router.patch("/:quizId/submissions/:userId/allow-resubmit", requireAuth, rbac(["admin"]), allowResubmit);
// // // // // router.get("/available", requireAuth, getAvailableQuizzes)
// // // // // router.get("/:id", requireAuth, getQuizById)

// // // // // export default router;













// // // // import express from "express"
// // // // import {
// // // //   getAdminQuizzes,
// // // //   createQuiz,
// // // //   updateQuiz,
// // // //   deleteQuiz,
// // // //   allowResubmit,
// // // //   getAvailableQuizzes,
// // // //   getQuizById
// // // // } from "../controllers/quizController.js"
// // // // import { protect, adminOnly } from "../middleware/authMiddleware.js"


// // // // const router = express.Router()
// // // // router.get("/admin", protect, adminOnly, getAdminQuizzes)
// // // // router.post("/", protect, adminOnly, createQuiz)
// // // // router.put("/:id", protect, adminOnly, updateQuiz)
// // // // router.delete("/:id", protect, adminOnly, deleteQuiz)
// // // // router.patch("/:quizId/submissions/:userId/allow-resubmit", protect, adminOnly, allowResubmit)

// // // // router.get("/available", protect, getAvailableQuizzes)
// // // // router.get("/:id", protect, getQuizById)

// // // // export default router




// // // /////above is working code ///// 16/10/25 Below is new claude code





// // // // server/src/routes/quizRoutes.js
// // // import express from "express";
// // // import {
// // //   getAllQuizzesAdmin,
// // //   createQuiz,
// // //   updateQuiz,
// // //   deleteQuiz,
// // //   allowQuizResubmit,
// // //   getUserQuizzes,
// // //   submitQuiz,
// // // } from "../controllers/quizController.js";
// // // import { requireAuth } from "../middleware/auth.js";
// // // import { rbac } from "../middleware/rbac.js";

// // // const router = express.Router();

// // // // Admin routes
// // // router.get("/admin", requireAuth, rbac(["admin"]), getAllQuizzesAdmin);
// // // router.post("/", requireAuth, rbac(["admin"]), createQuiz);
// // // router.put("/:id", requireAuth, rbac(["admin"]), updateQuiz);
// // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteQuiz);
// // // router.patch("/:quizId/submissions/:studentId/allow-resubmit", requireAuth, rbac(["admin"]), allowQuizResubmit);

// // // // User routes
// // // router.get("/user", requireAuth, getUserQuizzes);
// // // router.post("/:id/submit", requireAuth, submitQuiz);

// // // export default router;









// // import express from "express"
// // import { requireAuth } from "../middleware/auth.js"
// // import { rbac } from "../middleware/rbac.js"
// // import {
// //   createQuiz,
// //   getAdminQuizzes,
// //   getUserQuizzes,
// //   getQuiz,
// //   updateQuiz,
// //   deleteQuiz,
// //   submitQuiz,
// //   allowResubmit,
// // } from "../controllers/quizController.js"

// // const router = express.Router()

// // // All routes require authentication
// // router.use(requireAuth)

// // // Admin routes
// // router.post("/", rbac(["admin"]), createQuiz)
// // router.get("/admin", rbac(["admin"]), getAdminQuizzes)
// // router.put("/:id", rbac(["admin"]), updateQuiz)
// // router.delete("/:id", rbac(["admin"]), deleteQuiz)
// // router.patch("/:quizId/submissions/:userId/allow-resubmit", rbac(["admin"]), allowResubmit)

// // // User routes
// // router.get("/user", getUserQuizzes)
// // router.get("/:id", getQuiz)
// // router.post("/:id/submit", submitQuiz)

// // export default router









// import express from "express"
// import { requireAuth } from "../middleware/auth.js"
// import { rbac } from "../middleware/rbac.js"
// import * as quizController from "../controllers/quizController.js"

// const router = express.Router()

// // Admin routes
// router.post("/", requireAuth, rbac(["admin"]), quizController.createQuiz)
// router.get("/:quizId/submissions", requireAuth, rbac(["admin"]), quizController.getQuizSubmissions)

// // User routes
// router.get("/course/:courseId", requireAuth, quizController.getUserQuizzes)
// router.get("/:quizId", requireAuth, quizController.getQuiz)
// router.post("/:submissionId/answer", requireAuth, quizController.saveQuizAnswer)
// router.post("/:submissionId/submit", requireAuth, quizController.submitQuiz)

// export default router








import express from "express"
import { requireAuth } from "../middleware/auth.js"
import { rbac } from "../middleware/rbac.js"
import * as quizController from "../controllers/quizController.js"

const router = express.Router()

// Admin routes
router.post("/", requireAuth, rbac(["admin"]), quizController.createQuiz)
router.get("/:quizId/submissions", requireAuth, rbac(["admin"]), quizController.getQuizSubmissions)
router.get("/admin/course/:courseId", requireAuth, rbac(["admin"]), quizController.getAdminQuizzes)
router.delete("/:quizId", requireAuth, rbac(["admin"]), quizController.deleteQuiz)
router.patch("/:quizId", requireAuth, rbac(["admin"]), quizController.updateQuiz)
router.patch("/:submissionId/allow-resubmit", requireAuth, rbac(["admin"]), quizController.allowResubmit)

// User routes
router.get("/course/:courseId", requireAuth, quizController.getUserQuizzes)
router.get("/:quizId", requireAuth, quizController.getQuiz)
router.post("/:submissionId/answer", requireAuth, quizController.saveQuizAnswer)
router.post("/:submissionId/submit", requireAuth, quizController.submitQuiz)

export default router
