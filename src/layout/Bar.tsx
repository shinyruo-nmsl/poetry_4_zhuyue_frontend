import { Breadcrumb, Avatar, Popover } from "antd";
import { UserLoginInfo } from "../global-type/user";

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

  const popverContent = (
    <div className="popver-content">
      {hasLogin && (
        <>
          <p onClick={onClickChangeUserInfo}>修改信息</p>
          <p onClick={onClickExitLogin}>退出登录</p>
        </>
      )}

      {!hasLogin && <p onClick={onClick2Login}>去登录</p>}
    </div>
  );

  return (
    <div className="layout-bar">
      <Breadcrumb items={breadCrumbItems} />

      <div className="user-info">
        <Popover
          content={popverContent}
          placement="bottomRight"
          trigger="hover"
        >
          <UserAvatar {...userInfo} />
        </Popover>
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
