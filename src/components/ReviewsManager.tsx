
import React, { useState, useEffect } from 'react';
import { useGoogleBusinessService } from '@/hooks/useGoogleBusinessService';
import ReviewStats from './reviews-manager/ReviewStats';
import ReviewsList from './reviews-manager/ReviewsList';
import EditResponseModal from './reviews-manager/EditResponseModal';

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

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editedResponse, setEditedResponse] = useState('');
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  
  const googleBusinessService = useGoogleBusinessService();

  const demoReviews: Review[] = [
    {
      id: '1',
      customer: "Marco R.",
      rating: 5,
      date: "2 ore fa",
      text: "Esperienza fantastica! Le tagliatelle al tartufo erano eccezionali e il servizio molto attento. Complimenti allo chef!",
      aiResponse: "Gentile Marco, la ringraziamo di cuore per le sue parole così gentili! Siamo felicissimi che le nostre tagliatelle al tartufo l'abbiano conquistata - è uno dei piatti di cui andiamo più fieri. Trasmetteremo i suoi complimenti allo chef che sarà certamente molto contento. La aspettiamo presto per farle assaggiare altre nostre specialità!",
      status: "pending",
      confidence: 95
    },
    {
      id: '2',
      customer: "Anna M.",
      rating: 4,
      date: "5 ore fa",
      text: "Buon cibo e atmosfera accogliente. Unica pecca: abbiamo aspettato un po' troppo per essere serviti, ma ne è valsa la pena.",
      aiResponse: "Cara Anna, la ringraziamo per la sua recensione e per aver apprezzato il nostro cibo e l'atmosfera. Ci scusiamo sinceramente per l'attesa più lunga del solito - stiamo lavorando per migliorare i nostri tempi di servizio. Siamo felici che alla fine l'esperienza sia stata positiva e speriamo di rivederla presto con un servizio ancora più efficiente!",
      status: "approved",
      confidence: 92
    },
    {
      id: '3',
      customer: "Giuseppe L.",
      rating: 2,
      date: "1 giorno fa",
      text: "Cibo nella media, prezzi troppo alti per quello che offrono. Il cameriere sembrava infastidito dalle nostre domande.",
      aiResponse: "Gentile Giuseppe, la ringraziamo per il suo feedback e ci scusiamo sinceramente se la sua esperienza non ha soddisfatto le sue aspettative. Prendiamo molto seriamente i suoi commenti sul servizio e sui prezzi. Ci piacerebbe avere l'opportunità di dimostrarle il nostro vero valore - la invitiamo a tornare come nostro ospite per un'esperienza migliore. Può contattarci direttamente al 06-1234567.",
      status: "published",
      confidence: 88
    }
  ];

  useEffect(() => {
    setReviews(demoReviews);
  }, []);

  const handleApproveResponse = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' as const } : review
    ));
  };

  const handleEditResponse = (review: Review) => {
    setSelectedReview(review);
    setEditedResponse(review.aiResponse || '');
    setIsEditingResponse(true);
  };

  const handleSaveEditedResponse = () => {
    if (selectedReview) {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { ...review, aiResponse: editedResponse, status: 'approved' as const }
          : review
      ));
      setIsEditingResponse(false);
      setSelectedReview(null);
    }
  };

  const handlePublishResponse = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId ? { ...review, status: 'published' as const } : review
    ));
  };

  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const publishedCount = reviews.filter(r => r.status === 'published').length;

  if (isEditingResponse && selectedReview) {
    return (
      <EditResponseModal
        review={selectedReview}
        editedResponse={editedResponse}
        onEditedResponseChange={setEditedResponse}
        onSave={handleSaveEditedResponse}
        onCancel={() => setIsEditingResponse(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ReviewStats
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        publishedCount={publishedCount}
      />
      
      <ReviewsList
        reviews={reviews}
        onApproveResponse={handleApproveResponse}
        onEditResponse={handleEditResponse}
        onPublishResponse={handlePublishResponse}
      />
    </div>
  );
}
