import { Outlet } from "react-router-dom";
import { AppleOutlined } from "@ant-design/icons";

import Menu from "./Menu";
import "./layout.less";

export default function Layout() {
  return (
    <div className="layout-page">
      <div className="aside">
        <div className="logo">
          <AppleOutlined />
        </div>
        <Menu></Menu>
      </div>
      <div className="main">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
