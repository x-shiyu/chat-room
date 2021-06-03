import { useState } from "react";

export function useUserState() {
  let [isLogin, setLogin] = useState(false);
  let login = () => {
    setLogin(true);
    console.log(isLogin);
  };
  let logout = () => {
    setLogin(false);
  };
  return {
    isLogin,
    login,
    logout,
  };
}
