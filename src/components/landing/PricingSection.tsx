
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PricingSectionProps {
  onStartTrial: (plan?: string) => void;
}

export default function PricingSection({ onStartTrial }: PricingSectionProps) {
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
      popular: false
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
      popular: true
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
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Piani Semplici e Trasparenti
          </h2>
          <p className="text-xl text-gray-600">
            Scegli il piano perfetto per il tuo ristorante. Cambia o cancella in qualsiasi momento.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${
              plan.popular ? 'border-orange-600' : 'border-gray-200'
            }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Più Popolare
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                  <span className="text-gray-600">/mese</span>
                </div>
                <p className="text-orange-600 font-medium mb-6">{plan.reviews}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onStartTrial(plan.name)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-orange-600 text-white hover:bg-orange-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Inizia Prova Gratuita
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            🎯 <strong>15 giorni di prova gratuita</strong> • Nessun vincolo • Cancellazione immediata
          </p>
          <p className="text-sm text-gray-500">
            Tutti i piani includono integrazione con Google Business Profile e supporto in italiano
          </p>
        </div>
      </div>
    </section>
  );
}
