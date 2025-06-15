
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(!!user);

    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (!isMounted) return;
        
        if (error) {
          console.error('Error fetching user role:', error);
          setRole('user'); // Default to user role
        } else if (Array.isArray(data)) {
          // Check if user has admin role, otherwise default to user
          if (data.find(r => r.role === 'admin')) {
            setRole('admin');
          } else {
            setRole('user');
          }
        } else {
          setRole('user');
        }
      } catch (e) {
        console.error('Error in useUserRole:', e);
        if (isMounted) setRole('user');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [user]);

  return { role, isAdmin: role === "admin", isUser: role === "user", loading };
};
