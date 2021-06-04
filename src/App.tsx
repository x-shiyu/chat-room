import "./App.css";
import { Route } from "react-router-dom";
import BaseLayout from "@/layout/BaseLayout/BaseLayout";
import Login from "@/views/Login";
import { useRecoilState } from "recoil";
import { login } from "@/atoms/AuthStatus";

const noAuthPath = ["/test"];

function authRender(location: any, login: boolean) {
  if (noAuthPath.indexOf(location.pathname) > -1) {
    return null;
  }
  return login ? (
    <BaseLayout />
  ) : (
    <Login from={location.state && location.state.from} />
  );
}

export default function App() {
  let [isLogin] = useRecoilState(login);
  return (
    <>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/test"}>
        <h1>test</h1>
      </Route>
      <Route
        path="/"
        render={({ location }) => authRender(location, isLogin)}
      ></Route>
    </>
  );
}
