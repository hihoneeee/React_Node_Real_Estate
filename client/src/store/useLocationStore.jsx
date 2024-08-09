import { apiGetCityUSA } from "src/apis/apiOutside";
import { create } from "zustand";

export const useLocationStore = create((set) => ({
  cities: null,
  states: null,
  getCities: async () => {
    try {
      const response = await apiGetCityUSA();
      set(() => ({ cities: response.data }));
    } catch (error) {
      set(() => ({ cities: null }));
    }
  },
}));
