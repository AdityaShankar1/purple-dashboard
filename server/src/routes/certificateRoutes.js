// // // // // // import express from "express"
// // // // // // import auth  from "../middleware/auth.js";
// // // // // // import {
// // // // // //   getUserCertificates,
// // // // // //   getCertificate,
// // // // // //   verifyCertificate,
// // // // // //   downloadCertificate,
// // // // // // } from "../controllers/certificateController.js"

// // // // // // const router = express.Router()

// // // // // // // Public route for certificate verification
// // // // // // router.get("/verify/:certificateId", verifyCertificate)

// // // // // // // Protected routes
// // // // // // router.use(auth)

// // // // // // router.get("/", getUserCertificates)
// // // // // // router.get("/:id", getCertificate)
// // // // // // router.get("/:id/download", downloadCertificate)

// // // // // // export default router













// // // // // import express from "express";
// // // // // import { requireAuth } from "../middleware/auth.js"; // Named import for requireAuth
// // // // // import {
// // // // //   getUserCertificates,
// // // // //   getCertificate,
// // // // //   verifyCertificate,
// // // // //   downloadCertificate,
// // // // // } from "../controllers/certificateController.js";

// // // // // const router = express.Router();

// // // // // // Public route for certificate verification
// // // // // router.get("/verify/:certificateId", verifyCertificate);

// // // // // // Protected routes
// // // // // router.use(requireAuth); // Use requireAuth middleware to protect routes

// // // // // router.get("/", getUserCertificates);
// // // // // router.get("/:id", getCertificate);
// // // // // router.get("/:id/download", downloadCertificate);

// // // // // export default router;





// // // // ////above is working code ///// 16/10/25 Below is new claude code




// // // // // server/src/routes/certificateRoutes.js
// // // // import express from "express";
// // // // import { getUserCertificates, getCertificate, downloadCertificate } from "../controllers/certificateController.js";
// // // // import { requireAuth } from "../middleware/auth.js";

// // // // const router = express.Router();

// // // // router.get("/my-certificates", requireAuth, getUserCertificates);
// // // // router.get("/:id", requireAuth, getCertificate);
// // // // router.get("/:id/download", requireAuth, downloadCertificate);

// // // // export default router;









// // // import express from "express"
// // // import { requireAuth } from "../middleware/auth.js"

// // // import {
// // //   getUserCertificates,
// // //   getCertificate,
// // //   verifyCertificate,
// // //   downloadCertificate,
// // // } from "../controllers/certificateController.js"

// // // const router = express.Router()

// // // // Public route for certificate verification
// // // router.get("/verify/:certificateId", verifyCertificate)

// // // // Protected routes
// // // router.use(requireAuth)

// // // router.get("/", getUserCertificates)
// // // router.get("/:id", getCertificate)
// // // router.get("/:id/download", downloadCertificate)

// // // export default router






// // import express from "express"
// // import { requireAuth } from "../middleware/auth.js"
// // import * as certificateController from "../controllers/certificateController.js"

// // const router = express.Router()

// // router.get("/", requireAuth, certificateController.getUserCertificates)
// // router.get("/:certificateId", requireAuth, certificateController.getCertificate)
// // router.get("/:certificateId/download", requireAuth, certificateController.downloadCertificate)
// // router.get("/verify/:shareToken", certificateController.verifyCertificate)

// // export default router








// import express from "express"
// import { requireAuth } from "../middleware/auth.js"
// import { rbac } from "../middleware/rbac.js"
// import * as certificateController from "../controllers/certificateController.js"

// const router = express.Router()

// // User routes
// router.get("/", requireAuth, certificateController.getUserCertificates)
// router.get("/:certificateId", requireAuth, certificateController.getCertificate)
// router.get("/:certificateId/download", requireAuth, certificateController.downloadCertificate)
// router.get("/verify/:shareToken", certificateController.verifyCertificate)

// router.get("/admin/all", requireAuth, rbac(["admin"]), certificateController.getAdminCertificates)
// router.get("/admin/course/:courseId", requireAuth, rbac(["admin"]), certificateController.getAdminCertificates)
// router.get("/admin/:certificateId", requireAuth, rbac(["admin"]), certificateController.getCertificateForAdmin)

// export default router







import { Router } from "express"
import { getUserCertificates, downloadCertificate } from "../controllers/certificateController.js"
// import { requireAuth } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/user", /* requireAuth, */ getUserCertificates)
router.get("/:id/download", /* requireAuth, */ downloadCertificate)

export default router
