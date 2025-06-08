
import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { Zap, Search, Cloud } from 'lucide-react';

interface ExpertiseBulletsProps {
  delay?: number;
}

const ExpertiseBullets: React.FC<ExpertiseBulletsProps> = ({ delay = 0.7 }) => {
  const shouldAnimate = useMotionSafe();
  
  const expertiseItems = [
    {
      icon: <Zap className="h-5 w-5" />,
      text: "🏗️ Architected data pipelines processing 500M+ events/day"
    },
    {
      icon: <Search className="h-5 w-5" />,
      text: "🤖 Deployed ML models achieving 95%+ accuracy in production"
    },
    {
      icon: <Cloud className="h-5 w-5" />,
      text: "☁️ Migrated legacy systems to cloud, reducing costs 40%"
    }
  ];
  
  return (
    <motion.div
      className="space-y-3 mt-4"
      initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
    >
      {expertiseItems.map((item, index) => (
        <motion.div 
          key={index}
          className="flex items-start gap-3 group"
          initial={shouldAnimate ? { opacity: 0, x: -10 } : undefined}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
          whileHover={{ x: 5 }}
        >
          <div className="flex-shrink-0 h-7 w-7 bg-accent/10 text-accent rounded-full flex items-center justify-center mt-0.5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            {item.icon}
          </div>
          <div>
            <span className="text-text text-sm md:text-base leading-tight block">{item.text}</span>
            <div className="w-0 group-hover:w-full h-0.5 bg-accent/20 mt-1 transition-all duration-300"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExpertiseBullets;
