import express from "express";
import { validate, schemas } from "../middleware/validate.js";
import { requireAuth, rbac } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";
import {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
  getUsers,
} from "../controllers/authController.js";

const router = express.Router();

// Public routes with rate limiting
router.post("/register", authLimiter, validate(schemas.register), register);
router.post("/login", authLimiter, validate(schemas.login), login);
router.post("/forgot-password", authLimiter, validate(schemas.forgotPassword), forgotPassword);
router.post("/reset-password/:token", validate(schemas.resetPassword), resetPassword);

// Protected routes (any authenticated user)
router.get("/me", requireAuth, getMe);
router.put("/profile", requireAuth, validate(schemas.updateProfile), updateProfile);

// Admin only routes
router.get("/users", requireAuth, rbac(["admin"]), getUsers);

export default router;
