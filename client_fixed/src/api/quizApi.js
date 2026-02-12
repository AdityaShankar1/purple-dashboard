import axios from "./axiosConfig"

export const quizApi = {
  getQuiz: (quizId) => axios.get(`/quizzes/${quizId}`),

  getUserQuizzes: (courseId) => axios.get(`/quizzes/course/${courseId}`),

  saveAnswer: (submissionId, questionId, answer) =>
    axios.post(`/quizzes/${submissionId}/answer`, { questionId, answer }),

  submitQuiz: (submissionId) => axios.post(`/quizzes/${submissionId}/submit`),

  getSubmissions: (quizId) => axios.get(`/quizzes/${quizId}/submissions`),

  getAdminQuizzes: (courseId) =>
    courseId && courseId !== "undefined"
      ? axios.get(`/quizzes/admin/course/${courseId}`)
      : axios.get("/quizzes/admin"),

  createQuiz: (data) => axios.post(`/quizzes`, data),

  updateQuiz: (quizId, data) => axios.patch(`/quizzes/${quizId}`, data),

  deleteQuiz: (quizId) => axios.delete(`/quizzes/${quizId}`),

  allowResubmit: (submissionId) => axios.patch(`/quizzes/${submissionId}/allow-resubmit`),
}
