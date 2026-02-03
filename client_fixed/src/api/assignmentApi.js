// // import axios from "./axiosConfig"

// // export const assignmentApi = {
// //   // admin
// //   getAdminAssignments: (params = {}) => axios.get("/assignments", { params }),
// //   createAssignment: (data) => axios.post("/assignments", data),
// //   updateAssignment: (id, data) => axios.patch(`/assignments/${id}`, data),
// //   deleteAssignment: (id) => axios.delete(`/assignments/${id}`),

// //   // user
// //   getUserAssignments: () => axios.get("/assignments/user"),
// //   submitAssignment: (id, payload) => axios.post(`/assignments/${id}/submit`, payload),
// // }





// import axios from "./axiosConfig"

// export const assignmentApi = {
//   // admin
//   getAdminAssignments: (params = {}) => axios.get("/assignments", { params }),
//   createAssignment: (data) => axios.post("/assignments", data),
//   updateAssignment: (id, data) => axios.patch(`/assignments/${id}`, data),
//   deleteAssignment: (id) => axios.delete(`/assignments/${id}`),

//   // user
//   getUserAssignments: () => axios.get("/assignments/user"),
//   submitAssignment: (id, payload) => axios.post(`/assignments/${id}/submit`, payload),
// }

// export const {
//   createAssignment,
//   updateAssignment,
//   deleteAssignment,
//   getAdminAssignments,
//   getUserAssignments,
//   submitAssignment,
// } = assignmentApi





import axios from "./axiosConfig"

export const assignmentApi = {
  getAssignment: (assignmentId) => axios.get(`/assignments/${assignmentId}`),

  getUserAssignments: (courseId) => axios.get(`/assignments/course/${courseId}`),

  saveDraft: (submissionId, text) => axios.post(`/assignments/${submissionId}/draft`, { submissionText: text }),

  submitAssignment: (submissionId, text) => axios.post(`/assignments/${submissionId}/submit`, { submissionText: text }),

  getSubmissions: (assignmentId) => axios.get(`/assignments/${assignmentId}/submissions`),

  gradeAssignment: (submissionId, grade, feedback) =>
    axios.patch(`/assignments/${submissionId}/grade`, { grade, feedback }),

  createAssignment: (data) => axios.post(`/assignments`, data),

  updateAssignment: (assignmentId, data) => axios.patch(`/assignments/${assignmentId}`, data),

  deleteAssignment: (assignmentId) => axios.delete(`/assignments/${assignmentId}`),
}
