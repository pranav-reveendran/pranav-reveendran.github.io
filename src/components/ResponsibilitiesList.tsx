
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { motion } from 'framer-motion';

interface ResponsibilitiesListProps {
  responsibilities: string[];
}

export default function ResponsibilitiesList({ responsibilities }: ResponsibilitiesListProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const counter = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
      <CollapsibleTrigger className="text-accent text-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
        {isOpen ? 'Hide details' : 'Show details'}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2">
        <div className="flex items-center mb-2">
          <motion.span
            variants={counter}
            initial="hidden"
            animate={isOpen ? "show" : "hidden"}
            className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-accent/10 text-accent text-xs mr-2"
          >
            {responsibilities.length}
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Key responsibilities</span>
        </div>
        
        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="text-sm">{responsibility}</li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
