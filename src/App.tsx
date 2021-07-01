import "./App.css";
import { Route } from "react-router-dom";
import Login from "@/views/Login/Login";
import useInit from "@/hooks/useInit";
import { BrowserRouter as Router } from "react-router-dom";
import { routeMatch } from "@/route";
import { NO_AUTH_PATH } from "@/consts";

function authRender(location: any, login: boolean) {
  let RouteCom = routeMatch(location.pathname);
  if (NO_AUTH_PATH.indexOf(location.pathname) > -1) {
    return <RouteCom />;
  } else {
    return login ? (
      <RouteCom />
    ) : (
      <Login from={location.state && location.state.from} />
    );
  }
}

export default function App() {
  let { isLogin } = useInit();

  return (
    <>
      <Router>
        <Route
          path="/"
          render={({ location }) => authRender(location, isLogin)}
        ></Route>
      </Router>
    </>
  );
}
