
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would be an API call to your backend
    const getVisitorCount = () => {
      // Simulate API call
      setTimeout(() => {
        // Get from localStorage for demo purposes
        const storedCount = localStorage.getItem('visitorCount');
        let visitors = storedCount ? parseInt(storedCount, 10) : 0;
        
        // Increment count for this visit (only once per session)
        if (!sessionStorage.getItem('counted')) {
          visitors += 1;
          localStorage.setItem('visitorCount', visitors.toString());
          sessionStorage.setItem('counted', 'true');
        }
        
        setCount(visitors);
        setLoading(false);
      }, 800);
    };

    getVisitorCount();
  }, []);

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={() => setVisible(!visible)}
        className="bg-site-accent text-site-neutral-light p-3 rounded-full shadow-subtle hover:shadow-medium transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle visitor count"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </motion.button>

      {visible && (
        <motion.div 
          className="absolute bottom-full right-0 mb-3 bg-site-neutral-light shadow-medium rounded-lg p-3 min-w-[180px]"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <h4 className="font-semibold text-site-text text-sm mb-1">Website Visits</h4>
          {loading ? (
            <div className="flex items-center justify-center h-6">
              <div className="w-4 h-4 border-2 border-site-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <p className="text-site-text">
              <span className="text-lg font-bold text-site-accent">{count}</span> visitors
            </p>
          )}
          <div className="absolute right-4 bottom-[-6px] w-3 h-3 bg-site-neutral-light transform rotate-45"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VisitorCounter;
