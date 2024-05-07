import { request } from "../util/http";
import { UserLoginInfo } from "../global-type/user";

export async function fetchGetUserLoginInfo() {
  return request<UserLoginInfo>({
    method: "get",
    url: "/user/getUserLoginInfo",
  });
}
