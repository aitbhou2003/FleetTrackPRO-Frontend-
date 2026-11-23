import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    return <Navigate to={"/403"} replace />;
  }

  return children;
}
