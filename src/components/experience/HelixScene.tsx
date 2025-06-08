import React, { useRef, useEffect, useMemo } from 'react';
import { useScroll } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { useTheme } from '@/context/ThemeContext';

export const HelixScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldAnimate = useMotionSafe();
  const { theme } = useTheme();
  
  // Get accent color from CSS custom property
  const accentColor = React.useMemo(() => {
    if (typeof window === 'undefined') return '#e07a5f';
    const computed = getComputedStyle(document.documentElement);
    return computed.getPropertyValue('--accent') || '#e07a5f';
  }, []);

  // Generate helix nodes positions
  const nodes = useMemo(() => {
    const nodeCount = 12;
    const r = 150; // radius in pixels
    const nodesData = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const y = i * 100; // vertical spacing
      const angle = i * 0.6;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      nodesData.push({
        id: i,
        x,
        y,
        z,
        angle
      });
    }
    
    return nodesData;
  }, []);

  // Update rotation based on scroll
  useEffect(() => {
    if (!containerRef.current || !shouldAnimate) return;

    const updateRotation = () => {
      const rotation = scrollY.get() * 0.1;
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${rotation}deg)`;
      }
    };

    const unsubscribe = scrollY.on('change', updateRotation);
    return unsubscribe;
  }, [scrollY, shouldAnimate]);

  if (!shouldAnimate) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="w-full h-full relative overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)'
          }}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute w-4 h-4 rounded-full opacity-80 animate-pulse"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `${node.y}px`,
                backgroundColor: accentColor,
                transform: `translateZ(${node.z}px)`,
                boxShadow: `0 0 20px ${accentColor}`,
                animation: `pulse 2s ease-in-out infinite ${node.id * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
