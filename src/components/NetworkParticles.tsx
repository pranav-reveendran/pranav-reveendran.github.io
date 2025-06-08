import { useCallback, useState, useEffect, useRef } from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { useTechHighlight } from '@/context/TechHighlightContext';

// Tech colors mapping with Kintsugi gold palette
const techColors: Record<string, string> = {
  spark: '#da7756',    // Claude primary accent
  kafka: '#e88968',    // Claude secondary accent  
  aws: '#f5e6e0',      // Claude accent light
  python: '#da7756',   // Claude primary accent
  postgres: '#e88968', // Claude secondary accent
  react: '#f5e6e0',    // Claude accent light
  typescript: '#da7756', // Claude primary accent
  node: '#e88968',     // Claude secondary accent
  docker: '#f5e6e0',   // Claude accent light
  kubernetes: '#da7756', // Claude primary accent
  scala: '#e88968',    // Claude secondary accent
};

export default function NetworkParticles() {
  const shouldAnimate = useMotionSafe();
  const { highlightedTech } = useTechHighlight();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    
    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  // Color based on highlighted tech - using Kintsugi gold palette
  const getColor = () => {
    if (highlightedTech && techColors[highlightedTech]) {
      return techColors[highlightedTech];
    }
    return '#da7756'; // Claude primary accent as default
  };

  if (!shouldAnimate) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes kintsugiFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            33% { 
              transform: translateY(-15px) rotate(120deg);
              opacity: 0.6;
            }
            66% { 
              transform: translateY(8px) rotate(240deg);
              opacity: 0.4;
            }
          }
          
          @keyframes kintsugiPulse {
            0%, 100% { 
              opacity: 0.2;
              filter: brightness(1);
            }
            50% { 
              opacity: 0.5;
              filter: brightness(1.2);
            }
          }
          
          .kintsugi-particle {
            animation: kintsugiFloat 8s ease-in-out infinite;
          }
          
          .kintsugi-particle:nth-child(2n) {
            animation-delay: -2.5s;
            animation-duration: 10s;
          }
          
          .kintsugi-particle:nth-child(3n) {
            animation-delay: -5s;
            animation-duration: 9s;
          }
          
          .kintsugi-line {
            animation: kintsugiPulse 4s ease-in-out infinite;
          }
          
          .kintsugi-line:nth-child(2n) {
            animation-delay: -1.5s;
          }
          
          .kintsugi-line:nth-child(3n) {
            animation-delay: -3s;
          }
        `}
      </style>
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" 
        style={{ zIndex: 1 }}
      >
        {/* Kintsugi-inspired particle network */}
        <div className="relative w-full h-full">
          {/* Generate golden particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="kintsugi-particle absolute rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                backgroundColor: getColor(),
                boxShadow: `0 0 ${4 + Math.random() * 8}px ${getColor()}`,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
          ))}
          
          {/* Golden connecting veins */}
          <div className="absolute inset-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="kintsugi-line absolute h-px"
                style={{
                  backgroundColor: getColor(),
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                  width: `${15 + Math.random() * 25}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.15,
                  boxShadow: `0 0 2px ${getColor()}`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Floating repair nodes */}
          <div className="absolute inset-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`node-${i}`}
                className="kintsugi-particle absolute rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#e2ae97',
                  boxShadow: `0 0 12px #e2ae97`,
                  opacity: 0.6,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: '12s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
