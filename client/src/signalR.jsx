import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import { useNotificationStore } from "./store";

let connection = null;

export const startSignalRConnection = (token) => {
  return new Promise((resolve, reject) => {
    const hubUrl = `${import.meta.env.VITE_SERVER_SIGNALR_URL}/chathub`; // Use the environment variable for the URL
    connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token,
        withCredentials: true, // Ensure credentials are included
      })
      .build();
    console.log(token);

    connection
      .start()
      .then(() => {
        console.log("SignalR connected");
        connection.invoke("GetConnectionId").then((connectionId) => {
          console.log("ConnectionId:", connectionId); // Log the connectionId
          window.connectionId = connectionId;
          resolve(connection); // Resolve the Promise with the connection object
        });
      })
      .catch((err) => {
        console.error(err.toString());
        reject(err); // Reject the Promise with the error
      });

    connection.on("ReceiveNotification", (notificationContent) => {
      console.log("Received notification:", notificationContent); // Log the received notification

      // Show toast notification
      toast.info(notificationContent.content);

      // Update Zustand store
      const { addNotification } = useNotificationStore.getState();
      addNotification(notificationContent); // Add the notification to the store
    });
  });
};

export const getSignalRConnection = () => {
  return connection;
};
