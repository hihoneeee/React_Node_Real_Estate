import axios from "src/axios";

export const apiGetConversations = () =>
  axios({
    url: "/conversations/",
    method: "GET",
  });
