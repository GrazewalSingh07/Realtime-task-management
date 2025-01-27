import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { checkAuthStatus } from "./store/slices/AuthSlice";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation(); // Get the current location

  // Check authentication status whenever the route changes
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch, location]); // Add `location` as a dependency

  return (
    <Routes>
      {/* Public routes */}
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/tasks" element={<TaskList />} /> */}
      </Route>

      {/* Redirect to login by default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// Wrap the App component with Router
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;