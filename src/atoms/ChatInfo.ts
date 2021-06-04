import { atom } from "recoil";
import { mockChatRooms } from "@/mock";

export const ChatPerson = atom({
  key: "chat-person",
  default: mockChatRooms(),
});

export const ChatList = atom({
  key: "chat-list",
  default: null,
});

export const CurrentTarget = atom({
  key: "current-target",
  default: null,
});
