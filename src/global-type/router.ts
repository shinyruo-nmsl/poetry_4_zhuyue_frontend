import { NonIndexRouteObject } from "react-router-dom";

type _SubRoute = { label: string; key: string; icon?: React.ReactNode } & Omit<
  NonIndexRouteObject,
  "children"
>;

export type SubRoute<T extends _SubRoute = _SubRoute> = T & {
  children?: SubRoute[];
};
