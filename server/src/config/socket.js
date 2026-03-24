// //server/src/config/socket.js

// import { Server } from "socket.io"
// import jwt from "jsonwebtoken"
// import { wazuhService } from "../services/wazuhService.js"
// import { logger } from "./logger.js"

// // Declare io and connectedUsers here, but don't export them yet
// let io
// const connectedUsers = new Map()

// export const setupSocket = (httpServer) => {
//   io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   })

//   io.use((socket, next) => {
//     const token = socket.handshake.auth?.token

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         socket.user = decoded
//         socket.isAuthenticated = true
//       } catch (err) {
//         logger.warn("Invalid token provided, allowing unauthenticated connection")
//         socket.isAuthenticated = false
//       }
//     } else {
//       socket.isAuthenticated = false

























//server/src/config/socket.js

import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { wazuhService } from "../services/wazuhService.js";
import { logger } from "./logger.js";

// Declare io and connectedUsers here, but don't export them yet
let io;
const connectedUsers = new Map();

export const setupSocket = (httpServer) => {
  // Initialize the socket.io server with CORS and credentials
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",  // Make sure the frontend URL is correct
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Middleware for socket connection to validate the JWT token
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;  // Extract token from socket connection

    if (token) {
      try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        socket.isAuthenticated = true;
      } catch (err) {
        logger.warn("Invalid token provided, allowing unauthenticated connection");
        socket.isAuthenticated = false;
      }
    } else {
      socket.isAuthenticated = false;
    }

    next(); // Always allow connection
  });

  // Connection event
  // Connection event
  io.on("connection", (socket) => {
    if (socket.isAuthenticated) {
      logger.info(`✅ User ${socket.user.id} authenticated with socket ${socket.id}`);
      connectedUsers.set(socket.user.id, socket.id);
      socket.emit("welcome", {
        message: "Welcome to LMS Socket!",
        authenticated: true,
      });
    } else {
      logger.info(`🔓 Unauthenticated client connected: ${socket.id}`);
      socket.emit("welcome", {
        message: "Connected to LMS Socket",
        authenticated: false,
      });
    }

    // A specific event to handle authentication after connection
    socket.on("authenticate", (userId) => {
      if (userId) {
        connectedUsers.set(userId, socket.id);
        socket.userId = userId;
        socket.isAuthenticated = true;
        logger.info(`User ${userId} authenticated with socket ${socket.id}`);
        socket.emit("authenticated", { success: true });
      }
    });

    // Wazuh polling for authenticated users (removed admin check to fix dashboard for all users)
    if (socket.isAuthenticated) {
      const alertInterval = setInterval(async () => {
        try {
          // Fetch security alerts from Wazuh every 10 seconds (faster updates)
          const alerts = await wazuhService.getSecurityAlerts({
            size: 50,
            timeRange: "5m",
            level: 1, // Get more alerts for testing/visibility
          });

          if (alerts.length > 0) {
            // Emit 'wazuh:alert' to match frontend hook
            socket.emit("wazuh:alert", alerts);
          }

          // Also emit total count
          const totalCount = await wazuhService.getTotalAlerts();
          socket.emit("wazuh:count", totalCount);

        } catch (error) {
          logger.error("Real-time alert error:", error.message);
        }
      }, 10000); // Every 10 seconds

      // Clean up when the socket disconnects
      socket.on("disconnect", () => {
        clearInterval(alertInterval);
      });
    }

    // Emit real-time Wazuh alerts to other users
    socket.on("wazuh-alert", (alert) => {
      socket.broadcast.emit("wazuh-alert", alert);
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      if (socket.isAuthenticated && socket.user?.id) {
        connectedUsers.delete(socket.user.id);
        logger.info(`❌ User ${socket.user.id} disconnected`);
      } else if (socket.userId) {
        connectedUsers.delete(socket.userId);
        logger.info(`❌ User ${socket.userId} disconnected`);
      }
    });

    // Handling join:assignment for assignment-specific rooms
    socket.on("join:assignment", (assignmentId) => {
      socket.join(String(assignmentId));
      logger.info(`User ${socket.user?.id || socket.userId} joined assignment room: ${assignmentId}`);
    });
  });
};

// Export instances of io and connectedUsers for use elsewhere in the app
export { io, connectedUsers };
