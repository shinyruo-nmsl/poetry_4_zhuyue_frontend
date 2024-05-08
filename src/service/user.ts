import { AuthToken } from "../util/http";

export function exitLogin() {
  AuthToken.remove();
}
