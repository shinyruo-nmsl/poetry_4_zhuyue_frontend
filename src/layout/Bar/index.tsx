import { Breadcrumb, Avatar, Popover, Dropdown, MenuProps } from "antd";
import { UserLoginInfo } from "../../global-type/user";

import "./bar.less";

interface BarProps {
  routerTrace: string[];
  userInfo: UserLoginInfo;
  onClickChangeUserInfo: () => void;
  onClickExitLogin: () => void;
  onClick2Login: () => void;
}

function Bar({
  routerTrace,
  userInfo,
  onClickChangeUserInfo,
  onClickExitLogin,
  onClick2Login,
}: BarProps) {
  const breadCrumbItems = routerTrace.map((trace) => ({ title: trace }));
  const hasLogin = userInfo.role !== "visitor";

  const items: MenuProps["items"] = hasLogin
    ? [
        {
          key: "1",
          label: <p onClick={onClickChangeUserInfo}>修改信息</p>,
        },
        {
          key: "2",
          label: <p onClick={onClickExitLogin}>退出登录</p>,
        },
      ]
    : [
        {
          key: "1",
          label: <p onClick={onClick2Login}>去登录</p>,
        },
      ];

  return (
    <div className="layout-bar">
      <Breadcrumb items={breadCrumbItems} />

      <div className="user-info">
        <Dropdown menu={{ items }} placement="bottomRight">
          <UserAvatar {...userInfo} />
        </Dropdown>
      </div>
    </div>
  );
}

function UserAvatar({ userName, avatar }: UserLoginInfo) {
  if (avatar) return <Avatar src={avatar} />;
  if (userName) return <Avatar>{userName[userName.length - 1]}</Avatar>;
  return <Avatar>佚</Avatar>;
}

export default Bar;
