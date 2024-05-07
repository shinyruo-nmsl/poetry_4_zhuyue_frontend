import { Outlet } from "react-router-dom";
import { AppleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

import Router from "../router";
import { useState } from "react";
import { useUserLoginInfo } from "../context/user";

import Menu from "./Menu";
import Bar from "./Bar";
import "./layout.less";

export default function Layout() {
  const userInfo = useUserLoginInfo();
  const menuItems = Router.getMenuRoutes(userInfo.role);

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
    <div className="layout-page">
      <div className="aside">
        <div className="logo">
          <AppleOutlined />
        </div>
        <Menu keys={keys} menuItems={menuItems} onClickMenu={handleClickMenu} />
      </div>
      <div className="main">
        <Bar
          routerTrace={keys}
          userInfo={userInfo}
          onClickChangeUserInfo={() => {}}
          onClick2Login={() => naigate("/login")}
          onClickExitLogin={() => {}}
        />
        <Outlet />
      </div>
    </div>
  );
}
