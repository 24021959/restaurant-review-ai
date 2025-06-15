
import React from "react";

export default function BusinessProfileGuide() {
  return (
    <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded text-orange-900 text-sm">
      <h3 className="font-bold text-base mb-1">Guida veloce alla configurazione</h3>
      <ol className="space-y-1 list-decimal ml-4">
        <li>
          <b>Completa il profilo della tua attività:</b> inserisci nome, descrizione, contatti e indirizzo per presentarti ai tuoi clienti.
        </li>
        <li>
          <b>Imposta il tono della comunicazione:</b> scegli uno stile adatto alla tua attività oppure descrivine uno personalizzato.
        </li>
        <li>
          <b>Arricchisci la conoscenza:</b> importa informazioni dal tuo sito web e aggiungi manualmente documenti e FAQ utili per le risposte automatiche.
        </li>
      </ol>
      <div className="mt-2 text-xs text-orange-800">
        Puoi sempre tornare su questa pagina per modificare le informazioni della tua attività.
      </div>
    </div>
  );
}
