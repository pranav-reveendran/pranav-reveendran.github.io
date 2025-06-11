import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Trophy, 
  Rocket, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Calendar, 
  BookOpen,
  Zap,
  Database,
  Cloud,
  BarChart3,
  Code,
  Settings,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';

// Material UI Color Palette
const materialColors = {
  primary: '#1976D2',        // Material Blue 700
  primaryLight: '#42A5F5',   // Material Blue 400
  primaryLighter: '#90CAF9', // Material Blue 200
  primaryLightest: '#E3F2FD', // Material Blue 50
  surface: '#FFFFFF',        // Pure white
  background: '#F5F5F5',     // Light gray base
  onSurface: '#212121',      // Dark text
  onSurfaceSecondary: '#424242', // Medium gray
  onSurfaceLight: '#616161', // Light gray
  outline: '#E0E0E0',        // Subtle borders
  surfaceVariant: '#FAFAFA'  // Very light gray
};

// Stats data with Material colors
const statsData = [
  {
    icon: Target,
    number: "50+",
    label: "Core Skills",
    subtitle: "📈 Growing"
  },
  {
    icon: Trophy,
    number: "8",
    label: "Expert Areas",
    subtitle: "+2 this year"
  },
  {
    icon: Rocket,
    number: "15+",
    label: "Learning Goals",
    subtitle: "6 completing"
  }
];

// Core skills data with Material Design color system
const coreSkills = [
  {
    id: 1,
    icon: Database,
    name: "Data Engineering",
    subtitle: "Pipeline Architecture & ETL/ELT",
    level: 90,
    status: "Expert",
    subSkills: ["Apache Spark", "Kafka", "Airflow", "dbt", "Snowflake"],
    isExpanded: false
  },
  {
    id: 2,
    icon: BarChart3,
    name: "Statistics & Probability",
    subtitle: "A/B Testing, Hypothesis Testing, Regression",
    level: 85,
    status: "Advanced",
    subSkills: ["Hypothesis Testing", "A/B Testing", "Regression Analysis", "Bayesian Stats"],
    isExpanded: false
  },
  {
    id: 3,
    icon: Code,
    name: "Machine Learning",
    subtitle: "Tree Models, Neural Networks, NLP",
    level: 87,
    status: "Advanced",
    subSkills: ["XGBoost", "TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face"],
    isExpanded: false
  },
  {
    id: 4,
    icon: Cloud,
    name: "Cloud Platforms",
    subtitle: "AWS, GCP, Azure Infrastructure",
    level: 90,
    status: "Expert",
    subSkills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
    isExpanded: false
  },
  {
    id: 5,
    icon: Settings,
    name: "MLOps & DevOps",
    subtitle: "Production ML Systems",
    level: 85,
    status: "Advanced",
    subSkills: ["MLflow", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
    isExpanded: false
  }
];

// Learning goals data with Material colors
const learningGoals = [
  {
    id: 1,
    name: "LLM Fine-tuning",
    subtitle: "Llama2, RAG, Prompt Engineering",
    progress: 60,
    timeLeft: "2 weeks",
    streak: 7,
    priority: "High"
  },
  {
    id: 2,
    name: "Advanced RAG Systems",
    subtitle: "Vector DBs, Retrieval Optimization",
    progress: 70,
    timeLeft: "1 week",
    streak: 12,
    priority: "High"
  },
  {
    id: 3,
    name: "XGBoost GPU Acceleration",
    subtitle: "CUDA, Performance Optimization",
    progress: 45,
    timeLeft: "2 weeks",
    streak: 5,
    priority: "Medium"
  }
];

// Function to get skill color based on level (Material Blue progression)
const getSkillColor = (level: number) => {
  if (level >= 90) return materialColors.primary;        // Expert: #1976D2
  if (level >= 85) return materialColors.primaryLight;   // Advanced: #42A5F5
  if (level >= 70) return materialColors.primaryLighter; // Proficient: #90CAF9
  return materialColors.primaryLightest;                 // Learning: #E3F2FD
};

// Function to get status badge color
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Expert':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Advanced':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    default:
      return 'bg-blue-50 text-blue-500 border-blue-200';
  }
};

