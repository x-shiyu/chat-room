import { useHistory, useLocation } from "react-router-dom";
import { login } from "@/atoms/AuthStatus";
import { useRecoilState } from "recoil";

export default function Login() {
  let location = useLocation();
  let history = useHistory();
  let [_, setLogin] = useRecoilState(login);
  function handleClick() {
    setLogin(true);
    let pathname =
      // @ts-ignore
      location.state && location.state.from && location.state.from.pathname;
    setTimeout(() => {
      if (pathname !== "/login") {
        history.replace(pathname, { login: true });
      } else {
        history.replace("/chat", { login: true });
      }
    }, 100);
  }
  return <button onClick={handleClick}>login</button>;
}
