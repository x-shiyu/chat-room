import "./App.css";
import { Route } from "react-router-dom";
import Login from "@/views/Login/Login";
import useInit from "@/hooks/useInit";
import { BrowserRouter as Router } from "react-router-dom";
import { routeMatch } from "@/route";

const noAuthPath = ["/test", "/login", "/register"];

function authRender(location: any, login: boolean) {
  let RouteCom = routeMatch(location.pathname);
  if (noAuthPath.indexOf(location.pathname) > -1) {
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
