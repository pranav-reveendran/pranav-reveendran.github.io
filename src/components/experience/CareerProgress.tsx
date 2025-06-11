import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: string; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
      let start = 0;
      const increment = numericValue / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);
  
  return (
    <div ref={ref}>
      {count}{value.includes('%') ? '%' : value.includes('TB') ? 'TB' : value.includes('+') ? '+' : ''}{suffix}
    </div>
  );
};

interface CareerProgressProps {
  experiences: any[];
}

export const CareerProgress: React.FC<CareerProgressProps> = ({ experiences }) => {
  const totalYears = experiences.reduce((acc, exp) => {
    const duration = exp.duration.toLowerCase();
    if (duration.includes('year')) {
      const years = parseInt(duration.match(/(\d+)/)?.[0] || '0');
      const months = duration.includes('month') ? parseInt(duration.match(/(\d+)\s*month/)?.[0] || '0') : 0;
      return acc + years + (months / 12);
    } else if (duration.includes('month')) {
      const months = parseInt(duration.match(/(\d+)/)?.[0] || '0');
      return acc + (months / 12);
    }
    return acc + 0.5;
  }, 0);

  const companies = [...new Set(experiences.map(exp => exp.company))].length;
  const skills = [...new Set(experiences.flatMap(exp => exp.skills))].length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative overflow-hidden"
    >
      {/* Modern glass morphism background */}
      <div className="absolute inset-0 bg-hero-50/80 backdrop-blur-xl rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-cta-50/20 via-transparent to-accent-100/10 rounded-2xl" />
      
      {/* Enhanced Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-cta-200/40 shadow-lg" />
      
      <div className="relative p-8">
        {/* Stats in same row with consistent design */}
        <div className="flex items-center justify-between gap-8">
          {/* Years Experience */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={Math.ceil(totalYears).toString()} />+
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Years Experience</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalYears / 8) * 100, 100)}%` }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-16 bg-cta-300/50 shadow-sm" />
          
          {/* Companies */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={companies.toString()} />
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Companies</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(companies / 6) * 100}%` }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-16 bg-cta-300/50 shadow-sm" />
          
          {/* Skills */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={skills.toString()} />+
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Skills Mastered</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((skills / 30) * 100, 100)}%` }}
                transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 