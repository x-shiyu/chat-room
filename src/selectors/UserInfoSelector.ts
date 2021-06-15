import { selectorFamily } from "recoil";
import { AtomContacts } from "@/atoms/ChatInfo";

export const getUserInfo = selectorFamily({
  key: "user-info-by-id",
  get:
    (id: number) =>
    ({ get }) => {
      return get(AtomContacts).find((item: any) => item.id === id);
    },
});
