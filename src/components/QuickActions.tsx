
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Settings, 
  BarChart3, 
  Download,
  RefreshCw,
  Plus
} from 'lucide-react';

interface QuickActionsProps {
  onTabChange: (tab: string) => void;
  pendingReviewsCount: number;
  onRefreshData: () => void;
  loading: boolean;
}

export default function QuickActions({ 
  onTabChange, 
  pendingReviewsCount, 
  onRefreshData,
  loading 
}: QuickActionsProps) {
  
  const actions = [
    {
      id: 'reviews',
      title: 'Gestisci Recensioni',
      description: `${pendingReviewsCount} in attesa`,
      icon: MessageCircle,
      color: 'orange',
      urgent: pendingReviewsCount > 0
    },
    {
      id: 'settings',
      title: 'Impostazioni API',
      description: 'Gestisci chiavi',
      icon: Settings,
      color: 'blue',
      urgent: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Azioni Rapide</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className={`w-full p-4 h-auto justify-start hover:bg-${action.color}-50 border-${action.color}-200 ${
              action.urgent ? `bg-${action.color}-50 border-${action.color}-300` : ''
            }`}
            onClick={() => onTabChange(action.id)}
          >
            <div className="flex items-center gap-3 w-full">
              <action.icon className={`h-5 w-5 text-${action.color}-600`} />
              <div className="text-left">
                <div className={`font-medium text-${action.color}-800`}>
                  {action.title}
                </div>
                <div className={`text-sm text-${action.color}-600`}>
                  {action.description}
                </div>
              </div>
              {action.urgent && (
                <div className={`ml-auto w-2 h-2 bg-${action.color}-500 rounded-full`} />
              )}
            </div>
          </Button>
        ))}
        
        <div className="pt-3 border-t space-y-2">
          <Button variant="outline" className="w-full" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Esporta Report
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Backup Dati
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
