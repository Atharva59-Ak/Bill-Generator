import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({ user: null, session: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error) {
        console.error('Error getting session', error);
      }
      setSession(currentSession || null);
      setUser(currentSession?.user || null);
      setLoading(false);
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession || null);
      setUser(newSession?.user || null);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        // Upsert into profiles table
        const authUser = newSession?.user;
        if (authUser) {
          const fullName = authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.user_metadata?.fullName || '';
          const avatarUrl = authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || '';
          await supabase.from('profiles').upsert({ id: authUser.id, full_name: fullName, avatar_url: avatarUrl });
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, session, loading, supabase }), [user, session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);


