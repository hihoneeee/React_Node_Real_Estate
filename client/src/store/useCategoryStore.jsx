import { apiGetCategory, apiGetCategoryId } from "src/apis/category";
import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  categories: null,
  category: null,
  getCategories: async (params) => {
    try {
      const response = await apiGetCategory(params);
      if (response.success) {
        set(() => ({ categories: response.data }));
      } else {
        set(() => ({ categories: null }));
      }
    } catch (error) {
      set(() => ({ categories: null }));
    }
  },
  getCategory: async (id) => {
    try {
      const response = await apiGetCategoryId(id);
      if (response.success) {
        set(() => ({ category: response.data }));
      } else {
        set(() => ({ category: null }));
      }
    } catch (error) {
      set(() => ({ category: null }));
    }
  },
}));
