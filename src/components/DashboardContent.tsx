import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ApiKeyManager from './ApiKeyManager';
import ReviewsManager from './ReviewsManager';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import BusinessProfileManager from './BusinessProfileManager';

interface DashboardContentProps {
  activeTab: string;
  usageStats: {
    totalDailyUsage: number;
    totalKeys: number;
    activeKeys: number;
    averageUsage: number;
  };
  isOverLimit: boolean;
  dashboardStats: {
    pendingReviews: number;
    respondedToday: number;
    avgResponseTime: string;
    satisfactionRate: string;
  };
  restaurantInfo: {
    avgRating: number;
    totalReviews: number;
    monthlyGrowth: string;
  };
  loading: boolean;
  onTabChange: (tab: string) => void;
  onRefreshData: () => void;
}

export default function DashboardContent({ 
  activeTab, 
  usageStats, 
  isOverLimit, 
  dashboardStats, 
  restaurantInfo,
  loading,
  onTabChange,
  onRefreshData
}: DashboardContentProps) {
  
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Alert per rate limiting */}
      {isOverLimit && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Limiti API raggiunti!</strong> Tutte le chiavi Google Business API hanno raggiunto i limiti giornalieri. 
            Alcune funzionalità potrebbero essere limitate. Considera l'aggiunta di nuove chiavi API.
          </AlertDescription>
        </Alert>
      )}

      {/* Statistiche Dashboard */}
      <DashboardStats
        usageStats={usageStats}
        isOverLimit={isOverLimit}
        dashboardStats={dashboardStats}
        restaurantInfo={restaurantInfo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafico andamento recensioni */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
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
        <QuickActions
          onTabChange={onTabChange}
          pendingReviewsCount={dashboardStats.pendingReviews}
          onRefreshData={onRefreshData}
          loading={loading}
        />
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

  const renderBusinessProfile = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profilo azienda & documenti</h2>
      <BusinessProfileManager />
    </div>
  );

  switch (activeTab) {
    case 'dashboard':
      return renderDashboard();
    case 'reviews':
      return <ReviewsManager />;
    case 'settings':
      return renderSettings();
    case 'profile':
      return renderBusinessProfile();
    default:
      return renderDashboard();
  }
}
