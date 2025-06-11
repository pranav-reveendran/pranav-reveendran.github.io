import React from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import ExpertiseBullets from './ExpertiseBullets';

interface HeroDescriptionProps {
  delay?: number;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ delay = 0.6 }) => {
  const shouldAnimate = useMotionSafe();
  
  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-[color:var(--color-accent)]"
        initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay }}
      >
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          I design and build the data systems that power business-critical 
          decisions. From real-time ML pipelines processing terabytes 
          to cost-optimized cloud architectures, I turn complex data 
          challenges into scalable, profitable solutions.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
      >
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-2xl font-bold text-[color:var(--color-accent)] mb-1">4+</div>
          <div className="text-sm text-gray-600">Years building production ML pipelines at scale</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-2xl font-bold text-[color:var(--color-accent)] mb-1">100M+</div>
          <div className="text-sm text-gray-600">Daily requests served by data architecture</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-2xl font-bold text-[color:var(--color-accent)] mb-1">60%</div>
          <div className="text-sm text-gray-600">Cost reduction through optimization</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="text-2xl font-bold text-[color:var(--color-accent)] mb-1">50+</div>
          <div className="text-sm text-gray-600">ML models deployed in production</div>
        </div>
      </motion.div>
      
      <ExpertiseBullets delay={delay + 0.2} />
    </div>
  );
};

export default HeroDescription;
