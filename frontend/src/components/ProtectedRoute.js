import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component, requiredRole }) => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  const userData = JSON.parse(user);

  if (requiredRole && userData.role !== requiredRole) {
    // Check if admin accessing user routes
    if (userData.role === 'admin' && (requiredRole === 'user' || requiredRole === 'agent')) {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return component;
};

export default ProtectedRoute;
