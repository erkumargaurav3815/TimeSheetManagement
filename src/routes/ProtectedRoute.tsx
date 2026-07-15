import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  //children is the route where the page should go after login (in this case home)
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = !!localStorage.getItem("user");

  //replace disables the page to go back from protectedRoute (in this case do not go to home in case user is not logged in)
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
