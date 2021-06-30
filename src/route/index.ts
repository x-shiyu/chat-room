import Test from "@/views/Test";
import BaseLayout from "@/layout/BaseLayout/BaseLayout";
import NoFound from "@/views/NoFound/NoFound";
import Register from "@/views/Register";
import Login from "@/views/Login/Login";
const routes = {
  "/login": {
    component: Login,
  },
  "/register": {
    component: Register,
  },
  "/test": {
    component: Test,
  },
  "/chat": {
    component: BaseLayout,
  },
  "/contact": {
    component: BaseLayout,
  },
  "/": {
    component: BaseLayout,
  },
};
export function routeMatch(path: string) {
  // @ts-ignore
  return routes[path]?.component || NoFound;
}
export default routes;
