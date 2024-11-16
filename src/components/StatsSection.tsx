import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Ticket } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '10,000+',
      label: 'Active Players'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: '5M WRLD',
      label: 'Total Prizes'
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      value: '100%',
      label: 'Transparent'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-morphism rounded-2xl p-8 text-center"
            >
              <div className="inline-block p-4 rounded-full bg-indigo-500/20 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;