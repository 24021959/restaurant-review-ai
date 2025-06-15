
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TrialStatusAlert({ trialEndsAt }: { trialEndsAt: string | null }) {
  const navigate = useNavigate();
  if (!trialEndsAt) return null;
  const scadenza = new Date(trialEndsAt).getTime();
  const giorniRestanti = Math.max(0, Math.ceil((scadenza - Date.now()) / 86400000));
  return (
    <Alert className="mb-6 border-orange-400 bg-orange-50 text-orange-800 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-orange-600" />
      <div>
        <AlertDescription>
          {giorniRestanti > 0 ? (
            <>La tua prova gratuita termina tra <b>{giorniRestanti} giorni</b>. Dopo dovrai sottoscrivere un abbonamento per continuare.<br />
            <span className="underline cursor-pointer text-orange-700" onClick={() => navigate("/piani-abbonamento")}>Scegli Piano Abbonamento</span></>
          ) : (
            <>La prova è terminata! Scegli un piano per continuare:{" "}
              <span className="underline cursor-pointer text-orange-700" onClick={() => navigate("/piani-abbonamento")}>Vai ai piani</span></>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
}
