
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  BarChart3, 
  Bell, 
  Edit3, 
  Send, 
  Eye,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  Download,
  Zap,
  Shield,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

export default function RecensioneProDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditingResponse, setIsEditingResponse] = useState(false);
  const [editedResponse, setEditedResponse] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  // Dati migliorati
  const restaurantInfo = {
    name: "Trattoria del Borgo",
    location: "Roma, Italia",
    avgRating: 4.3,
    totalReviews: 847,
    monthlyGrowth: "+12%",
    responseRate: "98%",
    avgResponseTime: "2.3h"
  };

  const dashboardStats = [
    {
      title: "In Attesa",
      value: 5,
      change: "+2",
      changeType: "increase",
      icon: Clock,
      color: "orange",
      description: "Recensioni da processare"
    },
    {
      title: "Risposte Oggi",
      value: 12,
      change: "+3",
      changeType: "increase",
      icon: MessageCircle,
      color: "blue",
      description: "Nuove risposte inviate"
    },
    {
      title: "Tempo Medio",
      value: "2.3h",
      change: "-15min",
      changeType: "decrease",
      icon: BarChart3,
      color: "green",
      description: "Tempo di risposta"
    },
    {
      title: "Soddisfazione",
      value: "94%",
      change: "+2%",
      changeType: "increase",
      icon: TrendingUp,
      color: "purple",
      description: "Rating medio clienti"
    }
  ];

  const recentReviews = [
    {
      id: 1,
      platform: "Google",
      customer: "Marco R.",
      rating: 5,
      date: "2 ore fa",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      text: "Esperienza fantastica! Le tagliatelle al tartufo erano eccezionali e il servizio molto attento. Complimenti allo chef!",
      aiResponse: "Gentile Marco, la ringraziamo di cuore per le sue parole così gentili! Siamo felicissimi che le nostre tagliatelle al tartufo l'abbiano conquistata - è uno dei piatti di cui andiamo più fieri. Trasmetteremo i suoi complimenti allo chef che sarà certamente molto contento. La aspettiamo presto per farle assaggiare altre nostre specialità!",
      status: "pending",
      confidence: 95,
      sentiment: "positive",
      keywords: ["tartufo", "servizio", "chef"]
    },
    {
      id: 2,
      platform: "TripAdvisor",
      customer: "Anna M.",
      rating: 4,
      date: "5 ore fa",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      text: "Buon cibo e atmosfera accogliente. Unica pecca: abbiamo aspettato un po' troppo per essere serviti, ma ne è valsa la pena.",
      aiResponse: "Cara Anna, la ringraziamo per la sua recensione e per aver apprezzato il nostro cibo e l'atmosfera. Ci scusiamo sinceramente per l'attesa più lunga del solito - stiamo lavorando per migliorare i nostri tempi di servizio. Siamo felici che alla fine l'esperienza sia stata positiva e speriamo di rivederla presto con un servizio ancora più efficiente!",
      status: "approved",
      confidence: 92,
      sentiment: "mixed",
      keywords: ["attesa", "atmosfera", "servizio"]
    },
    {
      id: 3,
      platform: "Google",
      customer: "Giuseppe L.",
      rating: 2,
      date: "1 giorno fa",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      text: "Cibo nella media, prezzi troppo alti per quello che offrono. Il cameriere sembrava infastidito dalle nostre domande.",
      aiResponse: "Gentile Giuseppe, la ringraziamo per il suo feedback e ci scusiamo sinceramente se la sua esperienza non ha soddisfatto le sue aspettative. Prendiamo molto seriamente i suoi commenti sul servizio e sui prezzi. Ci piacerebbe avere l'opportunità di dimostrarle il nostro vero valore - la invitiamo a tornare come nostro ospite per un'esperienza migliore. Può contattarci direttamente al 06-1234567.",
      status: "published",
      confidence: 88,
      sentiment: "negative",
      keywords: ["prezzi", "servizio", "cameriere"]
    },
    {
      id: 4,
      platform: "Trustpilot",
      customer: "Elena F.",
      rating: 5,
      date: "2 giorni fa",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      text: "Semplicemente perfetto per una cena romantica! Vino ottimo, cibo delizioso e staff professionale. Torneremo sicuramente!",
      aiResponse: "Cara Elena, che gioia leggere che abbiamo contribuito a rendere speciale la vostra cena romantica! Il nostro team ci tiene molto a creare l'atmosfera perfetta per i momenti importanti. Siamo felici che abbiate apprezzato sia il vino che i nostri piatti. Vi aspettiamo presto per altre serate indimenticabili!",
      status: "published",
      confidence: 97,
      sentiment: "positive",
      keywords: ["romantica", "vino", "staff"]
    },
    {
      id: 5,
      platform: "Google",
      customer: "Roberto D.",
      rating: 3,
      date: "3 giorni fa",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      text: "Locale carino ma il mio piatto era un po' freddo. Il dolce invece era buonissimo.",
      aiResponse: "Gentile Roberto, la ringraziamo per la sua recensione. Ci dispiace molto che il suo piatto non fosse alla temperatura ideale - questo non rispecchia i nostri standard di qualità. Siamo però felici che il dolce l'abbia soddisfatta! Ci piacerebbe offrirle un'esperienza migliore: la invitiamo a tornare e a segnalare direttamente al nostro staff qualsiasi problema.",
      status: "pending",
      confidence: 90,
      sentiment: "mixed",
      keywords: ["freddo", "dolce", "qualità"]
    }
  ];

  const handleApproveResponse = (reviewId) => {
    setNotifications(prev => Math.max(0, prev - 1));
    toast({
      title: "Risposta approvata!",
      description: "La risposta è stata pubblicata con successo.",
    });
    console.log(`Risposta approvata per recensione ${reviewId}`);
  };

  const handleEditResponse = (review) => {
    setSelectedReview(review);
    setEditedResponse(review.aiResponse);
    setIsEditingResponse(true);
  };

  const handleSaveEdit = () => {
    toast({
      title: "Risposta modificata!",
      description: "La risposta è stata aggiornata e pubblicata.",
    });
    setIsEditingResponse(false);
    setSelectedReview(null);
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'pending': return { 
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        text: 'In attesa',
        dot: 'bg-orange-500'
      };
      case 'approved': return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        text: 'Approvata',
        dot: 'bg-blue-500'
      };
      case 'published': return { 
        color: 'bg-green-100 text-green-800 border-green-200',
        text: 'Pubblicata',
        dot: 'bg-green-500'
      };
      default: return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        text: 'Sconosciuto',
        dot: 'bg-gray-500'
      };
    }
  };

  const getPlatformConfig = (platform) => {
    switch(platform) {
      case 'Google': return { color: 'bg-red-500', textColor: 'text-red-700' };
      case 'TripAdvisor': return { color: 'bg-green-500', textColor: 'text-green-700' };
      case 'Trustpilot': return { color: 'bg-blue-500', textColor: 'text-blue-700' };
      default: return { color: 'bg-gray-500', textColor: 'text-gray-700' };
    }
  };

  const getSentimentConfig = (sentiment) => {
    switch(sentiment) {
      case 'positive': return { color: 'text-green-600', icon: '😊' };
      case 'negative': return { color: 'text-red-600', icon: '😟' };
      case 'mixed': return { color: 'text-yellow-600', icon: '😐' };
      default: return { color: 'text-gray-600', icon: '😐' };
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const filteredReviews = recentReviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || review.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header migliorato */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    RecensionePRO
                  </h1>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-gray-200">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{restaurantInfo.name}</span>
                <span className="text-sm text-gray-500">• {restaurantInfo.location}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{restaurantInfo.avgRating}</span>
                  <span>({restaurantInfo.totalReviews})</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{restaurantInfo.monthlyGrowth}</span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>
              
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">TB</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation migliorata */}
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2 relative">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Recensioni</span>
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Impostazioni</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards migliorate */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs font-medium ${
                              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change}
                            </span>
                            <span className="text-xs text-gray-500">{stat.description}</span>
                          </div>
                        </div>
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                          stat.color === 'orange' ? 'from-orange-100 to-orange-200' :
                          stat.color === 'blue' ? 'from-blue-100 to-blue-200' :
                          stat.color === 'green' ? 'from-green-100 to-green-200' :
                          'from-purple-100 to-purple-200'
                        }`}>
                          <stat.icon className={`h-6 w-6 ${
                            stat.color === 'orange' ? 'text-orange-600' :
                            stat.color === 'blue' ? 'text-blue-600' :
                            stat.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Reviews migliorata */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Recensioni Recenti</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Esporta
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtra
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {recentReviews.slice(0, 3).map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getPlatformConfig(review.platform).color}`}></div>
                            <span className="font-medium text-gray-900">{review.customer}</span>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                            <span className={`text-lg ${getSentimentConfig(review.sentiment).color}`}>
                              {getSentimentConfig(review.sentiment).icon}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                          
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-400">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-blue-700">Risposta AI</span>
                              <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                                <span className="text-xs text-blue-600 font-medium">{review.confidence}%</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{review.aiResponse}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {review.keywords.map((keyword, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge className={getStatusConfig(review.status).color}>
                            {getStatusConfig(review.status).text}
                          </Badge>
                          {review.status === 'pending' && (
                            <Button
                              onClick={() => handleApproveResponse(review.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Approva
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab migliorata */}
          <TabsContent value="reviews" className="space-y-6">
            {/* Filtri e ricerca */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Cerca recensioni, clienti o contenuto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Piattaforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutte</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="TripAdvisor">TripAdvisor</SelectItem>
                        <SelectItem value="Trustpilot">Trustpilot</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutti</SelectItem>
                        <SelectItem value="pending">In attesa</SelectItem>
                        <SelectItem value="approved">Approvata</SelectItem>
                        <SelectItem value="published">Pubblicata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista recensioni migliorata */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tutte le Recensioni ({filteredReviews.length})</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Esporta
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {filteredReviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${getPlatformConfig(review.platform).color}`}></div>
                              <span className="font-medium text-gray-900">{review.customer}</span>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                              <Badge variant="outline" className={getPlatformConfig(review.platform).textColor}>
                                {review.platform}
                              </Badge>
                              <span className={`text-lg ${getSentimentConfig(review.sentiment).color}`}>
                                {getSentimentConfig(review.sentiment).icon}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusConfig(review.status).color}>
                                {getStatusConfig(review.status).text}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Recensione:</h4>
                              <p className="text-gray-700 bg-gray-50 rounded-lg p-4 leading-relaxed">{review.text}</p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-700">Risposta AI:</h4>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-1">
                                    <Target className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm text-blue-600 font-medium">{review.confidence}%</span>
                                  </div>
                                  {review.status === 'pending' && (
                                    <div className="flex items-center space-x-2">
                                      <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditResponse(review)}
                                      >
                                        <Edit3 className="h-4 w-4 mr-1" />
                                        Modifica
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleApproveResponse(review.id)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Send className="h-4 w-4 mr-1" />
                                        Pubblica
                                      </Button>
                                    </div>
                                  )}
                                  {review.status === 'published' && (
                                    <div className="flex items-center space-x-1 text-sm text-green-600">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Pubblicata</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-400">
                                <p className="text-gray-700 leading-relaxed">{review.aiResponse}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Keywords:</span>
                                {review.keywords.map((keyword, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                              <Progress value={review.confidence} className="w-24 h-2" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Avanzate</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Grafici interattivi, trend analysis e insights dettagliati sulle tue recensioni e performance.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Visualizza Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab migliorata */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Impostazioni AI</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contenuto impostazioni esistente ma migliorato */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tono delle Risposte
                    </label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professionale e cordiale</SelectItem>
                        <SelectItem value="friendly">Amichevole e familiare</SelectItem>
                        <SelectItem value="formal">Formale</SelectItem>
                        <SelectItem value="creative">Creativo e giocoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Informazioni sul Ristorante
                    </label>
                    <Textarea 
                      placeholder="Inserisci informazioni che l'AI dovrebbe conoscere..."
                      defaultValue="Trattoria familiare aperta dal 1987, specializzata in cucina romana tradizionale. Piatti signature: carbonara, amatriciana, tagliatelle al tartufo."
                      className="h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soglia di Confidenza
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <input 
                          type="range" 
                          min="70" 
                          max="100" 
                          defaultValue="85"
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-600 w-12">85%</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Le risposte con confidenza inferiore richiederanno sempre approvazione manuale
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Salva Impostazioni
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Connessioni Piattaforme</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Google Business Profile', 'TripAdvisor', 'Trustpilot', 'Facebook'].map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${platform === 'Facebook' ? 'bg-gray-300' : 'bg-green-500'}`}></div>
                          <span className="font-medium text-gray-900">{platform}</span>
                        </div>
                        <Button 
                          variant={platform === 'Facebook' ? 'outline' : 'secondary'}
                          size="sm"
                          className={platform === 'Facebook' ? '' : 'bg-green-100 text-green-700 hover:bg-green-200'}
                        >
                          {platform === 'Facebook' ? 'Connetti' : 'Connesso'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal per editing migliorato */}
      <Dialog open={isEditingResponse} onOpenChange={setIsEditingResponse}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifica Risposta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recensione originale:</h4>
              <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{selectedReview?.text}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">La tua risposta:</h4>
              <Textarea
                value={editedResponse}
                onChange={(e) => setEditedResponse(e.target.value)}
                className="h-32"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditingResponse(false)}>
                Annulla
              </Button>
              <Button onClick={handleSaveEdit} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Salva e Pubblica
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
