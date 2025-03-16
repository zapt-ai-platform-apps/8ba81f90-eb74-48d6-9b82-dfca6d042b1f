import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import Layout from '@/components/Layout';
import { supabase } from '@/supabaseClient';

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Additional auth state listener to ensure proper redirection after social login
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('Login page detected sign in, redirecting to admin');
        navigate('/admin', { replace: true });
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

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