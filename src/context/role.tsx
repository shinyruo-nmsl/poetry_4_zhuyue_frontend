import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { Role } from "../global-type/user";
import { fetchGetUserLoginInfo } from "../api/user";

export const RoleContext = createContext<{ role: Role }>({ role: "visitor" });

export function RoleProvider({ children }: { children: ReactElement }) {
  const [isInitRole, setIsInitRole] = useState(false);
  const [role, setRole] = useState<Role>("visitor");

  useEffect(() => {
    fetchGetUserLoginInfo().then(({ role }) => {
      setRole(role);
      setIsInitRole(true);
    });
  }, []);

  if (!isInitRole) return <></>;

  return (
    <RoleContext.Provider value={{ role }}>{children}</RoleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRole() {
  const context = useContext(RoleContext);
  return context;
}
