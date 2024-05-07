import { AuthToken, request } from "../../util/http";
import StorageUtil from "../../util/storage";

export type LoginParam = {
  account: string;
  password: string;
};

export async function login(params: LoginParam) {
  const { token } = await request<{ token: string }>({
    method: "post",
    url: "/login/login",
    data: { ...params },
  });

  StorageUtil.set(AuthToken.tokenKey, token, 24 * 60);
}

export type RegistParam = {
  account: string;
  password: string;
};

export async function regist(params: RegistParam) {
  await request({
    method: "post",
    url: "/login/regist",
    data: { ...params },
  });
}
