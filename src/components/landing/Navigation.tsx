import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Navigation({ onLoginClick, onRegisterClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img src="/lovable-uploads/ad1b3b88-da57-4d85-aa1a-0c4f08dc43f8.png" alt="RistoReply" className="h-12 w-auto bg-transparent" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Funzionalità</a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-600 transition-colors">Prezzi</a>
            <a href="#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">Recensioni</a>

            {/* MENU A CASCATA LOGIN */}
            <div className="relative">
              <button 
                onClick={() => setIsLoginMenuOpen((prev) => !prev)}
                className="flex items-center text-gray-700 hover:text-orange-600 transition-colors focus:outline-none"
              >
                Accedi
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isLoginMenuOpen && (
                <div 
                  className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-30"
                  onMouseLeave={() => setIsLoginMenuOpen(false)}
                >
                  <a
                    href="/auth"
                    className="block w-full px-4 py-2 hover:bg-orange-50 text-gray-700 rounded-t-lg"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    Accesso Utente
                  </a>
                  <a
                    href="/admin-login"
                    className="block w-full px-4 py-2 hover:bg-orange-50 text-gray-700 rounded-b-lg"
                    onClick={() => setIsLoginMenuOpen(false)}
                  >
                    Accesso Admin
                  </a>
                </div>
              )}
            </div>

            <button 
              onClick={onRegisterClick}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Prova Gratis
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <a href="#features" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">Funzionalità</a>
          <a href="#pricing" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">Prezzi</a>
          <a href="#testimonials" className="block py-2 text-gray-700 hover:text-orange-600 transition-colors">Recensioni</a>
          <a
            href="/auth"
            className="block w-full text-left py-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            Accesso Utente
          </a>
          <a
            href="/admin-login"
            className="block w-full py-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            Accesso Admin
          </a>
          <button 
            onClick={onRegisterClick}
            className="block w-full text-left py-2 bg-orange-600 text-white rounded-lg mt-2 hover:bg-orange-700 transition-colors"
          >
            Prova Gratis
          </button>
        </div>
      )}
    </nav>
  );
}
