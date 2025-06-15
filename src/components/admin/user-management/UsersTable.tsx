
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge, PlanBadge, RoleBadge } from './UserStatusBadges';
import { UserActions } from './UserActions';
import type { UserProfile } from '@/hooks/useUserManagement';

interface UsersTableProps {
  users: UserProfile[];
  onToggleUserStatus: (userId: string, currentStatus: boolean) => void;
  onToggleAdminRole: (userId: string, currentRole: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onToggleUserStatus,
  onToggleAdminRole
}) => {
  return (
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{user.email}</div>
                  <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                </div>
              </TableCell>
              <TableCell>{user.restaurants?.[0]?.name || 'Non configurato'}</TableCell>
              <TableCell>
                {user.subscriptions?.[0]?.plan ? (
                  <PlanBadge plan={user.subscriptions[0].plan} />
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>
                {user.subscriptions?.[0]?.status ? (
                  <StatusBadge 
                    status={user.subscriptions[0].status} 
                    isActive={user.is_active || false} 
                  />
                ) : (
                  'N/A'
                )}
              </TableCell>
              <TableCell>
                <RoleBadge userRoles={user.user_roles} />
              </TableCell>
              <TableCell>{new Date(user.created_at).toLocaleDateString('it-IT')}</TableCell>
              <TableCell>
                <UserActions
                  user={user}
                  onToggleUserStatus={onToggleUserStatus}
                  onToggleAdminRole={onToggleAdminRole}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
