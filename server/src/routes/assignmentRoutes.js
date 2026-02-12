// // // // // // // // // // // // server/src/routes/assignmentRoutes.js
// // // // // // // // // // // import { Router } from "express";
// // // // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";
// // // // // // // // // // // import {
// // // // // // // // // // //   createAssignment, updateAssignment, listAssignmentsAdmin, listAssignmentsVisible,
// // // // // // // // // // //   submitAssignment, getSubmissionReport, exportAssignmentReportCSV,
// // // // // // // // // // // } from "../controllers/assignmentController.js";
// // // // // // // // // // // import { questionUpload, submissionUpload } from "../config/upload.js";

// // // // // // // // // // // const router = Router();

// // // // // // // // // // // // Admin
// // // // // // // // // // // router.post("/", requireAuth, rbac("admin"),
// // // // // // // // // // //   questionUpload.array("questionFiles", 10), createAssignment);
// // // // // // // // // // // router.put("/:assignmentId", requireAuth, rbac("admin"), updateAssignment);
// // // // // // // // // // // router.get("/", requireAuth, rbac("admin"), listAssignmentsAdmin);
// // // // // // // // // // // router.get("/:assignmentId/report", requireAuth, rbac("admin"), getSubmissionReport);
// // // // // // // // // // // router.get("/:assignmentId/report.csv", requireAuth, rbac("admin"), exportAssignmentReportCSV);

// // // // // // // // // // // // Student + Admin view
// // // // // // // // // // // router.get("/visible", requireAuth, rbac("student", "admin"), listAssignmentsVisible);

// // // // // // // // // // // // Student
// // // // // // // // // // // router.post("/:assignmentId/submit", requireAuth, rbac("student"),
// // // // // // // // // // //   submissionUpload.array("files", 10), submitAssignment);

// // // // // // // // // // // export default router;









// // // // // // // // // // import express from "express"
// // // // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js"
// // // // // // // // // // import {
// // // // // // // // // //   createAssignment,
// // // // // // // // // //   updateAssignment,
// // // // // // // // // //   deleteAssignment,
// // // // // // // // // //   getAdminAssignments,
// // // // // // // // // //   getAvailableAssignments,
// // // // // // // // // //   submitAssignment,
// // // // // // // // // //   allowAssignmentResubmit,
// // // // // // // // // //   getAssignmentStats,
// // // // // // // // // // } from "../controllers/assignmentController.js"

// // // // // // // // // // const router = express.Router()

// // // // // // // // // // // Admin
// // // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // // // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // // // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)
// // // // // // // // // // router.get("/admin", requireAuth, rbac(["admin"]), getAdminAssignments)
// // // // // // // // // // router.get("/:id/stats", requireAuth, rbac(["admin"]), getAssignmentStats)
// // // // // // // // // // router.patch("/:assignmentId/submissions/:userId/allow-resubmit", requireAuth, rbac(["admin"]), allowAssignmentResubmit)

// // // // // // // // // // // User
// // // // // // // // // // router.get("/available", requireAuth, getAvailableAssignments)
// // // // // // // // // // router.post("/:id/submit", requireAuth, submitAssignment)

// // // // // // // // // // export default router






// // // // // // // // // //server/src/routes/assignmentRoutes.js

// // // // // // // // // import express from "express";
// // // // // // // // // import {
// // // // // // // // //   getAllAssignments,
// // // // // // // // //   createAssignment,
// // // // // // // // //   updateAssignment,
// // // // // // // // //   deleteAssignment,
// // // // // // // // //   getAssignmentSubmissions,
// // // // // // // // //   gradeSubmission,
// // // // // // // // //   allowResubmit,
// // // // // // // // //   getUserAssignments,
// // // // // // // // //   submitAssignment,
// // // // // // // // //   getAdminAssignments,
// // // // // // // // // } from "../controllers/assignmentController.js";
// // // // // // // // // import { requireAuth } from "../middleware/auth.js";
// // // // // // // // // import { rbac } from "../middleware/rbac.js";


// // // // // // // // // const router = express.Router();

