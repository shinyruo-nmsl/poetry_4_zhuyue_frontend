import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { UserLoginInfo } from "../global-type/user";
import { fetchGetUserLoginInfo } from "../api/user";

export const UserLoginContext = createContext<UserLoginInfo>({
  role: "visitor",
  userId: "",
  account: "",
});

export function UserLoginProvider({ children }: { children: ReactElement }) {
  const [isInitUserLoginInfo, setIsInitUserLoginInfo] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState<UserLoginInfo>({
    role: "visitor",
    userId: "",
    account: "",
  });

  console.log(userLoginInfo);

  useEffect(() => {
    fetchGetUserLoginInfo().then((info) => {
      setUserLoginInfo(info);
      setIsInitUserLoginInfo(true);
    });
  }, []);

  if (!isInitUserLoginInfo) return <></>;

  return (
    <UserLoginContext.Provider value={userLoginInfo}>
      {children}
    </UserLoginContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserLoginInfo() {
  const context = useContext(UserLoginContext);
  return context;
}
