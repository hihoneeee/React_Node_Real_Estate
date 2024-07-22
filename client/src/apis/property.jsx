import axios from "src/axios";
export const apiGetProperties = (params) =>
  axios({
    url: "/property/",
    method: "GET",
    params,
  });

  export const apiGetProperty = (params) => {
    return axios({
      url: `/property/${params}`,
      method: "GET",
    });
  };