// // // // // // // // // // ----------------------
// // // // // // // // // // 🔐 Admin Routes
// // // // // // // // // // ----------------------
// // // // // // // // // router.get("/", requireAuth, rbac(["admin"]), getAllAssignments);
// // // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment);
// // // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment);
// // // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment);
// // // // // // // // // router.get("/:id/submissions", requireAuth, rbac(["admin"]), getAssignmentSubmissions);
// // // // // // // // // router.post("/:assignmentId/submissions/:studentId/grade", requireAuth, rbac(["admin"]), gradeSubmission);
// // // // // // // // // router.patch("/:assignmentId/submissions/:studentId/allow-resubmit", requireAuth, rbac(["admin"]), allowResubmit);

// // // // // // // // // router.get("/admin", requireAuth, rbac(["admin"]), getAdminAssignments);

// // // // // // // // // // ----------------------
// // // // // // // // // // 👨‍🎓 Student Routes
// // // // // // // // // // ----------------------
// // // // // // // // // router.get("/user", requireAuth, getUserAssignments);
// // // // // // // // // router.post("/:id/submit", requireAuth, submitAssignment);

// // // // // // // // // export default router;





// // // // // // // // import express from "express";
// // // // // // // // import {
// // // // // // // //   getAdminAssignments,
// // // // // // // //   getUserAssignments,
// // // // // // // //   createAssignment,
// // // // // // // //   updateAssignment,
// // // // // // // //   deleteAssignment,
// // // // // // // //   submitAssignment,
// // // // // // // //   getSubmissions,
// // // // // // // //   gradeSubmission,
// // // // // // // //   allowResubmit,
// // // // // // // // } from "../controllers/assignmentController.js";
// // // // // // // // import { requireAuth, rbac } from "../middleware/auth.js";

// // // // // // // // const router = express.Router();

// // // // // // // // // Admin routes
// // // // // // // // router.get("/admin", requireAuth, rbac(["admin"]), getAdminAssignments);
// // // // // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment);
// // // // // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment);
// // // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment);
// // // // // // // // router.get("/:id/submissions", requireAuth, rbac(["admin"]), getSubmissions);
// // // // // // // // router.post("/:id/submissions/:studentId/grade", requireAuth, rbac(["admin"]), gradeSubmission);
// // // // // // // // router.patch("/:id/submissions/:studentId/allow-resubmit", requireAuth, rbac(["admin"]), allowResubmit);

// // // // // // // // // Student routes
// // // // // // // // router.get("/user", requireAuth, getUserAssignments);
// // // // // // // // router.post("/:id/submit", requireAuth, submitAssignment);

// // // // // // // // export default router;







// // // // // // // //server/src/routes/assignmentRoutes.js

// // // // // // // import { Router } from "express"
// // // // // // // import { requireAuth } from "../middleware/auth.js"
// // // // // // // import { rbac } from "../middleware/rbac.js"
// // // // // // // import {
// // // // // // //   createAssignment,
// // // // // // //   getAssignmentsByCourse,
// // // // // // //   listAssignments,
// // // // // // //   updateAssignment,
// // // // // // //   deleteAssignment,
// // // // // // //   getUserAssignments,
// // // // // // // } from "../controllers/assignmentController.js"
// // // // // // // import { createSubmissionByParam } from "../controllers/submissionController.js"

// // // // // // // const router = Router()

// // // // // // // // Admin-only
// // // // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // // // // // // router.get("/", requireAuth, rbac(["admin"]), listAssignments)
// // // // // // // router.patch("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)

// // // // // // // // Shared
// // // // // // // router.get("/course/:courseId", requireAuth, getAssignmentsByCourse)

// // // // // // // // User-visible assignments list to match frontend GET /api/assignments/user
// // // // // // // router.get("/user", requireAuth, getUserAssignments)

// // // // // // // // Allow submitting by assignment id to match frontend POST /api/assignments/:id/submit
// // // // // // // router.post("/:id/submit", requireAuth, rbac(["user", "admin"]), createSubmissionByParam)

// // // // // // // export default router















// // // // // // import { Router } from "express"
// // // // // // import { requireAuth } from "../middleware/auth.js"
// // // // // // import { rbac } from "../middleware/rbac.js"
// // // // // // import {
// // // // // //   createAssignment,
// // // // // //   getAssignmentsByCourse,
// // // // // //   listAssignments,
// // // // // //   updateAssignment,
// // // // // //   deleteAssignment,
// // // // // //   getUserAssignments,
// // // // // // } from "../controllers/assignmentController.js"
// // // // // // import { createSubmissionByParam } from "../controllers/submissionController.js"

