// client/src/api/authApi.js
import api from "./axiosConfig";

// 🔐 Auth APIs
export const signup = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

// 🔑 Password reset APIs
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (token, data) => api.post(`/auth/reset-password/${token}`, data);