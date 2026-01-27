

// //client/src/utils/socket.js
// import { io } from "socket.io-client"

// class SocketService {
//   constructor() {
//     this.socket = null
//     this.isConnected = false
//   }

//   connect(token = null) {
//     if (this.socket?.connected) {
//       return this.socket
//     }

//     this.socket = io("http://localhost:5000", {
//       auth: token ? { token } : {},
//       transports: ["websocket", "polling"],
//       timeout: 20000,
//       forceNew: true,
//     })

//     this.socket.on("connect", () => {
//       console.log("[v0] Socket connected:", this.socket.id)
//       this.isConnected = true
//     })

//     this.socket.on("welcome", (data) => {
//       console.log("[v0] Welcome message:", data)
//     })

//     this.socket.on("authenticated", (data) => {
//       console.log("[v0] Authentication successful:", data)
//     })

//     this.socket.on("disconnect", (reason) => {
//       console.log("[v0] Socket disconnected:", reason)
//       this.isConnected = false
//     })

//     this.socket.on("connect_error", (error) => {
//       console.error("[v0] Socket connection error:", error)
//     })

//     return this.socket
//   }

//   authenticate(userId) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit("authenticate", userId)
//     }
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect()
//       this.socket = null
//       this.isConnected = false
//     }
//   }

//   on(event, callback) {
//     if (this.socket) {
//       this.socket.on(event, callback)
//     }
//   }

//   emit(event, data) {
//     if (this.socket && this.isConnected) {
//       this.socket.emit(event, data)
//     }
//   }
// }

// export default new SocketService()











// client/src/utils/socket.js
// Note: Install socket.io-client if not already: npm install socket.io-client
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

export const initSocket = (userId, courseId) => {
  if (userId) {
    socket.emit('joinCourse', courseId || 'general');
  }
};

export default socket;