import { useAuth } from "../context/AuthProvider";

const PermissionGate = ({ roles, children }) => {
  const { user } = useAuth();
  return user && roles.includes(user.role) ? <>{children}</> : null;
};

export default PermissionGate;
