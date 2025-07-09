
import { useState, useCallback } from 'react';

export const useSuccessAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerSuccess = useCallback(() => {
    setIsAnimating(true);
    
    // Create confetti effect
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉';
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-50px';
      confetti.style.fontSize = '20px';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = 'confetti-fall 3s ease-out forwards';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 3000);
    };

    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createConfetti(), i * 100);
    }

    setTimeout(() => setIsAnimating(false), 3000);
  }, []);

  return { isAnimating, triggerSuccess };
};

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
  @keyframes confetti-fall {
    from {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
