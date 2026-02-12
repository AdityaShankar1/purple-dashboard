import { Router } from "express";
import { getUserMetrics } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/metrics", protect, getUserMetrics);

export default router;
