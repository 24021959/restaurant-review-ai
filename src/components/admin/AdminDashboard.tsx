
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Settings, BarChart3, CreditCard, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminStats from './AdminStats';
import RealUserManagement from './RealUserManagement';
import SubscriptionManagement from './SubscriptionManagement';
import SystemSettings from './SystemSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna alla Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  🔧 Pannello Amministratore
                </h1>
                <p className="text-gray-600">Gestisci utenti, abbonamenti e impostazioni di sistema</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Panoramica
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Utenti
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Abbonamenti
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Impostazioni
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attività Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Nuovo utente registrato</span>
                      <span className="text-xs text-gray-500">2 ore fa</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm">Piano aggiornato a Professional</span>
                      <span className="text-xs text-gray-500">4 ore fa</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Nuova recensione elaborata</span>
                      <span className="text-xs text-gray-500">6 ore fa</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stato Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Google Business</span>
                      <span className="text-green-600 text-sm font-medium">Operativo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <span className="text-green-600 text-sm font-medium">Operativo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Servizio AI</span>
                      <span className="text-green-600 text-sm font-medium">Operativo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sistema Pagamenti</span>
                      <span className="text-green-600 text-sm font-medium">Operativo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <RealUserManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
