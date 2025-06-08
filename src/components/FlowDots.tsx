
import React, { useRef, useEffect } from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

export default function FlowDots() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldAnimate = useMotionSafe();

  useEffect(() => {
    if (!shouldAnimate || !ref.current) return;
    
    const rail = ref.current;
    const animation = rail.animate(
      [{ backgroundPosition: '0 0' }, { backgroundPosition: '0 200px' }],
      { duration: 6000, iterations: Infinity, easing: 'linear' }
    );
    
    return () => {
      animation.cancel();
    };
  }, [shouldAnimate]);

  return (
    <>
      {/* Central timeline rail */}
      <div
        ref={ref}
        className="absolute left-1/2 top-0 -translate-x-[0.5px] h-full w-px bg-border"
        style={shouldAnimate ? {
          background: 'repeating-linear-gradient(to bottom, var(--accent) 0, var(--accent) 4px, transparent 4px, transparent 16px)',
          backgroundSize: '4px 20px'
        } : {}}
      />
    </>
  );
}
