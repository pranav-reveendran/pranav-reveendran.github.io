import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimationControls, useInView } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Users, Award, ChevronRight, Briefcase, Star, Code2, Database, BarChart3, Search, Filter, Building2, Clock, MapPinIcon, Zap, Target, Trophy, Sparkles, Code } from 'lucide-react';
import { experienceData } from '@/data/experience';
import { useMotionSafe } from '@/hooks/use-motion-safe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Company logos mapping - using reliable sources
const companyLogos = {
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png",
  "San José State University": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/San_Jose_State_Spartans_logo.svg/100px-San_Jose_State_Spartans_logo.svg.png",
  "Spartan Analytics": "https://cdn-icons-png.flaticon.com/128/3281/3281289.png",
  "Epsilon": "https://cdn.worldvectorlogo.com/logos/epsilon-1.svg",
  "Codenex Solutions LLP": "https://cdn-icons-png.flaticon.com/128/2920/2920277.png",
  "EY": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EY_logo_2019.svg/100px-EY_logo_2019.svg.png"
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }: { value: string; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  
  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
      let start = 0;
      const increment = numericValue / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);
  
  return (
    <div ref={ref}>
      {count}{value.includes('%') ? '%' : value.includes('TB') ? 'TB' : value.includes('+') ? '+' : ''}{suffix}
    </div>
  );
};

// Modern floating elements
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/5 to-accent/10 rounded-full blur-3xl"
    />
    
    <motion.div
      animate={{
        x: [0, -20, 0],
        y: [0, 30, 0],
        scale: [1, 0.95, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 1
      }}
      className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-accent/8 to-accent/15 rounded-full blur-3xl"
    />
  </div>
);

