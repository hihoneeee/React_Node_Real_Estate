import axios from "src/axios";
export const apiRegister = (data) =>
  axios({
    url: "/auth/register",
    method: "POST",
    data,
  });

export const apiLogin = (data) =>
  axios({
    url: "/auth/login",
    method: "POST",
    data,
  });
  
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
