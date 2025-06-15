
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, Send } from 'lucide-react';

interface ReviewStatsProps {
  pendingCount: number;
  approvedCount: number;
  publishedCount: number;
}

export default function ReviewStats({ pendingCount, approvedCount, publishedCount }: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              <p className="text-sm text-gray-600">Da Approvare</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{approvedCount}</p>
              <p className="text-sm text-gray-600">Approvate</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
              <p className="text-sm text-gray-600">Pubblicate</p>
            </div>
            <Send className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
