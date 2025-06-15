
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}: AuthModalProps) {
  const navigate = useNavigate();

  if (!showAuthModal) return null;

  const handleRedirect = () => {
    setShowAuthModal(false);
    navigate('/auth');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Accedi a RistoReply
          </h3>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Stai per accedere alla pagina di autenticazione sicura.
          </p>
          
          <button
            onClick={handleRedirect}
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Vai alla Pagina di Accesso
          </button>
          
          <div className="text-sm text-gray-500">
            ✅ Prova gratuita di 15 giorni<br />
            ✅ Nessuna carta richiesta
          </div>
        </div>
      </div>
    </div>
  );
}
