import { toast } from "react-toastify";
import { apiGetProperties, apiGetProperty } from "src/apis/property";
import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  properties: null,
  property: null,
  getProperties: async (params) => {
    try {
      const response = await apiGetProperties(params);
      if (response.success) {
        set(() => ({ properties: response }));
      } else {
        set(() => ({ properties: null }));
        toast.error(response.message);
      }
    } catch (error) {
      set(() => ({ properties: null }));
      toast.error("An error occurred while fetching properties.");
    }
  },
  getProperty: async (params) => {
    try {
      const response = await apiGetProperty(params);
      if (response.success) {
        set(() => ({ property: response }));
      } else {
        set(() => ({ property: null }));
        toast.error(response.message);
      }
    } catch (error) {
      set(() => ({ property: null }));
      console.log("An error occurred while fetching properties.");
    }
  },
}));
