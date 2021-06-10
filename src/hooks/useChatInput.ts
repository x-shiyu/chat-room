import { Msg } from "@/atoms/ChatInfo";
import { useState } from "react";
import { sendMsg } from "@/api/chat";
import { ChatRoomList } from "@/selectors/ChatInfoSelector";
import { useRecoilState } from "recoil";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";

export default function useChatInput() {
  let [activeRoomId] = useRecoilState(AtomActiveRoomId);
  const [value, setValue] = useState("");
  let [chatList, setChatList] = useRecoilState(ChatRoomList(activeRoomId));
  let handleClick = async () => {
    let response = await sendMsg(activeRoomId, value);
    if (response) {
      setChatList(response);
    }
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
