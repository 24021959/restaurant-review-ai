
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

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

interface EditResponseModalProps {
  review: Review;
  editedResponse: string;
  onEditedResponseChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditResponseModal({ 
  review, 
  editedResponse, 
  onEditedResponseChange, 
  onSave, 
  onCancel 
}: EditResponseModalProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modifica Risposta per {review.customer}</CardTitle>
          <CardDescription>
            Personalizza la risposta AI prima di approvarla
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recensione originale:</h4>
            <div className="flex items-center gap-2 mb-2">
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Risposta (modifica come necessario):
            </label>
            <textarea
              value={editedResponse}
              onChange={(e) => onEditedResponseChange(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Scrivi la tua risposta..."
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Annulla
            </Button>
            <Button onClick={onSave}>
              Salva e Approva
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
