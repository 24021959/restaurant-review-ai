
import React, { useState, useEffect } from "react";
import { User, Users, DollarSign, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminStatBox from "./AdminStatBox";

export default function AdminStats() {
  const [stats, setStats] = useState({
    totalUsers: null as number | null,
    activeUsers: null as number | null,
    revenue: null as number | null,
    growth: null as number | null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Carica utenti totali reali
        const { count: totalUsers } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true });

        // Carica utenti attivi (con subscription attiva)
        const { count: activeUsers } = await supabase
          .from("subscriptions")
          .select("id", { count: "exact", head: true })
          .eq("status", "active");

        // Revenue placeholder - lasciamo vuoto se non ci sono dati reali da Stripe
        const revenue = null;

        // Growth placeholder - lasciamo vuoto se non ci sono dati sufficienti
        const growth = null;

        setStats({
          totalUsers: totalUsers ?? 0,
          activeUsers: activeUsers ?? 0,
          revenue: revenue,
          growth: growth,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setStats({
          totalUsers: null,
          activeUsers: null,
          revenue: null,
          growth: null,
        });
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 my-2">
      <AdminStatBox
        title="Utenti Registrati"
        value={stats.totalUsers}
        icon={<User className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-blue-600 to-sky-400"
      />
      <AdminStatBox
        title="Utenti Attivi"
        value={stats.activeUsers}
        icon={<Users className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-emerald-500 to-green-300"
      />
      <AdminStatBox
        title="Entrate Mensili (€)"
        value={stats.revenue}
        icon={<DollarSign className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-orange-500 to-yellow-400"
      />
      <AdminStatBox
        title="Crescita (%)"
        value={stats.growth}
        icon={<TrendingUp className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-fuchsia-700 to-pink-400"
      />
    </div>
  );
}
