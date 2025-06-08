import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Download, ExternalLink, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import DataPipelineCard from './about/DataPipelineCard';
import CoreTechnologies from './about/CoreTechnologies';
import SearchExperience from './about/SearchExperience';

const AboutSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [fullResponse, setFullResponse] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setShowResults(true);
    setIsTyping(true);

    // Predefined responses based on keywords
    const responses: {[key: string]: string} = {
      "python": "I have 5+ years of experience with Python, particularly for data engineering tasks. I've built ETL pipelines, data processing systems, and ML model deployment infrastructure.",
      "aws": "I've worked extensively with AWS services including S3, EC2, Lambda, Glue, and Redshift to build scalable data solutions. I'm AWS Certified.",
      "spark": "Apache Spark is one of my core skills. I've implemented distributed data processing pipelines handling terabytes of data and optimized Spark jobs for performance.",
      "ml": "I've collaborated with data science teams to deploy machine learning models to production and built MLOps infrastructure.",
      "experience": "I have 7+ years of experience in data engineering, working with companies ranging from startups to Fortune 500 enterprises."
    };

    // Default response if no match
    let responseTxt = "I'm passionate about solving complex data problems and building scalable systems. Feel free to ask about my experience with specific technologies or projects!";

    // Check for matches in the query
    const lowerQuery = searchQuery.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) {
        responseTxt = value;
        break;
      }
    }
    
    setFullResponse(responseTxt);
    
    // Simulate typing effect
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < responseTxt.length) {
        setResponseMessage((prev) => prev + responseTxt.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  return (
    <section id="about" className="relative py-28 lg:py-36 bg-gradient-to-b from-[#faf8f7] to-[#f5f3f1] overflow-hidden">
      {/* Sophisticated background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0066cc 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      {/* Floating accent elements with new blue palette */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#0066cc]/5 to-[#004499]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-[#e6f2ff]/20 to-[#0066cc]/5 rounded-full blur-2xl" />
      
      {/* Golden border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main ABOUT ME heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight text-[#1a1a1a]">
            <span className="text-[#0066cc] relative">
              ABOUT ME
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#0066cc] to-[#004499] rounded-full opacity-60" />
            </span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left column - Enhanced Content */}
          <article className="lg:col-span-7 space-y-12">
            {/* Professional Summary */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-[#4a4a4a] font-light leading-relaxed max-w-2xl">
                    <span className="font-semibold text-[#0066cc]">Data Engineer Intern @ Amazon</span> with 4+ years of experience building enterprise-scale data infrastructure that processes 100TB+ daily and drives multi-million dollar business decisions.
                  </p>
                  
                  <p className="text-lg text-[#6a6a6a] leading-relaxed font-medium max-w-2xl">
                    Specialized in designing production ML pipelines, cost optimization strategies, and scalable cloud architectures. Currently completing MS in Data Science at SJSU while open to L4/L5 level opportunities in 2025.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced AMA Search with accessibility patterns */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#0066cc]/30 transition-all duration-300 relative">
                {/* Pattern differentiation for colorblind users */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066cc] to-[#004499] rounded-t-2xl" />
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e6f2ff] flex items-center justify-center border border-[#0066cc]/20">
                      <Search className="w-5 h-5 text-[#0066cc]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1a1a1a] flex items-center gap-2">
                        Want to learn more about my experience?
                        <span className="text-xs bg-[#0066cc] text-white px-2 py-1 rounded-full">ASK</span>
                      </h3>
                      <p className="text-sm text-[#6a6a6a] mt-1">Ask about my experience with Python, Spark, or AWS...</p>
                    </div>
                  </div>
                  
                  <SearchExperience 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    showResults={showResults}
                    responseMessage={responseMessage}
                    isTyping={isTyping}
                  />
                </div>
              </div>
            </motion.div>

            {/* Enhanced CTA Buttons with new palette */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                className="group bg-[#0066cc] hover:bg-[#004499] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium border-2 border-[#0066cc] hover:border-[#004499]"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download Resume
                </a>
              </Button>
              
              <Button 
                className="group border-2 border-[#0066cc] text-[#0066cc] hover:bg-[#0066cc] hover:text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium bg-white"
                variant="outline"
                asChild
              >
                <a href="#projects">
                  <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  View Projects
                </a>
              </Button>
            </motion.div>
          </article>

          {/* Right column - Enhanced Data Pipeline Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <DataPipelineCard className="sticky top-8" />
          </motion.div>
        </div>

        {/* Full Width Core Technologies Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#0066cc]/30 transition-all duration-300 relative">
            {/* Pattern differentiation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#008844] to-[#0066cc] rounded-t-2xl" />
            
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e6f2ff] flex items-center justify-center border border-[#0066cc]/20">
                  <Star className="w-5 h-5 text-[#0066cc]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                  Core Technologies
                  <span className="text-xs bg-[#008844] text-white px-2 py-1 rounded-full">SKILLS</span>
                </h3>
              </div>
              
              <CoreTechnologies />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Torn paper edge divider to Experience section */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-full">
          <path 
            d="M0,60 Q150,80 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" 
            fill="#ffffff" 
            stroke="#d4af37" 
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
