import { useState } from "react";
import { useRecoilState } from "recoil";
import { AtomUserInfo, UserInfo } from "@/atoms/AuthStatus";
interface MenuHook {
  visible: boolean;
  setVisible: (value: boolean) => void;
  userInfo: UserInfo;
}

export default function useMenu(): MenuHook {
  let [visible, setVisible] = useState(false);
  let [userInfo] = useRecoilState(AtomUserInfo);

  return {
    visible,
    setVisible,
    userInfo,
  };
}
