import { useState } from "react";
import { useRecoilState } from "recoil";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";
import { SocketContext } from "@/layout/BaseLayout/BaseLayout";
import { useContext } from "react";
import { Socket } from "socket.io-client";

export default function useChatInput() {
  let [activeRoomId] = useRecoilState(AtomActiveRoomId);
  const [value, setValue] = useState("");
  let socketAction = useContext(SocketContext);
  let handleClick = async () => {
    let socket = socketAction?.sockets.get(activeRoomId) as Socket;
    setValue("");
    socket.emit("add_msg", value);
  };
  let handleInputChange = (ev: any) => {
    let value = ev.target.value;
    setValue(value);
  };

  return {
    value,
    handleClick,
    handleInputChange,
  };
}
