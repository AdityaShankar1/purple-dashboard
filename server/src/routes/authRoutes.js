// // import express from "express"
// // import { celebrate, Joi } from "celebrate"
// // import auth from "../middleware/auth.js";
// // import { rbac } from "../middleware/rbac.js"
// // import { authLimiter } from "../middleware/rateLimit.js"
// // import {
// //   register,
// //   login,
// //   getMe,
// //   updateProfile,
// //   forgotPassword,
// //   resetPassword,
// //   getUsers,
// // } from "../controllers/authController.js"

// // const router = express.Router()

// // // Public routes with rate limiting
// // router.post(
// //   "/register",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       name: Joi.string().required().min(2).max(50),
// //       email: Joi.string().email().required(),
// //       password: Joi.string().required().min(6),
// //       role: Joi.string().valid("user", "admin").default("user"),
// //     }),
// //   }),
// //   register,
// // )

// // router.post(
// //   "/login",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       email: Joi.string().email().required(),
// //       password: Joi.string().required(),
// //     }),
// //   }),
// //   login,
// // )

// // router.post(
// //   "/forgot-password",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       email: Joi.string().email().required(),
// //     }),
// //   }),
// //   forgotPassword,
// // )

// // router.post(
// //   "/reset-password/:token",
// //   celebrate({
// //     body: Joi.object({
// //       password: Joi.string().required().min(6),
// //     }),
// //   }),
// //   resetPassword,
// // )

// // // Protected routes
// // router.use(auth)

// // router.get("/me", getMe)

// // router.put(
// //   "/profile",
// //   celebrate({
// //     body: Joi.object({
// //       name: Joi.string().min(2).max(50),
// //       email: Joi.string().email(),
// //     }),
// //   }),
// //   updateProfile,
// // )

// // // Admin only routes
// // router.get("/users", rbac(["admin"]), getUsers)

// // export default router





// // import express from "express"
// // import { celebrate, Joi } from "celebrate"
// // import auth from "../middleware/auth.js";
// // import { rbac } from "../middleware/rbac.js"
// // import { authLimiter } from "../middleware/rateLimit.js"
// // import {
// //   register,
// //   login,
// //   getMe,
// //   updateProfile,
// //   forgotPassword,
// //   resetPassword,
// //   getUsers,
// // } from "../controllers/authController.js"

// // const router = express.Router()

// // // Public routes with rate limiting
// // router.post(
// //   "/register",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       name: Joi.string().required().min(2).max(50),
// //       email: Joi.string().email().required(),
// //       password: Joi.string().required().min(6),
// //       role: Joi.string().valid("user", "admin").default("user"),
// //     }),
// //   }),
// //   register,
// // )

// // router.post(
// //   "/login",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       email: Joi.string().email().required(),
// //       password: Joi.string().required(),
// //     }),
// //   }),
// //   login,
// // )

// // router.post(
// //   "/forgot-password",
// //   authLimiter,
// //   celebrate({
// //     body: Joi.object({
// //       email: Joi.string().email().required(),
// //     }),
// //   }),
// //   forgotPassword,
// // )

// // router.post(
// //   "/reset-password/:token",
// //   celebrate({
// //     body: Joi.object({
// //       password: Joi.string().required().min(6),
// //     }),
// //   }),
// //   resetPassword,
// // )

// // // Protected routes
// // router.use(auth)

// // router.get("/me", getMe)

// // router.put(
// //   "/profile",
// //   celebrate({
// //     body: Joi.object({
// //       name: Joi.string().min(2).max(50),
// //       email: Joi.string().email(),
// //     }),
// //   }),
// //   updateProfile,
// // )

// // // Admin only routes
// // router.get("/users", rbac(["admin"]), getUsers)

// // export default router








// // server/src/routes/authRoutes.js
// import express from "express";
// const router = express.Router();

// import { validate, schemas } from "../middleware/validate.js";
// import { requireAuth, rbac } from "../middleware/auth.js";
// // updated
// import { authLimiter } from "../middleware/rateLimit.js";
// import {
//   register,
//   login,
//   getMe,
//   updateProfile,
//   forgotPassword,
//   resetPassword,
//   getUsers,
// } from "../controllers/authController.js";

// // --------------------
// // Public routes with rate limiting
// // --------------------
// router.post("/register", authLimiter, validate(schemas.register), register);
// router.post("/login", authLimiter, validate(schemas.login), login);
// router.post("/forgot-password", authLimiter, validate(schemas.forgotPassword), forgotPassword);
// router.post("/reset-password/:token", validate(schemas.resetPassword), resetPassword);

// // --------------------
// // Protected routes (any authenticated user)
// // --------------------
// router.get("/me", requireAuth, getMe);
// router.put("/profile", requireAuth, validate(schemas.updateProfile), updateProfile);

// // --------------------
// // Admin only routes
// // --------------------
// router.get("/users", requireAuth, rbac("admin"), getUsers);

// export default router;











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

router.post("/register", authLimiter, validate(schemas.register), register);
router.post("/login", authLimiter, validate(schemas.login), login);
router.post("/forgot-password", authLimiter, validate(schemas.forgotPassword), forgotPassword);
router.post("/reset-password/:token", validate(schemas.resetPassword), resetPassword);

router.get("/me", requireAuth, getMe);
router.put("/profile", requireAuth, validate(schemas.updateProfile), updateProfile);

router.get("/users", requireAuth, rbac(["admin"]), getUsers);

export default router;
