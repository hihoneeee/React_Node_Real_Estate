import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import { useNotificationStore, useUserStore } from "./store";
import notificationSound from "src/assets/notification.mp3";
import messageSound from "src/assets/message.mp3";

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
    connection
      .start()
      .then(() => {
        console.log("SignalR connected");
        connection.invoke("GetConnectionId").then((connectionId) => {
          console.log("ConnectionId:", connectionId); // Log the connectionId
          window.connectionId = connectionId;
          const { current } = useUserStore.getState();
          if (current) {
            connection
              .invoke("OnConnectedAsync", current.id, connectionId)
              .then(() =>
                console.log(
                  "OnConnectedAsync invoked with",
                  current.id,
                  connectionId
                )
              )
              .catch((err) =>
                console.error("Failed to invoke OnConnectedAsync:", err)
              );
          }
          resolve(connection); // Resolve the Promise with the connection object
        });
      })
      .catch((err) => {
        console.error(err.toString());
        reject(err); // Reject the Promise with the error
      });

    connection.on("ReceiveNotification", (notificationContent) => {
      const audio = new Audio(notificationSound);
      audio.play();
      toast.info(notificationContent.content);

      // Update Zustand store
      const { addNotification } = useNotificationStore.getState();
      addNotification(notificationContent); // Add the notification to the store
    });

    connection.on("ReceiveNotificationMessage", (notificationContent) => {
      const audio = new Audio(messageSound);
      audio.play();
      const content = `${notificationContent?.dataUser?.first_name} has sent you a new message!`;
      toast.info(content);
    });
  });
};

export const getSignalRConnection = () => {
  return connection;
};
