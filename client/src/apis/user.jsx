import axios from "src/axios";
export const apiGetCurrent = (data) => {
  return axios({
    url: "/user/",
    method: "GET",
    data,
  });
};

export const apiUpdateProfile = (data) => {
  return axios({
    url: "/user/change-profile",
    method: "PUT",
    data: data,
  });
};

export const apiUpdateAvatar = (data) => {
  return axios({
    url: "/user/change-avatar",
    method: "PUT",
    data: data,
  });
};

export const apiChangeEmail = (data) => {
  return axios({
    url: "/user/change-email",
    method: "POST",
    data: data,
  });
};

export const apiChangeEmailConfirm = (token) => {
  return axios({
    url: `/user/confirm-change-email/${token}`,
    method: "POST",
  });
};
