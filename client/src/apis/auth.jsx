import Cookies from "js-cookie";
import axios from "src/axios";
export const apiRegister = (data) =>
  axios({
    url: "/auth/register",
    method: "POST",
    data,
  });

export const apiLogin = async (data) => {
  const response = await axios({
    url: "/auth/login",
    method: "POST",
    data,
  });
  const existingRefreshToken = Cookies.get("refresh_token");
  if (existingRefreshToken) {
    Cookies.remove("refresh_token", { path: "/" });
  }
  if (response && response.success) {
    Cookies.set("refresh_token", response.refresh_token, {
      expires: 7,
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
  }
  return response;
};

export const apiLogout = () =>
  axios({
    url: "/auth/logout",
    method: "POST",
  });

export const apiRefreshToken = (data) =>
  axios({
    url: "/auth/refresh-token",
    method: "POST",
    data,
  });
