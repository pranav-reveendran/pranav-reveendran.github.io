
import React, { useState } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { WorkExperience } from '@/types/experience';
import { useExperienceFilter } from '@/context/ExperienceFilter';
import { cn } from '@/lib/utils';
import { ChevronDown, TrendingUp, Database, Zap, Users } from 'lucide-react';
import TechChip from '@/components/TechChip';

interface EnhancedExperienceCardProps {
  experience: WorkExperience;
  index: number;
  side: 'left' | 'right';
}

const KPIBadge = ({ 
  icon: Icon, 
  value, 
  suffix, 
  label, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  value: number; 
  suffix: string; 
  label: string; 
  delay?: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldAnimate = useMotionSafe();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, latest => Math.round(latest));

  React.useEffect(() => {
    if (isInView && shouldAnimate) {
      const controls = animate(motionValue, value, {
        duration: 1.5,
        delay,
        ease: "easeOut"
      });
      return controls.stop;
    } else if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, delay, shouldAnimate, motionValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-sm"
    >
      <Icon size={14} className="text-accent" />
      <span className="font-medium">
        <motion.span>{shouldAnimate ? rounded : value}</motion.span>
        {suffix}
      </span>
      <span className="text-gray-600 dark:text-gray-400 text-xs">{label}</span>
    </motion.div>
  );
};

const SkillsHeatMap = ({ skills }: { skills: string[] }) => {
  const shouldAnimate = useMotionSafe();
  
  return (
    <div className="grid grid-cols-6 gap-1 mt-3">
      {skills.slice(0, 12).map((skill, index) => {
        const intensity = Math.random() * 0.8 + 0.2; // Random intensity for demo
        return (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: intensity, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="w-3 h-3 rounded-sm"
            style={{ 
              backgroundColor: `hsl(var(--accent) / ${intensity})`,
            }}
            title={skill}
          />
        );
      })}
    </div>
  );
};

export const EnhancedExperienceCard = ({ experience, index, side }: EnhancedExperienceCardProps) => {
  const shouldAnimate = useMotionSafe();
  const { filter } = useExperienceFilter();
  const isVisible = !filter || experience.skills.includes(filter);
  const [showDetails, setShowDetails] = useState(index === 0);
  const [isHovered, setIsHovered] = useState(false);
  
  const align = side === 'left'
    ? 'lg:col-span-5 lg:col-start-1 lg:pr-12'
    : 'lg:col-span-5 lg:col-start-7 lg:pl-12';

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.1 
      } 
    },
  };

  const hoverVariants = {
    rest: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { 
      scale: 1.02, 
      rotateX: 2, 
      rotateY: side === 'left' ? -2 : 2,
      transition: { duration: 0.3 }
    }
  };

  // Sample KPIs (in real app, these would come from experience data)
  const sampleKPIs = [
    { icon: TrendingUp, value: 42, suffix: '%', label: 'faster ETL' },
    { icon: Database, value: 4.2, suffix: 'TB', label: 'daily ingestion' },
    { icon: Zap, value: 99.9, suffix: '%', label: 'uptime' },
    { icon: Users, value: 15, suffix: '+', label: 'team size' }
  ].slice(0, 2); // Show 2 KPIs per card

  const companyInitial = experience.company.charAt(0);

  if (!isVisible) return null;

  const handlePointerEnter = () => {
    setIsHovered(true);
    // Micro-sound cue (optional)
    if (shouldAnimate && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      // Uncomment if you add a click.mp3 file to public folder
      // try { new Audio('/click.mp3').play().catch(() => {}); } catch {}
    }
  };

  return (
    <motion.article
      initial={shouldAnimate ? "hidden" : undefined}
      whileInView={shouldAnimate ? "visible" : undefined}
      variants={cardVariants}
      whileHover={shouldAnimate ? "hover" : undefined}
      animate={shouldAnimate ? "rest" : undefined}
      viewport={{ once: true, margin: "-100px" }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      className={cn(
        align,
        "group relative col-span-12 rounded-2xl bg-surface/80 backdrop-blur-sm shadow-lg border border-border/40 p-6 sm:p-8",
        "hover:shadow-xl transition-all duration-300 cursor-pointer z-10"
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Timeline connector dot */}
      <motion.div 
        className={cn(
          "absolute top-8 w-4 h-4 rounded-full bg-accent z-20 shadow-lg",
          side === 'left' 
            ? "right-0 translate-x-1/2 lg:left-auto" 
            : "left-0 -translate-x-1/2 lg:right-auto"
        )}
        animate={isHovered ? { scale: 1.2, boxShadow: "0 0 20px var(--accent)" } : { scale: 1 }}
      />
      
      <div className="flex items-start gap-4">
        {/* Enhanced company badge */}
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 items-center justify-center text-accent font-bold text-lg border border-accent/20"
        >
          {companyInitial}
        </motion.div>
        
        <div className="flex-grow">
          {/* Header with KPIs */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {experience.title}{' '}
              <span className="text-gray-500 dark:text-gray-400 font-normal">@ {experience.company}</span>
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {experience.type} • {experience.duration} • {experience.location}
              {experience.isRemote && <span className="italic"> (Remote)</span>}
            </p>

            {/* KPI Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {sampleKPIs.map((kpi, i) => (
                <KPIBadge 
                  key={i}
                  icon={kpi.icon}
                  value={kpi.value}
                  suffix={kpi.suffix}
                  label={kpi.label}
                  delay={i * 0.2}
                />
              ))}
            </div>
          </div>
          
          {/* Collapsible content */}
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-accent text-sm hover:underline underline-offset-4 focus:outline-none flex items-center gap-1"
            >
              {showDetails ? 'Hide details' : 'Show details'}
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mt-3">
                    {experience.responsibilities.map((responsibility, i) => (
                      <li key={i} className="text-sm">{responsibility}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Tech skills with heat map */}
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <TechChip 
                  key={skill} 
                  label={skill} 
                  activeFilter={filter}
                />
              ))}
            </div>
            <SkillsHeatMap skills={experience.skills} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};
