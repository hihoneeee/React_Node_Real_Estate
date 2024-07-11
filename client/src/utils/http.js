import axios from "src/axios";
import envConfig from "./config";

const request = async (method, url, options) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  // hanlde headers
  // const baseHeaders = body instanceof FormData ? {
  //   Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
  // } : {
  //   'Content-Type': 'application/json',
  //   Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
  // };
  // console.log("ENV_CONFIG: ", envConfig.VITE_API_ENDPOINT);
  // const baseUrl =
  //   options?.baseUrl === undefined
  //     ? envConfig.VITE_API_ENDPOINT
  //     : options.baseUrl;
  const baseUrl = envConfig.VITE_SERVER_URL;
  const fullUrl = baseUrl + url;
  const res = await axios({
    url: fullUrl,
    method,
    body,
    headers: {
      ...options?.headers,
    },
  });
  console.log("RES:", res);

  const payload = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  return data;
};

const http = {
  get(url, options) {
    return request("GET", url, options);
  },
  post(url, body, options) {
    return request("POST", url, { ...options, body });
  },
  put(url, body, options) {
    return request("PUT", url, { ...options, body });
  },
  delete(url, options) {
    return request("DELETE", url, options);
  },
};

export default http;
