import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import Layout from '@/components/Layout';

const Login = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-indigo-600 border-solid rounded-full mx-auto animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Admin Login</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Note: Admin access is restricted to authorized personnel only
        </p>
        <AuthForm />
      </div>
    </Layout>
  );
};

export default Login;