import { atom } from "recoil";
export interface Notice {
  latest_view_contact: number;
  latest_view_room: Map<number, number>;
}
export const AtomNewNotice = atom<Notice>({
  key: "atom-new-notice",
  default: {
    latest_view_contact: -1,
    latest_view_room: new Map(),
  },
});
