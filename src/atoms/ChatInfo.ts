import { atom } from "recoil";
import { Socket } from "socket.io-client";

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

export const AtomIO = atom<Socket | undefined>({
  key: "socket-io",
  default: undefined,
});
