import { Role } from "../global-type/user";
import { AuthToken } from "../util/http";

export function exitLogin() {
  AuthToken.remove();
}

export function formatUserRole(role: Role) {
  switch (role) {
    case "admin":
      return "管理员";
    case "ordinary":
      return "普通用户";
    default:
      return "游客";
  }
}
