import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Award, FolderOpen, BookOpen, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeSelector from './ThemeSelector';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Cache section positions to prevent forced reflows
  const [sectionPositions, setSectionPositions] = useState<{[key: string]: {top: number, bottom: number}}>({});
  
  // Handle scroll effect and section tracking
  useEffect(() => {
    // Cache section positions once
    const updateSectionPositions = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const positions: {[key: string]: {top: number, bottom: number}} = {};
      
      sections.forEach(section => {
        const sectionId = section.getAttribute('id') || '';
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY - 120;
        const bottom = top + rect.height;
        positions[sectionId] = { top, bottom };
      });
      
      setSectionPositions(positions);
    };
    
    // Initial calculation
    updateSectionPositions();
    
    // Recalculate on resize only
    window.addEventListener('resize', updateSectionPositions);
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Set header style based on scroll position
      setIsScrolled(scrollY > 10);
      
      // Calculate scroll progress for the progress bar (cached document height)
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
      
    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionPositions);
    };
  }, []); // Remove sectionPositions dependency to prevent infinite loop

  // Separate effect for active section detection
  useEffect(() => {
    const handleActiveSection = () => {
      const scrollY = window.scrollY;
      
      // Determine active section using cached positions
      let currentActiveSection = 'home';
      
      if (scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      // Use cached positions instead of reading DOM
      Object.entries(sectionPositions).forEach(([sectionId, position]) => {
        if (scrollY >= position.top && scrollY < position.bottom) {
          currentActiveSection = sectionId;
        }
      });
      
      setActiveSection(currentActiveSection);
    };

    // Only set up scroll listener if we have cached positions
    if (Object.keys(sectionPositions).length > 0) {
      handleActiveSection();
      window.addEventListener('scroll', handleActiveSection);
      return () => window.removeEventListener('scroll', handleActiveSection);
    }
  }, [sectionPositions]); // This effect depends on sectionPositions but doesn't modify it

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // All navigation items in one array
  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Skills', href: '#skills', icon: Award },
    { name: 'Blogs', href: '#blogs', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-[1000] transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
      
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12',
          isScrolled ? 'bg-[#ffffff] shadow-lg border-b border-[#edcdbf]' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <a 
            href="#home" 
            className="text-2xl font-display font-bold text-[#2d264a] hover:text-[#6c5dac] transition-colors p-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={cn(
                  "kintsugi-nav-item relative inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-300",
                  activeSection === item.href.slice(1)
                    ? "text-[#6c5dac] kintsugi-text-gold" 
                    : "text-[#41376c] hover:text-[#6c5dac] hover:kintsugi-text-gold"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Theme toggle */}
          <div className="flex items-center gap-4">
            {/* Available status badge */}
            <motion.div
              className="bg-[color:var(--color-accent)] text-white text-xs px-3 py-1 rounded-full shadow-lg"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Available
            </motion.div>
            
            <ThemeSelector />
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-[#2d264a] hover:text-[#6c5dac] transition-colors p-2 min-h-11 min-w-11" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#ffffff] p-6 shadow-lg border-b border-[#edcdbf] animate-slide-in-right">
              <ul className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={cn(
                        "nav-link block font-medium flex items-center gap-2 text-[#41376c] py-2 min-h-11 px-4 rounded-lg transition-all duration-200",
                        activeSection === item.href.substring(1) && "bg-[#6c5dac] text-white"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
