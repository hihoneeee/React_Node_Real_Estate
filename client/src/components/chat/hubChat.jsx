import { useState, useRef } from "react";
import icons from "src/utils/icons";

const { FaSearch } = icons;

const messagesData = [
  { id: 1, text: "Hello!", sender: "user" },
  { id: 2, text: "Hi there!", sender: "other" },
  { id: 3, text: "How are you?", sender: "user" },
  { id: 4, text: "I'm good, thanks!", sender: "other" },
  // Add more messages as needed
];

const HubChat = () => {
  const [messages, setMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-[70%]">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/da7u0cpve/image/upload/v1721925064/dd7j4fzhzbzciz5dtndo.jpg"
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="desktop:text-2xl laptop:text-xl text-base font-semibold ml-2">
            Hohi Dayne
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
              index < arr.length - 1 && arr[index + 1].sender === msg.sender;
            return (
              <div
                key={msg.id}
                className={`flex items-end ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mt-2`}
              >
                {!isSameSenderAsPrev && (
                  <img
                    src="https://res.cloudinary.com/da7u0cpve/image/upload/v1721925064/dd7j4fzhzbzciz5dtndo.jpg"
                    alt="avatar"
                    className="h-6 w-6 rounded-full object-cover mr-2"
                  />
                )}
                <div
                  className={`max-w-[70%] p-2 m-1 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p>{msg.text}</p>
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
  );
};

export default HubChat;
