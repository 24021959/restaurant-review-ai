
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartTrial: (plan?: string) => void;
  onOpenDemo: () => void;
}

export default function HeroSection({ onStartTrial, onOpenDemo }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Non Perdere Mai<br />
            Una <span className="text-orange-600">Recensione</span> Su Google
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            L'intelligenza artificiale che risponde alle recensioni del tuo ristorante su Google Business Profile. 
            Automaticamente, professionalmente, 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onStartTrial('Professional')}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
            >
              Inizia Prova Gratuita 15 Giorni
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={onOpenDemo}
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Guarda Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✅ Nessuna carta di credito richiesta • ✅ Cancellazione in qualsiasi momento
          </p>
        </div>
      </div>
    </section>
  );
}
