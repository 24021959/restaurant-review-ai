
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminStats() {
  const stats = [
    {
      title: 'Utenti Totali',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Ricavi Mensili',
      value: '€45,230',
      change: '+8%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Abbonamenti Attivi',
      value: '892',
      change: '+15%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Problemi Aperti',
      value: '23',
      change: '-5%',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} dal mese scorso
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
