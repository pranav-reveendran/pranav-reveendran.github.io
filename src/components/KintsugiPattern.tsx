import React from 'react';
import { motion } from 'framer-motion';

interface KintsugiPatternProps {
  variant?: 'subtle' | 'prominent' | 'connecting';
  className?: string;
}

const KintsugiPattern: React.FC<KintsugiPatternProps> = ({ 
  variant = 'subtle', 
  className = '' 
}) => {
  const getOpacity = () => {
    switch (variant) {
      case 'prominent': return 0.4;
      case 'connecting': return 0.6;
      default: return 0.15;
    }
  };

  const getStrokeWidth = () => {
    switch (variant) {
      case 'prominent': return 3;
      case 'connecting': return 2;
      default: return 1.5;
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 800 600" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions for golden effects */}
        <defs>
          <linearGradient id="kintsugiGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity={getOpacity()} />
            <stop offset="30%" stopColor="#FFA500" stopOpacity={getOpacity() * 1.2} />
            <stop offset="60%" stopColor="#DAA520" stopOpacity={getOpacity()} />
            <stop offset="100%" stopColor="#B8860B" stopOpacity={getOpacity() * 0.8} />
          </linearGradient>
          
          <linearGradient id="kintsugiGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity={getOpacity() * 2} />
            <stop offset="50%" stopColor="#FFA500" stopOpacity={getOpacity() * 1.5} />
            <stop offset="100%" stopColor="#DAA520" stopOpacity={getOpacity()} />
          </linearGradient>

          {/* Filter for glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main crack pattern - organic, irregular lines */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        >
          {/* Primary crack line - diagonal flow */}
          <motion.path
            d="M 50 100 Q 150 120 250 140 Q 350 160 450 180 Q 550 200 650 220 Q 720 240 780 260"
            stroke="url(#kintsugiGold)"
            strokeWidth={getStrokeWidth()}
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
          />
          
          {/* Secondary branch cracks */}
          <motion.path
            d="M 250 140 Q 280 180 320 220 Q 360 260 400 300"
            stroke="url(#kintsugiGoldGlow)"
            strokeWidth={getStrokeWidth() * 0.7}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 1.5 }}
          />
          
          <motion.path
            d="M 450 180 Q 420 220 380 260 Q 340 300 300 340"
            stroke="url(#kintsugiGoldGlow)"
            strokeWidth={getStrokeWidth() * 0.7}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 1.8 }}
          />

          {/* Tertiary micro cracks */}
          <motion.path
            d="M 320 220 L 340 240 L 360 235 L 380 250"
            stroke="url(#kintsugiGold)"
            strokeWidth={getStrokeWidth() * 0.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 2.2 }}
          />
          
          <motion.path
            d="M 380 260 L 365 275 L 375 290 L 385 305"
            stroke="url(#kintsugiGold)"
            strokeWidth={getStrokeWidth() * 0.5}
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 2.5 }}
          />
        </motion.g>

        {/* Connecting lines for different sections */}
        {variant === 'connecting' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <motion.path
              d="M 0 300 Q 200 280 400 300 Q 600 320 800 300"
              stroke="url(#kintsugiGoldGlow)"
              strokeWidth={getStrokeWidth()}
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 1.5 }}
            />
          </motion.g>
        )}

        {/* Repair nodes - small golden circles at intersection points */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <circle cx="250" cy="140" r="4" fill="url(#kintsugiGoldGlow)" filter="url(#glow)" />
          <circle cx="450" cy="180" r="3" fill="url(#kintsugiGoldGlow)" filter="url(#glow)" />
          <circle cx="320" cy="220" r="2.5" fill="url(#kintsugiGold)" />
          <circle cx="380" cy="260" r="2" fill="url(#kintsugiGold)" />
        </motion.g>
      </svg>
    </div>
  );
};

export default KintsugiPattern; 