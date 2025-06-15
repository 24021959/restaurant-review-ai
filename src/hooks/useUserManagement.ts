
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  restaurants: { name: string; }[];
  subscriptions: { plan: string; status: string; }[];
  user_roles: { role: string; }[];
  is_active: boolean;
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      
      // Fetch profiles first
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      if (!profiles) {
        setUsers([]);
        return;
      }

      // Fetch related data separately for each user
      const usersWithRelations = await Promise.all(
        profiles.map(async (profile) => {
          // Fetch restaurants
          const { data: restaurants } = await supabase
            .from('restaurants')
            .select('name')
            .eq('owner_id', profile.id);

          // Fetch subscriptions
          const { data: subscriptions } = await supabase
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', profile.id);

          // Fetch user roles
          const { data: userRoles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id);

          // Determine if user is active
          const isActive = subscriptions && subscriptions.length > 0 && 
            (subscriptions[0]?.status === 'active' || subscriptions[0]?.status === 'trialing');

          return {
            ...profile,
            restaurants: restaurants || [],
            subscriptions: subscriptions || [],
            user_roles: userRoles || [],
            is_active: isActive
          };
        })
      );

      setUsers(usersWithRelations);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare gli utenti",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const newStatus = currentStatus ? 'canceled' : 'active';
      
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: newStatus })
        .eq('user_id', userId);
      
      if (error) throw error;

      toast({
        title: "Successo",
        description: `Utente ${newStatus === 'active' ? 'attivato' : 'disattivato'} con successo`
      });

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user status:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato dell'utente",
        variant: "destructive"
      });
    }
  };

  const toggleAdminRole = async (userId: string, currentRole: string) => {
    try {
      const isAdmin = currentRole === 'admin';
      
      if (isAdmin) {
        // Rimuovi il ruolo admin
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      } else {
        // Aggiungi il ruolo admin
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
      }

      toast({
        title: "Successo",
        description: `Ruolo admin ${isAdmin ? 'rimosso' : 'assegnato'} con successo`
      });

      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating admin role:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il ruolo admin",
        variant: "destructive"
      });
    }
  };

  return {
    users,
    loading,
    fetchUsers,
    toggleUserStatus,
    toggleAdminRole
  };
};

export type { UserProfile };
