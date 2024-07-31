import { useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../inputs/inputForm";
import icons from "src/utils/icons";
import { useConversationStore } from "src/store/useConversationStore";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { joinRoom, leaveRoom } from "src/signalR";

const { FaSearch } = icons;

const MessageSidebar = () => {
  const { conversations } = useConversationStore();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleConversationClick = (id, receiver) => {
    if (activeConversationId) {
      leaveRoom(activeConversationId);
    }
    setActiveConversationId(id);
    const payload = { receiverId: receiver };
    useConversationStore.getState().getConversation(payload);

    joinRoom(id);
  };

  return (
    <div className="w-[30%] h-fit space-y-3 p-2 rounded-r-md border-r">
      <h3 className="desktop:text-2xl laptop:text-xl text-base font-semibold text-main-500">
        Message chat
      </h3>
      <form className="relative">
        <InputForm
          id="first_name"
          placeholder="Enter search... "
          register={register}
          containerClassName="w-full py-0"
          errors={errors}
          isRequired={false}
        />
        <div className="absolute top-2 right-2 hover:cursor-pointer rounded-full hover:bg-overlay-30 p-2 text-gray-400 hover:text-main-600">
          <FaSearch size={12} />
        </div>
      </form>
      <div
        className={twMerge(
          clsx(conversations?.length > 7 ? "overflow-auto h-[30rem]" : "h-fit")
        )}
      >
        {conversations?.length > 0 &&
          conversations.map((el) => (
            <div
              key={el.id}
              className={twMerge(
                clsx(
                  "flex items-center gap-2 p-2 group rounded-lg cursor-pointer transition-all",
                  {
                    "bg-overlay-10": el.id === activeConversationId,
                    "hover:bg-overlay-10": el.id !== activeConversationId,
                  }
                )
              )}
              onClick={() => handleConversationClick(el.id, el?.dataUser?.id)}
            >
              <div className="relative bg-transparent rounded-full">
                <img
                  src={el?.dataUser?.avatar}
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover "
                />
                <p className="h-3 w-3 bg-blue-500 rounded-full absolute right-0 bottom-0"></p>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium desktop:text-base laptop:text-sm text-xs transition-all">
                    {el?.dataUser?.first_name} {el?.dataUser?.last_name}
                  </p>
                  <span className="laptop:text-xs text-xxs text-gray-400 group-hover:text-gray-500">
                    1 hour ago
                  </span>
                </div>
                <span className="text-gray-400 desktop:text-sm laptop:text-xs text-xxs group-hover:text-gray-500">
                  Lorem Ipsum is simply textasd áda...
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessageSidebar;
