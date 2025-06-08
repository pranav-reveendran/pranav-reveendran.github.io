
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ExperienceFilterContextType {
  filter: string | null;
  toggle: (skill: string) => void;
}

const ExperienceFilterContext = createContext<ExperienceFilterContextType>({
  filter: null,
  toggle: () => {},
});

export function ExperienceFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<string | null>(null);
  
  const toggle = (skill: string) => {
    setFilter((current) => current === skill ? null : skill);
  };

  return (
    <ExperienceFilterContext.Provider value={{ filter, toggle }}>
      {children}
    </ExperienceFilterContext.Provider>
  );
}

export const useExperienceFilter = () => useContext(ExperienceFilterContext);
