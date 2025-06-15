
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Settings, 
  BarChart3, 
  Bell, 
  Calendar,
  MapPin,
  TrendingUp,
  Filter,
  LogOut,
  Key,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleBusinessService } from '@/hooks/useGoogleBusinessService';
import { useApiKeyRotation } from '@/hooks/useApiKeyRotation';
import ApiKeyManager from './ApiKeyManager';
import ReviewsManager from './ReviewsManager';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RecensioneProDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const googleBusinessService = useGoogleBusinessService();
  const apiKeyRotation = useApiKeyRotation();
  const usageStats = apiKeyRotation.getUsageStats();
  const isOverLimit = apiKeyRotation.isOverLimit;

  // Dati di esempio - solo Google
  const restaurantInfo = {
    name: "Trattoria del Borgo",
    location: "Roma, Italia",
    avgRating: 4.3,
    totalReviews: 847,
    monthlyGrowth: "+12%"
  };

  const dashboardStats = {
    pendingReviews: 5,
    respondedToday: 12,
    avgResponseTime: "2.3h",
    satisfactionRate: "94%"
  };

  const handleLogout = () => {
    signOut();
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const loadReviews = async () => {
    setLoading(true);
    try {
      const result = await googleBusinessService.getReviews('sample_business_id');
      
      if (result.rateLimited) {
        console.warn('Rate limit raggiunto:', result.error);
      } else if (result.error) {
        console.error('Errore nel caricamento recensioni:', result.error);
      } else {
        setReviews(result.reviews);
      }
    } catch (error) {
      console.error('Errore:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadReviews();
    }
  }, [activeTab]);

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Alert per rate limiting */}
      {isOverLimit && (
        <div className="md:col-span-3 mb-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Limiti API raggiunti!</strong> Tutte le chiavi Google Business API hanno raggiunto i limiti giornalieri. 
              Alcune funzionalità potrebbero essere limitate. Considera l'aggiunta di nuove chiavi API.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Statistiche API Usage */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <Key className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">API Usage</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">{usageStats.totalDailyUsage}</p>
        <p className="text-sm text-blue-700">Richieste oggi</p>
        <div className="mt-2 text-xs text-blue-600">
          {usageStats.activeKeys}/{usageStats.totalKeys} chiavi attive
        </div>
      </div>

      {/* Statistiche Principali */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <MessageCircle className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Recensioni da Rispondere</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.pendingReviews}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Risposte Oggi</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.respondedToday}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Tempo Medio Risposta</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.avgResponseTime}</p>
      </div>

      {/* Grafico andamento recensioni */}
      <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Andamento Recensioni</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Ultimi 30 giorni</span>
          </div>
        </div>
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          {loading ? "Caricamento..." : "Grafico placeholder - Implementazione futura"}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Azioni Rapide</h3>
        <div className="space-y-3">
          <button 
            onClick={() => setActiveTab('reviews')}
            className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="font-medium text-orange-800">Gestisci Recensioni</div>
                <div className="text-sm text-orange-600">{dashboardStats.pendingReviews} in attesa</div>
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">Impostazioni API</div>
                <div className="text-sm text-blue-600">Gestisci chiavi</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Impostazioni</h2>
      
      {/* Gestione API Keys */}
      <ApiKeyManager />
      
      {/* Altre impostazioni */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Impostazioni Generali</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Notifiche email</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span>Risposte automatiche</span>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-orange-600">🍝 RistoReply</h1>
              </div>
              <div className="ml-8">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{restaurantInfo.name}</span>
                  <span className="text-sm text-gray-500">• {restaurantInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurantInfo.avgRating}</span>
                <span>({restaurantInfo.totalReviews} recensioni)</span>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Esci</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="md:flex">
        <aside className="bg-gray-100 w-64 min-h-screen border-r border-gray-200 py-6 px-3">
          <nav>
            <ul>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'dashboard' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <BarChart3 className="h-4 w-4 inline-block mr-2" />
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'reviews' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <MessageCircle className="h-4 w-4 inline-block mr-2" />
                  Recensioni
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'settings' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <Settings className="h-4 w-4 inline-block mr-2" />
                  Impostazioni
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-6 px-4">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'reviews' && <ReviewsManager />}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
}
