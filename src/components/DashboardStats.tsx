
import React from 'react';
import { TrendingUp, MessageSquare, PieChart, Star } from 'lucide-react';

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
  usageStats,
  isOverLimit,
  dashboardStats,
  restaurantInfo
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-200 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <Star className="h-8 w-8 mb-2 text-yellow-50" />
        <div className="text-4xl font-bold">{restaurantInfo.avgRating?.toFixed(1)}</div>
        <div className="text-sm uppercase tracking-wide">Valutazione Media</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 via-teal-400 to-green-200 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <MessageSquare className="h-8 w-8 mb-2 text-white/80" />
        <div className="text-4xl font-bold">{restaurantInfo.totalReviews}</div>
        <div className="text-sm uppercase tracking-wide">Recensioni Totali</div>
      </div>
      <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-200 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <TrendingUp className="h-8 w-8 mb-2 text-white/80" />
        <div className="text-4xl font-bold">{restaurantInfo.monthlyGrowth}</div>
        <div className="text-sm uppercase tracking-wide">Crescita Mese</div>
      </div>
      <div className="bg-gradient-to-br from-pink-500 via-red-400 to-orange-300 text-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <PieChart className="h-8 w-8 mb-2 text-white/80" />
        <div className="text-4xl font-bold">{dashboardStats.satisfactionRate}</div>
        <div className="text-sm uppercase tracking-wide">Soddisfazione</div>
      </div>
    </div>
  );
}
