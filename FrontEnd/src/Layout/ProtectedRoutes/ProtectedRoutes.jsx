import React from "react";
import { Route, Navigate } from "react-router-dom";

// ProtectedRoute will check the user's role from localStorage
const ProtectedRoute = ({ element, ...rest }) => {
  const userRole = localStorage.getItem("userRole"); // Get the role from localStorage

  // If the user is an admin, allow access to all routes
  if (userRole === "admin") {
    return <Route {...rest} element={element} />;
  }

  // If the user is not an admin, allow access only to /billing
  return <Navigate to="/billing" />;
};

export default ProtectedRoute;
