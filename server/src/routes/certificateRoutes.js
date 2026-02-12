import { Router } from "express"
import { getUserCertificates, downloadCertificate, getCertificateCount } from "../controllers/certificateController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/user", protect, getUserCertificates)
router.get("/count", protect, getCertificateCount)
router.get("/:id/download", protect, downloadCertificate)

export default router
