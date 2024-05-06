import { Role } from "../global-type/user";
import { request } from "../util/http";

export type UserLoginInfo = {
  userId: string;
  useName: string;
  role: Role;
};

export async function fetchGetUserLoginInfo() {
  return request<UserLoginInfo>({
    method: "get",
    url: "/user/getUserLoginInfo",
  });

  // return Promise.resolve({
  //   userName: "",
  //   userId: "",
  //   role: "visitor",
  // });
}
