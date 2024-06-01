import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let token = window.localStorage.getItem("Real Estate");
    if (token) token = JSON.parse(token);
    if (token.state?.token)
      config.headers = {
        Authorization: `Bearer ${token.state?.token}`,
      };
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return error.response.data;
  }
);

export default instance;
