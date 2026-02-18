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
import aiRoutes from "./routes/ai.js";



dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5001;

// ----------------------
// 🔒 Core Middleware
// ----------------------
app.use(helmet());

// DEBUG: Log all requests
app.use((req, res, next) => {
  console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url}`);
  next();
});
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
app.use("/api/ai", aiRoutes);
app.use("/api/api/materials", materialRoutes); // ✅ Alias for frontend bug
app.use("/api/api/quizzes", quizRoutes); // ✅ Alias for frontend bug?

// Celebrate validation errors
app.use((err, req, res, next) => {
  if (err.joi) {
    console.log("[DEBUG] Validation Error Details:", JSON.stringify(err.joi.details, null, 2));
    return res.status(400).json({
      message: "Validation failed",
      details: err.joi.details
    });
  }
  next(err);
});

app.use(errors());

// Global error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  logger.error(err.message, { status, stack: err.stack });
  res.status(status).json({ message: err.message || "Server error" });
});

// Start server with robust port conflict handling and connect to database
let currentServer = null;

const startServer = async (startPort, maxAttempts = 10) => {
  let attempts = 0;

  // Ensure database is connected before attempting to listen
  try {
    await connectDB();
    logger.info(`✅ MongoDB connected`);
  } catch (err) {
    logger.error("Failed to connect to the database. Exiting...");
    process.exit(1);
  }

  const tryListen = (portToTry) => {
    const server = app.listen(portToTry, () => {
      logger.info(`Server is running on port ${portToTry}`);
      // Attach Socket.IO to the live server instance
      try {
        setupSocket(server);
      } catch (err) {
        logger.error("Failed to setup Socket.IO:", err);
      }
    });

    // keep reference to the active server for global handlers
    currentServer = server;

    server.on("error", (err) => {
      if (err && err.code === "EADDRINUSE") {
        attempts += 1;
        logger.warn(`Port ${portToTry} in use (${attempts}/${maxAttempts}). Trying next port...`);

        // Await server.close before retrying
        (async () => {
          if (server && typeof server.close === "function") {
            try {
              await new Promise((resolve) => server.close(() => resolve()));
            } catch (closeErr) {
              logger.error("Error closing server after EADDRINUSE:", closeErr);
            }
          }

          if (attempts >= maxAttempts) {
            logger.error(`Unable to bind to a port after ${maxAttempts} attempts. Exiting.`);
            process.exit(1);
          }

          // try the next port
          tryListen(portToTry + 1);
        })();
      } else {
        logger.error("Server error:", err);
        process.exit(1);
      }
    });
  };

  tryListen(Number(startPort));
};

// Single global unhandledRejection handler that closes the active server
process.on("unhandledRejection", (reason) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(String(reason));
  if (currentServer && typeof currentServer.close === "function") {
    try {
      currentServer.close(() => {
        process.exit(1);
      });
    } catch (err) {
      process.exit(1);
    }
  } else {
    process.exit(1);
  }
});

startServer(PORT).catch((err) => {
  logger.error("Fatal error starting server:", err);
  process.exit(1);
});