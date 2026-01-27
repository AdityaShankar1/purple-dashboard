// import axios from "./axiosConfig"

// export const enrollmentApi = {
//   // Enroll in course
//   enrollInCourse: (courseId) => axios.post("/enrollments", { courseId }),

//   // Get user enrollments
//   getUserEnrollments: (status) => axios.get("/enrollments", { params: { status } }),

//   // Get enrollment details
//   getEnrollmentDetails: (id) => axios.get(`/enrollments/${id}`),

//   // Drop course
//   dropCourse: (id) => axios.patch(`/enrollments/${id}/drop`),

//   // Admin endpoints
//   getAllEnrollments: () => axios.get("/enrollments/admin/all"),
// }











// client/src/api/enrollmentApi.js
import axios from './axiosConfig';

export const enrollmentApi = {
  // Enroll in a course
  enrollCourse: async (courseId) => {
    return await axios.post('/enrollments/enroll', { courseId });
  },

  // Get user's enrollments
  getMyEnrollments: async () => {
    return await axios.get('/enrollments/my-enrollments');
  },

  // Get ongoing courses
  getOngoingCourses: async () => {
    return await axios.get('/enrollments/ongoing');
  },

  // Get completed courses
  getCompletedCourses: async () => {
    return await axios.get('/enrollments/completed');
  },

  // Get enrollment status for a course
  getEnrollmentStatus: async (courseId) => {
    return await axios.get(`/enrollments/${courseId}/status`);
  },

  // Admin: Get all enrollments
  getAllEnrollments: async () => {
    return await axios.get('/enrollments/all');
  },

  // Admin: Get course enrollments
  getCourseEnrollments: async (courseId) => {
    return await axios.get(`/enrollments/course/${courseId}`);
  },

  // Admin: Update enrollment status
  updateEnrollmentStatus: async (enrollmentId, status) => {
    return await axios.put(`/enrollments/${enrollmentId}/status`, { status });
  },
};