// import axios from "axios"

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
//   timeout: 10000,
// })

// // Request interceptor to add auth token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle auth errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default axiosInstance




// import axios from "axios"

// // Create axios instance
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
//   timeout: 10000,
// })

// // Request interceptor to add auth token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle auth errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default axiosInstance






//client/src/api/axiosConfig


import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if using cookies
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth and network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (!error.response) {
      console.error("Network error or timeout:", error.message);
    } else {
      console.error("API error:", error.response?.data?.message || error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;