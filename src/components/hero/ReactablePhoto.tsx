
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingEffect from '../FloatingEffect';

interface ReactablePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

const ReactablePhoto: React.FC<ReactablePhotoProps> = ({ 
  src, 
  alt, 
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <FloatingEffect intensity={10} hoverScale={1.03}>
      <motion.div 
        className={`relative overflow-hidden rounded-lg shadow-xl ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={containerRef}
      >
        {/* Main image */}
        <img 
          src={src}
          alt={alt}
          className="w-full h-full object-cover profile-image"
          loading="eager"
          {...{ fetchpriority: "high" } as any}
        />
        
        {/* Colorful border overlay */}
        <motion.div 
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-2 via-transparent to-accent opacity-40 mix-blend-overlay"></div>
        </motion.div>
        
        {/* Network-like overlay that shows on hover */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="network-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" fill="currentColor" />
                <line x1="5" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="0.2" />
                <line x1="5" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="0.2" />
                <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network-pattern)" />
          </svg>
        </motion.div>
        
        {/* Subtle inner shadow */}
        <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 shadow-inner"></div>
      </motion.div>
    </FloatingEffect>
  );
};

export default ReactablePhoto;
