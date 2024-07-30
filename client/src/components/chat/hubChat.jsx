import { useState, useRef, useEffect } from "react";
import { useConversationStore } from "src/store/useConversationStore";
import { useUserStore } from "src/store";
import icons from "src/utils/icons";
import { getSignalRConnection } from "src/signalR";

const { FaSearch } = icons;

const HubChat = () => {
  const { conversation } = useConversationStore();
  const { current } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.dataMessages);
    }
  }, [conversation]);

  useEffect(() => {
    const connection = getSignalRConnection();
    if (connection) {
      connection.on("ReceiveMessage", (message) => {
        console.log("Received message:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageDTO = {
        content: newMessage,
        userId: current.id,
        conversationId: conversation.id,
      };

      const connection = getSignalRConnection();
      if (connection) {
        connection
          .invoke("SendMessageAysnc", messageDTO)
          .then(() => {
            setNewMessage("");
          })
          .catch((err) => {
            console.error("Failed to send message:", err);
          });
      }
    }
  };

  return (
    <>
      {conversation && (
        <div className="w-[70%]">
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center">
              <img
                src={conversation?.dataReceiver?.avatar}
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <h4 className="desktop:text-2xl laptop:text-xl text-base font-semibold ml-2">
                {conversation?.dataReceiver?.first_name}{" "}
                {conversation?.dataReceiver?.last_name}
              </h4>
            </div>
            <div className="hover:cursor-pointer rounded-full hover:bg-overlay-30 p-2 text-gray-400 hover:text-main-600">
              <FaSearch size={18} />
            </div>
          </div>
          <div className="p-4 h-[30rem] overflow-auto flex flex-col-reverse">
            <div ref={messagesEndRef}></div>
            {messages
              .slice()
              .reverse()
              .map((msg, index, arr) => {
                const isSameSenderAsPrev =
                  index < arr.length - 1 &&
                  arr[index + 1].userId === msg.userId;
                const isCurrentUser = msg.userId === current.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    } mt-2`}
                  >
                    {!isSameSenderAsPrev && (
                      <img
                        src={msg.dataUser.avatar}
                        alt="avatar"
                        className="h-6 w-6 rounded-full object-cover mr-2"
                      />
                    )}
                    <div
                      className={`max-w-[70%] p-2 m-1 rounded-lg ${
                        isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <small>
                        {msg.dataUser.first_name}:{" "}
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="border-t p-2 flex">
            <input
              type="text"
              className="w-full p-2 border rounded-l-lg"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-main-500 text-white p-2 rounded-r-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HubChat;
