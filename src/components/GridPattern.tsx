
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function GridPattern() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-[0.04]' : 'opacity-[0.03]'}`}>
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M0 0.5H32M0.5 0V32" 
                fill="none" 
                stroke="currentColor" 
                strokeOpacity="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
}
