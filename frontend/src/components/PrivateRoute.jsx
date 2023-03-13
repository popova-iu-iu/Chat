import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks";

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
