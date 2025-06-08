
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

const ScrollIndicator: React.FC = () => {
  const shouldAnimate = useMotionSafe();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.getElementById('scroll-indicator');
      if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <motion.a 
      id="scroll-indicator"
      href="#about" 
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-accent hover:text-accent flex flex-col items-center"
      aria-label="Scroll to About section"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }}
      initial={shouldAnimate ? { opacity: 0 } : undefined}
      animate={shouldAnimate ? { 
        opacity: 1, 
        y: [0, 8, 0] 
      } : undefined}
      transition={{ 
        duration: 2,
        delay: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{ scale: 1.1 }}
    >
      <span className="text-sm mb-2 font-medium">Scroll</span>
      <div className="w-8 h-12 overflow-hidden bg-accent/10 rounded-full">
        <div className="w-8 h-16 bg-accent/20 rounded-t-full animate-flow relative">
          <ChevronDown size={32} className="text-accent absolute top-1 left-0 animate-bounce" />
        </div>
      </div>
    </motion.a>
  );
};

export default ScrollIndicator;
