
import React, { useState } from "react";

/** 
 * Pannello per collegamento e visualizzazione stato Stripe (solo admin).
 * Le chiavi vengono gestite solo da admin e mostrate mascherate. 
 * In produzione salverai le chiavi altrove (es: secret manager), qui è solo placeholder.
 */
export default function StripeIntegrationPanel() {
  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [saved, setSaved] = useState(false);

  // Placeholder: mostrare stato "collegato" o "non collegato", nessun salvataggio reale
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    // In futuro: salva su backend/edge function: { publicKey, secretKey }
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow mb-6 max-w-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Collega Stripe</h2>
      <p className="mb-4 text-gray-600">
        Inserisci le chiavi API Stripe live/test.<br />
        <span className="text-xs text-orange-700">⚠️ Solo amministratori. Nessun dato viene salvato sino a integrazione edge function.</span>
      </p>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="font-medium text-sm">Public Key</label>
          <input 
            type="text"
            value={publicKey}
            onChange={e => setPublicKey(e.target.value)}
            className="w-full border rounded px-2 py-1 bg-gray-50 mt-1"
            placeholder="pk_test_..."
          />
        </div>
        <div>
          <label className="font-medium text-sm">Secret Key</label>
          <input 
            type="password"
            value={secretKey}
            onChange={e => setSecretKey(e.target.value)}
            className="w-full border rounded px-2 py-1 bg-gray-50 mt-1"
            placeholder="sk_test_..."
          />
        </div>
        <button 
          type="submit" 
          className="bg-orange-600 text-white rounded px-4 py-2 hover:bg-orange-700"
        >
          Salva
        </button>
        {saved && (
          <div className="text-green-600 mt-2 text-sm">Chiavi salvate localmente (mockup)</div>
        )}
      </form>
    </section>
  );
}
