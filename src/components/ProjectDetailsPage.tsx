import React from 'react';
import { ArrowLeft, Github, ExternalLink, Code, Database, Server, Cloud, Users, Zap, Target, TrendingUp, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  problem: string;
  solution: string;
  architecture: {
    components: string[];
    dataFlow: string[];
    technologies: string[];
  };
  codeHighlights: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  outcomes: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  technologies: {
    category: string;
    items: string[];
  }[];
  timeline: string;
  team: string;
  challenges: string[];
  learnings: string[];
  repoLink?: string;
  liveLink?: string;
  category: string;
}

interface ProjectDetailsPageProps {
  project: ProjectDetails;
  onBack: () => void;
}

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ project, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]/80 hover:bg-[color:var(--color-accent)]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.timeline}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.team}
                  </div>
                  <Badge variant="secondary" className="bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)]">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {project.repoLink && (
                  <Button variant="outline" asChild>
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveLink && (
                  <Button asChild className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/90">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-[color:var(--color-accent)]" />
                    Problem Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{project.problem}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[color:var(--color-accent)]" />
                    Solution Approach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{project.solution}</p>
                </CardContent>
              </Card>
            </div>

            {/* Technology Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.technologies.map((tech, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-800 mb-2">{tech.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="w-5 h-5 mr-2 text-[color:var(--color-accent)]" />
                  System Architecture
                </CardTitle>
                <CardDescription>
                  High-level system design and component interaction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Architecture Diagram Placeholder */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.architecture.components.map((component, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                          {index === 0 && <Database className="w-6 h-6 text-[color:var(--color-accent)]" />}
                          {index === 1 && <Server className="w-6 h-6 text-[color:var(--color-accent)]" />}
                          {index === 2 && <Cloud className="w-6 h-6 text-[color:var(--color-accent)]" />}
                        </div>
                        <h4 className="font-semibold text-sm">{component}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Data Flow</h4>
                  <ul className="space-y-2">
                    {project.architecture.dataFlow.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-[color:var(--color-accent)] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <div className="space-y-6">
              {project.codeHighlights.map((highlight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2 text-[color:var(--color-accent)]" />
                      {highlight.title}
                    </CardTitle>
                    <CardDescription>{highlight.explanation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        <code>{highlight.code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Challenges */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[color:var(--color-accent)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outcomes Tab */}
          <TabsContent value="outcomes" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {project.outcomes.map((outcome, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-[color:var(--color-accent)]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-[color:var(--color-accent)]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{outcome.metric}</h3>
                    <div className="text-2xl font-bold text-[color:var(--color-accent)] mb-1">{outcome.value}</div>
                    <p className="text-sm text-gray-600">{outcome.improvement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-[color:var(--color-accent)]" />
                  Project Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose text-gray-700">
                  <p>
                    This project successfully demonstrated the ability to build scalable, production-ready solutions
                    that deliver measurable business value. The implementation showcases expertise in modern
                    engineering practices and technologies while solving real-world problems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Learnings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[color:var(--color-accent)] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{learning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Future Enhancements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-700">
                  <p>• Implement real-time monitoring and alerting systems</p>
                  <p>• Add automated testing and CI/CD pipeline</p>
                  <p>• Scale to handle 10x current data volume</p>
                  <p>• Integrate machine learning for predictive analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailsPage; 