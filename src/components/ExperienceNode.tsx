
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import TechChip from '@/components/TechChip';
import { WorkExperience } from '@/types/experience';
import { useExperienceFilter } from '@/context/ExperienceFilter';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { cn } from '@/lib/utils';

interface ExperienceNodeProps {
  experience: WorkExperience;
  side: 'left' | 'right';
  index: number;
}

export default function ExperienceNode({ experience, side, index }: ExperienceNodeProps) {
  const shouldAnimate = useMotionSafe();
  const { filter } = useExperienceFilter();
  const isHidden = filter && !experience.skills.includes(filter);

  const align = side === 'left' 
    ? 'lg:col-span-6 lg:col-start-1' 
    : 'lg:col-span-6 lg:col-start-7';

  const MotionWrapper = shouldAnimate ? motion.article : 'article';
  
  const motionProps = shouldAnimate ? {
    initial: { y: 40, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' },
    viewport: { once: true, margin: '-100px' }
  } : {};

  if (isHidden) {
    return null;
  }

  return (
    <MotionWrapper
      {...motionProps}
      className={cn(
        'relative col-span-12 p-6 sm:p-8 rounded-xl bg-surface/60 backdrop-blur border border-border/40 shadow-md',
        align,
        isHidden ? 'hidden' : 'block'
      )}
    >
      {/* Connector dot */}
      <div 
        className={cn(
          'absolute top-8 w-3 h-3 rounded-full bg-accent z-10',
          side === 'left' 
            ? 'right-0 translate-x-1/2 lg:left-auto' 
            : 'left-0 -translate-x-1/2 lg:right-auto'
        )}
      />

      <h3 className="text-xl font-medium">
        {experience.title}{' '}
        <span className="text-gray-500 dark:text-gray-400 font-normal">@ {experience.company}</span>
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {experience.type} • {experience.duration} • {experience.location}
        {experience.isRemote && <span className="italic"> (Remote)</span>}
      </p>

      {/* Collapsible responsibilities */}
      <Disclosure defaultOpen={index === 0}>
        {({ open }) => (
          <>
            <Disclosure.Button 
              className="mt-4 text-accent text-sm hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {open ? 'Hide details' : 'Show details'}
            </Disclosure.Button>
            <Disclosure.Panel className="mt-3">
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                {experience.responsibilities.map((responsibility, i) => (
                  <li key={i} className="text-sm">{responsibility}</li>
                ))}
              </ul>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-5">
        {experience.skills.map(skill => (
          <TechChip key={skill} label={skill} activeFilter={filter} />
        ))}
      </div>
    </MotionWrapper>
  );
}
