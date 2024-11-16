import { motion } from 'framer-motion';
import { Shield, Ticket } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { useAuth0 } from '@auth0/auth0-react';

const HeroSection = () => {
  const nextDraw = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  const { loginWithRedirect } = useAuth0();

  return (
    <section className="pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Decentralized Lottery on World Chain
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of fair gaming with transparent, verifiable
              results powered by Pyth Entropy.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              >
              <motion.button
                className="cyber-button rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loginWithRedirect()}
              >
                <Shield className="w-5 h-5" />
                Connect World ID
              </motion.button>
              <motion.button
                className="cyber-button rounded-lg bg-white/10 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Ticket className="w-5 h-5" />
                Buy Tickets
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Next Draw In</h2>
              <CountdownTimer targetDate={nextDraw} />
            </div>
            <div className="space-y-6">
              <div className="glass-morphism rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Current Prize Pool</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    1,000,000 ETH
                  </span>
                </div>
              </div>
              <div className="glass-morphism rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ticket Price</span>
                  <span className="text-xl font-bold">0.1 ETH</span>
                </div>
              </div>
              <motion.button
                className="cyber-button w-full rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
