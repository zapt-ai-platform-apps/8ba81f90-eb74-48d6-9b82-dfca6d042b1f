import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const ThankYou = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-600">
            Your survey has been submitted successfully. We appreciate your time and valuable feedback.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">What happens next?</h2>
          <p className="text-gray-600">
            If you've requested a consultation, our team will reach out to you via email within the next 48 hours.
            Your feedback will help us improve our no-code platform for creators like you.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-block py-2.5 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default ThankYou;