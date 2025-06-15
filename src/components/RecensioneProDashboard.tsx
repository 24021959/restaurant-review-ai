
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
  const [restaurantStats, setRestaurantStats] = useState<{ avgRating: number, totalReviews: number, monthlyGrowth: string }>({ avgRating: 0, totalReviews: 0, monthlyGrowth: "--" });
  const [dashboardStats, setDashboardStats] = useState({
    pendingReviews: 0,
    respondedToday: 0,
    avgResponseTime: "-",
    satisfactionRate: "-"
  });
  const [usageStats, setUsageStats] = useState({
    totalDailyUsage: 0,
    totalKeys: 0,
    activeKeys: 0,
    averageUsage: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carica dati da Supabase per business_profile
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

  // Carica subscription dell'utente
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

  // Esempio: carica recensioni collegate a questo business_profile
  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      if (!user) {
        setRestaurantStats({
          avgRating: 0,
          totalReviews: 0,
          monthlyGrowth: "--"
        });
        setDashboardStats({
          pendingReviews: 0,
          respondedToday: 0,
          avgResponseTime: "-",
          satisfactionRate: "-"
        });
        setUsageStats({
          totalDailyUsage: 0,
          totalKeys: 0,
          activeKeys: 0,
          averageUsage: 0,
        });
        setLoading(false);
        return;
      }
      // Carica dati reali solo se esiste un profilo business
      if (businessProfile?.id) {
        // Recensioni
        const { data: reviews } = await supabase
          .from("reviews")
          .select("rating, id")
          .eq("business_profile_id", businessProfile.id);

        let totalReviews = 0;
        let avgRating = 0;
        if (Array.isArray(reviews) && reviews.length > 0) {
          totalReviews = reviews.length;
          avgRating = (
            reviews.reduce((sum: number, r: any) => sum + (typeof r.rating === "number" ? r.rating : 0), 0) /
            totalReviews
          );
        }
        setRestaurantStats({
          avgRating: avgRating ? Number(avgRating.toFixed(2)) : 0,
          totalReviews: totalReviews,
          monthlyGrowth: "--" // da implementare se disponibile
        });

        // Statistiche dashboard
        const { data: pending } = await supabase
          .from("reviews")
          .select("id")
          .eq("business_profile_id", businessProfile.id);

        setDashboardStats(prev => ({
          ...prev,
          pendingReviews: Array.isArray(pending) ? pending.length : 0,
          // respondedToday, avgResponseTime, satisfactionRate: da implementare se disponibili
        }));

        // Uso API/chiavi (placeholder: qui si può collegare a tabelle custom api_keys/api_usage_logs)
        setUsageStats({
          totalDailyUsage: 0, // Lega a tabella API
          totalKeys: 0,       // Lega a tabella API
          activeKeys: 0,      // Lega a tabella API
          averageUsage: 0,
        });
      }
      setLoading(false);
    }
    fetchStats();
  }, [user, businessProfile]);

  const restaurantInfo = {
    name: businessProfile ? businessProfile.business_name : "Nessuna attività",
    location: businessProfile ? (businessProfile.address || "Indirizzo non inserito") : "–",
    avgRating: restaurantStats.avgRating,
    totalReviews: restaurantStats.totalReviews,
    monthlyGrowth: restaurantStats.monthlyGrowth
  };

  const handleLogout = () => {
    signOut(() => navigate("/"));
  };

  const isOverLimit = false;
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
          {activeTab === 'settings' ? (
            <div className="max-w-2xl mx-auto mt-8">
              {/* Solo in impostazioni si mostra/edita il profilo */}
              <BusinessProfileManager />
            </div>
          ) : (
            // Dashboard mostra SOLO statistiche e spazio info utente, nessun duplicato impostazioni!
            <DashboardContent
              activeTab={activeTab}
              usageStats={usageStats}
              isOverLimit={isOverLimit}
              dashboardStats={dashboardStats}
              restaurantInfo={restaurantInfo}
              loading={loading}
              onTabChange={setActiveTab}
              onRefreshData={() => { }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
