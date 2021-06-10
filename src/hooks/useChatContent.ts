import { useRecoilState } from "recoil";
import { AtomUserInfo, UserInfo, AtomActiveRoomId } from "@/atoms/AuthStatus";
import { useEffect, useRef } from "react";
import { ChatRoomList } from "@/selectors/ChatInfoSelector";
import { getRoomInfoById } from "@/api/chat";

export default function useChatContent() {
  let [activeRoom] = useRecoilState<number>(AtomActiveRoomId);

  let ref = useRef<HTMLUListElement>(null);
  let [chatList, setChatList] = useRecoilState(ChatRoomList(activeRoom));
  let [userInfo] = useRecoilState<UserInfo>(AtomUserInfo);
  useEffect(() => {
    // if (ref && ref.current) {
    //   ref.current.scrollTop = ref.current.scrollHeight;
    // }
    if (!chatList && activeRoom !== -1) {
      getRoomInfoById(activeRoom).then((data) => {
        setChatList(data);
      });
    }
  }, [chatList, activeRoom]);
  return {
    chatList,
    userInfo,
    ref,
  };
}
