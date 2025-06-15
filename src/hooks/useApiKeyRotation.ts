
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ApiKeyStatus {
  id: string;
  key: string;
  dailyUsage: number;
  dailyLimit: number;
  minuteUsage: number;
  minuteLimit: number;
  isActive: boolean;
  lastUsed: Date;
}

interface ApiKeyRotationHook {
  getAvailableKey: () => Promise<string | null>;
  recordUsage: (keyId: string) => Promise<void>;
  getUsageStats: () => ApiKeyStats;
  isOverLimit: boolean;
}

interface ApiKeyStats {
  totalDailyUsage: number;
  totalKeys: number;
  activeKeys: number;
  averageUsage: number;
}

export const useApiKeyRotation = (): ApiKeyRotationHook => {
  const [apiKeys, setApiKeys] = useState<ApiKeyStatus[]>([]);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);
  const { user } = useAuth();

  // Carica le API keys dal database
  useEffect(() => {
    if (user) {
      loadApiKeys();
      const interval = setInterval(loadApiKeys, 60000); // Aggiorna ogni minuto
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadApiKeys = async () => {
    if (!user) return;
    
    try {
      const session = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('get-api-keys-status', {
        headers: {
          Authorization: `Bearer ${session.data.session?.access_token}`
        }
      });
      
      if (error) throw error;
      
      setApiKeys(data.keys || []);
      setIsOverLimit(data.allKeysOverLimit || false);
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  };

  const getAvailableKey = async (): Promise<string | null> => {
    // Trova la prima chiave disponibile con quota rimanente
    const availableKeys = apiKeys.filter(key => 
      key.isActive && 
      key.dailyUsage < key.dailyLimit && 
      key.minuteUsage < key.minuteLimit
    );

    if (availableKeys.length === 0) {
      setIsOverLimit(true);
      return null;
    }

    // Rotazione round-robin tra le chiavi disponibili
    const selectedKey = availableKeys[currentKeyIndex % availableKeys.length];
    setCurrentKeyIndex(prev => prev + 1);

    return selectedKey.key;
  };

  const recordUsage = async (keyId: string): Promise<void> => {
    try {
      const session = await supabase.auth.getSession();
      await supabase.functions.invoke('record-api-usage', {
        body: { keyId, timestamp: new Date().toISOString() },
        headers: {
          Authorization: `Bearer ${session.data.session?.access_token}`
        }
      });
      
      // Aggiorna lo stato locale
      setApiKeys(prev => prev.map(key => 
        key.id === keyId 
          ? { ...key, dailyUsage: key.dailyUsage + 1, minuteUsage: key.minuteUsage + 1 }
          : key
      ));
    } catch (error) {
      console.error('Error recording API usage:', error);
    }
  };

  const getUsageStats = (): ApiKeyStats => {
    const totalDailyUsage = apiKeys.reduce((sum, key) => sum + key.dailyUsage, 0);
    const activeKeys = apiKeys.filter(key => key.isActive).length;
    
    return {
      totalDailyUsage,
      totalKeys: apiKeys.length,
      activeKeys,
      averageUsage: activeKeys > 0 ? totalDailyUsage / activeKeys : 0
    };
  };

  return {
    getAvailableKey,
    recordUsage,
    getUsageStats,
    isOverLimit
  };
};
