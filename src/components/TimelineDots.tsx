
import React, { useRef, useEffect } from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { useTheme } from '@/context/ThemeContext';

export default function TimelineDots() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useMotionSafe();
  const { theme } = useTheme();
  
  // Determine if we're in dark mode
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    if (!shouldAnimate || !ref.current) return;
    
    const rail = ref.current;
    const animation = rail.animate(
      [{ backgroundPosition: '0 0' }, { backgroundPosition: '0 200px' }],
      { duration: 8000, iterations: Infinity, easing: 'linear' }
    );
    
    return () => {
      animation.cancel();
    };
  }, [shouldAnimate]);

  return (
    <>
      {/* Central timeline rail with subtle dotted line */}
      <div
        ref={ref}
        className="absolute left-1/2 top-0 -translate-x-[0.5px] h-full w-px"
        style={shouldAnimate ? {
          background: 'repeating-linear-gradient(to bottom, var(--accent) 0, var(--accent) 2px, transparent 2px, transparent 12px)',
          backgroundSize: '2px 14px'
        } : {
          background: 'repeating-linear-gradient(to bottom, var(--accent) 0, var(--accent) 2px, transparent 2px, transparent 12px)',
          backgroundSize: '2px 14px'
        }}
      />
    </>
  );
}
