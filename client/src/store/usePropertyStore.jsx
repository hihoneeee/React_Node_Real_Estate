import { toast } from "react-toastify";
import { apiGetProperties } from "src/apis/property";
import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  properties: null,
  getProperties: async (params) => {
    try {
      const response = await apiGetProperties(params);
      if (response.success) {
        set(() => ({ properties: response }));
      } else {
        set(() => ({ properties: null }));
        toast.error(response.msg);
      }
    } catch (error) {
      set(() => ({ properties: null }));
      toast.error("An error occurred while fetching properties.");
    }
  },
}));
