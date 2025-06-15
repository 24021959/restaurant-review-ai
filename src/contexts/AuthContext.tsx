import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define the public URL constant to be used across auth functions
const PUBLIC_APP_URL = "https://restaurant-review-ai.lovable.app";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, restaurantName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: (onSignOutComplete?: () => void) => Promise<void>;
  resetPassword: (email: string, redirectTo?: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, restaurantName: string) => {
    try {
      const redirectUrl = `${PUBLIC_APP_URL}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            restaurant_name: restaurantName
          }
        }
      });

      if (error) {
        toast({
          title: "Errore di registrazione",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Registrazione completata",
        description: "Controlla la tua email per confermare l'account"
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Accesso effettuato",
        description: "Benvenuto in RistoReply!"
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Modifica: accetta optional callback al termine signOut
  const signOut = async (onSignOutComplete?: () => void) => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Disconnesso",
        description: "A presto!"
      });
      if (onSignOutComplete) onSignOutComplete();
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  const resetPassword = async (email: string, redirectTo?: string) => {
    try {
      const redirectUrl = redirectTo
        ? redirectTo.replace(window.location.origin, PUBLIC_APP_URL)
        : `${PUBLIC_APP_URL}/auth`;
        
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast({
          title: "Errore reset password",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Link di recupero inviato",
        description: "Controlla la tua email per reimpostare la password.",
      });
      return { error: null };
    } catch (error) {
      toast({
          title: "Errore inatteso",
          description: "Si è verificato un errore durante il reset della password.",
          variant: "destructive",
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
