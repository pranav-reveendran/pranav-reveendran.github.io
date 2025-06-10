import React, { useEffect, useRef, useCallback, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  mass: number;
  magnetized: boolean;
  life: number;
  hue: number;
}

interface Connection {
  from: Particle;
  to: Particle;
  opacity: number;
  distance: number;
}

const ConstellationBackground: React.FC = () => {
  // Disabled for performance - was causing 70ms forced reflows
  return null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; isMoving: boolean; movingTimeout?: NodeJS.Timeout }>({ x: 0, y: 0, isMoving: false });
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [rippleCenter, setRippleCenter] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Claude color palette
  const colors = {
    particle: '#da7756', // Claude primary accent
    connection: '#da7756',
    glow: '#e88968', // Claude secondary accent
    ripple: '#f5e6e0', // Claude accent light
  };

  // Initialize particles
  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
          const particleCount = Math.min(120, Math.floor((width * height) / 15000)); // Responsive particle count

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.5 + 0.8; // Refined size
        const baseOpacity = Math.random() * 0.4 + 0.2; // More subtle
      
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius,
        opacity: baseOpacity,
        baseOpacity,
        mass: radius * 0.5,
        magnetized: false,
        life: Math.random() * Math.PI * 2,
        hue: Math.random() * 30 - 15, // Slight hue variation
      });
    }

    particlesRef.current = particles;
  }, []);

  // Update connections between particles
  const updateConnections = useCallback(() => {
    const particles = particlesRef.current;
    const connections: Connection[] = [];
    const maxDistance = 80; // Shorter connection distance

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.05; // Much more subtle connections
          connections.push({
            from: particles[i],
            to: particles[j],
            opacity,
            distance,
          });
        }
      }
    }

    connectionsRef.current = connections;
  }, []);

  // Mouse interaction effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current = { x, y, isMoving: true };

    // Clear moving timeout
    clearTimeout(mouseRef.current.movingTimeout);
    mouseRef.current.movingTimeout = setTimeout(() => {
      mouseRef.current.isMoving = false;
    }, 100);
  }, []);

  // Detect hover over interactive elements
  const detectHoverElements = useCallback(() => {
    const buttons = document.querySelectorAll('button, a, .interactive');
    const profileImage = document.querySelector('.profile-image, [alt*="profile"], [alt*="Pranav"]');
    
    let isOverInteractive = false;
    let profileRect = null;

    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      const { x, y } = mouseRef.current;
      
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        isOverInteractive = true;
      }
    });

    if (profileImage) {
      const rect = profileImage.getBoundingClientRect();
      const { x, y } = mouseRef.current;
      
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        profileRect = rect;
        const canvas = canvasRef.current;
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          setRippleCenter({
            x: rect.left + rect.width / 2 - canvasRect.left,
            y: rect.top + rect.height / 2 - canvasRect.top,
          });
        }
      }
    }

    if (!profileRect) {
      setRippleCenter(null);
    }

    setIsHovered(isOverInteractive);
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;

    // Clear canvas completely
    ctx.clearRect(0, 0, width, height);

    // Update particles
    particlesRef.current.forEach((particle, index) => {
      // Organic drift motion
      particle.life += 0.01;
      particle.x += particle.vx + Math.sin(particle.life) * 0.1;
      particle.y += particle.vy + Math.cos(particle.life * 0.7) * 0.1;

      // Boundary wrapping
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = height + 10;
      if (particle.y > height + 10) particle.y = -10;

      // Mouse magnetic effect
      if (mouse.isMoving) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxInfluence = 150;

        if (distance < maxInfluence) {
          const force = (1 - distance / maxInfluence) * 0.15;
          particle.vx += (dx / distance) * force * particle.mass;
          particle.vy += (dy / distance) * force * particle.mass;
          particle.magnetized = true;
          particle.opacity = Math.min(particle.baseOpacity * 2, 0.8);
        } else {
          particle.magnetized = false;
          particle.opacity = particle.baseOpacity;
        }
      } else {
        // Return to drift state
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.opacity = particle.baseOpacity;
        particle.magnetized = false;
      }

      // Hover scatter effect
      if (isHovered) {
        const scatterForce = 0.02;
        particle.vx += (Math.random() - 0.5) * scatterForce;
        particle.vy += (Math.random() - 0.5) * scatterForce;
        particle.opacity *= 0.6;
      }

      // Ripple effect around profile image
      if (rippleCenter) {
        const dx = rippleCenter.x - particle.x;
        const dy = rippleCenter.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = 200;

        if (distance < rippleRadius) {
          const rippleForce = Math.sin((distance / rippleRadius) * Math.PI) * 0.3;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * rippleForce;
          particle.vy -= Math.sin(angle) * rippleForce;
          particle.opacity = particle.baseOpacity * (1 + rippleForce);
        }
      }

      // Velocity damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
    });

    // Update connections
    updateConnections();

    // Draw connections
    connectionsRef.current.forEach(connection => {
      const { from, to, opacity } = connection;
      
      // Enhanced connection opacity near mouse
      let finalOpacity = opacity;
      if (mouse.isMoving) {
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const distanceToMouse = Math.sqrt(
          (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
        );
        
        if (distanceToMouse < 100) {
          finalOpacity *= (1 + (100 - distanceToMouse) / 100);
        }
      }

      ctx.strokeStyle = `rgba(218, 119, 86, ${finalOpacity})`;
      ctx.lineWidth = 0.3; // Very thin lines
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Subtle glow on highly visible connections
      if (finalOpacity > 0.2) {
        ctx.strokeStyle = `rgba(232, 137, 104, ${finalOpacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw particles
    particlesRef.current.forEach(particle => {
      const { x, y, radius, opacity, magnetized } = particle;
      
      // Particle glow effect
      if (magnetized || opacity > particle.baseOpacity * 1.5) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, `rgba(232, 137, 104, ${opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(232, 137, 104, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Main particle
      ctx.fillStyle = `rgba(218, 119, 86, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Particle highlight
      if (opacity > particle.baseOpacity) {
        ctx.fillStyle = `rgba(245, 230, 224, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw ripple effect
    if (rippleCenter) {
      const time = Date.now() * 0.003;
      for (let i = 0; i < 3; i++) {
        const rippleRadius = (Math.sin(time + i) * 0.5 + 0.5) * 150 + 50;
        const rippleOpacity = (Math.sin(time + i + Math.PI) * 0.5 + 0.5) * 0.1;
        
        ctx.strokeStyle = `rgba(245, 230, 224, ${rippleOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rippleCenter.x, rippleCenter.y, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [inView, isHovered, rippleCenter, updateConnections]);

  // Initialize and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      // Cache rect to prevent forced reflow
      const rect = canvas.getBoundingClientRect();
      const { width, height } = rect;
      
      // Only update if dimensions changed
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        initializeParticles(width, height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Detect hover elements periodically
    const hoverDetector = setInterval(detectHoverElements, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(hoverDetector);
    };
  }, [initializeParticles, handleMouseMove, animate, detectHoverElements]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'normal',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.7, // Subtle but visible
        }}
      />
    </div>
  );
};

export default ConstellationBackground; 