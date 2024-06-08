import axios from "src/axios";
export const apiGetProperties = (params) =>
  axios({
    url: "/property/",
    method: "GET",
    params,
  });
