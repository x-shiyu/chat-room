import { atom } from "recoil";

export const login = atom({
  key: "login",
  default: false,
});

export const username = atom({
  key: "username",
  default: "",
});
