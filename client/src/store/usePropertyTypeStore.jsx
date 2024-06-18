import { apiGetPropertyType } from "src/apis/propertyType";
import { create } from "zustand";

export const usePropertyTypeStore = create((set) => ({
  propertyTypes: null,
  getPropertyType: async (params) => {
    try {
      const response = await apiGetPropertyType(params);
      if (response.success) {
        set(() => ({ propertyTypes: response.PropertyTypes }));
      } else {
        set(() => ({ propertyTypes: null }));
      }
    } catch (error) {
      set(() => ({ propertyTypes: null }));
    }
  },
}));
