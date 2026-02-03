// // // // // import express from "express"
// // // // // import { requireAuth } from "../middleware/auth.js"
// // // // // import { rbac } from "../middleware/rbac.js"
// // // // // import * as materialController from "../controllers/materialController.js"

// // // // // const router = express.Router()

// // // // // // Admin routes
// // // // // router.post("/:courseId/upload", requireAuth, rbac(["admin"]), materialController.uploadMaterial)

// // // // // router.delete("/:materialId", requireAuth, rbac(["admin"]), materialController.deleteMaterial)

// // // // // router.get("/course/:courseId/admin", requireAuth, rbac(["admin"]), materialController.getCourseMaterials)

// // // // // // User routes
// // // // // router.get("/course/:courseId", requireAuth, materialController.getUserCourseMaterials)

// // // // // router.post("/:courseId/:materialId/view", requireAuth, materialController.markMaterialViewed)

// // // // // export default router









// // // // server/src/routes/materialRoutes.js
// // // const express = require('express');
// // // const router = express.Router();
// // // const materialController = require('../controllers/materialController');
// // // const { authenticate, authorize } = require('../middleware/auth');
// // // const { upload } = require('../middleware/upload');

// // // // Public routes (authenticated users)
// // // router.get('/course/:courseId', authenticate, materialController.getCourseMaterials);
// // // router.get('/:id', authenticate, materialController.getMaterial);
// // // router.post('/view', authenticate, materialController.markMaterialViewed);

// // // // Admin routes
// // // router.get('/admin/all', authenticate, authorize(['admin']), materialController.getAllMaterials);
// // // router.post('/', authenticate, authorize(['admin']), upload.single('file'), materialController.createMaterial);
// // // router.put('/:id', authenticate, authorize(['admin']), upload.single('file'), materialController.updateMaterial);
// // // router.delete('/:id', authenticate, authorize(['admin']), materialController.deleteMaterial);

// // // module.exports = router;







// // // server/src/routes/materialRoutes.js
// // import express from "express"
// // import * as materialController from "../controllers/materialController.js"
// // import { protect, adminOnly } from "../middleware/authMiddleware.js"
// // import { upload } from "../middleware/upload.js"

// // const router = express.Router()

// // // Public routes (authenticated users)
// // router.get("/course/:courseId", protect, materialController.getCourseMaterials)
// // router.get("/:id", protect, materialController.getMaterial)
// // router.post("/view", protect, materialController.markMaterialViewed)

// // // Admin routes
// // router.get("/admin/all", protect, adminOnly, materialController.getAllMaterials)
// // router.post("/", protect, adminOnly, upload.single("file"), materialController.createMaterial)
// // router.put("/:id", protect, adminOnly, upload.single("file"), materialController.updateMaterial)
// // router.delete("/:id", protect, adminOnly, materialController.deleteMaterial)

// // export default router












// import express from "express"
// import { protect, adminOnly } from "../middleware/authMiddleware.js"
// import { upload } from "../middleware/upload.js"
// import {
//   getCourseMaterials,
//   createMaterial,
//   deleteMaterial,
// } from "../controllers/materialController.js"

// const router = express.Router()

// // Public (enrolled users)
// router.get("/course/:courseId", protect, getCourseMaterials)

// // Admin
// router.post("/", protect, adminOnly, upload.single("file"), createMaterial)
// router.delete("/:id", protect, adminOnly, deleteMaterial)

// export default router












import express from "express"
import { protect, adminOnly } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/upload.js"
import {
  getCourseMaterials,
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  updateMaterial,
  markMaterialViewed,
} from "../controllers/materialController.js"

const router = express.Router()

// User-facing
router.get("/course/:courseId", protect, getCourseMaterials)
router.post("/view", protect, markMaterialViewed)

// Admin
router.get("/admin/all", protect, adminOnly, getAllMaterials)
router.post("/", protect, adminOnly, upload.single("file"), createMaterial)
router.put("/:id", protect, adminOnly, upload.single("file"), updateMaterial)
router.delete("/:id", protect, adminOnly, deleteMaterial)

export default router
