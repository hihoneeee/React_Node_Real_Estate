import { apiGetConversations, apiGetConversation } from "src/apis/conversation";
import { create } from "zustand";

export const useConversationStore = create((set) => ({
  conversations: null,
  conversation: null,
  isConnectedHub: false,
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
  getConversation: async (payload) => {
    try {
      const response = await apiGetConversation(payload);
      if (response.success) {
        set(() => ({ conversation: response.data }));
      } else {
        set(() => ({ conversation: null }));
      }
    } catch (error) {
      set(() => ({ conversation: null }));
    }
  },
  setIsConnectedHub: (isConnected) =>
    set(() => ({ isConnectedHub: isConnected })),
}));
