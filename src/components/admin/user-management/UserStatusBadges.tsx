
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, User } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  isActive: boolean;
}

interface PlanBadgeProps {
  plan: string;
}

interface RoleBadgeProps {
  userRoles: { role: string; }[];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isActive }) => {
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

export const PlanBadge: React.FC<PlanBadgeProps> = ({ plan }) => {
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

export const RoleBadge: React.FC<RoleBadgeProps> = ({ userRoles }) => {
  const isAdmin = userRoles?.some(role => role.role === 'admin');
  
  if (isAdmin) {
    return (
      <Badge className="bg-red-100 text-red-800">
        <Shield className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline">
      <User className="w-3 h-3 mr-1" />
      User
    </Badge>
  );
};
