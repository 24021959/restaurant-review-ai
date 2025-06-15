import React from 'react';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardStats from './DashboardStats';
import QuickActions from './QuickActions';
import BusinessProfileManager from './BusinessProfileManager';
import ReviewsManager from './ReviewsManager';
import { useAuth } from '@/contexts/AuthContext';

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
    name: string;
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
  const { user } = useAuth();

  const getUserDisplayName = () => {
    if (user?.user_metadata?.restaurant_name) {
      return user.user_metadata.restaurant_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Utente';
  };

  const WelcomeMessage = () => (
    <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">
          Ciao, {getUserDisplayName()}! 👋
        </h1>
        <p className="text-orange-200 text-sm">
          Gestisci le tue recensioni e monitora le performance della tua attività
        </p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <WelcomeMessage />
      {/* Rimosso Alert API Over Limit */}
      <DashboardStats
        usageStats={usageStats}
        isOverLimit={false}
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
      {/* ACCORPATO: qui BusinessProfileManager */}
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
    default:
      return renderDashboard();
  }
}
// Profilo attività: rimosso tab "profile"!
