
import React, { useEffect, useRef, useState } from 'react';

interface FloatingEffectProps {
  children: React.ReactNode;
  intensity?: number;
  hoverScale?: number;
  rotateOnHover?: boolean;
}

const FloatingEffect: React.FC<FloatingEffectProps> = ({ 
  children, 
  intensity = 20, 
  hoverScale = 1.05,
  rotateOnHover = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!rotateOnHover && !isHovered) return;
      
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      container.style.transform = `
        perspective(1000px) 
        rotateY(${x * intensity}deg) 
        rotateX(${-y * intensity}deg)
        ${isHovered ? `scale(${hoverScale})` : 'scale(1)'}
      `;
    };
    
    const handleMouseLeave = () => {
      container.style.transform = `
        perspective(1000px) 
        rotateY(0deg) 
        rotateX(0deg)
        scale(1)
      `;
      container.style.transition = 'transform 0.5s ease-out';
      setIsHovered(false);
    };
    
    const handleMouseEnter = () => {
      container.style.transition = 'transform 0.1s';
      setIsHovered(true);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [intensity, hoverScale, isHovered, rotateOnHover]);
  
  return (
    <div ref={containerRef} className="transition-transform duration-300 will-change-transform">
      {children}
    </div>
  );
};

export default FloatingEffect;
