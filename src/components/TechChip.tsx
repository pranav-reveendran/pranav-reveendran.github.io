
import React from 'react';
import { cn } from '@/lib/utils';
import { useExperienceFilter } from '@/context/ExperienceFilter';
import { useTechHighlight } from '@/context/TechHighlightContext';

interface TechChipProps {
  label: string;
  activeFilter: string | null;
}

// Map tech labels to their context names for highlighting
const TECH_MAPPING: Record<string, string> = {
  'Spark': 'spark',
  'Kafka': 'kafka',
  'AWS': 'aws',
  'Python': 'python',
  'PostgreSQL': 'postgres',
  // Add more mappings as needed
};

export default function TechChip({ label }: TechChipProps) {
  const { filter, toggle } = useExperienceFilter();
  const { highlightedTech, setHighlightedTech } = useTechHighlight();
  const active = filter === label;
  
  // Get the normalized tech name for highlighting
  const techName = TECH_MAPPING[label] || label.toLowerCase();
  const isHighlighted = highlightedTech === techName;
  
  return (
    <button
      onClick={() => toggle(label)}
      onMouseEnter={() => setHighlightedTech(techName)}
      onMouseLeave={() => setHighlightedTech(null)}
      className={cn(
        'px-3 py-1 rounded-full text-xs border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        active || isHighlighted
          ? 'bg-accent text-white border-accent shadow-md transform scale-105'
          : 'bg-surface/70 border-border text-gray-600 dark:text-gray-300 hover:border-accent/50 hover:bg-accent/10'
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
