
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          🔧 Pannello Amministratore
        </h1>
        <p className="text-gray-600">
          In questa sezione visualizzerai le metriche e la gestione utenti/abbonamenti reali non appena disponibili.
        </p>
        <div className="text-orange-500 font-semibold">
          Nessun dato disponibile. Tutte le funzioni sono in attesa di collegamento ai dati reali.
        </div>
      </div>
    </div>
  );
}
