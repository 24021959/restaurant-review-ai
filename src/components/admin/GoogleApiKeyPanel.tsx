
import React, { useState } from "react";

/**
 * Pannello inserimento chiave Google Business API, solo UI/placeholder.
 * Il valore viene solo salvato localmente (in produzione si salverà su backend).
 */
export default function GoogleApiKeyPanel() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    // Integrazione vera via Supabase/edge function in secondo step.
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow max-w-xl mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Collega Google Business API</h2>
      <p className="mb-4 text-gray-600 text-sm">
        Inserisci la chiave API per abilitare lo scraping delle recensioni dal tuo account Google.
      </p>
      <form onSubmit={handleSave} className="flex flex-col space-y-3">
        <input
          type="text"
          className="border rounded px-2 py-1"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="API_KEY_GOOGLE_BUSINESS"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white rounded px-4 py-2 hover:bg-orange-700"
        >Salva</button>
        {saved && <p className="text-green-600 text-xs mt-1">Chiave salvata localmente (mockup)</p>}
      </form>
    </section>
  );
}
