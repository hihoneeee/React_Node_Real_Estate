import {
  apiGetPropertyType,
  apiGetPropertyTypeId,
} from "src/apis/propertyType";
import { create } from "zustand";

export const usePropertyTypeStore = create((set) => ({
  propertyTypes: null,
  propertyType: null,
  getPropertyType: async (params) => {
    try {
      const response = await apiGetPropertyType(params);
      if (response.success) {
        set(() => ({ propertyTypes: response.data }));
      } else {
        set(() => ({ propertyTypes: null }));
      }
    } catch (error) {
      set(() => ({ propertyTypes: null }));
    }
  },
  getPropertyTypeId: async (id) => {
    try {
      const response = await apiGetPropertyTypeId(id);
      if (response.data.success) {
        set(() => ({ propertyType: response.data }));
      } else {
        set(() => ({ propertyType: null }));
      }
    } catch (error) {
      set(() => ({ propertyType: null }));
    }
  },
}));

// export const usePropertyTypeStore = create((set) => ({
//   propertyTypes: null,
//   propertyType: null,
//   setPropertyTypes: (propertyTypes) => set(() => ({ propertyTypes })),
//   setPropertyType: (propertyType) => set(() => ({ propertyType })),
// }));
