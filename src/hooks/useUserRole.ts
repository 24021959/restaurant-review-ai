
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

    // Non fetchare se non loggato
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Refattorizzato: usa una async IIFE per gestire la promise
    (async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (!isMounted) return;
        if (error) {
          setRole(null);
        } else if (Array.isArray(data)) {
          // ATTENZIONE: Un utente NON dovrebbe mai avere sia admin che user. Ma qui diamo precedenza ad admin.
          if (data.find(r => r.role === 'admin')) setRole('admin');
          else if (data.find(r => r.role === 'user')) setRole('user');
          else setRole(null);
        } else {
          setRole(null);
        }
      } catch (e) {
        if (isMounted) setRole(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [user]);

  return { role, isAdmin: role === "admin", isUser: role === "user", loading };
};
