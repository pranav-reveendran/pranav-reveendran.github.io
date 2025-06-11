import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Target, Calendar, BookOpen, Zap, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Skill data structure
interface SkillNode {
  id: string;
  name: string;
  emoji: string;
  level: number; // 0-100 percentage
  experience?: string;
  status: 'expert' | 'advanced' | 'proficient' | 'intermediate' | 'learning';
  children?: SkillNode[];
  target?: string; // Learning target timeline
  priority?: 'high' | 'medium' | 'low';
}

// Main skill tree data
const skillTreeData: SkillNode[] = [
  {
    id: 'data-engineering',
    name: 'Data Engineering',
    emoji: '🏗️',
    level: 90,
    status: 'expert',
    children: [
      {
        id: 'data-warehousing',
        name: 'Data Warehousing',
        emoji: '📊',
        level: 88,
        status: 'advanced',
        children: [
          {
            id: 'snowflake',
            name: 'Snowflake',
            emoji: '❄️',
            level: 95,
            experience: '5 years',
            status: 'expert',
            children: [
              { id: 'snowpipe', name: 'SnowPipe', emoji: '', level: 85, status: 'advanced' },
              { id: 'time-travel', name: 'Time Travel', emoji: '', level: 80, status: 'advanced' },
              { id: 'data-sharing', name: 'Data Sharing', emoji: '', level: 70, status: 'proficient' }
            ]
          },
          {
            id: 'redshift',
            name: 'Redshift',
            emoji: '🔶',
            level: 85,
            experience: '4 years',
            status: 'advanced',
            children: [
              { id: 'spectrum', name: 'Spectrum', emoji: '', level: 80, status: 'advanced' },
              { id: 'workload-mgmt', name: 'Workload Mgmt', emoji: '', level: 70, status: 'proficient' },
              { id: 'ra3-instances', name: 'RA3 Instances', emoji: '', level: 60, status: 'intermediate' }
            ]
          },
          {
            id: 'bigquery',
            name: 'BigQuery',
            emoji: '🔵',
            level: 80,
            experience: '3 years',
            status: 'advanced',
            children: [
              { id: 'bigquery-ml', name: 'BigQuery ML', emoji: '', level: 70, status: 'proficient' },
              { id: 'dataform', name: 'Dataform', emoji: '', level: 60, status: 'intermediate' },
              { id: 'bigquery-omni', name: 'BigQuery Omni', emoji: '🔄', level: 25, status: 'learning', target: '1 month' }
            ]
          }
        ]
      },
      {
        id: 'etl-pipelines',
        name: 'ETL/ELT Pipelines',
        emoji: '🔄',
        level: 92,
        status: 'expert',
        children: [
          {
            id: 'airflow',
            name: 'Apache Airflow',
            emoji: '🌬️',
            level: 95,
            experience: '5 years',
            status: 'expert',
            children: [
              { id: 'custom-operators', name: 'Custom Operators', emoji: '', level: 95, status: 'expert' },
              { id: 'xcoms', name: 'XComs & Variables', emoji: '', level: 85, status: 'advanced' },
              { id: 'k8s-executor', name: 'Kubernetes Executor', emoji: '', level: 80, status: 'advanced' },
              { id: 'taskflow-api', name: 'TaskFlow API', emoji: '', level: 95, status: 'expert' }
            ]
          },
          {
            id: 'dbt',
            name: 'dbt',
            emoji: '🛠️',
            level: 85,
            experience: '3 years',
            status: 'advanced',
            children: [
              { id: 'macros-tests', name: 'Macros & Tests', emoji: '', level: 85, status: 'advanced' },
              { id: 'seeds-snapshots', name: 'Seeds & Snapshots', emoji: '', level: 80, status: 'advanced' },
              { id: 'dbt-cloud', name: 'dbt Cloud', emoji: '', level: 70, status: 'proficient' },
              { id: 'dbt-core-v18', name: 'dbt-core v1.8', emoji: '🔄', level: 40, status: 'learning', target: '2 weeks' }
            ]
          },
          {
            id: 'spark',
            name: 'Apache Spark',
            emoji: '⚡',
            level: 95,
            experience: '4 years',
            status: 'expert',
            children: [
              { id: 'pyspark', name: 'PySpark', emoji: '', level: 95, status: 'expert' },
              { id: 'spark-sql', name: 'Spark SQL', emoji: '', level: 95, status: 'expert' },
              { id: 'spark-streaming', name: 'Spark Streaming', emoji: '', level: 80, status: 'advanced' },
              { id: 'delta-lake', name: 'Delta Lake', emoji: '', level: 70, status: 'proficient' }
            ]
          }
        ]
      },
      {
        id: 'realtime-streaming',
        name: 'Real-time Streaming',
        emoji: '📡',
        level: 82,
        status: 'advanced',
        children: [
          {
            id: 'kafka',
            name: 'Apache Kafka',
            emoji: '🔥',
            level: 85,
            experience: '3 years',
            status: 'advanced',
            children: [
              { id: 'kafka-connect', name: 'Kafka Connect', emoji: '', level: 80, status: 'advanced' },
              { id: 'schema-registry', name: 'Schema Registry', emoji: '', level: 70, status: 'proficient' },
              { id: 'ksql', name: 'KSQL', emoji: '', level: 60, status: 'intermediate' },
              { id: 'kafka-streams', name: 'Kafka Streams', emoji: '🔄', level: 30, status: 'learning', target: '3 weeks' }
            ]
          },
          {
            id: 'kinesis',
            name: 'AWS Kinesis',
            emoji: '☁️',
            level: 80,
            experience: '2 years',
            status: 'advanced',
            children: [
              { id: 'data-streams', name: 'Data Streams', emoji: '', level: 80, status: 'advanced' },
              { id: 'data-firehose', name: 'Data Firehose', emoji: '', level: 85, status: 'advanced' },
              { id: 'analytics', name: 'Analytics', emoji: '', level: 70, status: 'proficient' }
            ]
          },
          { id: 'pulsar', name: 'Apache Pulsar', emoji: '🔄', level: 15, status: 'learning', target: '6 months' }
        ]
      }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics & Probability',
    emoji: '📊',
    level: 85,
    status: 'advanced',
    children: [
      {
        id: 'statistical-analysis',
        name: 'Statistical Analysis',
        emoji: '📈',
        level: 88,
        status: 'advanced',
        children: [
          {
            id: 'hypothesis-testing',
            name: 'Hypothesis Testing',
            emoji: '🧪',
            level: 85,
            status: 'advanced',
            children: [
              { id: 't-tests', name: 't-tests', emoji: '', level: 95, status: 'expert' },
              { id: 'chi-square', name: 'Chi-square', emoji: '', level: 80, status: 'advanced' },
              { id: 'anova', name: 'ANOVA', emoji: '', level: 70, status: 'proficient' },
              { id: 'nonparam-tests', name: 'Non-parametric Tests', emoji: '🔄', level: 20, status: 'learning', target: '1 month' }
            ]
          },
          {
            id: 'ab-testing',
            name: 'A/B Testing',
            emoji: '🎯',
            level: 95,
            status: 'expert',
            children: [
              { id: 'sample-size', name: 'Sample Size Calc', emoji: '', level: 95, status: 'expert' },
              { id: 'sequential-testing', name: 'Sequential Testing', emoji: '', level: 80, status: 'advanced' },
              { id: 'bandits', name: 'Multi-armed Bandits', emoji: '', level: 70, status: 'proficient' },
              { id: 'causal-inference', name: 'Causal Inference', emoji: '🔄', level: 35, status: 'learning', target: '2 months' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ml-algorithms',
    name: 'Machine Learning Algorithms',
    emoji: '🤖',
    level: 87,
    status: 'advanced',
    children: [
      {
        id: 'tree-models',
        name: 'Tree-based Models',
        emoji: '🌳',
        level: 95,
        status: 'expert',
        children: [
          {
            id: 'xgboost',
            name: 'XGBoost',
            emoji: '🚀',
            level: 95,
            status: 'expert',
            children: [
              { id: 'hyperparams', name: 'Hyperparameter Tuning', emoji: '', level: 95, status: 'expert' },
              { id: 'feature-importance', name: 'Feature Importance', emoji: '', level: 95, status: 'expert' },
              { id: 'early-stopping', name: 'Early Stopping', emoji: '', level: 85, status: 'advanced' },
              { id: 'xgboost-gpu', name: 'XGBoost GPU', emoji: '🔄', level: 45, status: 'learning', target: '2 weeks', priority: 'medium' }
            ]
          },
          { id: 'random-forest', name: 'Random Forest', emoji: '🌲', level: 95, status: 'expert' },
          { id: 'lightgbm', name: 'LightGBM', emoji: '🔥', level: 80, status: 'advanced' },
          { id: 'catboost', name: 'CatBoost', emoji: '🐱', level: 70, status: 'proficient' }
        ]
      },
      {
        id: 'neural-networks',
        name: 'Neural Networks',
        emoji: '🧠',
        level: 80,
        status: 'advanced',
        children: [
          { id: 'dense-networks', name: 'Dense Networks', emoji: '🔗', level: 80, status: 'advanced' },
          { id: 'rnns-lstms', name: 'RNNs/LSTMs', emoji: '🔄', level: 70, status: 'proficient' },
          { id: 'cnns', name: 'CNNs', emoji: '🖼️', level: 70, status: 'proficient' }
        ]
      },
      {
        id: 'nlp-models',
        name: 'NLP Models',
        emoji: '📝',
        level: 75,
        status: 'proficient',
        children: [
          { id: 'text-processing', name: 'Text Processing', emoji: '🔤', level: 70, status: 'proficient' },
          { id: 'pretrained-models', name: 'Pre-trained Models', emoji: '🤖', level: 70, status: 'proficient' },
          { id: 'llama-finetuning', name: 'Llama 2 Fine-tuning', emoji: '🔄', level: 60, status: 'learning', target: '2 weeks', priority: 'high' },
          { id: 'rag-systems', name: 'RAG Systems', emoji: '🔄', level: 70, status: 'learning', target: '1 week', priority: 'high' }
        ]
      }
    ]
  },
  {
    id: 'currently-learning',
    name: 'Currently Learning',
    emoji: '🎓',
    level: 50,
    status: 'learning',
    children: [
      {
        id: 'high-priority',
        name: 'High Priority',
        emoji: '🔥',
        level: 65,
        status: 'learning',
        children: [
          { id: 'llama-learning', name: 'Llama 2 Fine-tuning', emoji: '🦙', level: 60, status: 'learning', target: '2 weeks', priority: 'high' },
          { id: 'rag-learning', name: 'RAG Systems', emoji: '🔍', level: 70, status: 'learning', target: '1 week', priority: 'high' },
          { id: 'realtime-ml', name: 'Real-time ML Serving', emoji: '🌊', level: 30, status: 'learning', target: '1 month', priority: 'high' }
        ]
      },
      {
        id: 'medium-priority',
        name: 'Medium Priority',
        emoji: '📚',
        level: 40,
        status: 'learning',
        children: [
          { id: 'langchain-adv', name: 'LangChain Advanced', emoji: '🔗', level: 40, status: 'learning', target: '3 weeks', priority: 'medium' },
          { id: 'xgb-gpu-learn', name: 'XGBoost GPU', emoji: '⚡', level: 45, status: 'learning', target: '2 weeks', priority: 'medium' }
        ]
      }
    ]
  }
];

// Priority colors
const priorityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-orange-600 bg-orange-50 border-orange-200',
  low: 'text-blue-600 bg-blue-50 border-blue-200'
};

// Status colors
const statusColors = {
  expert: 'bg-green-500',
  advanced: 'bg-blue-500',
  proficient: 'bg-yellow-500',
  intermediate: 'bg-orange-500',
  learning: 'bg-purple-500'
};

const statusLabels = {
  expert: 'Expert',
  advanced: 'Advanced',
  proficient: 'Proficient',
  intermediate: 'Intermediate',
  learning: 'Learning'
};

interface SkillNodeProps {
  node: SkillNode;
  depth: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const SkillNodeComponent: React.FC<SkillNodeProps> = ({ node, depth, isExpanded, onToggle }) => {
  const hasChildren = node.children && node.children.length > 0;
  const indentClass = `ml-${depth * 6}`;
  
  return (
    <div className="skill-node">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.1 }}
        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group ${indentClass}`}
        onClick={hasChildren ? onToggle : undefined}
      >
        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
        
        {/* Skill Content */}
        <div className="flex-1 flex items-center space-x-3">
          {/* Emoji and Name */}
          <div className="flex items-center space-x-2">
            {node.emoji && <span className="text-lg">{node.emoji}</span>}
            <span className="font-medium text-gray-800">{node.name}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex-1 max-w-xs">
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${statusColors[node.status]} transition-all duration-500`}
                  initial={{ width: 0 }}
                  animate={{ width: `${node.level}%` }}
                  transition={{ duration: 1, delay: depth * 0.1 }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600 min-w-[40px]">
                {node.level}%
              </span>
            </div>
          </div>
          
          {/* Status Badge */}
          <Badge 
            variant="outline" 
            className={`text-xs px-2 py-1 ${statusColors[node.status]} text-white border-0`}
          >
            {statusLabels[node.status]}
          </Badge>
          
          {/* Experience Years */}
          {node.experience && (
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
              {node.experience}
            </Badge>
          )}
          
          {/* Learning Target */}
          {node.target && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Target className="w-3 h-3" />
              <span>{node.target}</span>
            </div>
          )}
          
          {/* Priority Indicator */}
          {node.priority && (
            <Badge className={`text-xs ${priorityColors[node.priority]}`}>
              {node.priority === 'high' && <Zap className="w-3 h-3 mr-1" />}
              {node.priority}
            </Badge>
          )}
          
          {/* Learning Indicator */}
          {node.status === 'learning' && (
            <div className="text-purple-600">
              <BookOpen className="w-4 h-4" />
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <SkillTreeBranch nodes={node.children!} depth={depth + 1} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SkillTreeBranchProps {
  nodes: SkillNode[];
  depth: number;
}

const SkillTreeBranch: React.FC<SkillTreeBranchProps> = ({ nodes, depth }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['data-engineering', 'ml-algorithms', 'currently-learning']));
  
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };
  
  return (
    <div className="space-y-1">
      {nodes.map(node => (
        <SkillNodeComponent
          key={node.id}
          node={node}
          depth={depth}
          isExpanded={expandedNodes.has(node.id)}
          onToggle={() => toggleNode(node.id)}
        />
      ))}
    </div>
  );
};

const AdvancedSkillTree: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-6 md:px-12 bg-white relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Advanced Skills</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Technical <span className="text-purple-600">Expertise</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive skill tree showcasing deep expertise in data engineering, machine learning, 
              and advanced analytics with continuous learning pathways.
            </p>
          </motion.div>
        </div>
        
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center space-x-8 mb-12 p-6 bg-gray-50 rounded-xl"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-500">Core Skills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-500">Expert Areas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">15+</div>
            <div className="text-sm text-gray-500">Learning Goals</div>
          </div>
        </motion.div>
        
        {/* Skill Tree */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <SkillTreeBranch nodes={skillTreeData} depth={0} />
        </motion.div>
        
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 p-6 bg-gray-50 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
                <span className="text-sm text-gray-600">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Learning Target</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">Currently Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedSkillTree; 