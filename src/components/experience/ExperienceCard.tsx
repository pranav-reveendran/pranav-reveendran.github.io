import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Company logos mapping - using reliable sources
const companyLogos = {
  "Amazon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/100px-Amazon_logo.svg.png",
  "San José State University": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/San_Jose_State_Spartans_logo.svg/100px-San_Jose_State_Spartans_logo.svg.png",
  "Spartan Analytics": "https://cdn-icons-png.flaticon.com/128/3281/3281289.png",
  "Epsilon": "https://cdn.worldvectorlogo.com/logos/epsilon-1.svg",
  "Codenex Solutions LLP": "https://cdn-icons-png.flaticon.com/128/2920/2920277.png",
  "EY": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/EY_logo_2019.svg/100px-EY_logo_2019.svg.png"
};

interface ExperienceCardProps {
  experience: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
  shouldAnimate: boolean;
}

export const CompactExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  index, 
  isActive, 
  onClick,
  shouldAnimate 
}) => (
  <motion.button
    initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: shouldAnimate ? index * 0.05 : 0, duration: shouldAnimate ? 0.4 : 0 }}
    whileHover={{ 
      y: -2, 
      transition: { duration: 0.2, type: "spring", stiffness: 400 } 
    }}
    onClick={onClick}
    className={`cursor-pointer transition-all duration-300 ${isActive ? 'scale-[1.01]' : ''} group flex-shrink-0 w-full text-left`}
    style={{ width: '100%' }}
    aria-label={`View details for ${experience.title} at ${experience.company}`}
    aria-expanded={isActive}
    role="button"
    tabIndex={0}
  >
    <Card className={`h-full transition-all duration-300 ${
      isActive 
        ? 'border-accent-500 bg-gradient-to-br from-accent-50/50 to-accent-100/30 shadow-lg shadow-accent-200/50' 
        : 'border-border bg-card hover:border-accent-300/50 hover:shadow-md'
    }`}>
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start gap-3">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
              isActive ? 'bg-accent-100 ring-2 ring-accent-300' : 'bg-muted'
            }`}>
              {companyLogos[experience.company as keyof typeof companyLogos] ? (
                <img 
                  src={companyLogos[experience.company as keyof typeof companyLogos]} 
                  alt={`${experience.company} logo`}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              ) : (
                <Building2 className={`w-6 h-6 ${isActive ? 'text-accent-600' : 'text-muted-foreground'}`} />
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`font-semibold text-sm leading-tight transition-colors duration-300 ${
                isActive ? 'text-accent-700' : 'text-foreground'
              }`}>
                {experience.title}
              </h3>
              {experience.featured && (
                <Star className="w-4 h-4 text-accent-500 fill-accent-500 flex-shrink-0" />
              )}
            </div>
            
            <p className="text-xs text-muted-foreground font-medium mb-2 truncate">
              {experience.company}
            </p>
            
            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{experience.location}</span>
              </div>
            </div>
            
            {/* Key Skills - Limited to save space */}
            <div className="flex flex-wrap gap-1 mb-2">
              {experience.skills.slice(0, 3).map((skill: string, idx: number) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 transition-all duration-300 ${
                    isActive 
                      ? 'border-accent-400 text-accent-700 bg-accent-50' 
                      : 'border-border text-muted-foreground hover:border-accent-300'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
              {experience.skills.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 text-muted-foreground">
                  +{experience.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  </motion.button>
); 