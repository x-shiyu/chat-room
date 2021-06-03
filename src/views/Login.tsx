import { useHistory, useLocation } from "react-router-dom";
interface LoginProps {
  setLogin: any;
}
export default function Login({ setLogin }: LoginProps) {
  let location = useLocation();
  let history = useHistory();
  function handleClick() {
    setLogin(true);
    // @ts-ignore
    if (location.state.from.pathname !== "/login") {
      // @ts-ignore
      history.push(location.state.from.pathname);
    } else {
      history.push("/chat");
    }
  }
  return <button onClick={handleClick}>login</button>;
}
