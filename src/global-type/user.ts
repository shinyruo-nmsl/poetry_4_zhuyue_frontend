export type Role = "admin" | "member" | "ordinary" | "visitor";

export type UserLoginInfo = {
  userId: string;
  account: string;
  role: Role;
  userName?: string;
  avatar?: string;
};

export type UserLoginDisplayInfo = {
  userName?: string;
  avatar?: string;
  role: Role;
};

export type UserLoginDispatch = (
  action:
    | { type: "exit" }
    | { type: "refresh" }
    | { type: "update_name"; userName: string }
    | { type: "update_avatar"; avatar: string }
    | { type: "update_display_info"; userInfo: UserLoginDisplayInfo }
) => Promise<void>;
