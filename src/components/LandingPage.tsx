import React, { useState } from 'react';
import { 
  Star, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  BarChart3,
  Users,
  Calendar,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulazione autenticazione - in produzione collegare a sistema auth reale
    console.log('Auth:', { authMode, email, password, restaurantName });
    // Redirect alla dashboard
    window.location.href = '/dashboard';
  };

  const startFreeTrial = (plan?: string) => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const openDemo = () => {
    navigate('/demo');
  };

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-orange-600" />,
      title: "Risposte AI Intelligenti",
      description: "L'intelligenza artificiale analizza ogni recensione e genera risposte personalizzate e professionali in pochi secondi."
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Risposta in Tempo Reale",
      description: "Non perdere mai una recensione. Il sistema monitora costantemente il tuo profilo Google Business e risponde immediatamente."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
      title: "Analytics Dettagliati",
      description: "Scopri tendenze, sentiment dei clienti e migliora la reputazione del tuo ristorante con reportistica avanzata."
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-600" />,
      title: "Controllo Totale",
      description: "Revisiona e modifica ogni risposta prima della pubblicazione. Tu mantieni sempre il controllo finale."
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      restaurant: "Osteria del Centro",
      text: "Da quando uso RistoReply ho risparmiato 10 ore a settimana e le mie recensioni positive sono aumentate del 40%!",
      rating: 5
    },
    {
      name: "Giulia Bianchi", 
      restaurant: "Trattoria La Nonna",
      text: "Finalmente posso concentrarmi sulla cucina mentre RistoReply si occupa delle recensioni. Semplicemente fantastico!",
      rating: 5
    },
    {
      name: "Andrea Conti",
      restaurant: "Pizzeria Napoletana",
      text: "Le risposte sono così naturali che i clienti pensano che sia sempre io a scrivere. Incredibile!",
      rating: 5
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "29",
      reviews: "Fino a 50 recensioni/mese",
      features: [
        "Risposte AI automatiche",
        "Dashboard completa", 
        "Supporto email",
        "Analytics base"
      ],
      popular: false
    },
    {
      name: "Professional", 
      price: "49",
      reviews: "Fino a 150 recensioni/mese",
      features: [
        "Tutto di Starter",
        "Risposte personalizzabili",
        "Analytics avanzati",
        "Supporto prioritario",
        "Integrazione n8n"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "79", 
      reviews: "Recensioni illimitate",
      features: [
        "Tutto di Professional",
        "Account manager dedicato",
        "Formazione personalizzata",
        "API personalizzate",
        "SLA garantito"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">🍝 RistoReply</h1>
              <span className="ml-2 text-sm text-gray-500">by AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Funzionalità</a>
              <a href="#pricing" className="text-gray-700 hover:text-orange-600 transition-colors">Prezzi</a>
              <a href="#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">Recensioni</a>
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Accedi
              </button>
              <button 
                onClick={() => startFreeTrial('Starter')}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Prova Gratis
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Non Perdere Mai<br />
              Una <span className="text-orange-600">Recensione</span> Su Google
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              L'intelligenza artificiale che risponde alle recensioni del tuo ristorante su Google Business Profile. 
              Automaticamente, professionalmente, 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => startFreeTrial('Professional')}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                Inizia Prova Gratuita 15 Giorni
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={openDemo}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Guarda Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✅ Nessuna carta di credito richiesta • ✅ Cancellazione in qualsiasi momento
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perché I Ristoratori Scelgono RistoReply
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La soluzione completa per gestire la reputazione online del tuo ristorante senza stress
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Piani Semplici e Trasparenti
            </h2>
            <p className="text-xl text-gray-600">
              Scegli il piano perfetto per il tuo ristorante. Cambia o cancella in qualsiasi momento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${
                plan.popular ? 'border-orange-600' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Più Popolare
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">€{plan.price}</span>
                    <span className="text-gray-600">/mese</span>
                  </div>
                  <p className="text-orange-600 font-medium mb-6">{plan.reviews}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => startFreeTrial(plan.name)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular 
                        ? 'bg-orange-600 text-white hover:bg-orange-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Inizia Prova Gratuita
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              🎯 <strong>15 giorni di prova gratuita</strong> • Nessun vincolo • Cancellazione immediata
            </p>
            <p className="text-sm text-gray-500">
              Tutti i piani includono integrazione con Google Business Profile e supporto in italiano
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cosa Dicono I Nostri Clienti
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.restaurant}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a Trasformare Le Tue Recensioni?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Unisciti a centinaia di ristoratori che hanno già automatizzato la gestione delle loro recensioni
          </p>
          <button 
            onClick={() => startFreeTrial('Professional')}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Inizia La Tua Prova Gratuita Ora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">🍝 RistoReply</h3>
            <p className="text-gray-400 mb-4">
              L'intelligenza artificiale per la gestione recensioni Google del tuo ristorante
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Termini di Servizio</a>
              <a href="#" className="hover:text-white transition-colors">Supporto</a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              © 2024 RistoReply. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {authMode === 'login' ? 'Accedi' : 'Registrati'}
              </h3>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome del Ristorante
                  </label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Es. Trattoria da Mario"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="la-tua-email@esempio.it"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                {authMode === 'login' ? 'Accedi' : 'Inizia Prova Gratuita'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-orange-600 hover:text-orange-700 text-sm"
              >
                {authMode === 'login' 
                  ? 'Non hai un account? Registrati' 
                  : 'Hai già un account? Accedi'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
