import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleBusinessService } from '@/hooks/useGoogleBusinessService';
import { useApiKeyRotation } from '@/hooks/useApiKeyRotation';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import { supabase } from "@/integrations/supabase/client";
import BusinessProfileManager from './BusinessProfileManager';

export default function RecensioneProDashboard() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<any | null>(null);

  const googleBusinessService = useGoogleBusinessService();
  const apiKeyRotation = useApiKeyRotation();
  const usageStats = apiKeyRotation.getUsageStats();
  const isOverLimit = apiKeyRotation.isOverLimit;

  // Statistiche "finte" recensioni (finché non ci sono dati veri)
  const dashboardStats = {
    pendingReviews: 5,
    respondedToday: 12,
    avgResponseTime: "2.3h",
    satisfactionRate: "94%"
  };

  // Carica i dati del profilo attività dell'utente autenticato
  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setBusinessProfile(null);
        return;
      }
      const { data, error } = await supabase
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setBusinessProfile(data || null);
    }
    fetchProfile();
  }, [user]);

  // Inizializza le info intestazione: se businessProfile c'è, usa i dati veri, altrimenti valori neutri
  const restaurantInfo = {
    name: businessProfile ? businessProfile.business_name : "Nessuna attività",
    location: businessProfile ? (businessProfile.address || "Indirizzo non inserito") : "–",
    avgRating: businessProfile ? 4.3 : 0, // Dato placeholder, da collegare a recensioni reali
    totalReviews: businessProfile ? 847 : 0, // Idem
    monthlyGrowth: businessProfile ? "+12%" : "–"
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
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadReviews();
    }
  }, [activeTab]);

  // Prompt per utenti senza profilo business
  const showCompleteProfile =
    (!businessProfile && (activeTab === 'dashboard' || activeTab === 'settings'));

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
          {showCompleteProfile ? (
            <div className="max-w-2xl mx-auto mt-20">
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 mb-8 text-center">
                <h2 className="text-xl font-bold text-yellow-800 mb-2">Completa il tuo profilo attività</h2>
                <p className="mb-4 text-yellow-700">Per accedere alle funzionalità, inserisci i dati della tua attività qui sotto.</p>
              </div>
              <BusinessProfileManager />
            </div>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  );
}
