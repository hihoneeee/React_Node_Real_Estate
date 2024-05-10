import { apiGetCurrent } from "src/apis/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useUserStore = create(
  persist(
    (set, get) => ({
      token: null,
      current: null,
      setToken: (token) => set(() => ({ token })),
      getCurrent: async () => {
        const response = await apiGetCurrent();
        if (response.success) return set(() => ({ current: response.data }));
      },
      clearCurrent: () => {
        set(() => ({ current: null }));
      },
    }),
    {
      name: "Real Estate",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            (el) => el[0] === "token" || el[0] === "current"
          )
        ),
    }
  )
);
