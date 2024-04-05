import { createBrowserRouter } from "react-router-dom";

import { SubRoute } from "../global-type/router";
import App from "../App";

import PoetryRouter from "./poetry";

const _subRoutes: SubRoute[] = [PoetryRouter];

const _router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: _subRoutes,
  },
]);

const Router = {
  router: () => _router,
  subRoutes: () => _subRoutes,
  search(
    paths: string[],
    key: "key" | "path",
    trace: SubRoute[] = [],
    subRoutes: SubRoute[] = _subRoutes
  ): SubRoute[] {
    if (!paths.length) return trace;
    const path = paths[0];
    const route = subRoutes.find((r) => r[key] === path);
    if (!route) return trace;
    if (paths.length === 1 || !route.children) return [...trace, route];
    return this.search(paths.slice(1), key, [...trace, route], route.children);
  },
};

export default Router;
