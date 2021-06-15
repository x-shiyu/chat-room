import { useEffect, useRef, useState } from "react";
import { createContactSocket } from "@/utils/socket-io";
import { useRecoilState } from "recoil";
import { AtomUserInfo, UserInfo } from "@/atoms/AuthStatus";
import { AtomSockets } from "@/atoms/Sockets";
import { mapAdd } from "@/utils";

interface MenuHook {
  visible: boolean;
  setVisible: (value: boolean) => void;
  userInfo: UserInfo;
}

export default function useMenu(): MenuHook {
  let [visible, setVisible] = useState(false);
  let isInit = useRef(false);
  let [userInfo] = useRecoilState(AtomUserInfo);
  let [sockets, setSockets] = useRecoilState(AtomSockets);

  useEffect(() => {
    if (!isInit.current) {
      let socket = createContactSocket({
        add_contact(msg: any[]) {
          console.log(msg);
        },
      });
      setSockets(mapAdd(sockets, "contacts", socket));
      isInit.current = true;
    }
  }, [isInit.current]);

  return {
    visible,
    setVisible,
    userInfo,
  };
}
