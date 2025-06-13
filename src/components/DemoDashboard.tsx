
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Settings, 
  BarChart3, 
  Bell, 
  Edit3, 
  Send,
  Calendar,
  MapPin,
  TrendingUp,
  Filter,
  ArrowLeft,
  Zap,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  const [editedResponse, setEditedResponse] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [autoResponseDemo, setAutoResponseDemo] = useState(false);

  // Dati demo più ricchi
  const restaurantInfo = {
    name: "Trattoria del Borgo - DEMO",
    location: "Roma, Italia",
    avgRating: 4.3,
    totalReviews: 847,
    monthlyGrowth: "+12%"
  };

  const dashboardStats = {
    pendingReviews: 5,
    respondedToday: 12,
    avgResponseTime: "2.3h",
    satisfactionRate: "94%",
    totalResponses: 234,
    avgRating: 4.3
  };

  const demoReviews = [
    {
      id: 1,
      customer: "Marco R.",
      rating: 5,
      date: "2 ore fa",
      text: "Esperienza fantastica! Le tagliatelle al tartufo erano eccezionali e il servizio molto attento. Complimenti allo chef!",
      aiResponse: "Gentile Marco, la ringraziamo di cuore per le sue parole così gentili! Siamo felicissimi che le nostre tagliatelle al tartufo l'abbiano conquistata - è uno dei piatti di cui andiamo più fieri. Trasmetteremo i suoi complimenti allo chef che sarà certamente molto contento. La aspettiamo presto per farle assaggiare altre nostre specialità! 🍝✨",
      status: "pending",
      confidence: 95
    },
    {
      id: 2,
      customer: "Anna M.",
      rating: 4,
      date: "5 ore fa",
      text: "Buon cibo e atmosfera accogliente. Unica pecca: abbiamo aspettato un po' troppo per essere serviti, ma ne è valsa la pena.",
      aiResponse: "Cara Anna, la ringraziamo per la sua recensione e per aver apprezzato il nostro cibo e l'atmosfera. Ci scusiamo sinceramente per l'attesa più lunga del solito - stiamo lavorando per migliorare i nostri tempi di servizio. Siamo felici che alla fine l'esperienza sia stata positiva e speriamo di rivederla presto con un servizio ancora più efficiente! 😊",
      status: "approved",
      confidence: 92
    },
    {
      id: 3,
      customer: "Giuseppe L.",
      rating: 2,
      date: "1 giorno fa",
      text: "Cibo nella media, prezzi troppo alti per quello che offrono. Il cameriere sembrava infastidito dalle nostre domande.",
      aiResponse: "Gentile Giuseppe, la ringraziamo per il suo feedback e ci scusiamo sinceramente se la sua esperienza non ha soddisfatto le sue aspettative. Prendiamo molto seriamente i suoi commenti sul servizio e sui prezzi. Ci piacerebbe avere l'opportunità di dimostrarle il nostro vero valore - la invitiamo a tornare come nostro ospite per un'esperienza migliore. Può contattarci direttamente al 06-1234567. 🙏",
      status: "published",
      confidence: 88
    },
    {
      id: 4,
      customer: "Giulia F.",
      rating: 5,
      date: "3 ore fa",
      text: "Tutto perfetto! Dall'antipasto al dolce, ogni piatto era delizioso. Il personale è stato molto gentile e professionale.",
      aiResponse: "Gentile Giulia, che gioia leggere la sua recensione! È meraviglioso sapere che ogni piatto del nostro menu l'ha conquistata. Il nostro team sarà felicissimo di sapere che il servizio è stato all'altezza delle aspettative. Grazie per aver scelto la nostra trattoria! 🌟",
      status: "demo_generating",
      confidence: 97
    }
  ];

  const handleBackToHome = () => {
    navigate('/');
  };

  const simulateAutoResponse = () => {
    setAutoResponseDemo(true);
    setTimeout(() => {
      setAutoResponseDemo(false);
    }, 3000);
  };

  const handleApproveResponse = (reviewId) => {
    console.log(`Demo: Approvazione risposta per recensione ${reviewId}`);
    // Simula l'approvazione
  };

  const handleEditResponse = (review) => {
    setSelectedReview(review);
    setEditedResponse(review.aiResponse);
    setIsEditingResponse(true);
  };

  const handleSaveEditedResponse = (reviewId) => {
    console.log(`Demo: Salvataggio risposta modificata per recensione ${reviewId}`);
    setIsEditingResponse(false);
  };

  const handlePublishResponse = (reviewId) => {
    console.log(`Demo: Pubblicazione risposta per recensione ${reviewId}`);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Eye className="h-6 w-6" />
            <div>
              <h3 className="font-semibold text-lg">Modalità Demo Attiva</h3>
              <p className="text-orange-100">Stai visualizzando una demo interattiva di RistoReply</p>
            </div>
          </div>
          <button 
            onClick={simulateAutoResponse}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>Simula Risposta AI</span>
          </button>
        </div>
      </div>

      {/* Statistiche Principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-700">Da Rispondere</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">{dashboardStats.pendingReviews}</p>
          <p className="text-sm text-gray-500 mt-1">Nuove recensioni</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-700">Risposte Oggi</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{dashboardStats.respondedToday}</p>
          <p className="text-sm text-gray-500 mt-1">Pubblicate automaticamente</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-700">Tempo Medio</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{dashboardStats.avgResponseTime}</p>
          <p className="text-sm text-gray-500 mt-1">Risposta automatica</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-700">Soddisfazione</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{dashboardStats.satisfactionRate}</p>
          <p className="text-sm text-gray-500 mt-1">Clienti soddisfatti</p>
        </div>
      </div>

      {/* Grafico Demo */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Andamento Recensioni - Ultimi 7 giorni</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Demo Data</span>
          </div>
        </div>
        <div className="h-48 bg-gradient-to-r from-orange-50 to-red-50 rounded-md flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-2" />
            <p className="text-gray-600">Grafico Analytics Avanzato</p>
            <p className="text-sm text-gray-500">Visualizza trends, sentiment e performance</p>
          </div>
        </div>
      </div>

      {/* Recensioni Demo */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Recensioni Google - Demo</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              ✨ AI Attiva
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {demoReviews.map(review => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold">
                  {review.customer.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-800">{review.customer}</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.text}</p>
                  
                  {/* Risposta AI */}
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Risposta AI Generata</span>
                      <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                        {review.confidence}% sicurezza
                      </span>
                    </div>
                    <p className="text-gray-700">{review.aiResponse}</p>
                  </div>
                  
                  {/* Azioni */}
                  <div className="flex items-center space-x-4 mt-3 text-sm">
                    {review.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApproveResponse(review.id)}
                          className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approva</span>
                        </button>
                        <button 
                          onClick={() => handleEditResponse(review)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>Modifica</span>
                        </button>
                      </>
                    )}
                    {review.status === 'approved' && (
                      <button 
                        onClick={() => handlePublishResponse(review.id)}
                        className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                        <span>Pubblica su Google</span>
                      </button>
                    )}
                    {review.status === 'published' && (
                      <span className="text-green-600 flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Pubblicata su Google</span>
                      </span>
                    )}
                    {review.status === 'demo_generating' && (
                      <span className="text-orange-600 flex items-center space-x-1 animate-pulse">
                        <Zap className="h-4 w-4" />
                        <span>AI sta generando risposta...</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Torna alla Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-orange-600">🍝 RistoReply Demo</h1>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">DEMO</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{restaurantInfo.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurantInfo.avgRating}</span>
                <span>({restaurantInfo.totalReviews})</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderDashboard()}
      </main>
    </div>
  );
}
