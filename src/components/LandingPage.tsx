
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  // If user is already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // This is now handled by the Auth page
    navigate('/auth');
  };

  const startFreeTrial = (plan?: string) => {
    navigate('/auth');
  };

  const openDemo = () => {
    navigate('/demo');
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleRegisterClick = () => {
    navigate('/auth');
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
