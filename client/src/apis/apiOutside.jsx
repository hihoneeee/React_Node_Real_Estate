import axios from "axios";

export const apiUploadImages = (data) =>
  axios({
    method: "post",
    url: `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/image/upload`,
    data,
  });

export const apiGetCityUSA = (data) =>
  axios({
    method: "get",
    url: "https://freetestapi.com/api/v1/us-states?sort=name&order=asc",
    data,
  });
