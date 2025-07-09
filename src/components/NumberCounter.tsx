
import React, { useEffect, useState } from 'react';

interface NumberCounterProps {
  end: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const NumberCounter = ({
  end,
  duration = 2000,
  start = 0,
  suffix = '',
  prefix = '',
  className = ''
}: NumberCounterProps) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [end, duration, start]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default NumberCounter;
