import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import VisitorCounter from '@/components/VisitorCounter';
import ScrollAnimations from '@/components/animations/ScrollAnimations';
import ConstellationBackground from '@/components/ConstellationBackground';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { TechHighlightProvider } from '@/context/TechHighlightContext';

const Index = () => {
  const shouldAnimate = useMotionSafe();
  
  useEffect(() => {
    // Ensure body fills screen and has proper styling
    document.body.style.minHeight = '100vh';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflow = 'overlay'; // Better scrollbar behavior
    
    return () => {
      document.body.style.minHeight = '';
      document.body.style.overflowX = '';
      document.body.style.overflow = '';
    };
  }, [shouldAnimate]);

  return (
    <TechHighlightProvider>
      <div 
        className="min-h-screen relative overflow-hidden bg-white text-gray-900"
      >
        {/* Fixed background layer with standard opacity */}
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
          {/* Standard background color with opacity */}
          <div 
            className="absolute inset-0 bg-white opacity-95" 
          />
          {/* Three.js background with standard opacity */}
          <div className="absolute inset-0" style={{ opacity: 0.03 }}>
            <ThreeBackground />
          </div>
        </div>
        
        {/* Constellation particle network */}
        {shouldAnimate && <ConstellationBackground />}
        
        {/* Main content */}
        <div className="relative z-[5]">
          <Navbar />
          <section className="section">
            <HeroSection />
          </section>
          
          {/* Apply content-visibility to below-fold sections */}
          <section className="content-visibility-auto section">
            <AboutSection />
          </section>
          
          <section className="content-visibility-auto section">
            <ExperienceSection />
          </section>
          
          <section className="content-visibility-auto section">
            <EducationSection />
          </section>
          
          <section className="content-visibility-auto section">
            <ProjectsSection />
          </section>
          
          <section className="content-visibility-auto section">
            <SkillsSection />
          </section>
          
          <section className="content-visibility-auto section">
            <BlogSection />
          </section>
          
          <section className="content-visibility-auto section">
            <ContactSection />
          </section>
          
          <Footer />
          <VisitorCounter />
        </div>
        
        {shouldAnimate && <ScrollAnimations />}
      </div>
    </TechHighlightProvider>
  );
};

export default Index;
