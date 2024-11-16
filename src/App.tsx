import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="fixed inset-0 grid-pattern opacity-20"></div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-[128px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative z-10">
          <Header />
          <main>
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
          </main>
          <Footer />
        </div>
      </div>
    </Auth0Provider>
  );
}

export default App;
