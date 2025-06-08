
import React, { useState, useEffect } from 'react';

interface LiveMetricProps {
  initialValue?: number;
  incrementRate?: number;
  formatter?: (value: number) => string;
}

export default function LiveMetric({ 
  initialValue = 10000,
  incrementRate = 17, // rows per second
  formatter = (value: number) => value.toLocaleString()
}: LiveMetricProps) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Simulate data processing in real time
    const interval = setInterval(() => {
      setValue(prev => prev + incrementRate);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [incrementRate]);
  
  return (
    <span className="font-mono text-accent" aria-live="polite">
      {formatter(value)}
    </span>
  );
}
