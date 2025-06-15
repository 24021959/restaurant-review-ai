
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ApiKeyStatsProps {
  totalKeys: number;
  activeKeys: number;
  totalUsage: number;
  totalLimit: number;
  usagePercentage: number;
}

export default function ApiKeyStats({ 
  totalKeys, 
  activeKeys, 
  totalUsage, 
  totalLimit, 
  usagePercentage 
}: ApiKeyStatsProps) {
  return (
    <div className="space-y-6">
      {/* Statistiche generali */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalKeys}</div>
          <div className="text-sm text-blue-800">Chiavi Totali</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{activeKeys}</div>
          <div className="text-sm text-green-800">Chiavi Attive</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{totalUsage}</div>
          <div className="text-sm text-orange-800">Richieste Oggi</div>
        </div>
      </div>

      {/* Barra di utilizzo generale */}
      <div>
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
    </div>
  );
}
