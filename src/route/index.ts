import Loading from "@@/common/Loading";
import Test from "@/views/Test";
import BaseLayout from "@/layout/BaseLayout/BaseLayout";
import NoFound from "@/views/NoFound/NoFound";
const routes = {
  "/login": {
    component: Loading,
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
