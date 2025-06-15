import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import BusinessProfileManager from './BusinessProfileManager';
import ReviewsManager from './ReviewsManager'; // <-- Added missing import

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
      {isOverLimit && (
        <Alert className="border-orange-300 bg-orange-100">
          <AlertTriangle className="h-4 w-4 text-orange-700" />
          <AlertDescription className="text-orange-800">
            <strong>Limiti API raggiunti!</strong> Alcune funzionalità potrebbero essere limitate. Contatta l'amministratore.
          </AlertDescription>
        </Alert>
      )}

      <DashboardStats
        usageStats={usageStats}
        isOverLimit={isOverLimit}
        dashboardStats={dashboardStats}
        restaurantInfo={restaurantInfo}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-orange-100 via-yellow-100 to-green-100 shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-orange-700">Andamento Recensioni</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Ultimi 30 giorni</span>
            </div>
          </div>
          <div className="h-48 bg-white/60 rounded-md flex items-center justify-center text-gray-400 font-medium animate-pulse">
            {loading ? "Caricamento..." : "Grafico in arrivo prossimamente!"}
          </div>
        </div>

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
      <h2 className="text-2xl font-bold mb-4 text-orange-700">Impostazioni Attività</h2>
      {/* Mostra ora solo la gestione del profilo attività, senza gestione API Keys */}
      <BusinessProfileManager />
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
