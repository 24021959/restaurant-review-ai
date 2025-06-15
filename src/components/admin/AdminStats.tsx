
import React, { useState, useEffect } from "react";
import { User, KeyRound, DatabaseZap, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AdminStatBox from "./AdminStatBox";

export default function AdminStats() {
  const [stats, setStats] = useState({
    users: null as number | null,
    apiKeys: null as number | null,
    restaurants: null as number | null,
    admins: null as number | null,
  });

  useEffect(() => {
    // Carica dati statistiche da Supabase in parallelo
    const fetchStats = async () => {
      const [{ count: users }, { count: apiKeys }, { count: restaurants }, { count: admins }] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("google_api_keys").select("id", { count: "exact", head: true }),
        supabase.from("restaurants").select("id", { count: "exact", head: true }),
        supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin"),
      ]);
      setStats({
        users: users ?? null,
        apiKeys: apiKeys ?? null,
        restaurants: restaurants ?? null,
        admins: admins ?? null,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 my-2">
      <AdminStatBox
        title="Utenti Registrati"
        value={stats.users}
        icon={<User className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-orange-500 to-yellow-400"
      />
      <AdminStatBox
        title="Chiavi API"
        value={stats.apiKeys}
        icon={<KeyRound className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-blue-600 to-sky-400"
      />
      <AdminStatBox
        title="Ristoranti"
        value={stats.restaurants}
        icon={<DatabaseZap className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-emerald-500 to-green-300"
      />
      <AdminStatBox
        title="Admin"
        value={stats.admins}
        icon={<Users className="w-8 h-8 text-white" />}
        color="bg-gradient-to-tr from-fuchsia-700 to-pink-400"
      />
    </div>
  );
}
