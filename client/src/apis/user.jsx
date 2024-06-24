import axios from "src/axios";
export const apiGetCurrent = (data) => {
  return axios({
    url: "/user/",
    method: "GET",
    data,
  });
};
