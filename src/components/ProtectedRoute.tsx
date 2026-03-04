import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-slate-900 text-white">Loading...</div>;
  }

  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
