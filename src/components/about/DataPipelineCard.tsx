import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Database, Server, Cloud, ArrowRight, Play } from 'lucide-react';

interface DataPipelineCardProps {
  className?: string;
}

interface SampleData {
  raw?: string;
  transformed?: string;
  loaded?: string;
}

const DataPipelineCard: React.FC<DataPipelineCardProps> = ({ className = '' }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sampleData, setSampleData] = useState<SampleData | null>(null);
  
  // Enhanced steps with colorblind-friendly design
  const steps = [
    { 
      name: "Extract", 
      description: "Data collection from diverse sources", 
      icon: Database, 
      details: "Ingesting data from APIs, databases, streaming sources and file systems with built-in error handling and monitoring.",
      sampleData: {
        raw: '{"user":"john_doe", "timestamp":"2025-05-19T14:23:45", "source":"mobile"}'
      },
      color: 'var(--color-accent)',
      pattern: 'diagonal'
    },
    { 
      name: "Transform", 
      description: "Clean, validate & restructure data", 
      icon: Server, 
      details: "Applying data quality rules, normalization, and enrichment using distributed processing frameworks like Spark.",
      sampleData: {
        transformed: '{"user_id":12345, "time_epoch":1716112425, "device_type":"mobile"}'
      },
      color: 'var(--color-accent-dark)',
      pattern: 'dots'
    },
    { 
      name: "Load", 
      description: "Deliver insights to end users", 
      icon: Cloud, 
      details: "Efficiently loading processed data into data warehouses, data lakes, or real-time dashboards with high availability.",
      sampleData: {
        loaded: '{"dimension":"device_type", "metrics":{"active_users":1285}, "period":"2025-05"}'
      },
      color: 'var(--color-cta)',
      pattern: 'waves'
    }
  ];

  // Enhanced data flow animation
  const animateDataFlow = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSampleData(null);
    
    // Extract phase
    setTimeout(() => {
      setActiveStep(0);
      setSampleData(steps[0].sampleData);
      
      // Transform phase
      setTimeout(() => {
        setActiveStep(1);
        setSampleData(steps[1].sampleData);
        
        // Load phase
        setTimeout(() => {
          setActiveStep(2);
          setSampleData(steps[2].sampleData);
          
          // Reset
          setTimeout(() => {
            setActiveStep(null);
            setSampleData(null);
            setIsAnimating(false);
          }, 2500);
        }, 1800);
      }, 1800);
    }, 800);
  };

  const getPatternStyle = (pattern: string, color: string) => {
    switch (pattern) {
      case 'diagonal':
        return {
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 3px, ${color}20 3px, ${color}20 6px)`
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle at 4px 4px, ${color}30 1px, transparent 1px)`,
          backgroundSize: '8px 8px'
        };
      case 'waves':
        return {
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, ${color}20 4px, transparent 8px)`
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'relative bg-white border-2 border-[#e5e5e5] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden',
        className,
      )}
    >
      {/* Elegant header with accent colors */}
      <div className="relative p-6 pb-4 bg-gradient-to-br from-[color:var(--color-accent-light)]/20 to-white border-b border-[#e5e5e5]">
        {/* Accent color top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[color:var(--color-accent)]" />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-[#1a1a1a]">My Data Pipeline Approach</h3>
            <div className="w-3 h-3 bg-[color:var(--color-accent)] rounded-full animate-pulse" />
          </div>
          <p className="text-[#6a6a6a] text-sm leading-relaxed max-w-sm">
            Interactive ETL demonstration with real-time data flow
          </p>
        </div>

        {/* Prominently positioned Watch Flow button */}
        <div className="flex justify-center pt-6 pb-2">
          <motion.button
            onClick={animateDataFlow}
            className="group flex items-center gap-3 px-6 py-3 bg-[color:var(--color-cta)] text-white rounded-lg text-base font-semibold hover:bg-[color:var(--color-cta-hover)] transition-colors border-2 border-[color:var(--color-cta)] hover:border-[color:var(--color-cta-hover)] shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnimating}
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {isAnimating ? 'Running...' : 'Watch Flow'}
          </motion.button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6 relative">
          {/* Enhanced connecting line with accent colors */}
          <div className="absolute left-8 top-8 h-[calc(100%-64px)] w-1 bg-[color:var(--color-accent)] rounded-full z-0 opacity-60" />
          
          {/* Animated data packet with glow */}
          {isAnimating && activeStep !== null && (
            <motion.div 
              className="absolute left-[26px] w-6 h-6 rounded-full bg-[color:var(--color-accent)] shadow-lg z-20 border-2 border-white"
              initial={{ y: 8, scale: 0.8 }}
              animate={{ 
                y: activeStep === 0 ? 8 : 
                   activeStep === 1 ? 112 : 
                   216,
                scale: [0.8, 1.3, 0.8],
                boxShadow: [
                  '0 0 0 0 rgba(0, 102, 204, 0.7)',
                  '0 0 0 10px rgba(0, 102, 204, 0)',
                  '0 0 0 0 rgba(0, 102, 204, 0)'
                ]
              }}
              transition={{ 
                y: { duration: 1, ease: "easeInOut" },
                scale: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          )}
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.name}
                className="relative z-10"
                onMouseEnter={() => !isAnimating && setActiveStep(index)}
                onMouseLeave={() => !isAnimating && setActiveStep(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className={cn(
                  "relative p-6 rounded-xl border-2 transition-all duration-300 bg-white overflow-hidden min-h-[140px]",
                  activeStep === index 
                    ? "shadow-lg" 
                    : "border-[#e5e5e5] hover:border-[color:var(--color-accent)]/30"
                )}
                style={{
                  borderColor: activeStep === index ? step.color : undefined,
                  boxShadow: activeStep === index ? `0 10px 25px ${step.color}20` : undefined
                }}>
                  {/* Pattern background for accessibility */}
                  <div 
                    className="absolute inset-0 opacity-5 rounded-xl"
                    style={activeStep === index ? getPatternStyle(step.pattern, step.color) : {}}
                  />
                  
                  {/* Color stripe indicator */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                    style={{ backgroundColor: step.color }}
                  />
                  
                  {/* Enhanced step indicator */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border-2",
                      activeStep === index
                        ? "text-white shadow-lg scale-110"
                        : "text-white border-transparent"
                    )}
                    style={{
                      backgroundColor: step.color,
                      borderColor: activeStep === index ? '#ffffff' : 'transparent'
                    }}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={cn(
                            "text-xl font-bold transition-colors duration-300",
                            activeStep === index ? "text-[#1a1a1a]" : "text-[#1a1a1a]"
                          )}>
                            {step.name}
                          </h4>
                          <div className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 border",
                            activeStep === index 
                              ? "text-white border-white" 
                              : "text-white border-transparent"
                          )}
                          style={{
                            backgroundColor: step.color
                          }}>
                            {index + 1}
                          </div>
                          {/* Pattern indicator for each step */}
                          <div className="flex gap-1">
                            {step.pattern === 'diagonal' && (
                              <div className="w-2 h-2 bg-current opacity-60 transform rotate-45" style={{ color: step.color }} />
                            )}
                            {step.pattern === 'dots' && (
                              <div className="w-2 h-2 rounded-full bg-current opacity-60" style={{ color: step.color }} />
                            )}
                            {step.pattern === 'waves' && (
                              <div className="w-2 h-1 bg-current opacity-60 rounded-full" style={{ color: step.color }} />
                            )}
                          </div>
                        </div>
                        <p className="text-[#6a6a6a] leading-relaxed text-sm">{step.description}</p>
                      </div>
                      
                      {/* Enhanced sample data visualization */}
                      {activeStep === index && sampleData && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.4 }}
                          className="bg-[#fafaf9] border-2 rounded-lg p-4 font-mono text-xs overflow-hidden"
                          style={{ borderColor: `${step.color}30` }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div 
                              className="w-2 h-2 rounded-full animate-pulse" 
                              style={{ backgroundColor: step.color }}
                            />
                            <span className="text-[#6a6a6a] font-medium">Sample Data:</span>
                            <span 
                              className="text-xs px-2 py-1 rounded-full text-white"
                              style={{ backgroundColor: step.color }}
                            >
                              {step.name.toUpperCase()}
                            </span>
                          </div>
                          <pre 
                            className="leading-relaxed"
                            style={{ color: step.color }}
                          >
                            {Object.values(sampleData)[0]}
                          </pre>
                        </motion.div>
                      )}
                      
                      {/* Enhanced expandable details */}
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: activeStep === index ? 'auto' : 0,
                          opacity: activeStep === index ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="border-l-4 rounded-r-lg p-4 text-sm text-[#4a4a4a] leading-relaxed"
                          style={{ 
                            borderLeftColor: step.color,
                            backgroundColor: `${step.color}08`
                          }}
                        >
                          {step.details}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Arrow connector for non-last steps */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 border-2 border-white shadow-sm",
                        activeStep === index 
                          ? "text-white" 
                          : "text-white"
                      )}
                      style={{
                        backgroundColor: activeStep === index ? step.color : steps[index + 1]?.color
                      }}>
                        <ArrowRight className="w-3 h-3 transform rotate-90" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced status indicator */}
        <motion.div 
          className="mt-8 text-center"
          animate={{ opacity: isAnimating ? 1 : 0.7 }}
        >
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 border-2",
            isAnimating 
              ? "bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] border-[color:var(--color-accent)]/20" 
              : "bg-[#f5f5f5] text-[#6a6a6a] border-[#e5e5e5]"
          )}>
            {isAnimating && (
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[color:var(--color-accent)] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[color:var(--color-accent-dark)] animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-[color:var(--color-cta)] animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
            <span className="font-medium">
              {isAnimating 
                ? "Processing data through pipeline..." 
                : "Click 'Watch Flow' to see ETL in action"}
            </span>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background decoration with Claude theme */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[color:var(--color-accent-light)]/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[color:var(--color-accent)]/10 blur-xl pointer-events-none" />
    </motion.div>
  );
};

export default DataPipelineCard;
