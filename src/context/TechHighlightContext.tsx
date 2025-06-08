
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TechHighlightContextProps {
  highlightedTech: string | null;
  setHighlightedTech: (tech: string | null) => void;
}

const TechHighlightContext = createContext<TechHighlightContextProps>({
  highlightedTech: null,
  setHighlightedTech: () => {},
});

export const useTechHighlight = () => useContext(TechHighlightContext);

interface TechHighlightProviderProps {
  children: ReactNode;
}

export function TechHighlightProvider({ children }: TechHighlightProviderProps) {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null);
  
  return (
    <TechHighlightContext.Provider value={{ highlightedTech, setHighlightedTech }}>
      {children}
    </TechHighlightContext.Provider>
  );
}
