import { Breadcrumb, Avatar, Popover } from "antd";
import { UserInfo } from "../global-type/user";

interface BarProps {
  breadCrumbItems: { title: string }[];
  userInfo: UserInfo;
}

function Bar({ breadCrumbItems, userInfo }: BarProps) {
  const hasLogin = userInfo.role !== "visitor";

  const popverContent = (
    <div className="popver-content">
      {hasLogin && (
        <>
          <p>修改信息</p>
          <p>退出登录</p>
        </>
      )}

      {!hasLogin && <p>去登录</p>}
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

function UserAvatar({ userName, avatar }: UserInfo) {
  if (avatar) return <Avatar src={avatar} />;
  if (userName) return <Avatar>{userName[userName.length - 1]}</Avatar>;
  return <Avatar>佚</Avatar>;
}

export default Bar;
