
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, Edit3, Send } from 'lucide-react';

interface Review {
  id: string;
  customer: string;
  rating: number;
  date: string;
  text: string;
  aiResponse?: string;
  status: 'pending' | 'approved' | 'published';
  confidence?: number;
}

interface ReviewItemProps {
  review: Review;
  onApproveResponse: (reviewId: string) => void;
  onEditResponse: (review: Review) => void;
  onPublishResponse: (reviewId: string) => void;
}

export default function ReviewItem({ 
  review, 
  onApproveResponse, 
  onEditResponse, 
  onPublishResponse 
}: ReviewItemProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="font-semibold text-gray-700">
              {review.customer.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-medium">{review.customer}</h3>
            <div className="flex items-center gap-2">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
          </div>
        </div>
        <Badge 
          variant={
            review.status === 'pending' ? 'destructive' : 
            review.status === 'approved' ? 'default' : 'secondary'
          }
        >
          {review.status === 'pending' ? 'Da Approvare' :
           review.status === 'approved' ? 'Approvata' : 'Pubblicata'}
        </Badge>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Recensione:</h4>
        <p className="text-gray-700">{review.text}</p>
      </div>

      {review.aiResponse && (
        <div className="mb-4 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-800">Risposta AI Suggerita:</h4>
            {review.confidence && (
              <Badge variant="outline">
                Confidenza: {review.confidence}%
              </Badge>
            )}
          </div>
          <p className="text-blue-900">{review.aiResponse}</p>
        </div>
      )}

      <div className="flex items-center gap-4">
        {review.status === 'pending' && (
          <>
            <Button 
              onClick={() => onApproveResponse(review.id)}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Approva
            </Button>
            <Button 
              variant="outline"
              onClick={() => onEditResponse(review)}
              className="flex items-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Modifica
            </Button>
          </>
        )}
        
        {review.status === 'approved' && (
          <Button 
            onClick={() => onPublishResponse(review.id)}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Pubblica su Google
          </Button>
        )}
        
        {review.status === 'published' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Pubblicata su Google</span>
          </div>
        )}
      </div>
    </div>
  );
}
