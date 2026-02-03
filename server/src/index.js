// // server/src/index.js

import dotenv from "dotenv";
import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import { errors } from "celebrate";
import { connectDB } from "./config/db.js"; // This is the line that requires a named export from db.js
import { logger } from "./config/logger.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { sanitize } from "./middleware/sanitize.js";
import wazuhRoutes from "./routes/wazuhRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { setupSocket } from "./config/socket.js";

// Add this import at the top with the other route imports
import materialRoutes from "./routes/materialRoutes.js";



dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5001;

// ----------------------
// 🔒 Core Middleware
// ----------------------
app.use(helmet());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(compression());
app.use((req, _res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  // Do NOT try to sanitize req.query, as it is read-only in Express 5
  next();
});
app.use(sanitize);
app.use(hpp());
app.use(morgan("combined"));
app.use(apiLimiter);

// ----------------------
// 🚀 API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/wazuh", wazuhRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/courses", courseRoutes); // ✅ matches frontend


// Then, below your other route definitions (near the bottom)
app.use("/api/materials", materialRoutes);
app.use("/api/api/materials", materialRoutes); // ✅ Alias for frontend bug
app.use("/api/api/quizzes", quizRoutes); // ✅ Alias for frontend bug?

// Celebrate validation errors
app.use(errors());

// Global error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  logger.error(err.message, { status, stack: err.stack });
  res.status(status).json({ message: err.message || "Server error" });
});

// Start server and connect to database
const server = app.listen(PORT, async () => {
  try {
    await connectDB();
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`✅ MongoDB connected`);
  } catch (err) {
    logger.error("Failed to connect to the database. Exiting...");
    process.exit(1);
  }
});

// Setup Socket.IO
setupSocket(server);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});