import axios from "src/axios";
export const apiCreateCategory = (data) =>
  axios({
    url: "/category/",
    method: "POST",
    data,
  });

export const apiUpdateCategory = (data) =>
  axios({
    url: "/category/",
    method: "PUT",
    data,
  });

export const apiGetCategory = (params) =>
  axios({
    url: "/category/",
    method: "GET",
    params,
  });

export const apiDeleteCategory = (data) =>
  axios({
    url: "/category/",
    method: "DELETE",
    data,
  });

export const apiGetCategoryId = async (id) => {
  return await axios({
    url: `/category/${id}`,
    method: "GET",
  });
};
