import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, MessageCircle } from 'lucide-react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

const HeroButtons: React.FC = () => {
  const shouldAnimate = useMotionSafe();

  const buttonVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { 
      y: -3, 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 mt-6"
      initial={shouldAnimate ? { opacity: 0, y: 30 } : undefined}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Primary CTA - View Projects */}
      <motion.a
        href="#projects"
        className="kintsugi-btn group relative overflow-hidden inline-flex items-center justify-center gap-2 cursor-pointer interactive"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        <span className="font-medium">🚀 View Projects</span>
        
        {/* Magnetic effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#c76646] to-[#da7756] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]" />
      </motion.a>

      {/* Secondary CTA - Download Resume */}
      <motion.a
        href="/resume.pdf"
        download
        className="kintsugi-btn-secondary group relative inline-flex items-center justify-center gap-2 cursor-pointer interactive"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
      >
        <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        <span className="font-medium">📄 Download Resume</span>
        
        {/* Golden shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2ae97]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-[inherit]" />
      </motion.a>

      {/* Tertiary CTA - Schedule Call */}
      <motion.a
        href="https://topmate.io/pranav_reveendran"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center gap-2 cursor-pointer bg-transparent border-2 border-[#6c5dac] text-[#6c5dac] hover:bg-[#6c5dac] hover:text-white transition-all duration-300 font-medium px-6 py-3 interactive"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        style={{ borderRadius: '10px 6px 12px 8px' }}
      >
        <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-12" />
        <span className="font-medium">💬 Schedule Call</span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#6c5dac]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]" />
      </motion.a>
    </motion.div>
  );
};

export default HeroButtons;
