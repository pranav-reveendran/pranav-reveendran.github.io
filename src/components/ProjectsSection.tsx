import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ExternalLink, Github, Database, Brain, Cloud, ChartLine, Activity, Code, FileCode, Map, Filter, Calendar, Building2, ArrowRight, Eye, Star, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// Removed GSAP for performance - using CSS animations instead
import { useMotionSafe } from '@/hooks/use-motion-safe';

interface Project {
  id: number;
  title: string;
  description: string;
  keyFeatures: string[];
  technologies: {
    category: string;
    items: string[];
  }[];
  skills: string[];
  period: string;
  organization: string;
  image?: string;
  liveLink?: string;
  repoLink?: string;
  category?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Realtime Data Pipeline for Stock Market Analysis",
    description: "Real-time data pipeline designed to ingest, process, and analyze stock market data using cutting-edge tools like Apache Kafka, PostgreSQL, and Python.",
    keyFeatures: [
      "Built real-time streaming architecture for stock market data ingestion",
      "Implemented Apache Kafka for high-throughput message processing",
      "Designed PostgreSQL database schema for efficient data storage",
      "Created data processing pipelines using Python and Pandas",
      "Developed monitoring and alerting systems for pipeline health"
    ],
    technologies: [
      { category: "Streaming", items: ["Apache Kafka", "Python", "Pandas"] },
      { category: "Database", items: ["PostgreSQL", "SQL"] },
      { category: "Infrastructure", items: ["Docker", "Linux"] },
      { category: "Monitoring", items: ["Prometheus", "Grafana"] }
    ],
    skills: ["Real-Time Processing", "Data Pipeline Architecture", "Apache Kafka", "PostgreSQL", "Python"],
    period: "2024",
    organization: "Personal Project",
    category: "Data Engineering",
    repoLink: "https://github.com/pranav-reveendran/Realtime-Data-Pipeline-for-Stock-Market-Analysis"
  },
  {
    id: 2,
    title: "Disease Prediction Using Machine Learning Algorithms",
    description: "Machine learning system for disease prediction using various algorithms to analyze health data and provide accurate diagnostic insights.",
    keyFeatures: [
      "Implemented multiple ML algorithms for disease prediction",
      "Performed comprehensive data preprocessing and feature engineering",
      "Built model evaluation framework with cross-validation",
      "Created comparative analysis of different ML algorithms",
      "Developed user-friendly interface for predictions"
    ],
    technologies: [
      { category: "Programming", items: ["Python", "Scikit-learn", "Pandas", "NumPy"] },
      { category: "Machine Learning", items: ["Random Forest", "SVM", "Logistic Regression", "Decision Trees"] },
      { category: "Visualization", items: ["Matplotlib", "Seaborn", "Plotly"] },
      { category: "Deployment", items: ["Jupyter Notebook", "Streamlit"] }
    ],
    skills: ["Machine Learning", "Data Science", "Healthcare Analytics", "Statistical Analysis", "Python"],
    period: "2024",
    organization: "Personal Project",
    category: "ML",
    repoLink: "https://github.com/pranav-reveendran/Disease-Prediction-Using-Machine-Learning-Algorithms"
  },
  {
    id: 3,
    title: "Real-time Transit Demand Forecasting",
    description: "Advanced forecasting system for real-time transit demand prediction using machine learning and time series analysis.",
    keyFeatures: [
      "Developed time series forecasting models for transit demand",
      "Implemented real-time data processing and prediction pipeline",
      "Built comprehensive data analysis and visualization dashboard",
      "Created predictive models using historical transit patterns",
      "Designed scalable architecture for real-time predictions"
    ],
    technologies: [
      { category: "Programming", items: ["Python", "Pandas", "NumPy"] },
      { category: "Machine Learning", items: ["Time Series Analysis", "Forecasting Models", "Scikit-learn"] },
      { category: "Visualization", items: ["Matplotlib", "Seaborn", "Plotly"] },
      { category: "Data Processing", items: ["Real-time Processing", "Data Pipelines"] }
    ],
    skills: ["Time Series Forecasting", "Real-Time Processing", "Transit Analytics", "Predictive Modeling", "Python"],
    period: "2024",
    organization: "Personal Project",
    category: "Data Science",
    repoLink: "https://github.com/pranav-reveendran/Real-time-transit-demand-forecasting"
  },
  {
    id: 4,
    title: "Predictive Workplace Safety Analytics Platform",
    description: "Comprehensive analytics platform for predicting and preventing workplace safety incidents using machine learning and data analysis.",
    keyFeatures: [
      "Built predictive models for workplace safety incident prevention",
      "Developed comprehensive safety analytics dashboard",
      "Implemented risk assessment algorithms using historical data",
      "Created real-time monitoring and alerting systems",
      "Designed data visualization for safety insights and trends"
    ],
    technologies: [
      { category: "Programming", items: ["Python", "Pandas", "NumPy", "Scikit-learn"] },
      { category: "Machine Learning", items: ["Classification", "Risk Prediction", "Statistical Analysis"] },
      { category: "Visualization", items: ["Plotly", "Dash", "Matplotlib"] },
      { category: "Analytics", items: ["Safety Analytics", "Predictive Modeling"] }
    ],
    skills: ["Predictive Analytics", "Safety Engineering", "Risk Assessment", "Machine Learning", "Data Visualization"],
    period: "2024",
    organization: "Personal Project",
    category: "Safety Analytics",
    repoLink: "https://github.com/pranav-reveendran/Predictive-Workplace-Safety-Analytics-Platform"
  },
  {
    id: 5,
    title: "Safe Urban Perception Planning",
    description: "Advanced urban perception and planning system for safe autonomous navigation in complex urban environments.",
    keyFeatures: [
      "Developed perception algorithms for urban environment understanding",
      "Implemented safe path planning algorithms for autonomous systems",
      "Built comprehensive sensor fusion and data processing pipeline",
      "Created safety-critical decision making systems",
      "Designed real-time perception and planning integration"
    ],
    technologies: [
      { category: "Programming", items: ["Python", "OpenCV", "NumPy"] },
      { category: "Computer Vision", items: ["Perception Algorithms", "Object Detection", "Sensor Fusion"] },
      { category: "Planning", items: ["Path Planning", "Motion Planning", "Safety Systems"] },
      { category: "Processing", items: ["Real-time Processing", "Algorithm Optimization"] }
    ],
    skills: ["Computer Vision", "Path Planning", "Autonomous Systems", "Safety Engineering", "Algorithm Design"],
    period: "2024",
    organization: "Personal Project",
    category: "Autonomous Systems",
    repoLink: "https://github.com/pranav-reveendran/safe-urban-perception-planning"
  },
  {
    id: 6,
    title: "Uber Dynamic Ride Simulation",
    description: "Comprehensive simulation system for dynamic ride-sharing scenarios, modeling complex urban transportation patterns and optimization.",
    keyFeatures: [
      "Built dynamic ride-sharing simulation environment",
      "Implemented optimization algorithms for ride matching",
      "Developed comprehensive urban transportation modeling",
      "Created real-time simulation and visualization dashboard",
      "Designed performance metrics and analysis tools"
    ],
    technologies: [
      { category: "Simulation", items: ["Python", "Simulation Framework", "Optimization"] },
      { category: "Algorithms", items: ["Dynamic Programming", "Graph Algorithms", "Optimization"] },
      { category: "Visualization", items: ["Matplotlib", "Plotly", "Interactive Dashboards"] },
      { category: "Analysis", items: ["Performance Analysis", "Statistical Modeling"] }
    ],
    skills: ["Simulation Modeling", "Optimization Algorithms", "Transportation Systems", "Dynamic Programming", "System Design"],
    period: "2024",
    organization: "Personal Project",
    category: "Simulation",
    repoLink: "https://github.com/pranav-reveendran/uber-dynamic-ride-simulation"
  }
];

