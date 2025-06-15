
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import ApiKeyStats from './api-key-manager/ApiKeyStats';
import ApiKeyList from './api-key-manager/ApiKeyList';
import AddApiKeyForm from './api-key-manager/AddApiKeyForm';

interface ApiKey {
  id: string;
  name: string;
  key_preview: string;
  daily_usage: number;
  daily_limit: number;
  is_active: boolean;
  created_at: string;
}

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadApiKeys();
    }
  }, [user]);

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { action: 'list' },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });
      
      if (error) throw error;
      setApiKeys(data.keys || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare le chiavi API",
        variant: "destructive"
      });
    }
  };

  const addApiKey = async (name: string, key: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { 
          action: 'add',
          name,
          key
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Chiave API aggiunta con successo"
      });

      loadApiKeys();
    } catch (error) {
      console.error('Error adding API key:', error);
      toast({
        title: "Errore",
        description: "Impossibile aggiungere la chiave API",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleApiKey = async (keyId: string, isActive: boolean) => {
    try {
      await supabase.functions.invoke('manage-api-keys', {
        body: { 
          action: 'toggle',
          keyId,
          isActive: !isActive
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      toast({
        title: "Successo",
        description: `Chiave API ${!isActive ? 'attivata' : 'disattivata'}`
      });

      loadApiKeys();
    } catch (error) {
      console.error('Error toggling API key:', error);
      toast({
        title: "Errore",
        description: "Impossibile modificare lo stato della chiave",
        variant: "destructive"
      });
    }
  };

  const deleteApiKey = async (keyId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa chiave API?')) return;

    try {
      await supabase.functions.invoke('manage-api-keys', {
        body: { 
          action: 'delete',
          keyId
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      toast({
        title: "Successo",
        description: "Chiave API eliminata"
      });

      loadApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare la chiave API",
        variant: "destructive"
      });
    }
  };

  const totalUsage = apiKeys.reduce((sum, key) => sum + key.daily_usage, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.daily_limit, 0);
  const usagePercentage = totalLimit > 0 ? (totalUsage / totalLimit) * 100 : 0;

  if (!user) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Devi essere autenticato per gestire le chiavi API.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Gestione API Keys Google Business
          </CardTitle>
          <CardDescription>
            Gestisci le tue chiavi API per garantire scalabilità e evitare limiti di quota
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiKeyStats
            totalKeys={apiKeys.length}
            activeKeys={apiKeys.filter(k => k.is_active).length}
            totalUsage={totalUsage}
            totalLimit={totalLimit}
            usagePercentage={usagePercentage}
          />

          <div className="mt-6">
            <ApiKeyList
              apiKeys={apiKeys}
              onToggleApiKey={toggleApiKey}
              onDeleteApiKey={deleteApiKey}
            />
          </div>

          <div className="mt-6">
            <AddApiKeyForm
              onAddApiKey={addApiKey}
              isLoading={isLoading}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
