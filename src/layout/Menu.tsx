import { useLocation, useNavigate } from "react-router-dom";
import { Menu as _Menu } from "antd";
import type { MenuProps } from "antd";

import Router from "../router";
import { useState } from "react";

export default function Menu() {
  const { pathname } = useLocation();
  const naigate = useNavigate();

  const [keys, setKeys] = useState(
    Router.search(pathname.split("/").filter(Boolean), "path").map((r) => r.key)
  );

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    const trace = Router.search(e.keyPath.reverse(), "key");
    setKeys(trace.map((r) => r.key));
    naigate(`/${trace.map((r) => r.path).join("/")}`);
  };

  return (
    <_Menu
      defaultOpenKeys={keys}
      selectedKeys={keys}
      mode="inline"
      items={Router.subRoutes()}
      onClick={handleClickMenu}
    />
  );
}
