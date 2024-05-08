import axios from "src/axios";
export const apiRegister = (data) =>
  axios({
    url: "/auth/register",
    method: "POST",
    data,
  });
