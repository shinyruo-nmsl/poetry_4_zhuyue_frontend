import { request } from "../util/http";
import { UserLoginDisplayInfo, UserLoginInfo } from "../global-type/user";

export async function fetchGetUserLoginInfo() {
  return request<UserLoginInfo>({
    method: "get",
    url: "/user/getUserLoginInfo",
  });
}

export async function fetchUpdateUserName(userName: string) {
  return request({
    method: "post",
    url: "/user/updateUserName",
    data: { userName },
  });
}

export async function fetchUpdateUserAvatar(avatar: string) {
  return request({
    method: "post",
    url: "user/updateUserAvatar",
    data: { avatar },
  });
}

export async function fetchUpdateUserDisplayInfo(
  userInfo: UserLoginDisplayInfo
) {
  return request({
    method: "post",
    url: "/user/updateUserDisplayInfo",
    data: { ...userInfo },
  });
}
