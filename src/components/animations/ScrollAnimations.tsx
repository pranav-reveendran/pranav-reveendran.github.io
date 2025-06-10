import React, { useEffect } from 'react';
import { useMotionSafe } from '@/hooks/use-motion-safe';

// Lightweight CSS-based scroll animations instead of GSAP ScrollTrigger
// to prevent forced reflows

const ScrollAnimations: React.FC = () => {
  const shouldAnimate = useMotionSafe();
  
  useEffect(() => {
    if (!shouldAnimate) return;

    // Use CSS-based Intersection Observer instead of GSAP for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    });

    // Observe elements that need scroll animations
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [shouldAnimate]);

  return null; // This component only manages animations, no DOM output
};

export default ScrollAnimations;
