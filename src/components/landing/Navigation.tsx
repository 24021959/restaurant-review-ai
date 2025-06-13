
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function Navigation({ onLoginClick, onRegisterClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">🍝 RistoReply</h1>
            <span className="ml-2 text-sm text-gray-500">by AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Funzionalità</a>
            <a href="#pricing" className="text-gray-700 hover:text-orange-600 transition-colors">Prezzi</a>
            <a href="#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">Recensioni</a>
            <button 
              onClick={onLoginClick}
              className="text-gray-700 hover:text-orange-600 transition-colors"
            >
              Accedi
            </button>
            <button 
              onClick={onRegisterClick}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Prova Gratis
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
