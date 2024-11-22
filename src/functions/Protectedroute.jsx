import React from 'react';
import { Navigate } from 'react-router-dom';
import isAuthenticated from './authServices';

const ProtectedRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;