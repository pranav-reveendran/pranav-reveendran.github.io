
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-10
  description: string;
}

interface SkillsNetworkProps {
  skills: Skill[];
  onCategoryFilter?: (category: string | null) => void;
  selectedCategory: string | null;
}

const SkillsNetwork: React.FC<SkillsNetworkProps> = ({ skills, onCategoryFilter, selectedCategory }) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  // Category colors - using modern, muted tones
  const categoryColors: Record<string, { bg: string, border: string, text: string }> = {
    'Data Engineering': { bg: 'bg-[#2C3E50]', border: 'border-[#2C3E50]', text: 'text-[#2C3E50]' },
    'Data Science': { bg: 'bg-[#16A085]', border: 'border-[#16A085]', text: 'text-[#16A085]' },
    'Machine Learning/AI': { bg: 'bg-[#8E44AD]', border: 'border-[#8E44AD]', text: 'text-[#8E44AD]' },
    'End-to-End Solutions': { bg: 'bg-[#27AE60]', border: 'border-[#27AE60]', text: 'text-[#27AE60]' },
  };

  const categories = ['Data Engineering', 'Data Science', 'Machine Learning/AI', 'End-to-End Solutions'];

  // Organize skills by category
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = skills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="skills-network-container w-full max-w-6xl mx-auto">
      {/* Category Filter */}
      <div className="flex justify-center mb-12">
        <ToggleGroup type="single" value={selectedCategory || "all"} 
          className="flex flex-wrap gap-2 justify-center"
          onValueChange={(value) => {
            if (value === "all") {
              onCategoryFilter?.(null);
            } else if (value) {
              onCategoryFilter?.(value);
            }
          }}>
          <ToggleGroupItem value="all" 
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100">
            All Skills
          </ToggleGroupItem>
          {categories.map(category => (
            <ToggleGroupItem 
              key={category} 
              value={category} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-opacity-10 ${
                selectedCategory === category ? `${categoryColors[category].bg} text-white` : `text-gray-600 hover:${categoryColors[category].text}`
              }`}
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Skills Grid */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            (!selectedCategory || selectedCategory === category) && (
              <div key={category} className="space-y-6 transition-all duration-300">
                <h3 className={`font-medium text-lg ${categoryColors[category].text}`}>{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map(skill => (
                    <HoverCard key={skill.id}>
                      <HoverCardTrigger asChild>
                        <div 
                          className="group cursor-pointer"
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                            <span className="text-xs text-gray-500">{skill.level}/10</span>
                          </div>
                          <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full ${categoryColors[category].bg} transition-all duration-300 group-hover:opacity-90`}
                              style={{ width: `${skill.level * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-80 p-4 backdrop-blur-xl bg-white/90 border border-gray-100 shadow-lg"
                        side="right"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-base">{skill.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${categoryColors[category].bg}`}
                                style={{ width: `${skill.level * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{skill.level}/10</span>
                          </div>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsNetwork;
