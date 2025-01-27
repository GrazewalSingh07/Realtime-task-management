import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store"; // Import AppDispatch
import { checkAuthStatus } from "../store/slices/AuthSlice";

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;