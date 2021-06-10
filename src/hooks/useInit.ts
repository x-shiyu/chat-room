import { useRecoilState } from "recoil";
import { AtomChatRoom } from "@/atoms/ChatInfo";
import { AtomUserInfo } from "@/atoms/AuthStatus";
import { useEffect } from "react";
import { getContacts, getAllRoomList } from "@/api/chat";
import { getUserInfo } from "@/api/auth";
import { AtomLogin } from "@/atoms/AuthStatus";

export default function useInit() {
  let [_, setChatRoom] = useRecoilState(AtomChatRoom);
  let [userInfo, setUserInfo] = useRecoilState(AtomUserInfo);
  let [isLogin] = useRecoilState(AtomLogin);

  useEffect(() => {
    if (isLogin) {
      Promise.all([getAllRoomList(), getUserInfo(), getContacts()]).then(
        ([rooms, userInfo, contacts]) => {
          setChatRoom(rooms);
          setUserInfo({
            ...userInfo,
          });
        }
      );
    }
  }, [isLogin]);

  return {
    userInfo,
    isLogin,
  };
}