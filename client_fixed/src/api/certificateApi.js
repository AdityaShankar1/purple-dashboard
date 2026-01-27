import axios from "./axiosConfig"

export const certificateApi = {
  getUserCertificates: () => axios.get("/certificates"),

  getCertificate: (certificateId) => axios.get(`/certificates/${certificateId}`),

  downloadCertificate: (certificateId) => axios.get(`/certificates/${certificateId}/download`),

  verifyCertificate: (shareToken) => axios.get(`/certificates/verify/${shareToken}`),

  getAdminCertificates: () => axios.get(`/certificates/admin/all`),

  getAdminCertificatesByCourse: (courseId) => axios.get(`/certificates/admin/course/${courseId}`),

  getAdminCertificate: (certificateId) => axios.get(`/certificates/admin/${certificateId}`),
}
