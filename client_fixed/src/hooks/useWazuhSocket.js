// // "use client"

// // import { useState, useEffect } from "react"

// // export const useWazuhSocket = (maxAlerts = 100) => {
// //   const [alerts, setAlerts] = useState([])

// //   useEffect(() => {
// //     // Mock Wazuh alerts for demonstration
// //     const mockAlerts = Array.from({ length: 180 }, (_, i) => ({
// //       "@timestamp": new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
// //       rule: {
// //         level: Math.floor(Math.random() * 15) + 1,
// //         groups: ["authentication", "web", "attack", "false_positive"][Math.floor(Math.random() * 4)],
// //       },
// //       agent: {
// //         name: ["web-server", "db-server", "app-server", "Unknown"][Math.floor(Math.random() * 4)],
// //         type: ["endpoint", "app", "network"][Math.floor(Math.random() * 3)],
// //       },
// //     }))

// //     setAlerts(mockAlerts.slice(0, maxAlerts))

// //     // In a real implementation, you would connect to Socket.IO
// //     // const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000")
// //     // socket.on("wazuh-alert", (alert) => {
// //     //   setAlerts(prev => [alert, ...prev].slice(0, maxAlerts))
// //     // })

// //     // return () => socket.disconnect()
// //   }, [maxAlerts])

// //   return alerts
// // }




// // "use client";

// // import { useState, useEffect } from "react";
// // import io from "socket.io-client";

// // export const useWazuhSocket = (maxAlerts = 100) => {
// //   const [alerts, setAlerts] = useState([]);

// //   useEffect(() => {
// //     // Connect to the Socket.IO server running on your backend
// //     const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");

// //     // Listen for new "wazuh-alert" events from the server
// //     socket.on("wazuh-alert", (alert) => {
// //       setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
// //     });

// //     // Handle WebSocket connection errors
// //     socket.on("connect_error", (err) => {
// //       console.error("Socket connection failed:", err.message);
// //     });

// //     // Disconnect the socket when the component unmounts to prevent memory leaks
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [maxAlerts]);

// //   return alerts;
// // };












// "use client";

// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// export const useWazuhSocket = (maxAlerts = 100) => {
//   const [alerts, setAlerts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);

//   useEffect(() => {
//     // Connect to your backend Socket.IO server
//     const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");

//     // Listen for new "wazuh-alert" events
//     socket.on("wazuh-alert", (alert) => {
//       setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
//     });

//     socket.on("connect_error", (err) => {
//       console.error("Socket connection failed:", err.message);
//     });

//     // Fetch total alerts count from your backend REST API
//     const fetchTotalCount = async () => {
//       try {
//         // IMPORTANT: expose a backend endpoint that proxies the Indexer _count query
//         // e.g. GET /api/wazuh/alerts/count
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wazuh/alerts/count`
//         );
//         const data = await res.json();
//         setTotalCount(data.count || 0);
//       } catch (err) {
//         console.error("Failed to fetch total alerts count:", err);
//       }
//     };

//     fetchTotalCount();

//     return () => {
//       socket.disconnect();
//     };
//   }, [maxAlerts]);

//   return { alerts, totalCount };
// };

















// "use client";

// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// export const useWazuhSocket = (maxAlerts = 100) => {
//   const [alerts, setAlerts] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);

//   useEffect(() => {
//     // Connect to your backend Socket.IO server
//     const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
//       transports: ["websocket"], // force websocket for stability
//     });

//     // Listen for new alerts (make sure backend emits "wazuh:alert")
//     socket.on("wazuh:alert", (alert) => {
//       setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
//     });

//     // Optional: listen for total count updates if backend emits them
//     socket.on("wazuh:count", (count) => {
//       setTotalCount(count);
//     });

//     socket.on("connect", () => {
//       console.log("✅ Connected to Wazuh socket server");
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Socket connection failed:", err.message);
//     });

//     // Fallback: fetch total alerts count from REST API
//     const fetchTotalCount = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/wazuh/alerts/count`,
//           { credentials: "include" } // include cookies if using requireAuth
//         );
//         const data = await res.json();
//         setTotalCount(data.count || 0);
//       } catch (err) {
//         console.error("Failed to fetch total alerts count:", err);
//       }
//     };

//     fetchTotalCount();

//     return () => {
//       socket.off("wazuh:alert");
//       socket.off("wazuh:count");
//       socket.disconnect();
//     };
//   }, [maxAlerts]);

//   return { alerts, totalCount };
// };
















"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";

export const useWazuhSocket = (maxAlerts = 100) => {
  const [alerts, setAlerts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Connect to backend Socket.IO server
    const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5001", {
      transports: ["websocket"], // force websocket for stability
    });

    // 🔔 Listen for new alerts
    socket.on("wazuh:alert", (newAlerts) => {
      // backend emits an array of alerts, prepend them
      setAlerts((prev) => [...newAlerts, ...prev].slice(0, maxAlerts));
    });

    // 🔢 Listen for total count updates
    socket.on("wazuh:count", (count) => {
      setTotalCount(count);
    });

    socket.on("connect", () => {
      console.log("✅ Connected to Wazuh socket server");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection failed:", err.message);
    });

    // Fallback: fetch total alerts count once on mount
    const fetchTotalCount = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || "http://localhost:5001/api"}/wazuh/alerts/count`,
          { credentials: "include" } // include cookies if requireAuth is enabled
        );
        const data = await res.json();
        setTotalCount(data.count || 0);
      } catch (err) {
        console.error("Failed to fetch total alerts count:", err);
      }
    };

    fetchTotalCount();

    // Cleanup listeners on unmount
    return () => {
      socket.off("wazuh:alert");
      socket.off("wazuh:count");
      socket.disconnect();
    };
  }, [maxAlerts]);

  return { alerts, totalCount };
};
