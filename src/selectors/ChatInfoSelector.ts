import { selectorFamily } from "recoil";
import { AtomChatList, Msg } from "@/atoms/ChatInfo";
export const ChatRoomList = selectorFamily<Msg[] | undefined, number>({
  key: "contact-chat-list",
  get:
    (id: number) =>
    ({ get }) => {
      let chatList = get(AtomChatList).get(id.toString());
      if (chatList) {
        return chatList;
      }
      return undefined;
    },
  set:
    (id: number) =>
    ({ get, set }, newValue: any) => {
      let chatList = get(AtomChatList);
      let roomData = chatList.get(id.toString());
      if (Array.isArray(roomData)) {
        roomData.push(newValue);
      }
      chatList.set(id.toString(), roomData as Msg[]);
      set(AtomChatList, chatList);
    },
});
