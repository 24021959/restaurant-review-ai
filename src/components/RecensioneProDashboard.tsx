
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleBusinessService } from '@/hooks/useGoogleBusinessService';
import { useApiKeyRotation } from '@/hooks/useApiKeyRotation';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';

export default function RecensioneProDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const refreshData = () => {
    loadReviews();
    // Refresh other data as needed
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadReviews();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        restaurantInfo={restaurantInfo}
        onLogout={handleLogout}
      />

      <div className="md:flex">
        <DashboardSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <main className="flex-1 py-6 px-4">
          <DashboardContent
            activeTab={activeTab}
            usageStats={usageStats}
            isOverLimit={isOverLimit}
            dashboardStats={dashboardStats}
            restaurantInfo={restaurantInfo}
            loading={loading}
            onTabChange={setActiveTab}
            onRefreshData={refreshData}
          />
        </main>
      </div>
    </div>
  );
}
