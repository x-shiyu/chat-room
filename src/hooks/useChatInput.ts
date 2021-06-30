import { useState } from "react";
import { useRecoilState } from "recoil";
import { AtomActiveRoomId } from "@/atoms/AuthStatus";
import { sendMsg } from "@/api/chat";
import { message } from "antd";

export default function useChatInput() {
  let [activeRoomId] = useRecoilState(AtomActiveRoomId);
  const [value, setValue] = useState("");
  let handleClick = async () => {
    sendMsg(activeRoomId, value).then((data: any) => {
      setValue("");
      if (data.code !== 200) {
        message.error(data.msg);
      }
    });
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
