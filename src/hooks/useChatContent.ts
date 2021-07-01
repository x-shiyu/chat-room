import { useRecoilState } from "recoil";
import { AtomUserInfo, UserInfo, AtomActiveRoomId } from "@/atoms/AuthStatus";
import { useEffect, useRef } from "react";
import { ChatRoomList } from "@/selectors/ChatInfoSelector";
import { getRoomInfoById } from "@/api/chat";
import { createRoomSocket } from "@/utils/socket-io";
import { AtomSockets } from "@/atoms/Sockets";
import { mapAdd } from "@/utils";
import { receive_msg } from "@/socket-handle/handle-room";

export default function useChatContent() {
  let [activeRoom] = useRecoilState<number>(AtomActiveRoomId);
  let ref = useRef<HTMLUListElement>(null);
  let [chatList, setChatList] = useRecoilState(ChatRoomList(activeRoom));
  let [userInfo] = useRecoilState<UserInfo>(AtomUserInfo);
  let [sockets, setSockets] = useRecoilState(AtomSockets);
  useEffect(() => {
    if (activeRoom !== -1) {
      if (!sockets.get("room_" + activeRoom)) {
        let socket = createRoomSocket(activeRoom, {
          [receive_msg.name]: receive_msg(setChatList),
        });
        setSockets(mapAdd(sockets, "room_" + activeRoom, socket));
      }
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
