
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, MoreHorizontal, Mail, Ban, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: '1',
      email: 'mario.rossi@example.com',
      restaurantName: 'Ristorante Da Mario',
      plan: 'Professional',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-06-14'
    },
    {
      id: '2',
      email: 'giulia.bianchi@example.com',
      restaurantName: 'Pizzeria Giulia',
      plan: 'Basic',
      status: 'trial',
      createdAt: '2024-06-01',
      lastLogin: '2024-06-13'
    },
    {
      id: '3',
      email: 'luca.verdi@example.com',
      restaurantName: 'Trattoria del Porto',
      plan: 'Enterprise',
      status: 'active',
      createdAt: '2024-03-20',
      lastLogin: '2024-06-15'
    },
    {
      id: '4',
      email: 'anna.neri@example.com',
      restaurantName: 'Café Central',
      plan: 'Professional',
      status: 'suspended',
      createdAt: '2024-02-10',
      lastLogin: '2024-06-10'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Attivo</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Sospeso</Badge>;
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

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione Utenti</CardTitle>
        <CardDescription>
          Visualizza e gestisci tutti gli utenti della piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cerca per email o nome ristorante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            Invia Email
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utente</TableHead>
                <TableHead>Ristorante</TableHead>
                <TableHead>Piano</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Registrato</TableHead>
                <TableHead>Ultimo Accesso</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.email}</div>
                      <div className="text-sm text-gray-500">ID: {user.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.restaurantName}</TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Invia Email
                        </DropdownMenuItem>
                        {user.status === 'suspended' ? (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Riattiva
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            Sospendi
                          </DropdownMenuItem>
                        )}
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
  );
}
