
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "29",
    reviews: "Fino a 50 recensioni/mese",
    features: [
      "Risposte AI automatiche",
      "Dashboard completa",
      "Supporto email",
      "Analytics base"
    ],
    value: "starter"
  },
  {
    name: "Professional",
    price: "49",
    reviews: "Fino a 150 recensioni/mese",
    features: [
      "Tutto di Starter",
      "Risposte personalizzabili",
      "Analytics avanzati",
      "Supporto prioritario",
      "Integrazione n8n"
    ],
    popular: true,
    value: "professional"
  },
  {
    name: "Enterprise",
    price: "79",
    reviews: "Recensioni illimitate",
    features: [
      "Tutto di Professional",
      "Account manager dedicato",
      "Formazione personalizzata",
      "API personalizzate",
      "SLA garantito"
    ],
    value: "enterprise"
  }
];

export default function SubscriptionPlans() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 to-purple-100 px-2">
      <div className="bg-white shadow-xl rounded-xl px-4 md:px-8 py-10 w-full max-w-lg md:max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-orange-700 text-center">Scegli il piano</h1>
        <p className="mb-8 text-gray-600 text-center text-sm">Seleziona il piano più adatto alla tua attività per continuare ad usare RecensionePro</p>
        <Carousel className="mb-4">
          <CarouselContent>
            {plans.map((plan, idx) => (
              <CarouselItem key={plan.value}>
                <div className={`border-2 rounded-xl px-6 py-8 bg-white flex flex-col items-center
                  ${plan.popular ? "border-orange-600 shadow-lg" : "border-gray-200"} relative`}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
                      Più Popolare
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h2>
                  <div className="mb-2">
                    <span className="text-4xl font-extrabold text-orange-700">€{plan.price}</span>
                    <span className="ml-1 text-gray-600 text-base">/mese</span>
                  </div>
                  <div className="mb-2 text-orange-600 font-medium">{plan.reviews}</div>
                  <ul className="text-gray-600 text-sm mb-6 space-y-2 text-left max-w-[260px]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full py-3 mt-1 rounded-lg font-semibold ${plan.popular ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                    onClick={() => window.alert("Pagamento Stripe non ancora integrato, solo demo UI")}
                  >
                    Attiva {plan.name}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-1">
            🎯 <strong>15 giorni di prova gratuita</strong> • Nessun vincolo • Cancellazione immediata
          </p>
          <p className="text-xs text-gray-400">Tutti i piani includono integrazione Google Business Profile e supporto in italiano</p>
        </div>
      </div>
    </div>
  );
}
