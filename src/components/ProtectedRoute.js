import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Your custom hook for authentication

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuth(); // Check if the user is logged in

  // if (!isLoggedIn) {
  //   return <Navigate to="/" replace />; // Redirect to login page if not logged in
  // }

  return children; // Render the child route if the user is logged in
};

export default ProtectedRoute;
