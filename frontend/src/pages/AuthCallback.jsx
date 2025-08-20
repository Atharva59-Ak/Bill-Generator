import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      // Handle hash fragments for older flows if any
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Auth callback error', error);
      }
      navigate('/dashboard', { replace: true });
    };
    handle();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Completing sign-in...</div>
    </div>
  );
};

export default AuthCallback;


