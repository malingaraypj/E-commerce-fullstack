import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogged } = useSelector((state: RootState) => state.user);

  if (!isLogged) {
    // If not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the component they were trying to access
  return <>{children}</>;
};

export default ProtectedRoute;
