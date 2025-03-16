import React from 'react';

const AccessDenied = ({ onSignOut }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow sm:rounded-lg p-6 max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mt-3">Access Denied</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          You do not have permission to access the admin portal. Only authorized administrators (david@zapt.ai) can view survey responses.
        </p>
        
        <button
          onClick={onSignOut}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccessDenied;