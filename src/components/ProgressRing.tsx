
import React, { useEffect, useState } from 'react';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;
}

const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
  showPercentage = true,
  color,
  backgroundColor = '#e5e7eb',
  animated = true
}: ProgressRingProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  // Animate progress on mount
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(progress);
    }
  }, [progress, animated]);

  // Dynamic color based on progress
  const getProgressColor = () => {
    if (color) return color;
    if (progress >= 80) return '#22c55e'; // green
    if (progress >= 60) return '#eab308'; // yellow
    if (progress >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getProgressColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={animated ? "transition-all duration-1000 ease-out" : ""}
            style={{
              filter: `drop-shadow(0 0 6px ${getProgressColor()}40)`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {showPercentage && (
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(animatedProgress)}%
              </div>
            )}
          </div>
        </div>
      </div>
      
      {label && (
        <div className="text-sm font-medium text-gray-600 text-center max-w-[120px]">
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
