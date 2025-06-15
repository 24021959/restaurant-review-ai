
import React from "react";
import AdminStats from "./AdminStats";
import RealUserManagement from "./RealUserManagement";
import SubscriptionManagement from "./SubscriptionManagement";
import AllApiKeysManager from "./AllApiKeysManager";
import SystemSettings from "./SystemSettings";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
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
    </div>
  );
}