const getProjectIcon = (project: Project) => {
  const iconClass = "w-8 h-8";
  switch (project.category) {
    case 'Full-Stack': return <Code className={iconClass} />;
    case 'Computer Vision': return <Eye className={iconClass} />;
    case 'Data Engineering': return <Database className={iconClass} />;
    case 'Data Science': return <ChartLine className={iconClass} />;
    case 'NLP': return <Brain className={iconClass} />;
    case 'ML': return <Brain className={iconClass} />;
    case 'Safety Analytics': return <Activity className={iconClass} />;
    case 'Autonomous Systems': return <Eye className={iconClass} />;
    case 'Simulation': return <Cloud className={iconClass} />;
    case 'Geospatial Data': return <Map className={iconClass} />;
    default: return <FileCode className={iconClass} />;
  }
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card 
      ref={cardRef}
              className="project-card group relative overflow-hidden bg-surface border border-gray-200 hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 h-full flex flex-col"
    >
      {/* Gradient overlay for visual interest */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
              {getProjectIcon(project)}
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-text group-hover:text-accent transition-colors duration-300">
                {project.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">{project.period.split(' - ')[0]}</span>
                <span className="text-xs text-gray-600 dark:text-gray-300">•</span>
                <Building2 className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500 truncate">{project.organization}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20 font-medium">
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4 flex-grow flex flex-col">
        <CardDescription className="text-gray-700 leading-relaxed">
          {project.description}
        </CardDescription>

        {/* Technology stack */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-800">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 2).flatMap(tech => tech.items.slice(0, 3)).map((tech, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-gray-50 border-[var(--color-primary)]/30 text-gray-600 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-colors duration-200">
                {tech}
              </Badge>
            ))}
            {project.technologies.flatMap(tech => tech.items).length > 6 && (
                                      <Badge variant="outline" className="text-xs bg-gray-50 border-[color:var(--color-accent)]/30 text-gray-500">
                +{project.technologies.flatMap(tech => tech.items).length - 6}
              </Badge>
            )}
          </div>
        </div>

        {/* Key skills */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-800">Key Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-500">
                +{project.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Expandable key features */}
        {isExpanded && (
          <div className="space-y-3 animate-in slide-in-from-top-4 duration-300">
            <h4 className="text-sm font-semibold text-gray-800">Key Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <ArrowRight className="w-3 h-3 mt-0.5 text-[var(--color-primary)] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 hover:bg-[var(--color-primary)]/10 p-2"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <ArrowRight className={`w-3 h-3 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </Button>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300"
              onClick={() => {
                // This will be connected to a case study modal or page
                window.open(`#/project/${project.id}`, '_blank');
              }}
            >
              <Eye className="w-3 h-3 mr-1" />
              Case Study
            </Button>
            {project.repoLink && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.liveLink && (
              <Button
                size="sm"
                asChild
                className="bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection = () => {
  const shouldAnimate = useMotionSafe();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Ensure project cards are always visible
  const [cardsVisible, setCardsVisible] = useState(true);

  // Categories for filtering
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
    return cats;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter projects
  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    
    
    return filtered;
  }, [selectedCategory, searchTerm, categories]);

  // CSS-based animations for better performance (no GSAP)
  useEffect(() => {
    if (!shouldAnimate) return;

    // Add CSS animation classes for Intersection Observer
    const heading = headingRef.current;
    const cards = cardsRef.current?.children;

    if (heading) {
      heading.setAttribute('data-animate-on-scroll', '');
    }

    if (cards) {
      Array.from(cards).forEach((card, index) => {
        card.setAttribute('data-animate-on-scroll', '');
        card.setAttribute('data-delay', String(index));
      });
    }
  }, [shouldAnimate, filteredProjects]);

  return (
    <section id="projects" className="py-20 px-6 md:px-12 bg-surface relative min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10 min-h-full" ref={sectionRef}>
        {/* Enhanced Section Header */}
        <div ref={headingRef} className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
            <Star className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text" id="projects-heading">
                          Project <span className="text-[color:var(--color-accent)]">Showcase</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore my recent projects spanning Data Engineering, Machine Learning, and Full-Stack Development. 
            Each project represents a unique challenge solved with innovative technical solutions.
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
                              <div className="text-3xl font-bold text-[color:var(--color-accent)]">30+</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
            <div className="text-center">
                              <div className="text-3xl font-bold text-[color:var(--color-accent)]">{categories.length - 1}</div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
            <div className="text-center">
                              <div className="text-3xl font-bold text-[color:var(--color-accent)]">50M+</div>
              <div className="text-sm text-gray-500">Records Processed</div>
            </div>
          </div>
        </div>

        {/* Modern Filter System */}
        <div className="mb-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
              <TabsList className="flex flex-wrap justify-center lg:justify-start bg-gray-100 border border-gray-200 p-1 rounded-lg max-w-full overflow-x-auto">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-[color:var(--color-accent)] data-[state=active]:text-white transition-all duration-300 px-3 py-2 rounded-md text-sm whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 pl-10 text-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 w-64"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </Tabs>
        </div>

        {/* Enhanced Project Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 project-grid-visible"
          style={{ 
            minHeight: 'fit-content',
            gridAutoRows: '1fr'
          }}
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card-wrapper opacity-100" style={{ opacity: 1, transform: 'translateY(0px)' }}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        


        {/* No results state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 opacity-20">
              <Filter className="w-full h-full text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200">
          <div className="inline-flex items-center space-x-4">
            <Button
              size="lg"
              asChild
              className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <a href="https://github.com/pranav-reveendran" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View All on GitHub
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-[color:var(--color-accent)]/30 text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)] hover:text-white transition-all duration-300 px-8 py-3"
            >
              <a href="#contact">
                <span>Let's Collaborate</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
