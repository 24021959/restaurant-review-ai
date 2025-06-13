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
  LogOut
} from 'lucide-react';

export default function RecensioneProDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  const [editedResponse, setEditedResponse] = useState('');
  const [notifications, setNotifications] = useState(3);

  // Dati di esempio - solo Google
  const restaurantInfo = {
    name: "Trattoria del Borgo",
    location: "Roma, Italia",
    avgRating: 4.3,
    totalReviews: 847,
    monthlyGrowth: "+12%"
  };

  const dashboardStats = {
    pendingReviews: 5,
    respondedToday: 12,
    avgResponseTime: "2.3h",
    satisfactionRate: "94%"
  };

  const recentReviews = [
    {
      id: 1,
      customer: "Marco R.",
      rating: 5,
      date: "2 ore fa",
      text: "Esperienza fantastica! Le tagliatelle al tartufo erano eccezionali e il servizio molto attento. Complimenti allo chef!",
      aiResponse: "Gentile Marco, la ringraziamo di cuore per le sue parole così gentili! Siamo felicissimi che le nostre tagliatelle al tartufo l'abbiano conquistata - è uno dei piatti di cui andiamo più fieri. Trasmetteremo i suoi complimenti allo chef che sarà certamente molto contento. La aspettiamo presto per farle assaggiare altre nostre specialità!",
      status: "pending",
      confidence: 95
    },
    {
      id: 2,
      customer: "Anna M.",
      rating: 4,
      date: "5 ore fa",
      text: "Buon cibo e atmosfera accogliente. Unica pecca: abbiamo aspettato un po' troppo per essere serviti, ma ne è valsa la pena.",
      aiResponse: "Cara Anna, la ringraziamo per la sua recensione e per aver apprezzato il nostro cibo e l'atmosfera. Ci scusiamo sinceramente per l'attesa più lunga del solito - stiamo lavorando per migliorare i nostri tempi di servizio. Siamo felici che alla fine l'esperienza sia stata positiva e speriamo di rivederla presto con un servizio ancora più efficiente!",
      status: "approved",
      confidence: 92
    },
    {
      id: 3,
      customer: "Giuseppe L.",
      rating: 2,
      date: "1 giorno fa",
      text: "Cibo nella media, prezzi troppo alti per quello che offrono. Il cameriere sembrava infastidito dalle nostre domande.",
      aiResponse: "Gentile Giuseppe, la ringraziamo per il suo feedback e ci scusiamo sinceramente se la sua esperienza non ha soddisfatto le sue aspettative. Prendiamo molto seriamente i suoi commenti sul servizio e sui prezzi. Ci piacerebbe avere l'opportunità di dimostrarle il nostro vero valore - la invitiamo a tornare come nostro ospite per un'esperienza migliore. Può contattarci direttamente al 06-1234567.",
      status: "published",
      confidence: 88
    }
  ];

  const handleLogout = () => {
    // Torna alla landing page
    window.location.href = '/';
  };

  const handleApproveResponse = (reviewId) => {
    // Logica per approvare la risposta AI
    console.log(`Approvazione risposta per recensione ${reviewId}`);
  };

  const handleEditResponse = (review) => {
    setSelectedReview(review);
    setEditedResponse(review.aiResponse);
    setIsEditingResponse(true);
  };

  const handleSaveEditedResponse = (reviewId) => {
    // Logica per salvare la risposta modificata
    console.log(`Salvataggio risposta modificata per recensione ${reviewId}: ${editedResponse}`);
    setIsEditingResponse(false);
  };

  const handlePublishResponse = (reviewId) => {
    // Logica per pubblicare la risposta
    console.log(`Pubblicazione risposta per recensione ${reviewId}`);
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Statistiche Principali */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <MessageCircle className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Recensioni da Rispondere</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.pendingReviews}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Risposte Oggi</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.respondedToday}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700">Tempo Medio Risposta</h3>
        </div>
        <p className="text-3xl font-bold text-orange-600">{dashboardStats.avgResponseTime}</p>
      </div>

      {/* Grafico andamento recensioni (esempio) */}
      <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Andamento Recensioni</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Ultimi 30 giorni</span>
          </div>
        </div>
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          Grafico placeholder
        </div>
      </div>

      {/* Ultime Recensioni */}
      <div className="bg-white shadow-md rounded-lg p-6 md:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Ultime Recensioni Google</h3>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <Filter className="h-4 w-4 inline-block mr-1" /> Filtri
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              <TrendingUp className="h-4 w-4 inline-block mr-1" /> Ordina
            </button>
          </div>
        </div>
        <ul>
          {recentReviews.map(review => (
            <li key={review.id} className="py-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-semibold text-gray-700">{review.customer.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-800">{review.customer}</h4>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 mb-3">{review.text}</p>

                  {/* Azioni sulla recensione */}
                  <div className="flex items-center space-x-4 text-sm">
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
                        <span>Pubblica</span>
                      </button>
                    )}
                    {review.status === 'published' && (
                      <span className="text-green-600">Pubblicata</span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestione Recensioni</h2>
      {/* Elenco recensioni e azioni */}
    </div>
  );

  const renderSettings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Impostazioni</h2>
      {/* Impostazioni account, notifiche, ecc. */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-orange-600">🍝 RistoReply</h1>
              </div>
              <div className="ml-8">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{restaurantInfo.name}</span>
                  <span className="text-sm text-gray-500">• {restaurantInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{restaurantInfo.avgRating}</span>
                <span>({restaurantInfo.totalReviews} recensioni)</span>
              </div>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Esci</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="md:flex">
        <aside className="bg-gray-100 w-64 min-h-screen border-r border-gray-200 py-6 px-3">
          <nav>
            <ul>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'dashboard' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <BarChart3 className="h-4 w-4 inline-block mr-2" />
                  Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'reviews' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <MessageCircle className="h-4 w-4 inline-block mr-2" />
                  Recensioni
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-200 transition-colors ${activeTab === 'settings' ? 'bg-gray-200 font-semibold' : 'text-gray-700'}`}
                >
                  <Settings className="h-4 w-4 inline-block mr-2" />
                  Impostazioni
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-6 px-4">
          {isEditingResponse && selectedReview ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Modifica Risposta per {selectedReview.customer}
              </h2>
              <textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditingResponse(false)}
                  className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={() => handleSaveEditedResponse(selectedReview.id)}
                  className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                >
                  Salva
                </button>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'reviews' && renderReviews()}
              {activeTab === 'settings' && renderSettings()}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
