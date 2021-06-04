import { login } from "@/atoms/AuthStatus";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

interface LoginProps {
  from?: string;
}
export default function Login({ from }: LoginProps) {
  let history = useHistory();
  let [isLogin, setLogin] = useRecoilState(login);
  function handleClick() {
    setLogin(true);
  }

  useEffect(() => {
    if (isLogin) {
      if (from && from !== "/login") {
        history.push(from);
      } else {
        history.push("/chat");
      }
    }
  }, [isLogin]);

  return <button onClick={handleClick}>login</button>;
}
