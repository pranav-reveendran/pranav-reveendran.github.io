
import React from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

const ThreeBackground = () => {
  const shouldAnimate = useMotionSafe();

  if (!shouldAnimate) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Simple CSS-based background animation instead of Three.js */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
    </div>
  );
};

export default ThreeBackground;
