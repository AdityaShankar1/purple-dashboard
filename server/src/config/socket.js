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
//     }

//     next() // Always allow connection
//   })

//   io.on("connection", (socket) => {
//     if (socket.isAuthenticated) {
//       logger.info(`✅ User ${socket.user.id} authenticated with socket ${socket.id}`)
//       connectedUsers.set(socket.user.id, socket.id)
//       socket.emit("welcome", {
//         message: "Welcome to LMS Socket!",
//         authenticated: true,
//       })
//     } else {
//       logger.info(`🔓 Unauthenticated client connected: ${socket.id}`)
//       socket.emit("welcome", {
//         message: "Connected to LMS Socket",
//         authenticated: false,
//       })
//     }

//     // A specific event to handle authentication after connection
//     socket.on("authenticate", (userId) => {
//       if (userId) {
//         connectedUsers.set(userId, socket.id)
//         socket.userId = userId
//         socket.isAuthenticated = true
//         logger.info(`User ${userId} authenticated with socket ${socket.id}`)
//         socket.emit("authenticated", { success: true })
//       }
//     })

//     // Wazuh polling for authenticated 'admin' users
//     if (socket.isAuthenticated && socket.user?.role === "admin") {
//       const alertInterval = setInterval(async () => {
//         try {
//           const alerts = await wazuhService.getSecurityAlerts({
//             size: 10,
//             timeRange: "5m",
//             level: 7, // High severity only
//           })

//           if (alerts.hits?.hits?.length > 0) {
//             socket.emit("wazuh-realtime-alerts", alerts.hits.hits)
//           }
//         } catch (error) {
//           logger.error("Real-time alert error:", error.message)
//         }
//       }, 30000) // Every 30 seconds

//       socket.on("disconnect", () => {
//         clearInterval(alertInterval)
//       })
//     }

//     socket.on("wazuh-alert", (alert) => {
//       socket.broadcast.emit("wazuh-alert", alert)
//     })

//     socket.on("disconnect", () => {
//       if (socket.isAuthenticated && socket.user?.id) {
//         connectedUsers.delete(socket.user.id)
//         logger.info(`❌ User ${socket.user.id} disconnected`)
//       } else if (socket.userId) {
//         connectedUsers.delete(socket.userId)
//         logger.info(`❌ User ${socket.userId} disconnected`)
//       }
//     })
//   })
// }

// // Now, export the instances after they are created by setupSocket
// // This allows other modules to import them only after the server has started
// export { io, connectedUsers }


























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
      origin: "http://localhost:3000",  // Make sure the frontend URL is correct
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

    // Wazuh polling for authenticated 'admin' users
    if (socket.isAuthenticated && socket.user?.role === "admin") {
      const alertInterval = setInterval(async () => {
        try {
          // Fetch security alerts from Wazuh every 30 seconds
          const alerts = await wazuhService.getSecurityAlerts({
            size: 10,
            timeRange: "5m",
            level: 7, // High severity only
          });

          if (alerts.hits?.hits?.length > 0) {
            socket.emit("wazuh-realtime-alerts", alerts.hits.hits);
          }
        } catch (error) {
          logger.error("Real-time alert error:", error.message);
        }
      }, 30000); // Every 30 seconds

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
