import { apiGetNotification } from "src/apis/notification";
import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: [],
  getNotification: async () => {
    try {
      const response = await apiGetNotification();
      if (response.success) {
        set(() => ({ notifications: response?.data }));
      } else {
        set(() => ({ notifications: [] }));
      }
    } catch (error) {
      set(() => ({ notifications: [] }));
    }
  },
  addNotification: (notification) => {
    set((state) => {
      const updatedNotifications = [notification, ...state.notifications];
      console.log("Adding notification:", notification); // Log the new notification
      console.log("Updated notifications list:", updatedNotifications); // Log the updated notifications list
      return { notifications: updatedNotifications };
    });
  },
}));
