
import React from "react";

/**
 * Pannello compatto per riassumere lo stato degli “agganci” alle piattaforme:
 */
export default function IntegrationSettingsPanel() {
  // Placeholder: questi stati saranno gestiti via Supabase/settings reali
  const integrations = [
    {
      name: "Google Business API",
      status: "Non collegato", // o "Collegato"
      instructions: "Inserisci la API key nel campo apposito. Serve per lo scraping recensioni.",
      link: null,
    },
    {
      name: "Stripe",
      status: "Non collegato",
      instructions: "Collega le chiavi di Stripe per attivare i pagamenti ricorrenti.",
      link: null,
    },
    {
      name: "Resend (Email)",
      status: "Non collegato",
      instructions: "Per invio email transazionali, configura la tua API Key Resend.",
      link: null,
    },
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow max-w-xl mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Stato Collegamento Piattaforme</h2>
      <ul className="space-y-4">
        {integrations.map((int, i) => (
          <li key={int.name} className="flex flex-col border-b pb-3 last:border-b-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{int.name}</span>
              <span className={`px-2 rounded font-mono text-xs ${int.status === "Collegato" ? "bg-green-100 text-green-700" : "bg-orange-200 text-orange-700"}`}>{int.status}</span>
            </div>
            <div className="text-gray-600 text-sm mt-1">{int.instructions}</div>
            {int.link && (
              <a href={int.link} className="text-blue-600 text-xs underline mt-1">Gestisci</a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
