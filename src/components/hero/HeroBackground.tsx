
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useMotionSafe } from '@/hooks/use-motion-safe';

export default function HeroBackground() {
  // Simplified static background to prevent 19ms forced reflows
  return (
    <div className="absolute inset-0 opacity-30">
      {/* Static grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(224, 122, 95, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224, 122, 95, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      {/* Static accent dots */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${15 + (i * 7) % 80}%`,
              top: `${20 + (i * 11) % 60}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldAnimate = useMotionSafe();
  
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Enhanced data flow animation using canvas
  useEffect(() => {
    if (!shouldAnimate || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      return { width, height };
    };
    
    const { width, height } = setCanvasDimensions();
    
    // Grid settings
    const gridSize = Math.max(30, Math.min(width, height) / 20);
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
    
    // Data particles with enhanced properties
    const particleCount = Math.min(30, Math.floor((width * height) / 15000));
    const dataParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6, // slightly faster
      speedY: (Math.random() - 0.5) * 0.6,
      pulseRate: Math.random() * 0.04 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      connections: [] as number[] // To track nearby particles
    }));
    
    // Connection lines settings
    const MAX_DISTANCE = gridSize * 4; // Increased connection distance
    
    // Occasional "data transfer" animation between random particles
    let transferAnimation = null as null | {
      start: number;
      end: number;
      progress: number;
      duration: number;
    };
    
    // Schedule a new transfer every few seconds
    const scheduleTransfer = () => {
      // Only start a new transfer if none is active
      if (transferAnimation === null && dataParticles.length > 1) {
        // Pick two random distinct particles
        const startIdx = Math.floor(Math.random() * dataParticles.length);
        let endIdx;
        do {
          endIdx = Math.floor(Math.random() * dataParticles.length);
        } while (endIdx === startIdx);
        
        transferAnimation = {
          start: startIdx,
          end: endIdx,
          progress: 0,
          duration: Math.random() * 50 + 30
        };
      }
      
      // Schedule next transfer
      setTimeout(scheduleTransfer, Math.random() * 4000 + 2000);
    };
    
    // Start scheduling transfers
    setTimeout(scheduleTransfer, 2000);
    
    // Animation loop with enhanced effects
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      
      // Draw horizontal grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw vertical grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Update and draw particles
      ctx.fillStyle = isDark 
        ? 'rgba(224, 122, 95, 0.3)' // Accent color with opacity in dark mode
        : 'rgba(224, 122, 95, 0.15)'; // Lighter accent in light mode
      
      // Reset connections
      dataParticles.forEach(particle => {
        particle.connections = [];
      });
      
      dataParticles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // Pulse size for a more dynamic effect
        const pulseFactor = 1 + Math.sin(Date.now() * particle.pulseRate + particle.pulseOffset) * 0.3;
        const displaySize = particle.size * pulseFactor;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, displaySize, 0, Math.PI * 2);
        ctx.fill();
        
        // Find and store connections between particles
        for (let j = i + 1; j < dataParticles.length; j++) {
          const other = dataParticles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < MAX_DISTANCE) {
            particle.connections.push(j);
            other.connections.push(i);
            
            // Draw connection with gradient opacity based on distance
            const opacity = isDark 
              ? 0.15 * (1 - distance / MAX_DISTANCE)
              : 0.08 * (1 - distance / MAX_DISTANCE);
            
            ctx.strokeStyle = `rgba(224, 122, 95, ${opacity})`;
            ctx.lineWidth = 0.8 * (1 - distance / MAX_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
      
      // Render data transfer animation if active
      if (transferAnimation) {
        const { start, end, progress } = transferAnimation;
        const startParticle = dataParticles[start];
        const endParticle = dataParticles[end];
        
        // Calculate position along the path
        const tx = startParticle.x + (endParticle.x - startParticle.x) * progress;
        const ty = startParticle.y + (endParticle.y - startParticle.y) * progress;
        
        // Draw data packet
        ctx.fillStyle = isDark 
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(224, 122, 95, 0.9)';
        ctx.beginPath();
        ctx.arc(tx, ty, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw path
        ctx.strokeStyle = isDark 
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(224, 122, 95, 0.5)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(startParticle.x, startParticle.y);
        ctx.lineTo(endParticle.x, endParticle.y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Update progress
        transferAnimation.progress += 0.01;
        
        // End animation when complete
        if (transferAnimation.progress >= 1) {
          transferAnimation = null;
        }
      }
      
      // Highlight "active" data nodes occasionally
      if (Math.random() < 0.02) {
        const activeIdx = Math.floor(Math.random() * dataParticles.length);
        const activeParticle = dataParticles[activeIdx];
        
        // Draw highlight effect
        ctx.fillStyle = isDark 
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(224, 122, 95, 0.4)';
        ctx.beginPath();
        ctx.arc(activeParticle.x, activeParticle.y, activeParticle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      const { width, height } = setCanvasDimensions();
      // Reset particles positions
      dataParticles.forEach(particle => {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldAnimate, isDark]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shouldAnimate ? (
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
          style={{ opacity: isDark ? 0.06 : 0.04 }}
        />
      ) : (
        // Fallback static grid for reduced motion preference
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="dag-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* DAG-like connections */}
              <path 
                d={`
                  M10,10 L30,30 
                  M30,30 L50,20 
                  M30,30 L40,60
                  M50,20 L70,30
                  M40,60 L60,70
                `} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                strokeDasharray={isDark ? "4,4" : "0"} 
              />
              
              {/* Grid background */}
              <path 
                d="M0 0h80M0 20h80M0 40h80M0 60h80M0 80h80M0 0v80M20 0v80M40 0v80M60 0v80M80 0v80" 
                stroke="currentColor" 
                strokeOpacity="0.3"
                strokeWidth="0.3" 
              />
              
              {/* DAG nodes */}
              <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="50" cy="20" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="40" cy="60" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="60" cy="70" r="2" fill="currentColor" fillOpacity="0.2" />
              <circle cx="70" cy="30" r="2" fill="currentColor" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dag-pattern)" />
        </svg>
      )}
    </div>
  );
}
