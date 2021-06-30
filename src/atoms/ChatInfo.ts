import { atom } from "recoil";
import { Socket } from "socket.io-client";

export interface Msg {
  id: number;
  message: string;
  created_at: string;
  from_name: string;
  from_id: number;
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
