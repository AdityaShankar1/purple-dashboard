
import { io } from "socket.io-client";

// Connect to the server
const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

console.log("Connecting to socket...");

socket.on("connect", () => {
    console.log("✅ Connected to socket:", socket.id);

    // Authenticate (mock user)
    // socket.emit("authenticate", "test-user-id");
});

socket.on("welcome", (data) => {
    console.log("👋 Welcome message:", data);
});

socket.on("wazuh:alert", (alerts) => {
    console.log(`🚨 Received ${alerts.length} alerts via socket!`);
    // print first alert title/rule
    if (alerts.length > 0) {
        console.log("Sample alert rule:", alerts[0].rule?.description);
    }
    socket.disconnect(); // Exit after success
});

socket.on("wazuh:count", (count) => {
    console.log(`🔢 Received total count: ${count}`);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected");
});

socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
});

// Keep alive for a bit to receive events
setTimeout(() => {
    console.log("Timeout waiting for events. Checks logs if polling interval is too long.");
    socket.disconnect();
}, 15000);
