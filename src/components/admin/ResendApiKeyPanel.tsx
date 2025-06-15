
import React, { useState } from "react";

/**
 * Pannello inserimento chiave Resend.com per invio email, solo UI/placeholder.
 */
export default function ResendApiKeyPanel() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    // Integrazione edge/secret in futuro
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow max-w-xl mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Collega Resend (email)</h2>
      <p className="mb-4 text-gray-600 text-sm">
        Inserisci la tua API Key di <a href="https://resend.com" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Resend.com</a> per ricevere notifiche email automatiche (nuove recensioni, scadenza trial, etc).
      </p>
      <form onSubmit={handleSave} className="flex flex-col space-y-3">
        <input
          type="text"
          className="border rounded px-2 py-1"
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
          placeholder="API_KEY_RESEND"
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
