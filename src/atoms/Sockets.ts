import { atom } from "recoil";
import { Socket } from "socket.io-client";

export const AtomSockets = atom<Map<string | number, Socket>>({
  key: "sockets",
  default: new Map(),
});
