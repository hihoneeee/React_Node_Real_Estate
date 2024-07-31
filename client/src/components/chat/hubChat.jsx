import { useState, useRef, useEffect } from "react";
import { useConversationStore } from "src/store/useConversationStore";
import { useUserStore } from "src/store";
import icons from "src/utils/icons";
import { getSignalRConnection, joinRoom, leaveRoom } from "src/signalR";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const { FaSearch } = icons;

const HubChat = () => {
  const { conversation, setIsConnectedHub } = useConversationStore();
  const { current } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const hubChatRef = useRef(null);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.dataMessages);
    }
  }, [conversation]);

  useEffect(() => {
    const connection = getSignalRConnection();
    if (connection) {
      connection.on("ReceiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        setIsConnectedHub(true);
      });
    }
    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
        setIsConnectedHub(false);
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

  const handleClickOutside = (event) => {
    if (hubChatRef.current && !hubChatRef.current.contains(event.target)) {
      if (conversation) {
        console.log("Leaving room:", conversation.id); // Log leaving room
        leaveRoom(conversation.id).then(() => {
          setIsConnectedHub(false);
        });
      }
    }
  };

  useEffect(() => {
    if (conversation) {
      console.log("Joining room:", conversation.id); // Log joining room
      joinRoom(conversation.id).then(() => {
        setIsConnectedHub(true);
      });
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [conversation, setIsConnectedHub]);

  return (
    <>
      {conversation && (
        <div ref={hubChatRef} className="w-[70%]">
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
                      className={`max-w-[70%] p-2 m-1 rounded-lg group hover:cursor-pointer relative ${
                        isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black "
                      }`}
                    >
                      <p className={twMerge(clsx(isCurrentUser ? "" : ""))}>
                        {msg.content}
                      </p>
                      <small
                        className={`absolute bottom-0 text-xs text-white bg-overlay-30 px-2 py-1 rounded-lg hidden group-hover:inline-block transition-opacity ${
                          isCurrentUser ? "right-10" : "left-10"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleString()}
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
