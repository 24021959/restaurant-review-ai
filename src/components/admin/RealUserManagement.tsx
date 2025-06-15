
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, MoreHorizontal, UserCog, Shield, User, Ban } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  restaurants?: {
    name: string;
  }[] | null;
  subscriptions?: {
    plan: string;
    status: string;
  }[] | null;
  user_roles?: {
    role: string;
  }[] | null;
  is_active?: boolean;
}

export default function RealUserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
  };

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

  const getStatusBadge = (status: string, isActive: boolean) => {
    if (!isActive) {
      return <Badge className="bg-red-100 text-red-800">Disattivato</Badge>;
    }
    
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Attivo</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'canceled':
        return <Badge className="bg-red-100 text-red-800">Cancellato</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Basic':
        return <Badge variant="outline">Basic</Badge>;
      case 'Professional':
        return <Badge className="bg-orange-100 text-orange-800">Professional</Badge>;
      case 'Enterprise':
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.restaurants?.[0]?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione Utenti</CardTitle>
        <CardDescription>
          Visualizza e gestisci tutti gli utenti registrati della piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cerca per email o nome ristorante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={fetchUsers} variant="outline">
            Aggiorna
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utente</TableHead>
                <TableHead>Ristorante</TableHead>
                <TableHead>Piano</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Ruolo</TableHead>
                <TableHead>Registrato</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.email}</div>
                      <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.restaurants?.[0]?.name || 'Non configurato'}</TableCell>
                  <TableCell>
                    {user.subscriptions?.[0]?.plan ? getPlanBadge(user.subscriptions[0].plan) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {user.subscriptions?.[0]?.status ? getStatusBadge(user.subscriptions[0].status, user.is_active || false) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {user.user_roles?.some(role => role.role === 'admin') ? (
                      <Badge className="bg-red-100 text-red-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <User className="w-3 h-3 mr-1" />
                        User
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString('it-IT')}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toggleUserStatus(user.id, user.is_active || false)}
                        >
                          {user.is_active ? (
                            <>
                              <Ban className="mr-2 h-4 w-4" />
                              Disattiva Utente
                            </>
                          ) : (
                            <>
                              <User className="mr-2 h-4 w-4" />
                              Attiva Utente
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleAdminRole(
                            user.id, 
                            user.user_roles?.some(role => role.role === 'admin') ? 'admin' : 'user'
                          )}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          {user.user_roles?.some(role => role.role === 'admin') ? 'Rimuovi Admin' : 'Rendi Admin'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nessun utente trovato
          </div>
        )}
      </CardContent>
    </Card>
  );
}
