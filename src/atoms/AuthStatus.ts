import { atom } from "recoil";
import { getToken } from "@/utils/storage";
export interface UserInfo {
  name?: string;
  id?: number;
}

export const AtomLogin = atom({
  key: "login",
  default: getToken() ? true : false,
});

export const AtomUserInfo = atom<UserInfo>({
  key: "user-info",
  default: {},
});

export const AtomActiveRoomId = atom<number>({
  key: "active-room",
  default: -1,
});

export const AtomActiveContact = atom<number>({
  key: "active-contact",
  default: -1,
});


export const AtomReceivedContacts = atom<any[]>({
  key:'received-contacts',
  default:[]
})
