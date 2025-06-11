import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';

interface HeroHeadingProps {
  onNameTyped: () => void;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ onNameTyped }) => {
  const shouldAnimate = useMotionSafe();
  const [text, setText] = useState('');
  const fullName = "Pranav";
  
  // Font variation settings for interactive name
  const [fontVariation, setFontVariation] = useState({ weight: 400, slant: 0 });
  
  // Handle mouse move for variable font effect
  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    
    setFontVariation({
      weight: 400 + Math.round(x * 300), // 400-700 weight range
      slant: (x - 0.5) * -10 // -5 to 5 slant range
    });
  };
  
  // Typing animation for name
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onNameTyped();
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onNameTyped]);
  
  return (
    <motion.div 
      className="flex flex-col space-y-0 mb-2 mt-8"
      initial={shouldAnimate ? { opacity: 0, x: -50 } : undefined}
      animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 
        className="text-6xl md:text-7xl font-serif leading-tight mb-6"
        id="hero-heading"
        initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Hi, I'm{" "}
        <span 
          className="text-accent animate-gradient relative kintsugi-text"
          onMouseMove={handleMouseMove}
          style={{
            fontVariationSettings: `'wght' ${fontVariation.weight}, 'slnt' ${fontVariation.slant}`,
            transition: 'font-variation-settings 0.1s ease-out'
          }}
        >
          {text}
          <motion.span 
            className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent kintsugi-glow"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: text.length === fullName.length ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </span>
      </motion.h1>
        
      {text.length === fullName.length && (
        <>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold tracking-wide text-[color:var(--color-accent)] mb-2"
            initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Data Engineer Intern @ Amazon
          </motion.h2>
          <motion.h3 
            className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed"
            initial={shouldAnimate ? { opacity: 0, y: 10 } : undefined}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Building enterprise-scale data infrastructure<br />
            that processes 100TB+ daily and drives<br />
            multi-million dollar business decisions
          </motion.h3>
        </>
      )}
    </motion.div>
  );
};

export default HeroHeading;
