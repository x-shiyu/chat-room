import { useRecoilState } from "recoil";
import { AtomUserInfo, UserInfo, AtomActiveRoomId } from "@/atoms/AuthStatus";
import { useEffect, useRef, useContext } from "react";
import { ChatRoomList } from "@/selectors/ChatInfoSelector";
import { getRoomInfoById } from "@/api/chat";
import { createRoomSocket } from "@/utils/socket-io";
import { SocketContext } from "@/layout/BaseLayout/BaseLayout";

export default function useChatContent() {
  let [activeRoom] = useRecoilState<number>(AtomActiveRoomId);
  let ref = useRef<HTMLUListElement>(null);
  let [chatList, setChatList] = useRecoilState(ChatRoomList(activeRoom));
  let [userInfo] = useRecoilState<UserInfo>(AtomUserInfo);
  let socketAction = useContext(SocketContext);
  useEffect(() => {
    if (activeRoom !== -1) {
      let socket = createRoomSocket(activeRoom, {
        add_msg: (msg: string | boolean) => {
          // if(){
          //
          // }
        },
      });
      socketAction?.addSocket(activeRoom, socket);
      getRoomInfoById(activeRoom).then((data) => {
        setChatList(data);
      });
    }
  }, [activeRoom]);
  useEffect(() => {
    if (!chatList) {
      getRoomInfoById(activeRoom).then((data) => {
        setChatList(data);
      });
    } else {
      if (ref && ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }
  }, [chatList]);
  return {
    chatList,
    userInfo,
    ref,
  };
}
