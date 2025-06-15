
import React from "react";

interface Props {
  activeTab: "profile" | "tone" | "knowledge";
}

export function TabSectionGuide({ activeTab }: Props) {
  if (activeTab === "profile") {
    return (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <b>Step per impostare il tuo profilo attività:</b>
        <ol className="list-decimal ml-5 mt-1 space-y-1">
          <li>
            Inserisci <b>nome attività</b> (campo obbligatorio).
          </li>
          <li>
            (Opzionale) Fornisci una breve <b>descrizione</b> della tua attività.
          </li>
          <li>
            (Opzionale) Aggiungi <b>telefono</b> e <b>indirizzo</b> per aiutare i clienti a contattarti.
          </li>
          <li>
            Salva le modifiche: premi <b>"Salva Profilo"</b>. Puoi modificarle in qualsiasi momento.
          </li>
        </ol>
      </div>
    );
  }

  if (activeTab === "tone") {
    return (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <b>Step per scegliere il tono della comunicazione:</b>
        <ol className="list-decimal ml-5 mt-1 space-y-1">
          <li>
            Scegli uno <b>stile di comunicazione</b> tra quelli proposti (formale, informale, cordiale...).
          </li>
          <li>
            Se scegli <b>personalizzato</b>, descrivi brevemente lo stile che preferisci.
          </li>
          <li>
            Le preferenze di tono saranno usate per generare le risposte automatiche.
          </li>
        </ol>
      </div>
    );
  }

  // activeTab === "knowledge"
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
      <b>Step per arricchire la conoscenza della tua attività:</b>
      <ol className="list-decimal ml-5 mt-1 space-y-1">
        <li>
          Inserisci l’<b>indirizzo del tuo sito web</b> e premi <b>"Estrai informazioni"</b> per importare contenuti importanti.
        </li>
        <li>
          Controlla i testi estratti e verifica che siano rappresentativi della tua attività.
        </li>
        <li>
          Aggiungi manualmente <b>FAQ</b> o altri documenti utili attraverso l’apposito modulo.
        </li>
        <li>
          Puoi eliminare le FAQ/documenti che non sono più utili in qualsiasi momento.
        </li>
      </ol>
    </div>
  );
}
