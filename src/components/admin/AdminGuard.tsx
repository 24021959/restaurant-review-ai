
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAdmin, loading } = useUserRole();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4 mx-auto" />
            <AlertDescription>
              Non hai i permessi necessari per accedere a questa pagina.<br />
              Solo gli amministratori possono visualizzare questa sezione.
            </AlertDescription>
          </Alert>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 px-4 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Torna alla Dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