// // // // // // const router = Router()

// // // // // // // Admin-only
// // // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // // // // // router.get("/", requireAuth, rbac(["admin"]), listAssignments)
// // // // // // router.patch("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)

// // // // // // // Shared
// // // // // // router.get("/course/:courseId", requireAuth, getAssignmentsByCourse)

// // // // // // // User-visible assignments list to match frontend GET /api/assignments/user
// // // // // // router.get("/user", requireAuth, getUserAssignments)

// // // // // // // Allow submitting by assignment id to match frontend POST /api/assignments/:id/submit
// // // // // // router.post("/:id/submit", requireAuth, rbac(["user", "admin"]), createSubmissionByParam)

// // // // // // export default router









// // // // // import { Router } from "express"
// // // // // import { requireAuth } from "../middleware/auth.js"
// // // // // import { rbac } from "../middleware/rbac.js"
// // // // // import {
// // // // //   createAssignment,
// // // // //   getAssignmentsByCourse,
// // // // //   listAssignments,
// // // // //   updateAssignment,
// // // // //   deleteAssignment,
// // // // //   getUserAssignments,
// // // // // } from "../controllers/assignmentController.js"
// // // // // import { createSubmissionByParam } from "../controllers/submissionController.js"

// // // // // const router = Router()

// // // // // // Admin-only
// // // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // // // // router.get("/", requireAuth, rbac(["admin"]), listAssignments)
// // // // // router.patch("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // // // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment) // add PUT to support clients using PUT for update
// // // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)

// // // // // // Shared
// // // // // router.get("/course/:courseId", requireAuth, getAssignmentsByCourse)

// // // // // // User-visible assignments list to match frontend GET /api/assignments/user
// // // // // router.get("/user", requireAuth, getUserAssignments)

// // // // // // Allow submitting by assignment id to match frontend POST /api/assignments/:id/submit
// // // // // router.post("/:id/submit", requireAuth, rbac(["user", "admin"]), createSubmissionByParam)

// // // // // export default router




// // // // ////above is working code ///// 16/10/25 Below is new claude code






// // // // // server/src/routes/assignmentRoutes.js
// // // // import express from "express";
// // // // import {
// // // //   getAllAssignmentsAdmin,
// // // //   createAssignment,
// // // //   updateAssignment,
// // // //   deleteAssignment,
// // // //   gradeSubmission,
// // // //   allowResubmit,
// // // //   getUserAssignments,
// // // //   submitAssignment,
// // // // } from "../controllers/assignmentController.js";
// // // // import { requireAuth } from "../middleware/auth.js";
// // // // import { rbac } from "../middleware/rbac.js";

// // // // const router = express.Router();

// // // // // Admin routes
// // // // router.get("/admin", requireAuth, rbac(["admin"]), getAllAssignmentsAdmin);
// // // // router.post("/", requireAuth, rbac(["admin"]), createAssignment);
// // // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment);
// // // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment);
// // // // router.post("/:assignmentId/submissions/:studentId/grade", requireAuth, rbac(["admin"]), gradeSubmission);
// // // // router.patch("/:assignmentId/submissions/:studentId/allow-resubmit", requireAuth, rbac(["admin"]), allowResubmit);

// // // // // User routes
// // // // router.get("/user", requireAuth, getUserAssignments);
// // // // router.post("/:id/submit", requireAuth, submitAssignment);

// // // // export default router;










// // // import { Router } from "express"
// // // import { requireAuth } from "../middleware/auth.js"
// // // import { rbac } from "../middleware/rbac.js"
// // // import {
// // //   createAssignment,
// // //   getAssignmentsByCourse,
// // //   listAssignments,
// // //   updateAssignment,
// // //   deleteAssignment,
// // //   getUserAssignments,
// // // } from "../controllers/assignmentController.js"
// // // import { createSubmissionByParam } from "../controllers/submissionController.js"

// // // const router = Router()

// // // // Admin-only
// // // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // // router.get("/", requireAuth, rbac(["admin"]), listAssignments)
// // // router.patch("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment) // add PUT to support clients using PUT for update
// // // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)

