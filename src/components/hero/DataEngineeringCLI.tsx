import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

// Impact-focused data engineering metrics
const DATA_ENGINEERING_QUOTES = [
  "$ data_pipeline_performance.py",
  "┌─ Processing Speed: 10TB/hour ↑ 300%",
  "├─ Cost Reduction: $2M annually ↓ 60%",
  "├─ System Uptime: 99.9% reliability",
  "├─ ML Models Deployed: 50+ in production",
  "└─ Daily Events: 500M+ processed 🚀"
];

interface DataEngineeringCLIProps {
  show: boolean;
}

const DataEngineeringCLI: React.FC<DataEngineeringCLIProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <motion.div
      className="relative group mt-3"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Main terminal container with glassmorphism */}
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Enhanced terminal header */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 px-4 py-3 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Traffic light buttons with hover effects */}
              <div className="flex gap-2">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <motion.div 
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>
              
              {/* Terminal title with modern styling */}
              <div className="flex items-center gap-2">
                <div className="text-xs text-slate-300 font-mono font-medium">data-insights</div>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Terminal status indicator */}
            <div className="flex items-center gap-2">
              <div className="text-[10px] text-slate-400 font-mono">SSH • Connected</div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
            </div>
          </div>
        </div>
        
        {/* Terminal content area */}
        <div className="p-3 min-h-[50px] bg-gradient-to-br from-slate-900/50 to-slate-800/50">
          {/* Terminal prompt line */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-emerald-400 font-mono text-xs font-medium">pranav@data-pipeline</span>
            <span className="text-slate-400 font-mono text-xs">:</span>
            <span className="text-blue-400 font-mono text-xs">~/insights</span>
            <span className="text-slate-400 font-mono text-xs">$</span>
            <motion.div 
              className="w-1.5 h-3 bg-emerald-400 opacity-75"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          
          {/* Typewriter content with enhanced styling */}
          <div className="relative">
            <Typewriter 
              lines={DATA_ENGINEERING_QUOTES} 
              prefix="" 
              typingSpeed={50}
              className="text-cyan-300 font-mono text-xs leading-snug filter drop-shadow-sm whitespace-nowrap overflow-hidden"
            />
          </div>
        </div>
        
        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default DataEngineeringCLI;
