import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import BaseLayout from "@/layout/BaseLayout/BaseLayout";
import Login from "@/views/Login";
import { useRecoilState } from "recoil";
import { login } from "@/atoms/AuthStatus";

const noAuthPath = ["/login", "/test"];
function RenderCom({ isLogin }: { isLogin: any }) {
  return (
    <Route
      path="/"
      render={({ location }) => {
        if (noAuthPath.indexOf(location.pathname) > -1) {
          return null;
        }
        return isLogin ? (
          <BaseLayout />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          />
        );
      }}
    ></Route>
  );
}
export default function App() {
  let [isLogin] = useRecoilState(login);

  return (
    <Router>
      <Route path={"/login"}>
        <Login />
      </Route>
      <Route path={"/test"}>
        <h1>test</h1>
      </Route>
      <RenderCom isLogin={isLogin} />
    </Router>
  );
}
