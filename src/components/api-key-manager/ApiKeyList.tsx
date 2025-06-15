
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2 } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key_preview: string;
  daily_usage: number;
  daily_limit: number;
  is_active: boolean;
  created_at: string;
}

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  onToggleApiKey: (keyId: string, isActive: boolean) => void;
  onDeleteApiKey: (keyId: string) => void;
}

export default function ApiKeyList({ apiKeys, onToggleApiKey, onDeleteApiKey }: ApiKeyListProps) {
  return (
    <div className="space-y-4">
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
                onClick={() => onToggleApiKey(key.id, key.is_active)}
              >
                {key.is_active ? "Disattiva" : "Attiva"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteApiKey(key.id)}
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
  );
}
