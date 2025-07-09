
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner = ({ size = 'md', color = '#22c55e' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Soccer ball spinner */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{ 
            borderTopColor: color,
            borderRightColor: color,
          }}
        />
        
        {/* Soccer ball pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="w-full h-full animate-pulse"
            fill={color}
          >
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm-1.031 7.5l-3.75 1.85 1.45 3.6h4.662l1.45-3.6-3.75-1.85h-.062zm.031 1.371l2.34 1.157-.906 2.251h-2.906l-.906-2.251 2.34-1.157h.132zm-3.969-3.621l2.25 1.621.719-1.183-2.188-1.871c-.294.473-.559.962-.781 1.433zm7.938 0c-.222-.471-.487-.96-.781-1.433l-2.188 1.871.719 1.183 2.25-1.621zm-3.969 9.75c.294-.473.559-.962.781-1.433l-2.25-1.621-.719 1.183 2.188 1.871z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
