
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Key,
  AlertTriangle
} from 'lucide-react';

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
  
  const growthIsPositive = restaurantInfo.monthlyGrowth.startsWith('+');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* API Usage Card */}
      <Card className={`${isOverLimit ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Key className={`h-4 w-4 ${isOverLimit ? 'text-red-600' : 'text-blue-600'}`} />
            API Usage
            {isOverLimit && <AlertTriangle className="h-4 w-4 text-red-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isOverLimit ? 'text-red-600' : 'text-blue-600'}`}>
            {usageStats.totalDailyUsage}
          </div>
          <p className={`text-xs ${isOverLimit ? 'text-red-700' : 'text-blue-700'}`}>
            Richieste oggi
          </p>
          <div className="mt-2 text-xs">
            <Badge variant={usageStats.activeKeys > 0 ? "default" : "destructive"}>
              {usageStats.activeKeys}/{usageStats.totalKeys} chiavi attive
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-orange-600" />
            Recensioni Pendenti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {dashboardStats.pendingReviews}
          </div>
          <p className="text-xs text-orange-700">Da rispondere</p>
          <div className="mt-2">
            <Progress 
              value={(dashboardStats.pendingReviews / 10) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Responses Today Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Risposte Oggi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {dashboardStats.respondedToday}
          </div>
          <p className="text-xs text-green-700">Pubblicate</p>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600">+15% vs ieri</span>
          </div>
        </CardContent>
      </Card>

      {/* Rating Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            Rating Medio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-yellow-600">
              {restaurantInfo.avgRating}
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(restaurantInfo.avgRating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600">
            {restaurantInfo.totalReviews} recensioni totali
          </p>
          <div className="mt-2 flex items-center gap-1">
            {growthIsPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs ${growthIsPositive ? 'text-green-600' : 'text-red-600'}`}>
              {restaurantInfo.monthlyGrowth} questo mese
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
