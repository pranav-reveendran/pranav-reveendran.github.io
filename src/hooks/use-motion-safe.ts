
import { useEffect, useState } from 'react';

/**
 * Hook to safely apply animations only when user hasn't requested reduced motion
 * @returns boolean indicating if animations should play
 */
export function useMotionSafe() {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setShouldAnimate(!mediaQuery.matches);
    
    // Set initial value
    setShouldAnimate(!mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return shouldAnimate;
}
