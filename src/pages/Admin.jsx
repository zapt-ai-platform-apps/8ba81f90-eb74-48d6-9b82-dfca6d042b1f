import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';
import ResponsesTable from '@/components/admin/ResponsesTable';
import ZaptBadge from '@/components/ZaptBadge';

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const [responses, setResponses] = useState([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user has the authorized email
  const isAuthorized = user?.email === 'david@zapt.ai';

  useEffect(() => {
    if (user && isAuthorized) {
      fetchResponses();
    }
  }, [user, isAuthorized]);

  const fetchResponses = async () => {
    try {
      setLoadingResponses(true);
      setError(null);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }
      
      const response = await fetch('/api/getSurveyResponses', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch survey responses');
      }
      
      const data = await response.json();
      console.log('Fetched responses:', data);
      setResponses(data);
    } catch (error) {
      console.error('Error fetching responses:', error);
      Sentry.captureException(error);
      setError('Failed to load survey responses. Please try again.');
    } finally {
      setLoadingResponses(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Sentry.captureException(error);
    }
  };

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

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If the user is not authorized (not david@zapt.ai)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white shadow sm:rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You do not have permission to access the admin portal. Only authorized administrators can view survey responses.
          </p>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Survey Responses</h2>
            <p className="text-sm text-gray-500">View all survey submissions below.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
              <button 
                onClick={fetchResponses} 
                className="ml-2 text-red-900 underline cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}
          
          {loadingResponses ? (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-t-transparent border-indigo-600 border-solid rounded-full mx-auto animate-spin"></div>
              <p className="mt-3 text-gray-600">Loading survey responses...</p>
            </div>
          ) : (
            <ResponsesTable responses={responses} />
          )}
        </div>
      </main>
      
      <footer className="py-4 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <ZaptBadge />
        </div>
      </footer>
    </div>
  );
};

export default Admin;