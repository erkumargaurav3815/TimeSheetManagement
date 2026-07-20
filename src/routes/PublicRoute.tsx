import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const userExists = !!localStorage.getItem("user");

  // If user data exists, don't allow to go to login/signup page
  return userExists ? <Navigate to="/home" replace /> : children;
}

export default PublicRoute;
