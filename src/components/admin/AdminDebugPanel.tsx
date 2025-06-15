
import React from "react";
/** Pannello per testare notifiche, scraping, cronjob manuali via dashboard admin */
export default function AdminDebugPanel() {
  // Placeholder: aggiungi qui azioni manuali (es. trigger scraping globale, invio test mail, ecc)
  return (
    <section className="bg-purple-50 border-l-4 border-purple-400 rounded-xl p-6 max-w-xl mb-8 shadow">
      <h2 className="text-lg font-bold text-purple-800 mb-2">Debug/Admin Tools</h2>
      <button
        className="bg-orange-600 rounded text-white px-4 py-2 mb-3"
        onClick={() => alert("Cron job simulato (call edge function scheduled-google-scrape)")}
      >Esegui scraping manuale</button>
      <button className="bg-green-600 rounded text-white px-4 py-2 ml-2"
        onClick={() => alert("Invio test notifiche Email (edge send-notification-email)")}>
        Invia test email
      </button>
      <p className="text-xs mt-3 text-purple-700">Ricordati di configurare le API keys nei pannelli sopra per le funzioni reali!</p>
      <p className="text-[10px] text-gray-400 mt-2">
        Per attivare davvero lo scraping automatico è necessario configurare un cron job da Supabase Dashboard.<br />
        Go to <b>Supabase → Database → Cron</b> e schedula la funzione <b>scheduled-google-scrape</b> (es: daily alle 4:00 AM)
      </p>
    </section>
  );
}
