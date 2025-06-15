
import React, { useState } from "react";
import AdminStats from "./AdminStats";
import RealUserManagement from "./RealUserManagement";
import SubscriptionManagement from "./SubscriptionManagement";
import AllApiKeysManager from "./AllApiKeysManager";
import SystemSettings from "./SystemSettings";
import StripeIntegrationPanel from "./StripeIntegrationPanel";
import IntegrationSettingsPanel from "./IntegrationSettingsPanel";
import GoogleApiKeyPanel from "./GoogleApiKeyPanel";
import ResendApiKeyPanel from "./ResendApiKeyPanel";
import AdminDebugPanel from "./AdminDebugPanel";
import AdminHeader from "./AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CreditCard, Settings, Zap, Key, Bug } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-orange-50 to-purple-100 flex flex-col">
      {/* Intestazione con logout */}
      <AdminHeader />
      
      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Statistiche sempre visibili in alto */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Dashboard Amministratore</h2>
          <AdminStats />
        </section>

        {/* Sistema a tab per tutte le funzionalità */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Utenti
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Abbonamenti
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Integrazioni
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Sistema
            </TabsTrigger>
            <TabsTrigger value="debug" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Debug
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <RealUserManagement />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <SubscriptionManagement />
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <IntegrationSettingsPanel />
            <StripeIntegrationPanel />
            <GoogleApiKeyPanel />
            <ResendApiKeyPanel />
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <AllApiKeysManager />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="debug" className="space-y-6">
            <AdminDebugPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
