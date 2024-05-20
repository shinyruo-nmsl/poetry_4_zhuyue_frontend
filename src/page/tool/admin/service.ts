import { Pagination, PaginationQuery } from "../../../global-type/model";
import { Role, UserLoginInfo } from "../../../global-type/user";
import { request } from "../../../util/http";

export interface UsersQuery extends PaginationQuery {
  type: "userId" | "userName" | "account";
  value: string;
}

export function fetchSearchUserLoginInfo(query: UsersQuery) {
  return request<Pagination<UserLoginInfo>>({
    method: "get",
    url: "/admin/searchUserLoginInfo",
    params: { ...query },
  });
}

export function fetchUpdateUserRole(userId: string, role: Role) {
  return request({
    method: "post",
    url: "/admin/updateUserRole",
    data: { userId, role },
  });
}

export function fetchRemoveUser(userId: string) {
  return request({
    method: "delete",
    url: "/admin/removeUser",
    data: { userId },
  });
}
