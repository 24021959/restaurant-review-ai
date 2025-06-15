import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const { user, signIn, signUp, loading, resetPassword, signOut } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect after login
  useEffect(() => {
    if (!loading && !roleLoading && user) {
      if (role === 'admin') {
        const handleAdminLoginAttempt = async () => {
          await signOut();
          toast({
            title: "Accesso Amministratore",
            description: "Per favore, utilizza la pagina di accesso dedicata agli amministratori.",
            variant: "destructive",
          });
        };
        handleAdminLoginAttempt();
      } else if (role === 'user') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [loading, roleLoading, user, role, navigate, signOut, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, restaurantName);
      }
      // Dopo il login, ci pensa lo useEffect a reindirizzare
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
    await resetPassword(email, `${window.location.origin}/auth`);
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
            <span className="text-sm text-gray-500">by AI</span>
          </div>
          <CardTitle>{isLogin ? 'Accedi al tuo account' : 'Crea il tuo account'}</CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Inserisci le tue credenziali per accedere'
              : 'Inizia la tua prova gratuita di 15 giorni'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Nome del Ristorante</Label>
                <Input
                  id="restaurantName"
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Es. Trattoria da Mario"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la-tua-email@esempio.it"
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
            
            {isLogin && (
              <div className="text-right text-sm -mt-2">
                  <button
                      type="button"
                      onClick={handlePasswordReset}
                      className="font-medium text-orange-600 hover:text-orange-700 underline disabled:text-gray-400 disabled:no-underline"
                      disabled={!email || isSubmitting}
                  >
                      Password dimenticata?
                  </button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? 'Caricamento...' 
                : isLogin ? 'Accedi' : 'Inizia Prova Gratuita'
              }
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-600 hover:text-orange-700 text-sm underline"
            >
              {isLogin 
                ? 'Non hai un account? Registrati' 
                : 'Hai già un account? Accedi'
              }
            </button>
          </div>

          {!isLogin && (
            <div className="mt-4 text-center text-sm text-gray-500">
              ✅ Nessuna carta di credito richiesta<br />
              ✅ Cancellazione in qualsiasi momento
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
