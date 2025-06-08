
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionSafe } from '@/hooks/use-motion-safe';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations: React.FC = () => {
  const shouldAnimate = useMotionSafe();
  
  // References to animated elements
  const projectCardsRef = useRef<HTMLDivElement>(null);
  const sectionHeadingsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!shouldAnimate) return;
    
    // Create animation for project cards
    const projectCards = projectCardsRef.current?.querySelectorAll('.content-card');
    if (projectCards?.length) {
      projectCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: index * 0.1,
        });
      });
    }
    
    // Create animation for section headings
    const headings = sectionHeadingsRef.current?.querySelectorAll('.section-heading');
    if (headings?.length) {
      headings.forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.5
        });
        
        // Animate the underline separately
        gsap.from(heading.querySelector('::after'), {
          scrollTrigger: {
            trigger: heading,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.7,
          delay: 0.2
        });
      });
    }
    
    // Clean up all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [shouldAnimate]);

  return (
    <>
      <div ref={projectCardsRef} className="gsap-project-cards">
        {/* This is a wrapper for project cards, not rendered directly */}
      </div>
      <div ref={sectionHeadingsRef} className="gsap-section-headings">
        {/* This is a wrapper for section headings, not rendered directly */}
      </div>
    </>
  );
};

export default ScrollAnimations;
