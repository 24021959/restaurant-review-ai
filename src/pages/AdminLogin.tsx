
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export default function AdminLogin() {
  const { user, signIn, signOut, loading, resetPassword } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !roleLoading && user) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        // Se non è admin, logout automatico e mostra errore
        const handleNonAdmin = async () => {
          await signOut();
          toast({
            title: "Accesso non autorizzato",
            description: "Le credenziali inserite non appartengono a un amministratore.",
            variant: "destructive",
          });
          navigate('/admin-login', { replace: true });
        }
        handleNonAdmin();
      }
    }
  }, [loading, roleLoading, user, isAdmin, navigate, signOut, toast]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      // il redirect avviene nel useEffect
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: "Email richiesta",
        description: "Per favore, inserisci la tua email per reimpostare la password.",
        variant: "destructive",
      });
      return;
    }
    await resetPassword(email, `${window.location.origin}/admin-login`);
  };

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-orange-600">🍝 RistoReply</h1>
          </div>
          <CardTitle>Accesso Amministratore</CardTitle>
          <CardDescription>
            Inserisci le tue credenziali di amministratore
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.it"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="text-right text-sm">
                <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="font-medium text-orange-600 hover:text-orange-700 underline disabled:text-gray-400 disabled:no-underline"
                    disabled={!email || isSubmitting}
                >
                    Password dimenticata?
                </button>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Caricamento...' : 'Accedi come Admin'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
