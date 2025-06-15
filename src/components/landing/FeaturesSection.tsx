
import React from 'react';
import { MessageCircle, Clock, BarChart3, Shield } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Risparmia Ore Ogni Settimana",
      description: "Stop a perdere 2-3 ore al giorno per rispondere alle recensioni. La nostra AI lo fa per te in secondi, liberando il tuo tempo per servire meglio i clienti."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-orange-600" />,
      title: "Risposte Che Aumentano la Soddisfazione",
      description: "Risposte sempre professionali e personalizzate che migliorano la percezione del tuo ristorante. Clienti più soddisfatti = più prenotazioni."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      title: "Monitora e Migliora la Reputazione",
      description: "Analisi dettagliate del sentiment dei clienti ti aiutano a identificare problemi prima che diventino gravi e a migliorare continuamente il servizio."
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      title: "Tu Mantieni Sempre il Controllo",
      description: "Ogni risposta può essere rivista e modificata prima della pubblicazione. L'AI fa il lavoro pesante, tu dai il tocco finale."
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
            Smetti di sprecare tempo prezioso e inizia a vedere risultati concreti nella soddisfazione dei tuoi clienti
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
