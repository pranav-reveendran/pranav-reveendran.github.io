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

  // Handle scroll effect and section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Set header style based on scroll position
      if (scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calculate scroll progress for the progress bar
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / windowHeight) * 100;
      setScrollProgress(progress);
      
      // Determine active section
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      let currentActiveSection = 'home'; // Default to home
      
      // If we're near the top, always show home as active
      if (scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentActiveSection = sectionId;
        }
      });
      
      setActiveSection(currentActiveSection);
    };

    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="bg-[#da7756] text-white text-xs px-3 py-1 rounded-full shadow-lg"
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
