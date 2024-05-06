import { createBrowserRouter } from "react-router-dom";

import { SubRoute } from "../global-type/router";
import App from "../App";
import { Login } from "../page/login";

import PoetryRouter from "./poetry";
import { Role } from "../global-type/user";

const subRoutes: SubRoute[] = [PoetryRouter];

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: subRoutes,
  },
]);

class Router {
  static readonly router = router;
  static readonly subRouter = subRoutes;

  static menuRoutes(
    role?: Role,
    _children: SubRoute[] = this.subRouter
  ): SubRoute[] | undefined {
    const children = _children.filter(
      (c) => !role || !c.auths || c.auths.includes(role)
    );

    return children && children.length
      ? children
          .filter((r) => typeof r.show === "undefined" || r.show)
          .map((r) => ({
            ...r,
            children: this.menuRoutes(role, r.children || []),
          }))
      : undefined;
  }

  static search(
    paths: string[],
    key: "key" | "path",
    trace: SubRoute[] = [],
    subRoutes: SubRoute[] = this.subRouter
  ): SubRoute[] {
    if (!paths.length) return trace;
    const path = paths[0];
    const route = subRoutes.find((r) => r[key] === path);
    if (!route) return trace;
    if (paths.length === 1 || !route.children) return [...trace, route];
    return this.search(paths.slice(1), key, [...trace, route], route.children);
  }
}

export default Router;
