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
import { ThemeProvider } from '@/context/ThemeContext';

const Index = () => {
  const shouldAnimate = useMotionSafe();
  
  useEffect(() => {
    // Ensure body fills screen and has proper styling
    document.body.style.minHeight = '100vh';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflow = 'overlay'; // Better scrollbar behavior
    
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      document.body.style.minHeight = '';
      document.body.style.overflowX = '';
      document.body.style.overflow = '';
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [shouldAnimate]);

  return (
    <ThemeProvider>
      <TechHighlightProvider>
        <div className="App">
          {/* Skip Link for Accessibility */}
          <a 
            href="#main-content" 
            className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[color:var(--color-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:no-underline"
          >
            Skip to main content
          </a>
          
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
              <main id="main-content" role="main">
                <section className="section" aria-labelledby="hero-heading">
                  <HeroSection />
                </section>
              
                {/* Apply content-visibility to below-fold sections */}
                <section className="content-visibility-auto section" aria-labelledby="about-heading">
                  <AboutSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="experience-heading">
                  <ExperienceSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="education-heading">
                  <EducationSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="projects-heading">
                  <ProjectsSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="skills-heading">
                  <SkillsSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="blog-heading">
                  <BlogSection />
                </section>
                
                <section className="content-visibility-auto section" aria-labelledby="contact-heading">
                  <ContactSection />
                </section>
              
                <Footer />
                <VisitorCounter />
              </main>
            </div>
            
            {shouldAnimate && <ScrollAnimations />}
          </div>
        </div>
      </TechHighlightProvider>
    </ThemeProvider>
  );
};

export default Index;
