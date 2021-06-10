import Loading from "@@/common/Loading";
import Test from "@@/Test";
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
};
export function routeMatch(path: string) {
  // @ts-ignore
  return routes[path].component || NoFound;
}
export default routes;