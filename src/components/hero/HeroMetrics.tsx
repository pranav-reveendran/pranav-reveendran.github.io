
import React from 'react';
import { motion } from 'framer-motion';
import LiveMetric from './LiveMetric';
import Sparkline from './Sparkline';
import { useMotionSafe } from '@/hooks/use-motion-safe';

// Data for the spark visualization
const LATENCY_DATA = [23, 18, 25, 16, 22, 26, 20, 24, 19, 17, 21, 25];

interface HeroMetricsProps {
  delay?: number;
}

const HeroMetrics: React.FC<HeroMetricsProps> = ({ delay = 0.7 }) => {
  const shouldAnimate = useMotionSafe();
  
  return (
    <div className="space-y-4">
      {/* Professional Credentials */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
        initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay }}
      >
        <div className="text-center">
          <div className="text-xs text-gray-500">📍 Location</div>
          <div className="font-semibold text-sm">San Jose, CA</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">🏢 Current</div>
          <div className="font-semibold text-sm">Amazon AWS</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">🎓 Education</div>
          <div className="font-semibold text-sm">MS Data Science</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">💼 Status</div>
          <div className="font-semibold text-sm text-green-600">Open to L4/L5</div>
        </div>
      </motion.div>

      {/* Live Metrics */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-x-8 text-sm md:text-base"
        initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      >
        <div className="flex items-center gap-2" aria-live="polite">
          <span>Processed</span>
          <LiveMetric initialValue={47045612} incrementRate={23} />
          <span>rows today</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Pipeline latency</span>
          <span className="inline-flex items-center">
            <Sparkline 
              data={LATENCY_DATA} 
              width={60} 
              height={20} 
              color="var(--accent)"
            />
            <span className="text-accent ml-1">23ms</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroMetrics;
