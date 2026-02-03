
// // // server/src/routes/submissionRoute.js
// // import express from "express";
// // import { createSubmission, getAllSubmissionsForAdmin } from "../controllers/submissionController.js";
// // import { upload } from "../middleware/upload.js";

// // const router = express.Router();

// // router.post("/", upload.single("file"), createSubmission);
// // router.get("/admin/all", getAllSubmissionsForAdmin); // ✅ new route

// // export default router;






// //server/src/routes/submissionRoutes.js

// import { Router } from "express"
// import { requireAuth } from "../middleware/auth.js"
// import { rbac } from "../middleware/rbac.js"
// import {
//   createSubmission,
//   listMySubmissions,
//   listSubmissionsByAssignment,
//   gradeSubmission,
// } from "../controllers/submissionController.js"

// const router = Router()

// // User
// router.post("/", requireAuth, rbac(["user", "admin"]), createSubmission)
// router.get("/my", requireAuth, rbac(["user", "admin"]), listMySubmissions)

// // Admin
// router.get("/assignment/:assignmentId", requireAuth, rbac(["admin"]), listSubmissionsByAssignment)
// router.patch("/:id/grade", requireAuth, rbac(["admin"]), gradeSubmission)

// export default router











import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { rbac } from "../middleware/rbac.js"
import {
  createSubmission,
  listMySubmissions,
  listSubmissionsByAssignment,
  gradeSubmission,
} from "../controllers/submissionController.js"

const router = Router()

// User
router.post("/", requireAuth, rbac(["user", "admin"]), createSubmission)
router.get("/my", requireAuth, rbac(["user", "admin"]), listMySubmissions)

// Admin
router.get("/assignment/:assignmentId", requireAuth, rbac(["admin"]), listSubmissionsByAssignment)
router.patch("/:id/grade", requireAuth, rbac(["admin"]), gradeSubmission)

export default router
