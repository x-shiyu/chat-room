import { useRecoilState, useRecoilValue } from "recoil";
import { getChatRooms } from "@/selectors/ChatInfoSelector";
import { useEffect, useRef } from "react";
export default function useInit() {
  let isInit = useRef(false);
  let chatRooms = useRecoilValue(getChatRooms);
  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true;
    }
  }, [isInit]);
}
