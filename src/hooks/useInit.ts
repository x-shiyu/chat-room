import { useRecoilState } from "recoil";
import { AtomChatRoom, AtomContacts } from "@/atoms/ChatInfo";
import { AtomNewContactReq, AtomUserInfo } from "@/atoms/AuthStatus";
import { useEffect } from "react";
import { getContacts, getAllRoomList, getReceivedContacts } from "@/api/chat";
import { getUserInfo } from "@/api/auth";
import { AtomLogin } from "@/atoms/AuthStatus";
import { AtomSockets } from "@/atoms/Sockets";
import { createQuerySocket } from "@/utils/socket-io";
import { mapAdd } from "@/utils";
import { handleGlobalSocket } from "@/socket-handle/handle-global";
import { AtomNewNotice } from "@/atoms/Notice";
import { mapAndArray } from "@/utils";

export default function useInit() {
  let [_, setChatRoom] = useRecoilState(AtomChatRoom);
  let [contacts, setContacts] = useRecoilState(AtomContacts);
  let [userInfo, setUserInfo] = useRecoilState(AtomUserInfo);
  let [oContactReq, setNContactReq] = useRecoilState(AtomNewContactReq);
  let [___, setNewNotice] = useRecoilState(AtomNewNotice);
  let [isLogin] = useRecoilState(AtomLogin);

  const [sockets, setSockets] = useRecoilState(AtomSockets);

  useEffect(() => {
    if (isLogin) {
      let latest_view_contact = localStorage.getItem("latest_view_contact");
      let latest_view_room = localStorage.getItem("latest_view_room");
      setNewNotice({
        latest_view_contact: latest_view_contact
          ? Number(latest_view_contact)
          : 0,
        latest_view_room: mapAndArray(latest_view_room) as Map<number, number>,
      });

      //初始化数据
      Promise.all([
        getAllRoomList(),
        getUserInfo(),
        getContacts(),
        getReceivedContacts(),
      ]).then(([rooms, userInfo, contacts, newContactReq]) => {
        let socket = createQuerySocket(
          "/",
          handleGlobalSocket(
            newContactReq,
            setNContactReq,
            contacts,
            setContacts
          )
        );

        setSockets(mapAdd(sockets, "user_" + userInfo.id, socket));

        setNContactReq(newContactReq);
        setChatRoom(rooms);
        setContacts(contacts);
        setUserInfo({
          ...userInfo,
        });
      });
    }
  }, [isLogin]);

  return {
    userInfo,
    isLogin,
  };
}
