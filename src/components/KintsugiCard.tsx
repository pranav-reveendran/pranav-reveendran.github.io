import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KintsugiCardProps {
  children: React.ReactNode;
  className?: string;
  crackDirection?: 'diagonal' | 'vertical' | 'horizontal';
  repairStyle?: 'subtle' | 'prominent';
}

const KintsugiCard: React.FC<KintsugiCardProps> = ({
  children,
  className = '',
  crackDirection = 'diagonal',
  repairStyle = 'subtle'
}) => {
  const getClipPath = () => {
    switch (crackDirection) {
      case 'vertical':
        return 'polygon(0% 0%, 45% 0%, 48% 30%, 52% 30%, 55% 0%, 100% 0%, 100% 100%, 52% 100%, 48% 70%, 45% 70%, 0% 100%)';
      case 'horizontal':
        return 'polygon(0% 0%, 100% 0%, 100% 45%, 70% 48%, 70% 52%, 100% 55%, 100% 100%, 0% 100%, 0% 52%, 30% 48%, 30% 45%)';
      default: // diagonal
        return 'polygon(0% 0%, 60% 0%, 65% 35%, 70% 40%, 75% 45%, 100% 50%, 100% 100%, 40% 100%, 35% 65%, 30% 60%, 25% 55%, 0% 50%)';
    }
  };

  const getRepairOpacity = () => repairStyle === 'prominent' ? 0.6 : 0.3;

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main content with clipped shape */}
      <div
        className="relative bg-surface/90 backdrop-blur-sm border border-border/30 rounded-2xl p-6"
        style={{
          clipPath: getClipPath(),
        }}
      >
        {children}
      </div>

      {/* Golden repair overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`repair-${crackDirection}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity={getRepairOpacity()} />
              <stop offset="50%" stopColor="#FFA500" stopOpacity={getRepairOpacity() * 1.3} />
              <stop offset="100%" stopColor="#DAA520" stopOpacity={getRepairOpacity()} />
            </linearGradient>
            
            <filter id={`glow-${crackDirection}`}>
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Repair lines based on crack direction */}
          {crackDirection === 'diagonal' && (
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <path
                d="M 60 0 L 65 35 L 70 40 L 75 45 L 100 50"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
              <path
                d="M 0 50 L 25 55 L 30 60 L 35 65 L 40 100"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
            </motion.g>
          )}

          {crackDirection === 'vertical' && (
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <path
                d="M 45 0 L 48 30 L 52 30 L 55 0"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
              <path
                d="M 45 100 L 48 70 L 52 70 L 55 100"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
            </motion.g>
          )}

          {crackDirection === 'horizontal' && (
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <path
                d="M 0 45 L 30 48 L 30 52 L 0 55"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
              <path
                d="M 100 45 L 70 48 L 70 52 L 100 55"
                stroke={`url(#repair-${crackDirection})`}
                strokeWidth="0.8"
                fill="none"
                filter={`url(#glow-${crackDirection})`}
              />
            </motion.g>
          )}

          {/* Repair nodes */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {crackDirection === 'diagonal' && (
              <>
                <circle cx="65" cy="35" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
                <circle cx="35" cy="65" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
              </>
            )}
            {crackDirection === 'vertical' && (
              <>
                <circle cx="50" cy="30" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
                <circle cx="50" cy="70" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
              </>
            )}
            {crackDirection === 'horizontal' && (
              <>
                <circle cx="30" cy="50" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
                <circle cx="70" cy="50" r="1" fill="#FFD700" opacity={getRepairOpacity() * 1.5} />
              </>
            )}
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default KintsugiCard; 