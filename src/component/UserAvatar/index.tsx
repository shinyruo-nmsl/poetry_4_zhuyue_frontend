import { Avatar, AvatarProps } from "antd";
import { UserLoginDisplayInfo } from "../../global-type/user";

function UserAvatar({
  userName,
  avatar,
  ...avatarProps
}: UserLoginDisplayInfo & AvatarProps) {
  if (avatar) return <Avatar {...avatarProps} src={avatar} />;
  if (userName)
    return <Avatar {...avatarProps}>{userName[userName.length - 1]}</Avatar>;
  return <Avatar {...avatarProps}>佚</Avatar>;
}

export default UserAvatar;
