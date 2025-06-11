import React from 'react';
import { motion } from 'framer-motion';
import { Database, Code, Cloud, Cog, BarChart3, Zap, PieChart, Settings } from 'lucide-react';

// 8 Core Technologies organized in 2 rows × 4 columns
const technologies = [
  // Row 1 (Top 4)
  { 
    name: 'Programming Languages', 
    level: 95,
    details: 'Python, SQL, Scala',
    icon: Code,
    color: 'var(--color-accent)',
    position: 'row1-col1'
  },
  { 
    name: 'Cloud Platforms', 
    level: 90,
    details: 'AWS, GCP, Azure',
    icon: Cloud,
    color: 'var(--color-cta)',
    position: 'row1-col2'
  },
  { 
    name: 'Big Data Processing', 
    level: 88,
    details: 'Spark, Kafka, Airflow',
    icon: Zap,
    color: 'var(--color-accent-dark)',
    position: 'row1-col3'
  },
  { 
    name: 'Databases & Storage', 
    level: 92,
    details: 'PostgreSQL, MongoDB, Redis',
    icon: Database,
    color: 'var(--color-accent)',
    position: 'row1-col4'
  },
  // Row 2 (Bottom 4)
  { 
    name: 'ML/AI Frameworks', 
    level: 87,
    details: 'TensorFlow, PyTorch, HF',
    icon: Cog,
    color: 'var(--color-accent-dark)',
    position: 'row2-col1'
  },
  { 
    name: 'MLOps & DevOps', 
    level: 85,
    details: 'Docker, Kubernetes',
    icon: Settings,
    color: 'var(--color-cta)',
    position: 'row2-col2'
  },
  { 
    name: 'Data Pipeline Tools', 
    level: 89,
    details: 'dbt, Fivetran, Apache Beam',
    icon: BarChart3,
    color: 'var(--color-accent)',
    position: 'row2-col3'
  },
  { 
    name: 'Analytics & Visualization', 
    level: 86,
    details: 'Tableau, Power BI, Jupyter',
    icon: PieChart,
    color: 'var(--color-accent-dark)',
    position: 'row2-col4'
  }
];

const CoreTechnologies = () => {
  return (
    <div className="w-full">
      {/* 2 Rows × 4 Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-5 py-10">
        {technologies.map((tech, idx) => {
          const IconComponent = tech.icon;
          return (
            <motion.div 
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="aspect-[1.2] p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${tech.color}15`,
                      border: `2px solid ${tech.color}30`
                    }}
                  >
                    <IconComponent 
                      className="w-5 h-5" 
                      style={{ color: tech.color }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className="text-xl font-bold"
                    style={{ color: tech.color }}
                  >
                    {tech.level}%
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <div className="mb-3">
                <h4 className="text-base font-semibold text-gray-900 leading-tight">
                  {tech.name}
                </h4>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: tech.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + (0.1 * idx), ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Technologies List */}
              <div className="mt-auto">
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  {tech.details}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      

    </div>
  );
};

export default CoreTechnologies;
