
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardContent from './DashboardContent';
import { supabase } from "@/integrations/supabase/client";
import BusinessProfileManager from './BusinessProfileManager';
import { useNavigate } from 'react-router-dom';
import TrialStatusAlert from "./TrialStatusAlert";

export default function RecensioneProDashboard() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [businessProfile, setBusinessProfile] = useState<any | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setBusinessProfile(null);
        return;
      }
      const { data } = await supabase
        .from("business_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setBusinessProfile(data || null);
    }
    fetchProfile();
  }, [user]);

  // Fetch subscription
  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setSubscription(null);
        return;
      }
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      setSubscription(data || null);
    }
    fetchSubscription();
  }, [user]);

  const restaurantInfo = {
    name: businessProfile ? businessProfile.business_name : "Nessuna attività",
    location: businessProfile ? (businessProfile.address || "Indirizzo non inserito") : "–",
    avgRating: businessProfile ? 0 : 0,
    totalReviews: businessProfile ? 0 : 0,
    monthlyGrowth: businessProfile ? "–" : "–"
  };

  // Refactor logout per redirezionare home
  const handleLogout = () => {
    signOut(() => navigate("/"));
  };

  // Nessun dato finto dashboardStats
  const dashboardStats = {
    pendingReviews: 0,
    respondedToday: 0,
    avgResponseTime: "-",
    satisfactionRate: "-"
  };

  const usageStats = {
    totalDailyUsage: 0,
    totalKeys: 0,
    activeKeys: 0,
    averageUsage: 0,
  };
  const isOverLimit = false;

  const showCompleteProfile =
    (!businessProfile && (activeTab === 'dashboard' || activeTab === 'settings'));

  // Take trialEndsAt from subscription (if available)
  const trialEndsAt = subscription?.trial_ends_at || null;

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
          <TrialStatusAlert trialEndsAt={trialEndsAt} />
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
              loading={false}
              onTabChange={setActiveTab}
              onRefreshData={() => {}}
            />
          )}
        </main>
      </div>
    </div>
  );
}
