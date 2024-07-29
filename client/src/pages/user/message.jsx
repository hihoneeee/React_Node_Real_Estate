import { useEffect } from "react";
import { HubChat, MessgaeSidebar } from "src/components";
import { useUserStore } from "src/store";
import { useConversationStore } from "src/store/useConversationStore";

const Message = () => {
  const { getConversations } = useConversationStore();
  const { token } = useUserStore();

  useEffect(() => {
    getConversations();
  }, [token]);

  return (
    <div className="flex">
      <MessgaeSidebar />
      <HubChat />
    </div>
  );
};

export default Message;
