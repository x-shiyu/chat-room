import "./App.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import BaseLayout from "@/layout/BaseLayout/BaseLayout";
import Login from "@/views/Login";
import { useState } from "react";
import { RecoilRoot } from "recoil";
const noAuthPath = ["/login", "/test"];

export default function App() {
  let [isLogin, setLogin] = useState(true);
  return (
    <RecoilRoot>
      <Router>
        <Route path={"/login"}>
          <Login setLogin={setLogin} />
        </Route>

        <Route path={"/test"}>
          <h1>test</h1>
        </Route>
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
                  state: { from: location },
                }}
              />
            );
          }}
        ></Route>
      </Router>
    </RecoilRoot>
  );
}
