import { useRole } from "../context/role";
import { Navigate } from "react-router-dom";

export function withLogin(WrappedComponent: React.ComponentType) {
  const ComponentWithLogin = () => {
    const { role } = useRole();

    if (role === "visitor") {
      return <Navigate to="/login" replace={true}></Navigate>;
    }

    return <WrappedComponent />;
  };

  return ComponentWithLogin;
}
