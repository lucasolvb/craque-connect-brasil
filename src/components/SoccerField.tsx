
import React from 'react';

interface SoccerFieldProps {
  className?: string;
  opacity?: number;
}

const SoccerField = ({ className = '', opacity = 0.05 }: SoccerFieldProps) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="soccerField"
            x="0"
            y="0"
            width="800"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            {/* Field background */}
            <rect width="800" height="600" fill="#22c55e" />
            
            {/* Field lines */}
            <g stroke="#ffffff" strokeWidth="2" fill="none">
              {/* Outer boundary */}
              <rect x="50" y="50" width="700" height="500" />
              
              {/* Center line */}
              <line x1="400" y1="50" x2="400" y2="550" />
              
              {/* Center circle */}
              <circle cx="400" cy="300" r="80" />
              <circle cx="400" cy="300" r="2" fill="#ffffff" />
              
              {/* Left penalty area */}
              <rect x="50" y="180" width="120" height="240" />
              <rect x="50" y="230" width="60" height="140" />
              
              {/* Right penalty area */}
              <rect x="630" y="180" width="120" height="240" />
              <rect x="690" y="230" width="60" height="140" />
              
              {/* Goals */}
              <rect x="35" y="270" width="15" height="60" />
              <rect x="750" y="270" width="15" height="60" />
              
              {/* Corner arcs */}
              <path d="M 50 50 A 10 10 0 0 1 60 60" />
              <path d="M 750 50 A 10 10 0 0 0 740 60" />
              <path d="M 50 550 A 10 10 0 0 0 60 540" />
              <path d="M 750 550 A 10 10 0 0 1 740 540" />
            </g>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#soccerField)" />
      </svg>
    </div>
  );
};

export default SoccerField;
