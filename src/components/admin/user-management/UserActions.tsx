
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserCog, User, Ban } from 'lucide-react';
import type { UserProfile } from '@/hooks/useUserManagement';

interface UserActionsProps {
  user: UserProfile;
  onToggleUserStatus: (userId: string, currentStatus: boolean) => void;
  onToggleAdminRole: (userId: string, currentRole: string) => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  onToggleUserStatus,
  onToggleAdminRole
}) => {
  const isAdmin = user.user_roles?.some(role => role.role === 'admin');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onToggleUserStatus(user.id, user.is_active || false)}
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
          onClick={() => onToggleAdminRole(
            user.id, 
            isAdmin ? 'admin' : 'user'
          )}
        >
          <UserCog className="mr-2 h-4 w-4" />
          {isAdmin ? 'Rimuovi Admin' : 'Rendi Admin'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
