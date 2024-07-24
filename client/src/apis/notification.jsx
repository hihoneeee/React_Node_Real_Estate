import axios from "src/axios";
export const apiGetNotification = () => {
  return axios({
    url: "/notification/",
    method: "GET",
  });
};
