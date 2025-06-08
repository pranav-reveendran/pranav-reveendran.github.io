import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { Sun, Moon, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  colorblind: Eye,
};

const THEME_LABELS = {
  light: 'Light theme',
  dark: 'Dark theme', 
  colorblind: 'Colorblind-friendly theme',
};

export const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();
  const shouldAnimate = useMotionSafe();

  const IconComponent = THEME_ICONS[theme];

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2',
        'text-text hover:text-accent transition-all duration-200',
        'bg-surface/80 backdrop-blur-sm border border-border/50',
        'hover:bg-surface/90 hover:border-accent/50 active:bg-surface',
        'shadow-md hover:shadow-lg',
        'ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        'w-9 h-9 theme-toggle' // Small, compact size with identifier class
      )}
      aria-label={`Switch theme (currently ${THEME_LABELS[theme]})`}
      title={`Click to switch theme (currently ${THEME_LABELS[theme]})`}
    >
      <motion.span
        key={theme} // Key change triggers animation
        initial={shouldAnimate ? { scale: 0, rotate: -180 } : {}}
        animate={shouldAnimate ? { scale: 1, rotate: 0 } : {}}
        transition={{ 
          duration: 0.3, 
          ease: 'easeOut',
          type: 'spring',
          stiffness: 300
        }}
        className="flex items-center justify-center"
      >
        <IconComponent size={16} />
      </motion.span>
    </button>
  );
};

export default ThemeSelector;
