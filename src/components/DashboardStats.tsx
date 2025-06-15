
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
  restaurantInfo
}: DashboardStatsProps) {
  // Mostra solo stato vuoto se nessun dato reale
  return (
    <div className="w-full my-10 flex flex-col items-center">
      <p className="text-orange-500 text-center">
        Nessuna statistica disponibile. Compila i dati della tua attività per visualizzare le metriche reali.
      </p>
    </div>
  );
}
