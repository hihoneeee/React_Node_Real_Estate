// export const usePropertyTypeStore = create((set) => ({
//   propertyTypes: null,
//   setPropertyTypes: (propertyTypes) => set(() => ({ propertyTypes })),
//   getPropertyType: async (params) => {
//     try {
//       const response = await apiGetPropertyType(params);
//       if (response.success) {
//         set(() => ({ propertyTypes: response.PropertyTypes }));
//       } else {
//         set(() => ({ propertyTypes: null }));
//       }
//     } catch (error) {
//       set(() => ({ propertyTypes: null }));
//     }
//   },
//   apiGetPropertyTypeId: async (id) => {
//     try {
//       const response = await apiGetPropertyTypeId(id);
//       if (response.data.success) {
//         set(() => ({ propertyTypes: response.data.propertyTypes }));
//       } else {
//         set(() => ({ propertyTypes: null }));
//       }
//     } catch (error) {
//       set(() => ({ propertyTypes: null }));
//     }
//   },
// }));
import { create } from "zustand";

export const usePropertyTypeStore = create((set) => ({
  propertyTypes: null,
  propertyType: null,
  setPropertyTypes: (propertyTypes) => set(() => ({ propertyTypes })),
  setPropertyType: (propertyType) => set(() => ({ propertyType })),
}));
