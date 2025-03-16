import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';

const AuthForm = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Sign in with ZAPT</h1>
        <p className="text-sm text-gray-600 mt-2">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
            Visit ZAPT website
          </a>
        </p>
      </div>
      
      <Auth
        supabaseClient={supabase}
        providers={['google', 'facebook', 'apple']}
        magicLink={true}
        view="magic_link"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#4F46E5',
                brandAccent: '#4338CA',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default AuthForm;