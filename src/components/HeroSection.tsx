import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, GitBranch, ExternalLink, Sparkles, TrendingUp, Zap } from 'lucide-react';
import NetworkParticles from './NetworkParticles';
import HeroBackground from './hero/HeroBackground';
import ReactablePhoto from './hero/ReactablePhoto';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { useTechHighlight } from '@/context/TechHighlightContext';
import HeroHeading from './hero/HeroHeading';

import HeroDescription from './hero/HeroDescription';
import HeroMetrics from './hero/HeroMetrics';
import HeroButtons from './hero/HeroButtons';

interface ModernFloatingOrbsProps {
  show: boolean;
}

const ModernFloatingOrbs: React.FC<ModernFloatingOrbsProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Kintsugi-inspired floating particles */}
      <motion.div
        className="absolute top-20 left-10 w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full kintsugi-particle"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-600 rounded-full kintsugi-particle"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -180, -360],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-4 h-4 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full kintsugi-particle"
        animate={{ 
          y: [0, -35, 0],
          rotate: [0, 90, 180],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

const KintsugiCrackPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main diagonal crack */}
        <motion.path
          d="M 200 100 Q 400 250 600 200 T 1000 350"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Secondary crack pattern */}
        <motion.path
          d="M 100 400 Q 300 450 500 400 Q 700 350 900 450"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Connecting veins */}
        <motion.path
          d="M 600 200 Q 620 300 580 400"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 3 }}
        />
        
        {/* Repair nodes */}
        <motion.circle
          cx="600" cy="200"
          r="4"
          fill="url(#goldGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 3.5 }}
        />
        <motion.circle
          cx="400" cy="250"
          r="3"
          fill="url(#goldGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 4 }}
        />
        <motion.circle
          cx="300" cy="450"
          r="2.5"
          fill="url(#goldGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 4.5 }}
        />
        
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ffd700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const shouldAnimate = useMotionSafe();
  const [showNetworkParticles] = useState(true);
  const { scrollY } = useScroll();
  const { highlightedTech } = useTechHighlight();
  
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100]);
  const parallaxScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-hero-500 to-hero-300 flex items-center justify-center">
        <div className="animate-pulse text-accent text-lg font-medium">
          Loading...
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#fafaf9] to-[#f5f4f2] flex items-center justify-center">
      {/* Kintsugi background pattern */}
      <KintsugiCrackPattern />
      
      {/* Enhanced background with subtle animation */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: parallaxY, scale: parallaxScale }}
      >
        <HeroBackground />
      </motion.div>

      {/* Floating gold particles */}
      <ModernFloatingOrbs show={showNetworkParticles} />

      {/* Enhanced network particles */}
      <div className="absolute inset-0 overflow-visible opacity-40">
        {showNetworkParticles && <NetworkParticles />}
      </div>

      {/* Hero Section - Perfect 50/50 Split with Full Height Alignment */}
      <div className="relative z-10 w-full">
        {/* Combined Main Section - Text + Photo + Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Grid - 50/50 Split */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT 50% - Full Text Content (Heading + Description + Stats) */}
            <motion.div 
              className="py-12 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ minHeight: '600px' }}
            >
              {/* Hero Text Content */}
              <div className="space-y-6">
                <HeroHeading onNameTyped={() => {}} />
                <HeroDescription />
              </div>

              {/* Achievement Metrics */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ minHeight: '180px' }}
              >
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0066cc] mb-1">4+</div>
                  <div className="text-sm text-gray-600">Years building production ML pipelines</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0066cc] mb-1">100M+</div>
                  <div className="text-sm text-gray-600">Daily requests served</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0066cc] mb-1">60%</div>
                  <div className="text-sm text-gray-600">Cost reduction achieved</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="text-2xl font-bold text-[#0066cc] mb-1">50+</div>
                  <div className="text-sm text-gray-600">ML models in production</div>
                </div>
              </motion.div>


            </motion.div>

            {/* RIGHT 50% - Photo + Status Info */}
            <motion.div 
              className="py-12 space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              style={{ minHeight: '600px' }}
            >
              {/* Photo Container */}
              <div 
                className="w-full"
                style={{
                  marginTop: '2rem', // Move photo 1 line up (reduced from 4.5rem)
                  height: 'calc(60vh - 2rem)', // Adjusted height for photo
                }}
              >
                <ReactablePhoto 
                  src="/lovable-uploads/0716e905-ccc9-4cc0-a9bf-7e3a8bf93daa.png"
                  alt="Pranav - Data Engineer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Professional Status - Below Photo */}
              <motion.div 
                className="space-y-6"
                style={{
                  marginTop: '4rem', // Move status cards 2 lines down (increased from 1rem)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                {/* Professional Status Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-500">📍 Location</div>
                    <div className="font-semibold text-sm">San Jose, CA</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-500">🏢 Current</div>
                    <div className="font-semibold text-sm">Amazon AWS</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-500">🎓 Education</div>
                    <div className="font-semibold text-sm">MS Data Science</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-500">💼 Status</div>
                    <div className="font-semibold text-sm text-green-600">Open to L4/L5</div>
                  </div>
                </div>

                {/* Real-time Metrics */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-medium text-gray-700 mb-3">Real-time Metrics</div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Processed rows today:</span>
                    <span className="font-mono text-[#0066cc]">47,047,912</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pipeline latency:</span>
                    <span className="font-mono text-[#0066cc]">23ms 📈</span>
                  </div>
                </div>

                {/* Achievement Bullets - After 1-line gap */}
                <motion.div 
                  className="space-y-3"
                  style={{
                    marginTop: '1.5rem', // 1 line of space after status cards
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">⚡</span>
                    <span>Architected pipelines processing 500M+ events/day</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">🤖</span>
                    <span>ML models achieving 95%+ accuracy in production</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">☁️</span>
                    <span>Migrated legacy systems, reducing costs 40%</span>
                  </div>
                </motion.div>

                {/* Action Buttons - Right after the achievement bullets */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <HeroButtons />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>


        </div>


      </div>

      {/* Bottom section divider with Kintsugi aesthetics */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="kintsugi-divider" />
      </div>
    </section>
  );
};

export default HeroSection;
