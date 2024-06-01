import Cookies from "js-cookie";
import { apiRefreshToken } from "src/apis/auth";
import { apiGetCurrent } from "src/apis/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      current: null,
      setToken: (token) => set(() => ({ token })),
      getCurrent: async () => {
        const response = await apiGetCurrent();
        if (response.success) {
          return set(() => ({ current: response.data }));
        } else {
          set(() => ({ current: null }));
          const refreshToken = Cookies.get("refresh_token");
          if (refreshToken) {
            const response = await apiRefreshToken({
              refresh_token: refreshToken,
            });
            if (response.success) {
              set(() => ({ token: response.access_token }));
              const retryResponse = await apiGetCurrent();
              if (retryResponse.success) {
                return set(() => ({ current: retryResponse.data }));
              } else {
                return set(() => ({ current: null }));
              }
            } else {
              return set(() => ({ current: null }));
            }
          } else {
            console.error("No refresh token available in cookies");
          }
        }
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
