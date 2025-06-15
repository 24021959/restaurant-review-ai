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

export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-orange-50 to-purple-100 p-6 flex flex-col gap-10">
      {/* Intestazione */}
      <header className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h1 className="text-3xl font-bold text-orange-700 mb-1">Pannello di Amministrazione</h1>
        <span className="rounded-full px-4 py-1 bg-orange-200/80 text-orange-700 font-semibold shadow">
          Admin Mode
        </span>
      </header>
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
  );
}
