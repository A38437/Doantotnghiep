import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Epath } from "./routerConfig";

const AuthRoute = ({ auth, isAuthenticated }) => {
  if (auth && !isAuthenticated) {
    return <Navigate to={Epath.loginPage} />;
  }

  // Nếu đã xác thực và đã đăng nhập, render Route component
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthRoute;
