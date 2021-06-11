import { Socket } from "socket.io-client";

export function addMsg() {}

export default function addHandle(socket: Socket) {
  socket.on("add_msg", (msg) => {
    console.log(msg);
  });
}
