import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Skills data with colors matching our theme
const skills = [
  { name: 'Spark', pct: 32, color: 'var(--accent-2)' },    // Using terracotta accent-2
  { name: 'Kafka', pct: 26, color: '#231F20' },           
  { name: 'AWS', pct: 22, color: '#FF9900' },              // AWS orange
  { name: 'Python', pct: 20, color: 'var(--accent)' },     // Using blue accent
];

export default function SkillRing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  
  const R = 110;                          // Radius
  const stroke = 10;                      // Thickness of ring
  const C = 2 * Math.PI * R;              // Circumference formula
  
  let offset = 0;                         // Running sum for stacked arcs
  
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
      <svg 
        ref={ref} 
        width="100%" 
        height="100%" 
        className="absolute inset-0"
        style={{ zIndex: 5 }}
      >
        {skills.map(({ name, pct, color }) => {
          const len = (pct / 100) * C;
          const dashArray = `${len} ${C - len}`;
          const dashOffset = -offset;
          offset += len;
          
          return (
            <g key={name}>
              {/* Tooltip on hover */}
              <title>{`${name}: ${pct}%`}</title>
              
              <motion.circle
                r={R}
                cx="50%"
                cy="50%"
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={dashArray}
                strokeDashoffset={inView ? dashOffset : C}  // Animate in
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
