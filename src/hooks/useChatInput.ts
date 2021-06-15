import { useState } from "react";
import { useRecoilState } from "recoil";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";
import { AtomSockets } from "@/atoms/Sockets";

export default function useChatInput() {
  let [activeRoomId] = useRecoilState(AtomActiveRoomId);
  let [sockets] = useRecoilState(AtomSockets);
  const [value, setValue] = useState("");
  let handleClick = async () => {
    let socket = sockets.get("room_" + activeRoomId);
    setValue("");
    socket?.emit("add_msg", value);
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
