import React from 'react';

// Layout Stability Component to prevent CLS (Cumulative Layout Shift)
export const LayoutStabilizer: React.FC<{
  children: React.ReactNode;
  minHeight?: string;
  aspectRatio?: string;
}> = ({ children, minHeight = "100vh", aspectRatio }) => {
  return (
    <div 
      style={{ 
        minHeight,
        aspectRatio,
        position: 'relative',
        contain: 'layout style paint',
        willChange: 'auto' // Reset will-change after animations
      }}
    >
      {children}
    </div>
  );
};

// Background Container with stable dimensions
export const StableBackgroundContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div 
      className="fixed inset-0 w-full h-full z-0 overflow-hidden"
      style={{
        contain: 'strict', // Prevent layout thrashing
        willChange: 'auto',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)' // GPU layer
      }}
    >
      {/* Stable background placeholder */}
      <div 
        className="absolute inset-0 bg-white opacity-95"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
      />
      {children}
    </div>
  );
};

// Image placeholder to prevent CLS during loading
export const ImagePlaceholder: React.FC<{
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
}> = ({ width, height, aspectRatio = "16/9", className = "" }) => {
  return (
    <div 
      className={`bg-gray-100 animate-pulse ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio,
        minHeight: height ? `${height}px` : '200px'
      }}
    />
  );
};

// Skeleton for text content
export const TextSkeleton: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="bg-gray-200 animate-pulse h-4 rounded"
          style={{ 
            width: i === lines - 1 ? '70%' : '100%',
            minHeight: '16px'
          }}
        />
      ))}
    </div>
  );
}; 