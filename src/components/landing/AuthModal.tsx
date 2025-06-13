
import React from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: string;
  setAuthMode: (mode: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  restaurantName: string;
  setRestaurantName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthModal({
  showAuthModal,
  setShowAuthModal,
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  restaurantName,
  setRestaurantName,
  onSubmit
}: AuthModalProps) {
  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {authMode === 'login' ? 'Accedi' : 'Registrati'}
          </h3>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome del Ristorante
              </label>
              <input
                type="text"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Es. Trattoria da Mario"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="la-tua-email@esempio.it"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            {authMode === 'login' ? 'Accedi' : 'Inizia Prova Gratuita'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-orange-600 hover:text-orange-700 text-sm"
          >
            {authMode === 'login' 
              ? 'Non hai un account? Registrati' 
              : 'Hai già un account? Accedi'
            }
          </button>
        </div>
      </div>
    </div>
  );
}
