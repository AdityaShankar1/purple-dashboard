import axios from "./axiosConfig";

export const notificationApi = {
  // Get user notifications with safe pagination
  getUserNotifications: (params = {}) => {
    const rawPage = parseInt(params.page);
    const rawLimit = parseInt(params.limit);

    const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 20;

    return axios.get("/notifications", {
      params: { ...params, page, limit },
    });
  },

  // Mark notification as read
  markAsRead: (id) => axios.patch(`/notifications/${id}/read`),

  // Mark all notifications as read
  markAllAsRead: () => axios.patch("/notifications/read-all"),

  // Delete notification
  deleteNotification: (id) => axios.delete(`/notifications/${id}`),
};
