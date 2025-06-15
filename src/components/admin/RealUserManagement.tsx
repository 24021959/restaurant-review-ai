
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useUserManagement } from '@/hooks/useUserManagement';
import { UsersTable } from './user-management/UsersTable';

export default function RealUserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading, fetchUsers, toggleUserStatus, toggleAdminRole } = useUserManagement();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

        <UsersTable
          users={filteredUsers}
          onToggleUserStatus={toggleUserStatus}
          onToggleAdminRole={toggleAdminRole}
        />

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nessun utente trovato
          </div>
        )}
      </CardContent>
    </Card>
  );
}
