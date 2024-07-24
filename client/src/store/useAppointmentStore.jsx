import { toast } from "react-toastify";
import { apiCreateAppointment } from "src/apis/appointment";
import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  Appointment: null,
  createAppointment: async (payload) => {
    try {
      const response = await apiCreateAppointment(payload);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching properties.");
    }
  },
}));
