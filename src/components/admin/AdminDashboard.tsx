import React from "react";
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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-orange-50 to-purple-100 flex flex-col">
      {/* Intestazione con logout */}
      <AdminHeader />
      <div className="flex-1 p-6 flex flex-col gap-10">
        {/* Sezione stato collegamenti piattaforme */}
        <IntegrationSettingsPanel />
        {/* Pannelli configurazione collegamenti */}
        <StripeIntegrationPanel />
        <GoogleApiKeyPanel />
        <ResendApiKeyPanel />
        {/* Sezione statistiche */}
        <section>
          <AdminStats />
        </section>
        {/* Gestione utenti reali */}
        <section>
          <RealUserManagement />
        </section>
        {/* Gestione abbonamenti */}
        <section>
          <SubscriptionManagement />
        </section>
        {/* Gestione completa API Keys */}
        <section>
          <AllApiKeysManager />
        </section>
        {/* Impostazioni sistema */}
        <section>
          <SystemSettings />
        </section>
        {/* Debug Panel */}
        <AdminDebugPanel />
      </div>
    </div>
  );
}
