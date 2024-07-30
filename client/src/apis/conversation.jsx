import axios from "src/axios";

export const apiGetConversations = () =>
  axios({
    url: "/conversations/",
    method: "GET",
  });

export const apiGetConversation = (data) =>
  axios({
    url: "/conversations/GetOrCreate",
    method: "POST",
    data,
  });
