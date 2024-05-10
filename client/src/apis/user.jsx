import axios from "src/axios";
export const apiGetCurrent = (data) =>
  axios({
    url: "/user/",
    method: "GET",
    data,
  });
