import { mockChatRooms, mockChatList } from "@/mock";
import { selector } from "recoil";
import { CurrentTarget } from "@/atoms/ChatInfo";

export const getChatRooms = selector({
  key: "selector-chat-room",
  get: (id) => async () => {
    return mockChatRooms();
  },
});

export const getChatList = selector({
  key: "selector-chat-list",
  async get({ get }) {
    let response = await mockChatList(get(CurrentTarget));
    return response;
  },
});
