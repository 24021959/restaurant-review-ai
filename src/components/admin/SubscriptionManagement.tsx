
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Abbonamenti</CardTitle>
          <CardDescription>
            Visualizza e gestisci tutti gli abbonamenti degli utenti (solo dati reali: nessun abbonamento ora).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-orange-400">
            Nessun abbonamento presente.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
