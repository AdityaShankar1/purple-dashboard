// // import axios from "./axiosConfig"

// // export const progressApi = {
// //   // Update progress
// //   updateProgress: (data) => axios.post("/progress/update", data),

// //   // Get progress for enrollment
// //   getProgress: (enrollmentId) => axios.get(`/progress/enrollment/${enrollmentId}`),

// //   // Get user's all progress
// //   getUserProgress: () => axios.get("/progress/user"),

// //   // Get progress analytics
// //   getAnalytics: () => axios.get("/progress/analytics"),

// //   // Get learning streak
// //   getStreak: () => axios.get("/progress/streak"),
// // }











// import axios from "./axiosConfig"

// export const progressApi = {
//   getCourseProgress: (courseId) => axios.get(`/progress/course/${courseId}`),

//   getProgress: (enrollmentId) => axios.get(`/progress/${enrollmentId}`),

//   getAdminCourseProgress: (courseId) => axios.get(`/progress/admin/course/${courseId}`),
// }








// client/src/api/progressApi.js
import axios from './axiosConfig';

export const progressApi = {
  // Get course progress
  getCourseProgress: async (courseId) => {
    return await axios.get(`/progress/course/${courseId}`);
  },

  // Update progress
  updateProgress: async (progressData) => {
    return await axios.post('/progress/update', progressData);
  },

  // Mark material as complete
  markMaterialComplete: async (courseId, materialId) => {
    return await axios.post('/progress/material/complete', {
      courseId,
      materialId
    });
  },

  // Admin: Get all progress records
  getAllProgress: async () => {
    return await axios.get('/progress/all');
  },

  // Admin: Get user progress
  getUserProgress: async (userId) => {
    return await axios.get(`/progress/user/${userId}`);
  },

  // Admin: Get progress analytics
  getProgressAnalytics: async () => {
    return await axios.get('/progress/analytics');
  },
};