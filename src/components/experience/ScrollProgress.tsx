
import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const shouldAnimate = useMotionSafe();

  if (!shouldAnimate) {
    return <div className="fixed top-0 left-0 h-1 w-full bg-accent/20 z-50" />;
  }

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 h-1 w-full origin-left bg-accent z-50"
    />
  );
};
