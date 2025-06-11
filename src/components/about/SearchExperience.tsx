
import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchExperienceProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  showResults: boolean;
  responseMessage: string;
  isTyping: boolean;
}

const placeholders = [
  "Ask about my experience with Python, Spark, or AWS…",
  "Curious about my ML projects or data pipeline work?",
  "Want to know about my database or cloud expertise?",
  "Ask me about ETL workflows or data warehousing..."
];

const SearchExperience: React.FC<SearchExperienceProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  showResults,
  responseMessage,
  isTyping
}) => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isPlaceholderChanging, setIsPlaceholderChanging] = useState(false);
  const placeholderInterval = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-suggest keywords for common technologies
  const autoSuggestions = [
    "Python", "Spark", "AWS", "SQL", "Kafka", 
    "ETL pipelines", "ML models", "Docker", "Kubernetes"
  ];
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Rotate through placeholders
  useEffect(() => {
    placeholderInterval.current = window.setInterval(() => {
      setIsPlaceholderChanging(true);
      setTimeout(() => {
        setCurrentPlaceholderIndex((prevIndex) => 
          (prevIndex + 1) % placeholders.length
        );
        setIsPlaceholderChanging(false);
      }, 300);
    }, 5000);
    
    return () => {
      if (placeholderInterval.current) {
        clearInterval(placeholderInterval.current);
      }
    };
  }, []);
  
  // Handle input changes for auto-suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 1) {
      const filtered = autoSuggestions.filter(
        suggestion => suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };
  
  // Apply suggestion to input
  const applySuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <label className="relative block">
          <motion.input
            ref={inputRef}
            type="text"
            placeholder={isPlaceholderChanging ? "" : placeholders[currentPlaceholderIndex]}
            className="peer w-full rounded-xl bg-[#f8f9fa] border-2 border-[#e5e5e5] px-6 py-4 pr-12 focus:ring-2 focus:ring-[color:var(--color-accent)] focus:border-[color:var(--color-accent)] outline-none transition-all duration-300 text-[#1a1a1a] placeholder:text-[#6a6a6a] h-14"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchQuery.length > 1) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            animate={
              isPlaceholderChanging 
                ? { opacity: [1, 0.5, 1] }
                : {}
            }
            transition={{ duration: 0.3 }}
          />
          
          <button 
            type="submit" 
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6a6a6a] hover:text-[color:var(--color-accent)] transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        </label>
        
        {/* Auto-suggestions dropdown */}
        {showSuggestions && (
          <motion.div 
            className="absolute z-10 mt-1 w-full bg-white border border-[#e5e5e5] rounded-xl shadow-lg max-h-48 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="py-2">
              {filteredSuggestions.map((suggestion) => (
                <li 
                  key={suggestion}
                  className="px-4 py-2 hover:bg-[color:var(--color-accent-light)]/30 cursor-pointer text-sm text-[#1a1a1a] transition-colors"
                  onMouseDown={() => applySuggestion(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </form>
      
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-[#f8f9fa] border border-[#e5e5e5] rounded-xl shadow-sm"
        >
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-[color:var(--color-accent)] text-white flex items-center justify-center mr-3 mt-1 text-sm font-medium">
              AI
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1a1a1a] mb-1">AI Assistant</p>
              <div className="text-sm text-[#4a4a4a] leading-relaxed">
                {responseMessage}
                {isTyping && (
                  <span className="inline-block ml-1 animate-pulse text-[color:var(--color-accent)]">▋</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchExperience;
