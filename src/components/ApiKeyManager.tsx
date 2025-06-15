
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Trash2, AlertTriangle, CheckCircle, Key } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { action: 'list' }
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

  const addApiKey = async () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-api-keys', {
        body: { 
          action: 'add',
          name: newKeyName,
          key: newKeyValue
        }
      });

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Chiave API aggiunta con successo"
      });

      setNewKeyName('');
      setNewKeyValue('');
      setShowAddForm(false);
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
          {/* Statistiche generali */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{apiKeys.length}</div>
              <div className="text-sm text-blue-800">Chiavi Totali</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {apiKeys.filter(k => k.is_active).length}
              </div>
              <div className="text-sm text-green-800">Chiavi Attive</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{totalUsage}</div>
              <div className="text-sm text-orange-800">Richieste Oggi</div>
            </div>
          </div>

          {/* Barra di utilizzo generale */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Utilizzo Complessivo</span>
              <span className="text-sm text-gray-500">{totalUsage}/{totalLimit}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            {usagePercentage > 80 && (
              <Alert className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Attenzione: stai raggiungendo i limiti di quota giornaliera
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Lista delle chiavi */}
          <div className="space-y-4 mb-6">
            {apiKeys.map((key) => (
              <div key={key.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{key.name}</h3>
                    <Badge variant={key.is_active ? "default" : "secondary"}>
                      {key.is_active ? "Attiva" : "Inattiva"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleApiKey(key.id, key.is_active)}
                    >
                      {key.is_active ? "Disattiva" : "Attiva"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteApiKey(key.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Chiave: {key.key_preview}...
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Utilizzo: {key.daily_usage}/{key.daily_limit}
                  </span>
                  <Progress 
                    value={(key.daily_usage / key.daily_limit) * 100} 
                    className="w-32 h-2" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Form per aggiungere nuova chiave */}
          {showAddForm ? (
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Aggiungi Nuova Chiave API</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Nome chiave (es. Google-Key-1)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
                <Input
                  placeholder="Chiave API"
                  type="password"
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={addApiKey} 
                  disabled={isLoading || !newKeyName.trim() || !newKeyValue.trim()}
                >
                  {isLoading ? "Aggiungendo..." : "Aggiungi"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Annulla
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowAddForm(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Nuova Chiave API
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
