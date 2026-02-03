// // // //client/src/api/courseApi


// // // import axios from "./axiosConfig"

// // // export const courseApi = {
// // //   // Get all courses (public)
// // //   getCourses: (params = {}) => axios.get("/courses", { params }),

// // //   // Get single course
// // //   getCourse: (id) => axios.get(`/courses/${id}`),

// // //   // Admin endpoints
// // //   getAdminCourses: () => axios.get("/courses/admin/all"),
// // //   createCourse: (data) => axios.post("/courses", data),
// // //   updateCourse: (id, data) => axios.put(`/courses/${id}`, data),
// // //   deleteCourse: (id) => axios.delete(`/courses/${id}`),
// // // }









// // // client/src/api/courseApi.js
// // import axios from "./axiosConfig"

// // export const courseApi = {
// //   // Get all courses (public)
// //   getCourses: (params = {}) => axios.get("/courses", { params }),

// //   // Get single course
// //   getCourse: (id) => axios.get(`/courses/${id}`),

// //   // Admin endpoints
// //   getAdminCourses: () => axios.get("/courses/admin/all"),
// //   createCourse: (data) => axios.post("/courses", data),
// //   updateCourse: (id, data) => axios.put(`/courses/${id}`, data),
// //   deleteCourse: (id) => axios.delete(`/courses/${id}`),

// //   addMaterial: (courseId, data) => axios.post(`/courses/${courseId}/materials`, data),
// //   removeMaterial: (courseId, materialId) => axios.delete(`/courses/${courseId}/materials/${materialId}`),

// //   addLiveSession: (courseId, data) => axios.post(`/courses/${courseId}/live-sessions`, data),
// //   removeLiveSession: (courseId, sessionId) => axios.delete(`/courses/${courseId}/live-sessions/${sessionId}`),

// //   addRating: (courseId, data) => axios.post(`/courses/${courseId}/ratings`, data),
// // }







// // client/src/api/courseApi.js
// import axios from './axiosConfig';

// export const courseApi = {
//   // Get all courses (user view)
//   getAllCourses: async (params = {}) => {
//     const { category, difficulty, search } = params;
//     const queryParams = new URLSearchParams();
    
//     if (category && category !== 'All Categories') {
//       queryParams.append('category', category);
//     }
//     if (difficulty) {
//       queryParams.append('difficulty', difficulty);
//     }
//     if (search) {
//       queryParams.append('search', search);
//     }
    
//     return await axios.get(`/courses?${queryParams.toString()}`);
//   },

//   // Get single course
//   getCourseById: async (courseId) => {
//     return await axios.get(`/courses/${courseId}`);
//   },

//   // Get courses by category
//   getCoursesByCategory: async (category) => {
//     return await axios.get(`/courses/category/${category}`);
//   },

//   // Admin: Get all courses
//   getAllCoursesAdmin: async () => {
//     return await axios.get('/courses/admin/all');
//   },

//   // Admin: Create course
//   createCourse: async (courseData) => {
//     return await axios.post('/courses', courseData);
//   },

//   // Admin: Update course
//   updateCourse: async (courseId, courseData) => {
//     return await axios.put(`/courses/${courseId}`, courseData);
//   },

//   // Admin: Delete course
//   deleteCourse: async (courseId) => {
//     return await axios.delete(`/courses/${courseId}`);
//   },

//   // Admin: Get course statistics
//   getCourseStats: async () => {
//     return await axios.get('/courses/stats/overview');
//   },
// };









// client/src/api/courseApi.js
import axios from "./axiosConfig";

export const courseApi = {
  // =========================
  // Courses (User)
  // =========================
  getAllCourses: async (params = {}) => {
    const { category, difficulty, search } = params;
    const queryParams = new URLSearchParams();

    if (category && category !== "All Categories") {
      queryParams.append("category", category);
    }
    if (difficulty && difficulty !== "All Levels") {
      queryParams.append("difficulty", difficulty);
    }
    if (search) {
      queryParams.append("search", search);
    }

    return await axios.get(`/courses?${queryParams.toString()}`);
  },

  getCourseById: async (courseId) => {
    return await axios.get(`/courses/${courseId}`);
  },

  getCoursesByCategory: async (category) => {
    return await axios.get(`/courses/category/${category}`);
  },

  // =========================
  // Courses (Admin)
  // =========================
  getAllCoursesAdmin: async () => {
    return await axios.get("/courses/admin/all");
  },

  createCourse: async (courseData) => {
    return await axios.post("/courses", courseData);
  },

  updateCourse: async (courseId, courseData) => {
    return await axios.put(`/courses/${courseId}`, courseData);
  },

  deleteCourse: async (courseId) => {
    return await axios.delete(`/courses/${courseId}`);
  },

  getCourseStats: async () => {
    return await axios.get("/courses/stats/overview");
  },

  // =========================
  // Materials (User)
  // =========================
  getCourseMaterials: async (courseId) => {
    return await axios.get(`/materials/course/${courseId}`);
  },

  // =========================
  // Materials (Admin)
  // =========================
  createMaterial: async (formData) => {
    return await axios.post("/materials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateMaterial: async (materialId, formData) => {
    return await axios.put(`/materials/${materialId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteMaterial: async (materialId) => {
    return await axios.delete(`/materials/${materialId}`);
  },

  getAllMaterialsAdmin: async () => {
    return await axios.get("/materials/admin/all");
  },
};
