import axios from "src/axios";
export const apiGetCurrent = (data) => {
  return axios({
    url: "/user/",
    method: "GET",
    data,
  });
};

export const apiUpdateProfile = () => {
  return axios({
    url: "/user/change-profile",
    method: "PUT",
  });
};

export const apiUpdateAvatar = () => {
  return axios({
    url: "/user/change-avatar",
    method: "PUT",
  });
};
