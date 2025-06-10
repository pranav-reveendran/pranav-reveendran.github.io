
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  lines: string[];
  typingSpeed?: number;
  delayBetweenLines?: number;
  prefix?: string;
  className?: string;
}

export default function Typewriter({ 
  lines, 
  typingSpeed = 80, 
  delayBetweenLines = 1000,
  prefix = "$",
  className = ""
}: TypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (currentLineIndex >= lines.length) return;
    
    const currentLine = lines[currentLineIndex];
    
    if (isTyping) {
      if (currentText.length < currentLine.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentLine.substring(0, currentText.length + 1));
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setIsTyping(true);
            setCurrentText('');
            setCurrentLineIndex(prev => prev + 1);
          }
        }, delayBetweenLines);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isTyping, currentLineIndex, lines, typingSpeed, delayBetweenLines]);
  
  return (
    <div className={`font-mono text-sm md:text-base ${className}`}>
              {prefix && <span className="text-gray-600 dark:text-gray-300">{prefix}</span>} {currentText}
      <span className="animate-pulse">_</span>
    </div>
  );
}
