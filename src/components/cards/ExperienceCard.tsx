
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { WorkExperience } from '@/types/experience';
import { useExperienceFilter } from '@/context/ExperienceFilter';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import TechChip from '@/components/TechChip';

interface ExperienceCardProps {
  experience: WorkExperience;
  index: number;
  side: 'left' | 'right';
}

export const ExperienceCard = ({ experience, index, side }: ExperienceCardProps) => {
  const shouldAnimate = useMotionSafe();
  const { filter } = useExperienceFilter();
  const isVisible = !filter || experience.skills.includes(filter);
  const [showDetails, setShowDetails] = useState(index === 0);
  
  // Position the card on left or right side
  const align = side === 'left'
    ? 'lg:col-span-5 lg:col-start-1 lg:pr-12'
    : 'lg:col-span-5 lg:col-start-7 lg:pl-12';

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.2, ease: "backOut" } }
  };
  
  // Format details text
  const detailsText = showDetails ? 'Hide details' : 'Show details';
  
  // Company initial for badge
  const companyInitial = experience.company.charAt(0);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.article
      initial={shouldAnimate ? "hidden" : undefined}
      whileInView={shouldAnimate ? "visible" : undefined}
      exit="exit"
      variants={cardVariants}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        align,
        "group relative col-span-12 rounded-2xl bg-surface shadow-sm border border-border/40 p-6 sm:p-8",
        "hover:shadow-md transition-all duration-300 interactive"
      )}
    >
      {/* Timeline connector dot */}
      <div 
        className={cn(
          "absolute top-8 w-3 h-3 rounded-full bg-accent z-10",
          side === 'left' 
            ? "right-0 translate-x-1/2 lg:left-auto" 
            : "left-0 -translate-x-1/2 lg:right-auto"
        )}
      />
      
      <div className="flex items-start gap-4">
        {/* Company badge */}
        <motion.div
          variants={badgeVariants}
          className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 items-center justify-center text-accent font-semibold"
        >
          {companyInitial}
        </motion.div>
        
        <div className="flex-grow">
          {/* Job title and company */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {experience.title}{' '}
              <span className="text-gray-500 dark:text-gray-400 font-normal">@ {experience.company}</span>
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {experience.type} • {experience.duration} • {experience.location}
              {experience.isRemote && <span className="italic"> (Remote)</span>}
            </p>
          </div>
          
          {/* Collapsible content */}
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-accent text-sm hover:underline underline-offset-4 focus:outline-none flex items-center gap-1"
              aria-expanded={showDetails}
              aria-label={`${showDetails ? 'Hide' : 'Show'} details for ${experience.title} at ${experience.company}`}
            >
              {detailsText}
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
          
          {/* Tech skills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {experience.skills.map((skill) => (
              <TechChip 
                key={skill} 
                label={skill} 
                activeFilter={filter}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
