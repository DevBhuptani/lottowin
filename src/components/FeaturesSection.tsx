import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'World ID Verified',
      description: 'Ensure fair play with one-person-one-entry verification.'
    },
    {
      icon: <Lock className="w-12 h-12" />,
      title: 'Transparent & Secure',
      description: 'All draws are verifiable on-chain through Blockscout.'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Instant Payouts',
      description: 'Winners receive prizes automatically via smart contracts.'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built with cutting-edge technology to ensure fairness and transparency in every draw.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-morphism rounded-2xl p-8 text-center group hover:neon-border transition-all duration-300"
            >
              <div className="inline-block p-4 rounded-full bg-indigo-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;