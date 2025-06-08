
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export default function Sparkline({ 
  data = [],
  width = 100, 
  height = 20,
  color = 'currentColor',
  strokeWidth = 1.5
}: SparklineProps) {
  const [sparkData, setSparkData] = useState(data.length ? data : generateRandomData());
  
  function generateRandomData(length = 24): number[] {
    return Array.from({ length }, () => Math.random() * 0.5 + 0.5);
  }
  
  useEffect(() => {
    if (data.length) {
      setSparkData(data);
      return;
    }
    
    // Update with new random data every 5s if no data provided
    const interval = setInterval(() => {
      const newData = [...sparkData.slice(1), Math.random() * 0.5 + 0.5];
      setSparkData(newData);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [data, sparkData]);
  
  // Create SVG path from data
  const minValue = Math.min(...sparkData);
  const maxValue = Math.max(...sparkData);
  const range = maxValue - minValue || 1;
  
  const points = sparkData.map((value, i) => {
    const x = (i / (sparkData.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  });
  
  return (
    <motion.svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
