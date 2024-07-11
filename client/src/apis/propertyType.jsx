import axios from "src/axios";
export const apiCreatePropertyType = (data) =>
  axios({
    url: "/property-type/",
    method: "POST",
    data,
  });

export const apiUpdatePropertyType = (data) =>
  axios({
    url: "/property-type/",
    method: "PUT",
    data,
  });

export const apiGetPropertyType = (params) =>
  axios({
    url: "/property-type/",
    method: "GET",
    params,
  });

export const apiDeletePropertyType = (data) =>
  axios({
    url: "/property-type/",
    method: "DELETE",
    data,
  });

export const apiGetPropertyTypeId = async (id) => {
  return await axios({
    url: `/property-type/get-one-type/${id}`,
    method: "GET",
  });
};

// function normalizeUrl(url, params) {
//   if (params) {
//     return `${url}/?${params.fields ? `fields=${params.fields}` : ""}`;
//   }
//   return url;
// }

// export const propertiesApiRequest = {
//   get: (url, params) => http.get(normalizeUrl(url, params)),
// };
