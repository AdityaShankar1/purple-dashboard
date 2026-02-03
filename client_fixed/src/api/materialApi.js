// import axios from "./axiosConfig"

// export const materialApi = {
//   uploadMaterial: (courseId, data) => axios.post(`/materials/${courseId}/upload`, data),

//   getCourseMaterials: (courseId) => axios.get(`/materials/course/${courseId}`),

//   markMaterialViewed: (courseId, materialId, timeSpent) =>
//     axios.post(`/materials/${courseId}/${materialId}/view`, { timeSpent }),

//   deleteMaterial: (materialId) => axios.delete(`/materials/${materialId}`),
// }









// client/src/api/materialApi.js
import axios from './axiosConfig';

export const materialApi = {
  // Get all materials for a course
  getCourseMaterials: async (courseId) => {
    return await axios.get(`/materials/course/${courseId}`);
  },

  // Get single material
  getMaterial: async (materialId) => {
    return await axios.get(`/materials/${materialId}`);
  },

  // Mark material as viewed
  markMaterialViewed: async (courseId, materialId, duration = 0) => {
    return await axios.post('/materials/view', {
      courseId,
      materialId,
      duration
    });
  },

  // Admin: Create material
  createMaterial: async (materialData) => {
    return await axios.post('/materials', materialData);
  },

  // Admin: Update material
  updateMaterial: async (materialId, materialData) => {
    return await axios.put(`/materials/${materialId}`, materialData);
  },

  // Admin: Delete material
  deleteMaterial: async (materialId) => {
    return await axios.delete(`/materials/${materialId}`);
  },

  // Admin: Get all materials
  getAllMaterials: async () => {
    return await axios.get('/materials/admin/all');
  }
};