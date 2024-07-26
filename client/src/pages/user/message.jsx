import { HubChat, MessgaeSidebar } from "src/components";

const Message = () => {
  return (
    <div className="flex">
      <MessgaeSidebar />
      <HubChat />
    </div>
  );
};

export default Message;
