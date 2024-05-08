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

  const [trace, setTrace] = useState(
    Router.search(pathname.split("/").filter(Boolean), "path")
  );
  const keys = trace.map((r) => r.key);
  const paths = trace.map((r) => r.label);

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    const trace = Router.search(e.keyPath.reverse(), "key");
    setTrace(trace);
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
          routerTrace={paths}
          userInfo={userInfo}
          onClickChangeUserInfo={() => {}}
          onClick2Login={() => naigate("/login")}
          onClickExitLogin={() => {}}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
