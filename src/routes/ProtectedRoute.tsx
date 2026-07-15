import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = !!localStorage.getItem("user");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
