import { apiGetConversations } from "src/apis/conversation";
import { create } from "zustand";

export const useConversationStore = create((set) => ({
  conversations: null,
  conversation: null,
  getConversations: async () => {
    try {
      const response = await apiGetConversations();
      if (response.success) {
        set(() => ({ conversations: response.data }));
      } else {
        set(() => ({ conversations: null }));
      }
    } catch (error) {
      set(() => ({ conversations: null }));
    }
  },
  getConversation: async () => {},
}));
