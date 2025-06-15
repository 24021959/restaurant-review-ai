import React from 'react';
import { MapPin, Star, LogOut, Home } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  restaurantInfo: {
    name: string;
    location: string;
    avgRating: number;
    totalReviews: number;
  };
  onLogout: () => void;
}

export default function DashboardHeader({ restaurantInfo, onLogout }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/ad1b3b88-da57-4d85-aa1a-0c4f08dc43f8.png" 
                alt="RistoReply" 
                className="h-12 w-auto bg-transparent cursor-pointer" 
                onClick={() => navigate('/')} 
              />
            </div>
            <div className="ml-8">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700" data-testid="restaurant-name">
                  {restaurantInfo.name ?? "-"}
                </span>
                <span className="text-sm text-gray-500">• {restaurantInfo.location ?? "-"}</span>
              </div>
            </div>
            <button
              className="ml-8 flex items-center text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => navigate('/')}
              title="Vai alla Home"
            >
              <Home className="h-5 w-5 mr-1" />
              <span className="text-sm">Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{restaurantInfo.avgRating ?? "-"}</span>
              <span>({restaurantInfo.totalReviews ?? 0} recensioni)</span>
            </div>
            <NotificationDropdown />
            <button 
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Esci</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
