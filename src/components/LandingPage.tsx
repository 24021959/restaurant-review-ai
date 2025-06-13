
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './landing/Navigation';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import PricingSection from './landing/PricingSection';
import TestimonialsSection from './landing/TestimonialsSection';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';
import AuthModal from './landing/AuthModal';

export default function LandingPage() {
  const navigate = useNavigate();
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

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      
      <HeroSection 
        onStartTrial={startFreeTrial}
        onOpenDemo={openDemo}
      />
      
      <FeaturesSection />
      
      <PricingSection onStartTrial={startFreeTrial} />
      
      <TestimonialsSection />
      
      <CTASection onStartTrial={startFreeTrial} />
      
      <Footer />

      <AuthModal
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        authMode={authMode}
        setAuthMode={setAuthMode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        restaurantName={restaurantName}
        setRestaurantName={setRestaurantName}
        onSubmit={handleAuth}
      />
    </div>
  );
}
