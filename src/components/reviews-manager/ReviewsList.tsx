
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import ReviewItem from './ReviewItem';

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

interface ReviewsListProps {
  reviews: Review[];
  onApproveResponse: (reviewId: string) => void;
  onEditResponse: (review: Review) => void;
  onPublishResponse: (reviewId: string) => void;
}

export default function ReviewsList({ 
  reviews, 
  onApproveResponse, 
  onEditResponse, 
  onPublishResponse 
}: ReviewsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Gestione Recensioni
        </CardTitle>
        <CardDescription>
          Rivedi e approva le risposte AI generate per le tue recensioni
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onApproveResponse={onApproveResponse}
              onEditResponse={onEditResponse}
              onPublishResponse={onPublishResponse}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