// Career Progress Component - Fixed layout for same row
const CareerProgress = ({ experiences }: { experiences: any[] }) => {
  const totalYears = experiences.reduce((acc, exp) => {
    const duration = exp.duration.toLowerCase();
    if (duration.includes('year')) {
      const years = parseInt(duration.match(/(\d+)/)?.[0] || '0');
      const months = duration.includes('month') ? parseInt(duration.match(/(\d+)\s*month/)?.[0] || '0') : 0;
      return acc + years + (months / 12);
    } else if (duration.includes('month')) {
      const months = parseInt(duration.match(/(\d+)/)?.[0] || '0');
      return acc + (months / 12);
    }
    return acc + 0.5;
  }, 0);

  const companies = [...new Set(experiences.map(exp => exp.company))].length;
  const skills = [...new Set(experiences.flatMap(exp => exp.skills))].length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative overflow-hidden"
    >
      {/* Modern glass morphism background */}
      <div className="absolute inset-0 bg-hero-50/80 backdrop-blur-xl rounded-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-cta-50/20 via-transparent to-accent-100/10 rounded-2xl" />
      
      {/* Enhanced Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-cta-200/40 shadow-lg" />
      
      <div className="relative p-8">
        {/* Stats in same row with consistent design */}
        <div className="flex items-center justify-between gap-8">
          {/* Years Experience */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={Math.ceil(totalYears).toString()} />+
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Years Experience</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalYears / 8) * 100, 100)}%` }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-16 bg-cta-300/50 shadow-sm" />
          
          {/* Companies */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={companies.toString()} />
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Companies</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(companies / 6) * 100}%` }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Separator */}
          <div className="w-px h-16 bg-cta-300/50 shadow-sm" />
          
          {/* Skills */}
          <div className="flex-1 text-center group">
            <motion.div 
              className="relative mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl font-bold text-cta-600 mb-1 font-heading">
                <AnimatedCounter value={skills.toString()} />+
              </div>
              <div className="text-sm font-medium text-cta-700 uppercase tracking-wider font-primary">Skills Mastered</div>
            </motion.div>
            <div className="w-full bg-cta-100/30 rounded-full h-2 overflow-hidden border border-cta-200/40">
              <motion.div 
                className="h-full bg-gradient-to-r from-cta-400 to-cta-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((skills / 30) * 100, 100)}%` }}
                transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const shouldAnimate = useMotionSafe();
  
  // Enhanced experience data
  const enhancedExperiences = experienceData.map((exp, index) => ({
    ...exp,
    id: index,
    highlights: exp.responsibilities?.slice(0, 2) || [],
    logo: companyLogos[exp.company as keyof typeof companyLogos] || null,
    metrics: [
      { icon: TrendingUp, value: '42%', label: 'Growth', color: 'text-emerald-500' },
      { icon: Database, value: '4.2TB', label: 'Data', color: 'text-blue-500' },
      { icon: Users, value: '15+', label: 'Team', color: 'text-purple-500' },
    ],
    color: index % 4 === 0 ? 'from-blue-500 via-blue-600 to-purple-600' : 
           index % 4 === 1 ? 'from-emerald-500 via-teal-500 to-cyan-600' : 
           index % 4 === 2 ? 'from-orange-500 via-red-500 to-pink-600' : 'from-purple-500 via-pink-500 to-rose-600',
    experienceLevel: exp.type === 'Internship' ? 35 : exp.type === 'Part-time' ? 65 : 95
  }));

  const [selectedExperienceId, setSelectedExperienceId] = useState(enhancedExperiences[0]?.id || 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'company' | 'role' | 'type'>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Get unique companies and types for filters
  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(experienceData.map(exp => exp.company))];
    return uniqueCompanies;
  }, []);

  const types = useMemo(() => {
    const uniqueTypes = [...new Set(experienceData.map(exp => exp.type))];
    return uniqueTypes;
  }, []);

  // Filtered experiences
  const filteredExperiences = useMemo(() => {
    let filtered = enhancedExperiences;

    if (searchQuery) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        exp.responsibilities?.some(resp => resp.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(exp => exp.company === selectedCompany);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(exp => exp.type === selectedType);
    }

    return filtered;
  }, [enhancedExperiences, searchQuery, selectedCompany, selectedType]);

  useEffect(() => {
    if (filteredExperiences.length > 0) {
      // Only reset selection if current selection is not in filtered experiences
      const currentExists = filteredExperiences.some(exp => exp.id === selectedExperienceId);
      if (!currentExists) {
        setSelectedExperienceId(filteredExperiences[0].id);
      }
    }
  }, [filteredExperiences, selectedExperienceId]);

  // GSAP animations
  useEffect(() => {
    if (!shouldAnimate) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out"
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [shouldAnimate, filteredExperiences]);

  // Get current selected experience - simpler approach
  const currentSelectedExperience = filteredExperiences.find(exp => exp.id === selectedExperienceId) || filteredExperiences[0];
  const selectedExperienceIndex = filteredExperiences.findIndex(exp => exp.id === selectedExperienceId);

  // Keyboard navigation for experience timeline
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle arrow keys when focused on the experience section
      if (event.target === document.body) {
        const currentIndex = selectedExperienceIndex >= 0 ? selectedExperienceIndex : 0;
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            if (currentIndex < filteredExperiences.length - 1) {
              setSelectedExperienceId(filteredExperiences[currentIndex + 1].id);
            }
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (currentIndex > 0) {
              setSelectedExperienceId(filteredExperiences[currentIndex - 1].id);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredExperiences, selectedExperienceId, selectedExperienceIndex]);

  // Auto-scroll to selected experience
  useEffect(() => {
    if (cardsRef.current && selectedExperienceIndex >= 0 && selectedExperienceIndex < filteredExperiences.length) {
      const cards = cardsRef.current.children;
      const selectedCard = cards[selectedExperienceIndex] as HTMLElement;
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [selectedExperienceIndex, filteredExperiences.length]);

  const CompactExperienceCard = ({ experience, index, isActive, onClick }: any) => (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldAnimate ? index * 0.05 : 0, duration: shouldAnimate ? 0.4 : 0 }}
      whileHover={{ 
        y: -2, 
        transition: { duration: 0.2, type: "spring", stiffness: 400 } 
      }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-[1.01]' : ''} group flex-shrink-0`}
      style={{ width: '100%' }}
    >
      <Card className={`relative overflow-hidden backdrop-blur-sm transition-all duration-300 flex flex-col ${
        isActive 
          ? 'bg-white ring-2 ring-[#0066cc]/40 shadow-2xl shadow-[#0066cc]/10 border-[#0066cc]/60 scale-[1.02]' 
          : 'bg-white border-[#e5e5e5] hover:border-[#0066cc]/30 hover:shadow-xl hover:shadow-[#0066cc]/5 hover:scale-[1.01]'
      } border-2 rounded-2xl cursor-pointer`} style={{ height: '300px', minHeight: '300px', maxHeight: '300px' }}>
        
        {/* Colorblind-friendly header accent */}
        <div className={`h-1 bg-gradient-to-r ${
          isActive 
            ? 'from-[#0066cc] via-[#004499] to-[#0066cc]' 
            : 'from-[#0066cc] via-[#004499] to-[#0066cc]'
        }`} />
        
        {/* Pattern indicator for accessibility */}
        <div className="absolute top-4 right-4 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#0066cc]" />
          <div className="w-1 h-2 rounded-full bg-[#008844]" />
        </div>
        
        <CardContent className="flex-1 flex flex-col overflow-hidden p-5 gap-3">
          {/* Company info with clean design */}
          <div className="flex-shrink-0 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {experience.logo ? (
                  <div className="relative">
                    <img 
                      src={experience.logo} 
                      alt={`${experience.company} logo`}
                      className="w-10 h-10 rounded-lg object-contain bg-hero-50 p-1.5 border border-cta-200/40 shadow-sm"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        const fallback = img.nextElementSibling as HTMLElement;
                        img.style.display = 'none';
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  </div>
                ) : null}
                <div className={`w-10 h-10 rounded-lg bg-cta-100/40 border border-cta-200/40 ${experience.logo ? 'hidden' : 'flex'} items-center justify-center shadow-sm`}>
                  <Building2 className="w-5 h-5 text-cta-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-cta-600 truncate font-heading">{experience.company}</p>
                <Badge variant="outline" className="text-sm bg-cta-50 border border-cta-200/50 text-cta-700 font-primary px-2 py-1">
                  {experience.type}
                </Badge>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-cta-900 line-clamp-2 leading-snug font-heading">
              {experience.title}
            </h3>
          </div>



          {/* Meta info */}
          <div className="flex items-center gap-3 text-sm text-cta-700 font-primary">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-hero-50 border border-cta-200/40">
              <Clock className="w-4 h-4 text-cta-400" />
              <span className="font-medium text-sm">{experience.duration}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-hero-50 border border-cta-200/40">
              <MapPinIcon className="w-4 h-4 text-cta-400" />
              <span className="truncate max-w-[90px] font-medium text-sm">{experience.location}</span>
            </div>
          </div>

          {/* Skills Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-accent-600" />
                <h4 className="text-sm font-bold text-cta-900 font-heading">Skills</h4>
              </div>
              <span className="text-sm text-cta-600 font-medium">{experience.skills.length} technologies</span>
            </div>
            
            {/* Skills Display */}
            <div className="flex flex-wrap gap-2">
              {experience.skills.slice(0, 5).map((skill: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-sm px-3 py-1 bg-cta-50/80 text-cta-700 border border-cta-200/50 font-primary">
                  {skill}
                </Badge>
              ))}
              {experience.skills.length > 5 && (
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-accent-50/80 text-accent-700 border border-accent-200/50 font-primary">
                  +{experience.skills.length - 5}
                </Badge>
              )}
            </div>
          </div>

          {/* Modern action indicator */}
          <div className="flex justify-end">
            <motion.div
              animate={{ 
                rotate: isActive ? 90 : 0,
                scale: isActive ? 1.1 : 1
              }}
              transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-cta-100 to-cta-200/60 border border-cta-300/50 flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-cta-600" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const ExperienceDetail = ({ experience }: { experience: any }) => (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="w-full flex flex-col space-y-6">
        {/* Header with company branding */}
        <div className="mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="relative">
              {experience.logo ? (
                <div className="relative">
                  <img 
                    src={experience.logo} 
                    alt={`${experience.company} logo`}
                    className="w-12 h-12 rounded-xl object-contain bg-hero-50 p-2 border border-cta-200/40 shadow-md"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      const fallback = img.nextElementSibling as HTMLElement;
                      img.style.display = 'none';
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                  />
                </div>
              ) : null}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cta-100 to-cta-200/60 border border-cta-300/50 ${experience.logo ? 'hidden' : 'flex'} items-center justify-center shadow-md`}>
                <Building2 className="w-6 h-6 text-cta-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-cta-600 mb-1 font-heading">{experience.company}</h2>
              <h1 className="text-xl font-bold text-cta-900 mb-2 leading-tight font-heading">
                {experience.title}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-accent-50 text-accent-700 border border-accent-200/50 font-primary">
                  {experience.type}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-cta-700 font-body">
                  <Calendar className="w-4 h-4 text-cta-500" />
                  <span className="font-medium">{experience.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Responsibilities - Main Focus */}
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cta-100 to-cta-200/60 flex items-center justify-center shadow-md">
                <Target className="w-4 h-4 text-cta-600" />
              </div>
              <h3 className="text-lg font-bold text-cta-900 font-heading">Key Responsibilities</h3>
            </div>
            <p className="text-sm text-cta-700 font-body">Detailed overview of work performed and achievements in this role</p>
          </div>

          {/* Responsibilities List */}
          <div className="space-y-4">
            {experience.responsibilities?.map((responsibility: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="group"
              >
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-hero-50 to-cta-50/30 border border-cta-200/30 hover:shadow-lg hover:border-cta-300/50 transition-all duration-300">
                  <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-cta-100 to-cta-200/60 border border-cta-300/50 flex-shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-xs font-bold text-cta-600 font-heading">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-cta-800 leading-relaxed font-body group-hover:text-cta-900 transition-colors">
                      {responsibility}
                    </p>
                  </div>
                </div>
              </motion.div>
            )) || (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cta-100 to-cta-200/60 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Target className="w-6 h-6 text-cta-600" />
                </div>
                <p className="text-cta-700 font-body">No specific responsibilities listed for this role.</p>
              </div>
            )}
          </div>

          {/* Role Summary */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-cta-50/40 to-accent-50/40 border border-cta-200/40">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <Award className="w-5 h-5 text-cta-600" />
                <h4 className="text-base font-bold text-cta-900 font-heading">Role Overview</h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-cta-800 mb-1 font-heading">{experience.responsibilities?.length || 0}</div>
                  <p className="text-xs text-cta-600 font-body">Responsibilities</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-800 mb-1 font-heading">{experience.duration}</div>
                  <p className="text-xs text-accent-600 font-body">Duration</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-800 mb-1 font-heading">{experience.location}</div>
                  <p className="text-xs text-secondary-600 font-body">Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} className="min-h-screen bg-white pt-16 pb-16 relative overflow-hidden" id="experience">
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
              <span className="text-[#0066cc] relative">
                EXPERIENCE
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#0066cc] to-[#004499] rounded-full opacity-60" />
              </span>
            </h1>
            
            {/* Professional Experience Badge */}
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full border-2 border-[#0066cc]/30 bg-[#0066cc]/10 backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-[#0066cc]" />
              <span className="text-sm font-semibold text-[#0066cc] uppercase tracking-wider">
                4+ YOE PROFESSIONAL EXPERIENCE
              </span>
              <Star className="w-4 h-4 text-[#0066cc]" />
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {experienceData.length} of {experienceData.length} professional experiences across {companies.length} industry-leading companies
            </p>
          </div>

          {/* Career Progress - Compact */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-[#0066cc]/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#0066cc]" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Career Progress</h3>
                <p className="text-sm text-gray-600">Professional growth metrics</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200/60 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#0066cc]" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">4+</div>
                <p className="text-sm text-gray-600 font-medium">Years Experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-green-100 to-green-200/60 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{companies.length}</div>
                <p className="text-sm text-gray-600 font-medium">Companies</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200/60 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">35</div>
                <p className="text-sm text-gray-600 font-medium">Skills Mastered</p>
              </div>
            </div>
          </div>

          {/* Search & Filter Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-[#0066cc]" />
              <h3 className="text-lg font-semibold text-gray-900">Search & Filter Experiences</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by role, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus:border-[#0066cc] bg-white"
                />
              </div>
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-full sm:w-56 h-12 border-gray-200">
                  <SelectValue placeholder="All Companies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map(company => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-44 h-12 border-gray-200">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Quick filter results */}
            {(searchQuery || selectedCompany !== 'all' || selectedType !== 'all') && (
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <span>Showing {filteredExperiences.length} of {experienceData.length} experiences</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCompany('all');
                    setSelectedType('all');
                  }}
                  className="text-[#0066cc] hover:text-[#004499] h-8 px-3 text-xs"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Experience Timeline Layout */}
        <div className="relative" style={{ height: '1000px' }}>
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Experience Timeline */}
            <div className="h-full">
              <div className="relative h-full rounded-2xl border-2 border-[#0066cc]/20 bg-white backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Blue top stripe for colorblind accessibility */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066cc] to-[#004499]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#e6f2ff]/10 via-transparent to-[#e6f2ff]/10" />
                
                {/* Panel Header */}
                <div className="relative border-b border-[#0066cc]/20" style={{ padding: '16px' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e6f2ff] flex items-center justify-center border border-[#0066cc]/20">
                        <Building2 className="w-4 h-4 text-[#0066cc]" />
                      </div>
                      <h3 className="font-semibold text-[#1a1a1a] font-heading text-lg">
                        Experience Timeline
                      </h3>
                    </div>
                    <div className="text-xs bg-[#0066cc] text-white px-2 py-1 rounded-full font-medium">
                      {filteredExperiences.length}
                    </div>
                  </div>
                </div>
                
                {/* Timeline Container - Shows exactly 1.5 items */}
                <div 
                  ref={cardsRef}
                  className="relative overflow-y-auto flex flex-col scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-[#0066cc]/30 hover:scrollbar-thumb-[#0066cc]/50"
                  style={{ 
                    height: 'calc(100% - 80px)',
                    maxHeight: '910px',
                    padding: '16px',
                    gap: '16px'
                  }}
                >
                  {filteredExperiences.length > 0 ? (
                    filteredExperiences.map((experience, index) => (
                      <CompactExperienceCard
                        key={experience.id}
                        experience={experience}
                        index={index}
                        isActive={experience.id === selectedExperienceId}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedExperienceId(experience.id);
                        }}
                      />
                    ))
                  ) : (
                    <motion.div 
                      className="flex items-center justify-center h-96 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="space-y-6">
                        <Filter className="w-16 h-16 text-[#0066cc]/50 mx-auto" />
                        <div>
                          <p className="text-[#1a1a1a] text-lg mb-2 font-heading">No experiences match your search</p>
                          <p className="text-[#6a6a6a] text-sm font-body">Try adjusting your filters or search terms</p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSearchQuery('');
                              setSelectedCompany('all');
                              setSelectedType('all');
                            }}
                            className="text-[#0066cc] hover:text-[#004499] hover:bg-[#e6f2ff] font-medium"
                          >
                            Clear all filters
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Scroll indicator at bottom */}
                  {filteredExperiences.length > 2 && (
                    <div className="sticky bottom-0 text-center py-3 bg-gradient-to-t from-white via-white/95 to-transparent border-t border-[#0066cc]/10">
                      <div className="text-xs text-[#0066cc] font-medium flex items-center justify-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 rounded-full bg-[#0066cc] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 rounded-full bg-[#0066cc] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 rounded-full bg-[#0066cc] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        Scroll for more experiences
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Experience Details */}
            <div className="h-full">
              <div className="relative h-full rounded-2xl border-2 border-[#0066cc]/20 bg-white backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Green top stripe for colorblind accessibility */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008844] to-[#006622]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#e6f2ff]/5 via-transparent to-[#e6f2ff]/5" />
                
                {/* Panel Header */}
                <div className="relative border-b border-[#0066cc]/20" style={{ padding: '16px' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#e6f2ff] flex items-center justify-center border border-[#0066cc]/20">
                      <Trophy className="w-4 h-4 text-[#0066cc]" />
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] font-heading text-lg">
                      Experience Details
                    </h3>
                  </div>
                </div>
                
                <div className="relative flex flex-col" style={{ 
                  height: 'calc(100% - 80px)',
                  maxHeight: '510px',
                  padding: '16px'
                }}>
                  <div className="flex-1" style={{ 
                    height: '100%',
                    maxHeight: '478px'
                  }}>
                    <AnimatePresence mode="wait">
                      {filteredExperiences.length > 0 && currentSelectedExperience && (
                        <ExperienceDetail 
                          key={selectedExperienceId} 
                          experience={currentSelectedExperience} 
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