const SkillsSection = () => {
  const [expandedSkills, setExpandedSkills] = useState<number[]>([]);

  const toggleSkill = (skillId: number) => {
    setExpandedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  return (
    <section className="min-h-screen py-20 px-4" style={{ backgroundColor: materialColors.background }} id="skills">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" id="skills-heading">
            <span className="text-[#1a1a1a]">Technical</span>{" "}
            <span className="text-[color:var(--color-accent-dark)]">Expertise</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: materialColors.onSurfaceLight }}>
            A comprehensive overview of my technical skills, ongoing learning goals, and expertise areas
          </p>
        </motion.div>

        {/* Enhanced Stats Section - Material Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div 
                className="p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border"
                style={{ 
                  backgroundColor: materialColors.surface,
                  borderColor: materialColors.outline,
                  boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: materialColors.primaryLightest }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: materialColors.primary }} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold" style={{ color: materialColors.primary }}>
                      {stat.number}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: materialColors.onSurface }}>
                    {stat.label}
                  </h3>
                  <p className="text-sm" style={{ color: materialColors.onSurfaceLight }}>
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Skill Cards - Material Design */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2"
            style={{ color: materialColors.onSurface }}
          >
            <Award className="w-6 h-6" style={{ color: materialColors.primary }} />
            🔮 Core Technical Skills
          </motion.h3>
          
          <div className="space-y-4">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <div 
                  className="border rounded-lg p-6 transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: materialColors.surface,
                    borderColor: materialColors.outline,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: materialColors.primaryLightest }}
                      >
                        <skill.icon className="w-6 h-6" style={{ color: materialColors.primary }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-xl font-bold" style={{ color: materialColors.onSurface }}>
                            {skill.name}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(skill.status)}`}>
                            {skill.status} {skill.level}%
                          </span>
                        </div>
                        <p style={{ color: materialColors.onSurfaceLight }}>
                          💫 {skill.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: materialColors.primary }}>
                          {skill.level}%
                        </div>
                      </div>
                      {expandedSkills.includes(skill.id) ? (
                        <ChevronUp className="w-5 h-5" style={{ color: materialColors.onSurfaceLight }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: materialColors.onSurfaceLight }} />
                      )}
                    </div>
                  </div>
                  
                  {/* Material Design Progress Bar */}
                  <div className="mt-4 mb-2">
                    <div 
                      className="relative h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: materialColors.background }}
                    >
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: getSkillColor(skill.level) }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 + (0.1 * index), ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Expandable Sub-skills */}
                  <AnimatePresence>
                    {expandedSkills.includes(skill.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4"
                        style={{ borderTop: `1px solid ${materialColors.outline}` }}
                      >
                        <p className="text-sm mb-2" style={{ color: materialColors.onSurfaceLight }}>
                          ✨ Technologies & Sub-skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skill.subSkills.map((subSkill, subIndex) => (
                            <span
                              key={subIndex}
                              className="px-3 py-1 text-sm rounded-full border"
                              style={{ 
                                backgroundColor: materialColors.surface,
                                color: materialColors.primary,
                                borderColor: materialColors.outline
                              }}
                            >
                              {subSkill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Section - Material Design */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8 flex items-center gap-2"
            style={{ color: materialColors.onSurface }}
          >
            <BookOpen className="w-6 h-6" style={{ color: materialColors.primary }} />
            🌱 Currently Learning
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {learningGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div 
                  className="border rounded-lg p-6 transition-all duration-300 hover:shadow-md"
                  style={{ 
                    backgroundColor: materialColors.surface,
                    borderColor: materialColors.outline,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold" style={{ color: materialColors.onSurface }}>
                          {goal.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          goal.priority === 'High' 
                            ? 'bg-blue-50 text-blue-700 border-blue-200' 
                            : 'bg-blue-50 text-blue-600 border-blue-200'
                        }`}>
                          {goal.priority}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: materialColors.onSurfaceLight }}>
                        💫 {goal.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1" style={{ color: materialColors.primary }}>
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{goal.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: materialColors.onSurfaceLight }}>
                        Progress
                      </span>
                      <span className="text-sm font-bold" style={{ color: materialColors.onSurface }}>
                        {goal.progress}%
                      </span>
                    </div>
                    <div 
                      className="relative h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: materialColors.background }}
                    >
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: materialColors.primary }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${goal.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + (0.1 * index), ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2" style={{ color: materialColors.primary }}>
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">{goal.streak}-day streak</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: materialColors.primary }}>
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">Daily progress</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
