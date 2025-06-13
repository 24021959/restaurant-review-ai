
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-orange-600 mb-4">🍝 RistoReply</h3>
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
