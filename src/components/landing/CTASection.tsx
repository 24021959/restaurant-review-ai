
import React from 'react';

interface CTASectionProps {
  onStartTrial: (plan?: string) => void;
}

export default function CTASection({ onStartTrial }: CTASectionProps) {
  return (
    <section className="py-20 bg-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Pronto a Trasformare Le Tue Recensioni?
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Unisciti a centinaia di ristoratori che hanno già automatizzato la gestione delle loro recensioni
        </p>
        <button 
          onClick={() => onStartTrial('Professional')}
          className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Inizia La Tua Prova Gratuita Ora
        </button>
      </div>
    </section>
  );
}
