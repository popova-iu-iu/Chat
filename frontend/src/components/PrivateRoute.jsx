import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("userId");

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