// // // // Shared
// // // router.get("/course/:courseId", requireAuth, getAssignmentsByCourse)

// // // // User-visible assignments list to match frontend GET /api/assignments/user
// // // router.get("/user", requireAuth, getUserAssignments)

// // // // Allow submitting by assignment id to match frontend POST /api/assignments/:id/submit
// // // router.post("/:id/submit", requireAuth, rbac(["user", "admin"]), createSubmissionByParam)

// // // export default router






// // import { Router } from "express"
// // import { requireAuth } from "../middleware/auth.js"
// // import { rbac } from "../middleware/rbac.js"
// // import {
// //   createAssignment,
// //   getAssignmentsByCourse,
// //   listAssignments,
// //   updateAssignment,
// //   deleteAssignment,
// //   getUserAssignments,
// // } from "../controllers/assignmentController.js"
// // import { createSubmissionByParam } from "../controllers/submissionController.js"

// // const router = Router()

// // // Admin-only
// // router.post("/", requireAuth, rbac(["admin"]), createAssignment)
// // router.get("/", requireAuth, rbac(["admin"]), listAssignments)
// // router.patch("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // router.put("/:id", requireAuth, rbac(["admin"]), updateAssignment)
// // router.delete("/:id", requireAuth, rbac(["admin"]), deleteAssignment)

// // // Shared
// // router.get("/course/:courseId", requireAuth, getAssignmentsByCourse)

// // // User-visible assignments list
// // router.get("/user", requireAuth, getUserAssignments)

// // // Allow submitting by assignment id
// // router.post("/:id/submit", requireAuth, rbac(["user", "admin"]), createSubmissionByParam)

// // export default router














// import express from "express"
// import { requireAuth } from "../middleware/auth.js"
// import { rbac } from "../middleware/rbac.js"
// import * as assignmentController from "../controllers/assignmentController.js"

// const router = express.Router()

// // Admin routes
// router.post("/", requireAuth, rbac(["admin"]), assignmentController.createAssignment)
// router.get("/:assignmentId/submissions", requireAuth, rbac(["admin"]), assignmentController.getAssignmentSubmissions)
// router.patch("/:submissionId/grade", requireAuth, rbac(["admin"]), assignmentController.gradeAssignment)

// // User routes
// router.get("/course/:courseId", requireAuth, assignmentController.getUserAssignments)
// router.get("/:assignmentId", requireAuth, assignmentController.getAssignment)
// router.post("/:submissionId/draft", requireAuth, assignmentController.saveAssignmentDraft)
// router.post("/:submissionId/submit", requireAuth, assignmentController.submitAssignment)

// export default router






import express from "express"
import multer from "multer"
import { requireAuth } from "../middleware/auth.js"
import { rbac } from "../middleware/rbac.js"
import * as assignmentController from "../controllers/assignmentController.js"

// Configure multer for file uploads (store in memory)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
})

const router = express.Router()

// Admin routes
router.get("/admin", requireAuth, rbac(["admin"]), assignmentController.getAdminAssignments)
router.post("/", requireAuth, rbac(["admin"]), assignmentController.createAssignment)
router.get("/:assignmentId/submissions", requireAuth, rbac(["admin"]), assignmentController.getAssignmentSubmissions)
router.patch("/:submissionId/grade", requireAuth, rbac(["admin"]), assignmentController.gradeAssignment)
router.delete("/:assignmentId", requireAuth, rbac(["admin"]), assignmentController.deleteAssignment)
router.patch("/:assignmentId", requireAuth, rbac(["admin"]), assignmentController.updateAssignment)
router.put("/:assignmentId", requireAuth, rbac(["admin"]), assignmentController.updateAssignment) // Added for frontend compatibility

// User routes - IMPORTANT: specific routes before parameterized ones
router.get("/user/all", requireAuth, assignmentController.getAllUserAssignments)
router.get("/course/:courseId", requireAuth, assignmentController.getUserAssignments)
router.get("/:assignmentId", requireAuth, assignmentController.getAssignment)
router.post("/:assignmentId/submit", requireAuth, upload.single("file"), assignmentController.submitAssignment)
router.post("/:submissionId/draft", requireAuth, assignmentController.saveAssignmentDraft)

export default router
