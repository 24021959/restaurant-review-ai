
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, CheckCircle, Edit3, Send, Clock } from 'lucide-react';
import { useGoogleBusinessService } from '@/hooks/useGoogleBusinessService';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

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
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Modifica Risposta per {selectedReview.customer}</CardTitle>
            <CardDescription>
              Personalizza la risposta AI prima di approvarla
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Recensione originale:</h4>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(selectedReview.rating)}
              </div>
              <p className="text-gray-700">{selectedReview.text}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Risposta (modifica come necessario):
              </label>
              <textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Scrivi la tua risposta..."
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditingResponse(false)}
              >
                Annulla
              </Button>
              <Button onClick={handleSaveEditedResponse}>
                Salva e Approva
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiche */}
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

      {/* Lista Recensioni */}
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
              <div key={review.id} className="border rounded-lg p-6">
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
                        onClick={() => handleApproveResponse(review.id)}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approva
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleEditResponse(review)}
                        className="flex items-center gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        Modifica
                      </Button>
                    </>
                  )}
                  
                  {review.status === 'approved' && (
                    <Button 
                      onClick={() => handlePublishResponse(review.id)}
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
