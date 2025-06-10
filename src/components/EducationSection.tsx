
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, University, Code, Database, Cloud, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { Separator } from '@/components/ui/separator';

// Group skills by category for better organization
type SkillCategory = 'Languages' | 'Databases' | 'Cloud & Tools' | 'Frameworks';

interface SkillGroup {
  category: SkillCategory;
  skills: string[];
  icon: React.ReactNode;
}

interface EducationCardProps {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework: string[];
  skills: string[];
  index: number;
  logo?: string;
}

const EducationCard = ({ 
  degree, 
  institution, 
  location, 
  startDate, 
  endDate, 
  gpa, 
  coursework,
  skills,
  index,
  logo
}: EducationCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Organize skills into categories
  const organizeSkills = (skills: string[]): SkillGroup[] => {
    const languageSkills = ['Python', 'SQL', 'PL/SQL'];
    const databaseSkills = ['Data Models', 'Data Warehousing', 'Oracle Database', 'PostgreSQL'];
    const cloudTools = ['AWS', 'Azure Databricks', 'Airflow', 'Hadoop', 'Apache Kafka', 'Dbt'];
    
    return [
      {
        category: 'Languages',
        icon: <Code className="h-4 w-4 text-accent mr-1" />,
        skills: skills.filter(skill => languageSkills.includes(skill))
      },
      {
        category: 'Databases',
        icon: <Database className="h-4 w-4 text-accent mr-1" />,
        skills: skills.filter(skill => databaseSkills.includes(skill))
      },
      {
        category: 'Cloud & Tools',
        icon: <Cloud className="h-4 w-4 text-accent mr-1" />,
        skills: skills.filter(skill => cloudTools.includes(skill))
      },
      {
        category: 'Frameworks',
        icon: <Wrench className="h-4 w-4 text-accent mr-1" />,
        skills: skills.filter(skill => 
          !languageSkills.includes(skill) && 
          !databaseSkills.includes(skill) && 
          !cloudTools.includes(skill)
        )
      }
    ];
  };
  
  const skillGroups = organizeSkills(skills);
  
  // Split coursework into core and specialized
  const coreCoursework = coursework.slice(0, Math.ceil(coursework.length / 2));
  const specializedCoursework = coursework.slice(Math.ceil(coursework.length / 2));

  // Function to format course code and name
  const formatCourse = (course: string) => {
    // Regex to match patterns like "DATA220 - Course Name"
    const match = course.match(/^([A-Z]+\d+)\s*-\s*(.+)$/);
    
    if (match) {
      const [, code, name] = match;
      return (
        <>
          <span className="font-mono text-text/50 text-xs mr-2">{code}</span>
          <span>{name}</span>
        </>
      );
    }
    
    return <span>{course}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="w-full md:w-[calc(50%-1rem)]"
    >
      <Card className="h-full transition-all duration-300 hover:shadow-medium border-accent/10 hover:border-accent/30 shadow-subtle">
        <CardHeader className="relative pb-2 border-b border-border/30">
          <div className="absolute top-4 right-4 text-accent">
            <University className="h-6 w-6" />
          </div>
          
          <div className="flex items-center gap-3">
            {logo && (
              <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden bg-bg/60 p-1.5 border border-border/30 shadow-sm">
                <img src={logo} alt={`${institution} logo`} className="h-full w-full object-contain" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-text">
                {degree}
              </CardTitle>
              <div className="mt-1">
                <div className="font-medium text-base text-text/90">{institution}</div>
                <div className="flex items-center gap-1 text-text/70 text-sm">
                  <span>{location}</span>
                  <span className="mx-1">•</span>
                  <Calendar className="h-3.5 w-3.5 inline mr-1" />
                  <span>{startDate} - {endDate}</span>
                  {gpa && (
                    <>
                      <span className="mx-1">•</span>
                      <Award className="h-3.5 w-3.5 inline mr-1" />
                      <span>GPA: {gpa}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold mb-3 flex items-center text-text border-l-2 border-accent pl-2">
                <BookOpen className="h-4 w-4 text-accent mr-2" />
                Key Coursework
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2.5">
                <div className="space-y-3">
                  {coreCoursework.map((course, idx) => (
                    <div key={idx} className="text-sm text-text/80 py-1 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>{formatCourse(course)}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {specializedCoursework.map((course, idx) => (
                    <div key={idx} className="text-sm text-text/80 py-1 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-1.5 mr-2 flex-shrink-0"></span>
                      <div>{formatCourse(course)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold mb-3 flex items-center text-text border-l-2 border-accent pl-2">
                <GraduationCap className="h-4 w-4 text-accent mr-2" />
                Skills Gained
              </h4>
              
              <div className="space-y-3">
                {skillGroups.filter(group => group.skills.length > 0).map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center mb-1.5 text-xs font-medium text-text/70">
                      {group.icon}
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pb-2">
                      {group.skills.map((skill, skillIdx) => (
                        <Badge 
                          key={skillIdx} 
                          variant="outline" 
                          className="bg-accent/5 text-accent hover:bg-accent/20 hover:border-accent/40 transition-colors text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {idx < skillGroups.filter(group => group.skills.length > 0).length - 1 && (
                      <Separator className="my-2 opacity-30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-6 md:px-12 bg-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4" id="education-heading">
            Education
          </h2>
          <div className="h-1 w-20 bg-accent mx-auto rounded-full"></div>
          <p className="text-text text-opacity-80 mt-4 max-w-2xl mx-auto">
            Academic background and specialized training
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          <EducationCard
            index={0}
            degree="Master's degree, Applied Data Science"
            institution="San Jose State University"
            location="San Jose, CA"
            startDate="Jan 2024"
            endDate="Sep 2025"
            gpa="3.5/4.0"
            logo="/lovable-uploads/43782cdd-976a-492f-9263-c1a490e265f1.png"
            coursework={[
              "DATA220 - Statistics and Probability",
              "DATA226 - Data Warehousing",
              "DATA225 - Database Management System",
              "DATA230 - Data Visualization and Business Intelligence",
              "DATA236 - Distributed Systems",
              "DATA245 - Machine Learning",
              "DATA228 - Big Data Technologies with Spark and Kafka",
              "DATA255 - Deep Learning",
              "DATA266 - Gen AI and LLM"
            ]}
            skills={[
              "PySpark", 
              "Airflow", 
              "AWS", 
              "Data Engineering", 
              "SQL", 
              "Tableau", 
              "Data Models", 
              "Data Warehousing",
              "Hadoop",
              "PL/SQL",
              "Azure Databricks",
              "Apache Kafka",
              "Dbt",
              "Python",
              "Spark"
            ]}
          />
          
          <EducationCard
            index={1}
            degree="Bachelor of Technology, Computer Science"
            institution="Christ University"
            location="Bangalore, India"
            startDate="Jan 2017"
            endDate="Mar 2021"
            gpa="3.7/4.0"
            logo="/lovable-uploads/750b6bb7-8148-4798-9289-d62acc2b7db8.png"
            coursework={[
              "DATA101 - Data Structures and Algorithm",
              "CS205 - Database Management System",
              "CS301 - Operation System",
              "CS102 - Computer Architecture",
              "NET201 - Network and Communication"
            ]}
            skills={[
              "Data Models",
              "Oracle Database",
              "Hadoop"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
