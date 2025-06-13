
import React from 'react';
import { MessageCircle, Clock, BarChart3, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-orange-600" />,
      title: "Risposte AI Intelligenti",
      description: "L'intelligenza artificiale analizza ogni recensione e genera risposte personalizzate e professionali in pochi secondi."
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Risposta in Tempo Reale",
      description: "Non perdere mai una recensione. Il sistema monitora costantemente il tuo profilo Google Business e risponde immediatamente."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      title: "Analytics Dettagliati",
      description: "Scopri tendenze, sentiment dei clienti e migliora la reputazione del tuo ristorante con reportistica avanzata."
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      title: "Controllo Totale",
      description: "Revisiona e modifica ogni risposta prima della pubblicazione. Tu mantieni sempre il controllo finale."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perché I Ristoratori Scelgono RistoReply
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La soluzione completa per gestire la reputazione online del tuo ristorante senza stress
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
