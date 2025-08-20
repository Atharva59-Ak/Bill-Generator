import React from 'react';
import { supabase } from '../lib/supabaseClient';

const LoginPage = () => {
  const handleLogin = async (provider) => {
    await supabase.auth.signInWithOAuth({ 
      provider, 
      options: { 
        redirectTo: window.location.origin + '/auth/callback' 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background">
      <div className="w-full max-w-sm p-6 rounded-2xl border bg-white dark:bg-card shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-foreground text-center">Sign in</h1>
        <div className="space-y-3">
          <button 
            onClick={() => handleLogin('google')} 
            className="w-full border border-gray-300 dark:border-border px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors flex items-center justify-center gap-3 text-gray-700 dark:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12 h8"/>
              <path d="M12 8 v8"/>
            </svg>
            Continue with Google
          </button>
          <button 
            onClick={() => handleLogin('github')} 
            className="w-full border border-gray-300 dark:border-border px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors flex items-center justify-center gap-3 text-gray-700 dark:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-1.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


