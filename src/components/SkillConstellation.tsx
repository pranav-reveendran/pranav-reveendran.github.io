
import React, { useEffect, useRef } from 'react';

interface Skill {
  name: string;
  level: number; // 1-10
  category: string;
}

interface SkillConstellationProps {
  skills: Skill[];
}

const SkillConstellation: React.FC<SkillConstellationProps> = ({ skills }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    // Initial size
    updateCanvasDimensions();

    // Update on resize
    window.addEventListener('resize', updateCanvasDimensions);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate center of canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Base radius for the constellation
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.35;
    
    // Draw the skills as points in a constellation
    const drawSkills = () => {
      // Group skills by category
      const categories = [...new Set(skills.map(skill => skill.category))];
      const skillsByCategory: Record<string, Skill[]> = {};
      
      categories.forEach(category => {
        skillsByCategory[category] = skills.filter(skill => skill.category === category);
      });

      // Colors for different categories
      const categoryColors: Record<string, string> = {
        "Front-End": "#E97E3F",
        "Back-End": "#5436DA",
        "Tools & Methods": "#37CDBE",
        "UI/UX Design": "#F7A081"
      };

      // Draw connections between points
      ctx.strokeStyle = 'rgba(233, 126, 63, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // Connect points within categories
      Object.values(skillsByCategory).forEach(categorySkills => {
        if (categorySkills.length <= 1) return;
        
        for (let i = 0; i < categorySkills.length; i++) {
          for (let j = i + 1; j < categorySkills.length; j++) {
            const angle1 = (i / categorySkills.length) * Math.PI * 2;
            const angle2 = (j / categorySkills.length) * Math.PI * 2;
            const radius1 = baseRadius * (0.5 + categorySkills[i].level / 20);
            const radius2 = baseRadius * (0.5 + categorySkills[j].level / 20);
            
            const x1 = centerX + Math.cos(angle1) * radius1;
            const y1 = centerY + Math.sin(angle1) * radius1;
            const x2 = centerX + Math.cos(angle2) * radius2;
            const y2 = centerY + Math.sin(angle2) * radius2;
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        }
      });
      
      ctx.stroke();

      // Draw constellation points
      let angleOffset = 0;
      Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
        const totalAngle = (categorySkills.length / skills.length) * Math.PI * 2;
        const baseAngle = angleOffset;
        
        categorySkills.forEach((skill, index) => {
          const angle = baseAngle + (index / categorySkills.length) * totalAngle;
          const radius = baseRadius * (0.5 + skill.level / 20);
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          // Draw point
          ctx.beginPath();
          ctx.arc(x, y, 4 + (skill.level / 2), 0, Math.PI * 2);
          ctx.fillStyle = categoryColors[category] || '#E97E3F';
          ctx.fill();
          
          // Draw skill name
          ctx.font = '12px Inter, sans-serif';
          ctx.fillStyle = '#1A1A1A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Position text with offset based on angle
          const textX = x + Math.cos(angle) * 15;
          const textY = y + Math.sin(angle) * 15;
          ctx.fillText(skill.name, textX, textY);
        });
        
        angleOffset += totalAngle;
      });
    };

    // Draw center point (optional)
    const drawCenterPoint = () => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#E97E3F';
      ctx.fill();
    };

    // Draw the visualization
    drawSkills();
    drawCenterPoint();

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [skills]);

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default SkillConstellation;
