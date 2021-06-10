import { atom } from "recoil";

export interface Msg {
  id: number;
  msg: string;
  time: string;
  name: string;
  userId: number;
}

export interface RoomInfo {
  room_id: number;
  persons: any[];
  list?: Msg[];
}
export const AtomChatRoom = atom<RoomInfo[]>({
  key: "chat-person",
  default: [],
});

export const AtomChatList = atom<Map<string, Msg[]>>({
  key: "chat-list",
  default: new Map(),
});

export const AtomContacts = atom<any[]>({
  key: "contacts",
  default: [],
});
