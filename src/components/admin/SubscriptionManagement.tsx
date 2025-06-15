
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, MoreHorizontal, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SubscriptionManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const subscriptions = [
    {
      id: '1',
      userEmail: 'mario.rossi@example.com',
      plan: 'Professional',
      status: 'active',
      amount: 29.99,
      nextBilling: '2024-07-15',
      stripeId: 'sub_1234567890'
    },
    {
      id: '2',
      userEmail: 'giulia.bianchi@example.com',
      plan: 'Basic',
      status: 'trialing',
      amount: 9.99,
      nextBilling: '2024-06-30',
      stripeId: 'sub_0987654321'
    },
    {
      id: '3',
      userEmail: 'luca.verdi@example.com',
      plan: 'Enterprise',
      status: 'active',
      amount: 99.99,
      nextBilling: '2024-07-20',
      stripeId: 'sub_1122334455'
    },
    {
      id: '4',
      userEmail: 'anna.neri@example.com',
      plan: 'Professional',
      status: 'past_due',
      amount: 29.99,
      nextBilling: '2024-06-10',
      stripeId: 'sub_5566778899'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Attivo</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'past_due':
        return <Badge className="bg-red-100 text-red-800">Scaduto</Badge>;
      case 'canceled':
        return <Badge className="bg-gray-100 text-gray-800">Cancellato</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Basic':
        return <Badge variant="outline">Basic</Badge>;
      case 'Professional':
        return <Badge className="bg-orange-100 text-orange-800">Professional</Badge>;
      case 'Enterprise':
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Abbonamenti Attivi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-green-600">+15% dal mese scorso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ricavi Mensili
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€23,456</div>
            <p className="text-xs text-green-600">+8% dal mese scorso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Trial Attivi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-blue-600">+22% dal mese scorso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pagamenti Falliti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-red-600">-3% dal mese scorso</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestione Abbonamenti</CardTitle>
          <CardDescription>
            Visualizza e gestisci tutti gli abbonamenti degli utenti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cerca per email o piano..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              Esporta
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utente</TableHead>
                  <TableHead>Piano</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Importo</TableHead>
                  <TableHead>Prossima Fatturazione</TableHead>
                  <TableHead>Stripe ID</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div className="font-medium">{subscription.userEmail}</div>
                    </TableCell>
                    <TableCell>{getPlanBadge(subscription.plan)}</TableCell>
                    <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                    <TableCell>€{subscription.amount}/mese</TableCell>
                    <TableCell>{subscription.nextBilling}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {subscription.stripeId}
                      </code>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Visualizza in Stripe
                          </DropdownMenuItem>
                          {subscription.status === 'past_due' && (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Risolvi Pagamento
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Cancella Abbonamento
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
