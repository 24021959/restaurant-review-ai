
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="/lovable-uploads/ad1b3b88-da57-4d85-aa1a-0c4f08dc43f8.png" 
              alt="RistoReply" 
              className="h-12 w-auto bg-transparent" 
            />
            <span className="text-2xl font-bold text-orange-600 ml-2">RistoReply</span>
          </div>
          <p className="text-gray-400 mb-4">
            L'intelligenza artificiale per la gestione recensioni Google del tuo ristorante
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
            <a href="#" className="hover:text-white transition-colors">Supporto</a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            © 2024 RistoReply. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
