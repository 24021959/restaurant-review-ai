
import React from 'react';
interface DashboardStatsProps {
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
}
export default function DashboardStats({
  dashboardStats,
  restaurantInfo,
  usageStats
}: DashboardStatsProps) {
  // Placeholder statistici, da sostituire con dati reali
  return (
    <div className="w-full my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stat principale: andamento recensioni */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-start justify-between min-h-[170px]">
        <h4 className="text-orange-600 font-bold mb-2">Recensioni totali</h4>
        <div className="text-3xl font-bold mb-1">
          {restaurantInfo.totalReviews ?? "--"}
        </div>
        <div className="text-gray-500 text-sm">Andamento: {restaurantInfo.monthlyGrowth ?? "--"}</div>
      </div>
      {/* Stat: media voto */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-start justify-between min-h-[170px]">
        <h4 className="text-orange-600 font-bold mb-2">Voto medio</h4>
        <div className="text-3xl font-bold mb-1">
          {restaurantInfo.avgRating ?? "--"}
        </div>
        <div className="text-gray-500 text-sm">Basato sulle recensioni ricevute</div>
      </div>
      {/* Stat: risposte utente */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-start justify-between min-h-[170px]">
        <h4 className="text-orange-600 font-bold mb-2">Recensioni da rispondere</h4>
        <div className="text-3xl font-bold mb-1">{dashboardStats.pendingReviews ?? "--"}</div>
        <div className="text-gray-500 text-sm">Risposte inviate oggi: {dashboardStats.respondedToday ?? "--"}</div>
      </div>
      {/* Cronologia attività (placeholder) */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-start justify-between min-h-[170px] md:col-span-2 lg:col-span-3">
        <h4 className="text-orange-600 font-bold mb-2">Cronologia attività</h4>
        <div className="text-gray-500 text-sm">Nessuna attività registrata al momento.</div>
      </div>
      {/* Prossimi sviluppi */}
      <div className="bg-white rounded-lg p-6 shadow flex flex-col items-start justify-between min-h-[100px] md:col-span-2 lg:col-span-3">
        <h4 className="text-orange-600 font-bold mb-2">Prossimamente...</h4>
        <div className="text-gray-500 text-sm">Qui troverai nuovi indicatori e funzionalità non appena disponibili!</div>
      </div>
    </div>
  );
}
