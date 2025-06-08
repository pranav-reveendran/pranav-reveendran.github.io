import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  variant?: 'primary' | 'alternate' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = '', 
  variant = 'primary',
  padding = 'lg'
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'alternate':
        return 'bg-[#ffffff]';
      case 'dark':
        return 'bg-[#e6e4f1]';
      default:
        return 'bg-[#fafaf9]';
    }
  };

  const getPadding = () => {
    switch (padding) {
      case 'sm':
        return 'py-8 px-4 sm:px-6 lg:px-8';
      case 'md':
        return 'py-12 px-4 sm:px-6 lg:px-8';
      case 'lg':
        return 'py-16 px-4 sm:px-6 lg:px-8';
      case 'xl':
        return 'py-24 px-4 sm:px-6 lg:px-8';
      default:
        return 'py-16 px-4 sm:px-6 lg:px-8';
    }
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        getBackgroundColor(),
        getPadding(),
        'text-[#41376c]', // Default text color (Accent-700)
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      
      {/* Optional Kintsugi divider */}
      <div className="kintsugi-divider opacity-30" />
    </section>
  );
};

export default Section; 