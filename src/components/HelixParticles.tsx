
import { useRef, useMemo, useState, useEffect } from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

// Tech colors mapping
const TECH_COLORS = {
  default: '#e07a5f',
  spark: '#4a6fa5',   // blue
  kafka: '#ff7a22',    // orange
  aws: '#2ecc71',      // green
  python: '#f7df1e',   // yellow
  postgres: '#336791', // blue-ish
};

interface HelixParticlesProps {
  radius?: number;
  turns?: number;
  particleCount?: number;
  highlightTech?: string | null;
  animated?: boolean;
}

export default function HelixParticles({
  radius = 180,
  turns = 8,
  particleCount = 100,
  highlightTech = null,
  animated = true
}: HelixParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAnimate = useMotionSafe();
  
  // Progressive loading state
  const [visibleParticles, setVisibleParticles] = useState(animated ? 0 : particleCount);
  
  // Generate particles data
  const particles = useMemo(() => {
    const particlesData = [];
    const techs = Object.keys(TECH_COLORS).filter(key => key !== 'default');
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 2 * turns;
      const x = Math.cos(t) * radius;
      const y = (i - particleCount / 2) * 2;  // vertical stretch
      const z = Math.sin(t) * radius;
      
      const techIndex = i % techs.length;
      const tech = techs[techIndex];
      const color = TECH_COLORS[tech as keyof typeof TECH_COLORS];
      
      particlesData.push({
        id: i,
        x,
        y,
        z,
        tech,
        color,
        isHighlighted: !highlightTech || tech === highlightTech
      });
    }
    
    return particlesData;
  }, [particleCount, radius, turns, highlightTech]);

  // Progressive loading of particles
  useEffect(() => {
    if (!animated || visibleParticles >= particleCount) return;
    
    const timeout = setTimeout(() => {
      setVisibleParticles(prev => Math.min(prev + 5, particleCount));
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [visibleParticles, particleCount, animated]);

  if (!shouldAnimate) return null;

  return (
    <>
      <style>
        {`
          @keyframes helix-spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          .helix-container {
            animation: helix-spin 20s linear infinite;
          }
        `}
      </style>
      <div 
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ 
          maxWidth: '400px', 
          maxHeight: '400px',
          perspective: '1000px'
        }}
      >
        <div 
          className={`absolute inset-0 w-full h-full ${shouldAnimate ? 'helix-container' : ''}`}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          {particles.slice(0, visibleParticles).map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full transition-opacity duration-300"
              style={{
                left: `${50 + (particle.x / radius) * 25}%`,
                top: `${50 + (particle.y / (particleCount * 2)) * 100}%`,
                backgroundColor: particle.color,
                opacity: particle.isHighlighted ? 0.8 : 0.2,
                transform: `translateZ(${particle.z}px)`,
                boxShadow: particle.isHighlighted ? `0 0 10px ${particle.color}` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
