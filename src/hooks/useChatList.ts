import { useRecoilState, useResetRecoilState } from "recoil";
import { AtomChatList } from "@/atoms/ChatInfo";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllRoomList } from "@/api/chat";
import { AtomLogin } from "@/atoms/AuthStatus";

export default function useChatList(id: number) {
  let [chatList, setChatList] = useRecoilState(AtomChatList);
  let [isLogin] = useRecoilState(AtomLogin);
  let resetChatList = useResetRecoilState(AtomChatList);
  let location = useLocation();

  useEffect(() => {
    // @ts-ignore
    getAllRoomList().then((data: any[]) => {
      debugger;
      // setChatList(data.map((item) => JSON.parse(item)));
    });
  }, [isLogin]);

  useEffect(() => {
    return () => {
      resetChatList();
    };
  }, [location.pathname]);
  return {
    chatList,
    setChatList,
    resetChatList,
  };
}
