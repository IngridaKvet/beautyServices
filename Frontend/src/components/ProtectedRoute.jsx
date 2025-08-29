import { Navigate, Outlet } from "react-router";

import { UserContext } from "../contexts/contexts";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { user,  loadingUser} = useContext(UserContext);

  if (loadingUser) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
