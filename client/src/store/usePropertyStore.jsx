import { toast } from "react-toastify";
import { apiGetProperties, apiGetProperty } from "src/apis/property";
import { create } from "zustand";

export const usePropertyStore = create((set) => ({
  properties: null,
  property: null,
  similarProperties: [],
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
    }
  },
  getProperty: async (params) => {
    try {
      const response = await apiGetProperty(params);
      if (response.success) {
        set(() => ({ property: response.data }));
      } else {
        set(() => ({ property: null }));
      }
    } catch (error) {
      set(() => ({ property: null }));
    }
  },
  getSimilarProperties: async (params) => {
    try {
      const response = await apiGetProperties(params);
      if (response.success) {
        set(() => ({ similarProperties: response.data }));
      } else {
        set(() => ({ similarProperties: [] }));
      }
    } catch (error) {
      console.error("Error fetching similar properties:", error);
      set(() => ({ similarProperties: [] }));
    }
  },
}));
