// //server/src/wazunStream.js

// import { Server } from "socket.io";
// import { wazuhService } from "./services/wazuhService.js";
// import { logger } from "./config/logger.js";

// let io = null;
// let lastTimestamp = null;
// let pollInterval = null;

// async function getLatestAlerts() {
//   try {
//     const alertsData = await wazuhService.getSecurityAlerts({
//       size: 50,
//       timeRange: "5m", // Poll for the last 5 minutes of alerts
//     });
//     return alertsData?.data?.affected_items || [];
//   } catch (err) {
//     logger.error("❌ Error fetching Wazuh alerts for stream:", err.message);
//     return [];
//   }
// }

// function startPolling() {
//   if (pollInterval) return; // already polling

//   pollInterval = setInterval(async () => {
//     try {
//       const alerts = await getLatestAlerts();
      
//       if (alerts.length > 0) {
//         // Filter out alerts that are older than the last timestamp
//         let newAlerts = alerts;
//         if (lastTimestamp) {
//           newAlerts = alerts.filter(a => new Date(a.timestamp) > new Date(lastTimestamp));
//         }

//         if (newAlerts.length > 0) {
//           // Update the last timestamp to the newest alert
//           lastTimestamp = newAlerts[0].timestamp;
//           logger.info(`📡 Broadcasting ${newAlerts.length} new alerts`);
//           if (io) {
//             io.emit("wazuh-alert", newAlerts);
//           }
//         }
//       }
//     } catch (err) {
//       logger.error("❌ Error fetching Wazuh alerts:", err.message);
//     }
//   }, 20000); // Poll every 20 seconds
// }

// export function setupWazuhStream(server) {
//   io = new Server(server, {
//     cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
//   });

//   logger.info("⚡ Wazuh WebSocket stream ready");

//   io.on("connection", (socket) => {
//     logger.info(`✅ Client connected: ${socket.id}`);

//     // Start polling when first client connects
//     if (io.engine.clientsCount === 1) {
//       logger.info("📡 Starting Wazuh polling...");
//       startPolling();
//     }

//     socket.on("disconnect", () => {
//       logger.info(`❌ Client disconnected: ${socket.id}`);
//       // Stop polling when last client disconnects
//       if (io.engine.clientsCount === 0) {
//         logger.info("🛑 Stopping Wazuh polling.");
//         clearInterval(pollInterval);
//         pollInterval = null;
//       }
//     });
//   });
// }






// // server/src/wazuhStream.js
// import { Server } from "socket.io";
// import { wazuhService } from "./services/wazuhService.js";
// import { logger } from "./config/logger.js";

// let io = null;
// let pollTimeout = null;
// let lastTimestamp = null;

// async function poll() {
//   try {
//     const alerts = await wazuhService.getSecurityAlerts({
//       size: 100,
//       timeRange: "10m",
//     });

//     let newAlerts = alerts;
//     if (lastTimestamp) {
//       newAlerts = alerts.filter((a) => {
//         const ts = new Date(a["@timestamp"] || a.timestamp);
//         return ts > new Date(lastTimestamp);
//       });
//     }

//     if (newAlerts.length > 0) {
//       // Set lastTimestamp to newest alert
//       const newestTs = newAlerts.reduce((latest, a) => {
//         const ts = new Date(a["@timestamp"] || a.timestamp);
//         return ts > latest ? ts : latest;
//       }, new Date(lastTimestamp || 0));
//       lastTimestamp = newestTs.toISOString();

//       logger.info(`📡 Broadcasting ${newAlerts.length} new alerts`);
//       if (io) io.emit("wazuh-alert", newAlerts);
//     }
//   } catch (err) {
//     logger.error(`❌ Wazuh stream poll error: ${err.message}`);
//   } finally {
//     pollTimeout = setTimeout(poll, 20000); // 20s
//   }
// }

// export function setupWazuhStream(server) {
//   io = new Server(server, {
//     cors: { origin: process.env.CLIENT_URL || "http://localhost:3000", methods: ["GET", "POST"] },
//   });

//   logger.info("⚡ Wazuh WebSocket stream ready");

//   io.on("connection", (socket) => {
//     logger.info(`✅ Client connected: ${socket.id}`);

//     if (io.engine.clientsCount === 1 && !pollTimeout) {
//       logger.info("📡 Starting Wazuh polling...");
//       poll();
//     }

//     socket.on("disconnect", () => {
//       logger.info(`❌ Client disconnected: ${socket.id}`);
//       if (io.engine.clientsCount === 0 && pollTimeout) {
//         logger.info("🛑 Stopping Wazuh polling.");
//         clearTimeout(pollTimeout);
//         pollTimeout = null;
//       }
//     });
//   });
// }










// server/src/wazuhStream.js
import { Server } from "socket.io";
import { wazuhService } from "./services/wazuhService.js";
import { logger } from "./config/logger.js";

let io = null;
let pollTimeout = null;
let lastTimestamp = null;

async function poll() {
  try {
    const alerts = await wazuhService.getSecurityAlerts({
      size: 100,
      timeRange: "10m",
    });

    let newAlerts = alerts;
    if (lastTimestamp) {
      newAlerts = alerts.filter((a) => {
        const ts = new Date(a["@timestamp"] || a.timestamp);
        return ts > new Date(lastTimestamp);
      });
    }

    if (newAlerts.length > 0) {
      // Set lastTimestamp to newest alert
      const newestTs = newAlerts.reduce((latest, a) => {
        const ts = new Date(a["@timestamp"] || a.timestamp);
        return ts > latest ? ts : latest;
      }, new Date(lastTimestamp || 0));
      lastTimestamp = newestTs.toISOString();

      logger.info(`📡 Broadcasting ${newAlerts.length} new alerts`);

      if (io) {
        // Emit new alerts (event name matches frontend hook)
        io.emit("wazuh:alert", newAlerts);

        // Also emit updated total count
        const totalCount = await wazuhService.getTotalAlerts();
        io.emit("wazuh:count", totalCount);
      }
    }
  } catch (err) {
    logger.error(`❌ Wazuh stream poll error: ${err.message}`);
  } finally {
    pollTimeout = setTimeout(poll, 20000); // poll every 20s
  }
}

export function setupWazuhStream(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  logger.info("⚡ Wazuh WebSocket stream ready");

  io.on("connection", (socket) => {
    logger.info(`✅ Client connected: ${socket.id}`);

    // Start polling when first client connects
    if (io.engine.clientsCount === 1 && !pollTimeout) {
      logger.info("📡 Starting Wazuh polling...");
      poll();
    }

    socket.on("disconnect", () => {
      logger.info(`❌ Client disconnected: ${socket.id}`);
      if (io.engine.clientsCount === 0 && pollTimeout) {
        logger.info("🛑 Stopping Wazuh polling.");
        clearTimeout(pollTimeout);
        pollTimeout = null;
      }
    });
  });
}
