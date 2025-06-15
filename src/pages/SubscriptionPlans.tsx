
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function SubscriptionPlans() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-purple-100">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-orange-700">Scegli il piano</h1>
        <p className="mb-6 text-gray-600 text-sm">Seleziona il piano più adatto alla tua attività per continuare ad usare RecensionePro</p>
        <div className="space-y-6">
          <div className="border rounded p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-orange-700">Professional</h2>
              <span className="font-mono text-gray-700 font-bold text-xl">€39/mese</span>
            </div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Risposte AI illimitate</li>
              <li>Notifiche email</li>
              <li>Monitoraggio recensioni</li>
              <li>Assistenza prioritaria</li>
            </ul>
            <Button
              className="mt-4 bg-orange-600 hover:bg-orange-700"
              onClick={() => {
                // In futuro apertura sessione Stripe
                window.alert('Pagamento Stripe non ancora integrato, solo demo UI');
              }}
            >
              Attiva Professional
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
