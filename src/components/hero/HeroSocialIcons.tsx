
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

interface HeroSocialIconsProps {
  delay?: number;
}

const HeroSocialIcons: React.FC<HeroSocialIconsProps> = ({ delay = 1 }) => {
  const shouldAnimate = useMotionSafe();
  
  // Enhanced social links with tooltips and enhanced hover effects
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: Github, href: "#", label: "GitHub", color: "#333" },
    { icon: Instagram, href: "#", label: "Instagram", color: "#E4405F" }
  ];
  
  return (
    <motion.div 
      className="flex space-x-5 pt-6"
      initial={shouldAnimate ? { opacity: 0, y: 20 } : undefined}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay }}
    >
      {socialLinks.map(({ icon: Icon, href, label, color }) => (
        <motion.div
          key={label}
          className="relative group"
        >
          <motion.a 
            href={href} 
            className="bg-surface text-accent p-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 min-h-11 min-w-11 flex items-center justify-center group-hover:bg-accent group-hover:text-white relative z-10"
            aria-label={label}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              size={22} 
              className="group-hover:animate-pulse" 
            />
            
            {/* Color overlay on hover (custom brand color for each) */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-0 z-[-1]"
              style={{ backgroundColor: color }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.15, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          {/* Tooltip */}
          <motion.div 
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-surface px-2 py-1 rounded text-xs whitespace-nowrap shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-none"
            initial={{ y: -5 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-surface"></div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroSocialIcons;
