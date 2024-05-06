import qs from "qs";

import { TokenUtil, request } from "../../util/http";
import StorageUtil from "../../util/storage";

export type LoginParam = {
  userName: string;
  password: string;
};

export async function login(params: LoginParam) {
  const { token } = await request<{ token: string }>({
    method: "post",
    url: "/login/login",
    data: qs.stringify({ ...params }),
  });

  StorageUtil.set(TokenUtil.tokenKey, token, 24 * 60);
}

export type RegistParam = {
  userName: string;
  password: string;
};

export async function regist(params: RegistParam) {
  await request({
    method: "post",
    url: "/login/regist",
    data: { ...params },
  });
}
