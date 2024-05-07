export type Role = "admin" | "ordinary" | "visitor";

export type UserInfo = {
  role: Role;
  userName?: string;
  avatar?: string;
};
