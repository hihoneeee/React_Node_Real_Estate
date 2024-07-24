import axios from "src/axios";
export const apiCreateAppointment = (data) => {
  return axios({
    url: "/appointment/",
    method: "POST",
    data,
  });
};
