//client/src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  auth: {
    token: localStorage.getItem("token"),
  },
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("✅ Connected to Socket.IO:", socket.id);
});

socket.on("welcome", (data) => {
  console.log("📡 Server says:", data.message);
  if (!data.authenticated) {
    console.warn("⚠️ Socket connected without authentication");
  }
});

socket.on("authenticated", (data) => {
  console.log("🔐 Authenticated:", data);
});

socket.on("wazuh-alert", (alert) => {
  console.log("🚨 Wazuh Alert Received:", alert);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from Socket.IO");
});
