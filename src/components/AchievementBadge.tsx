
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trophy, Star, Award, Medal, Target, Zap } from 'lucide-react';

export type BadgeType = 'bronze' | 'silver' | 'gold';
export type BadgeCategory = 'performance' | 'engagement' | 'milestone' | 'skill' | 'special';

interface AchievementBadgeProps {
  type: BadgeType;
  category: BadgeCategory;
  title: string;
  description: string;
  earned?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showShine?: boolean;
}

const AchievementBadge = ({
  type,
  category,
  title,
  description,
  earned = true,
  size = 'md',
  showShine = true
}: AchievementBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeStyles = (type: BadgeType) => {
    const styles = {
      bronze: {
        bg: 'bg-gradient-to-br from-amber-600 to-amber-800',
        border: 'border-amber-500',
        glow: 'shadow-amber-500/30',
        shine: 'from-amber-300 to-transparent'
      },
      silver: {
        bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
        border: 'border-gray-400',
        glow: 'shadow-gray-500/30',
        shine: 'from-gray-200 to-transparent'
      },
      gold: {
        bg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
        border: 'border-yellow-400',
        glow: 'shadow-yellow-500/40',
        shine: 'from-yellow-200 to-transparent'
      }
    };
    return styles[type];
  };

  const getCategoryIcon = (category: BadgeCategory) => {
    const icons = {
      performance: Trophy,
      engagement: Star,
      milestone: Award,
      skill: Target,
      special: Medal
    };
    return icons[category] || Trophy;
  };

  const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
    const sizes = {
      sm: { container: 'w-12 h-12', icon: 'h-6 w-6' },
      md: { container: 'w-16 h-16', icon: 'h-8 w-8' },
      lg: { container: 'w-20 h-20', icon: 'h-10 w-10' }
    };
    return sizes[size];
  };

  const typeStyles = getTypeStyles(type);
  const Icon = getCategoryIcon(category);
  const sizeClasses = getSizeClasses(size);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`relative ${sizeClasses.container} rounded-full cursor-pointer transition-all duration-300 transform ${
              earned 
                ? `${typeStyles.bg} border-2 ${typeStyles.border} shadow-lg hover:scale-110 ${isHovered ? `shadow-2xl ${typeStyles.glow}` : ''}` 
                : 'bg-gray-300 border-2 border-gray-400 opacity-50'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon 
                className={`${sizeClasses.icon} ${earned ? 'text-white' : 'text-gray-500'}`} 
              />
            </div>
            
            {/* Shine effect */}
            {earned && showShine && (
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-tr ${typeStyles.shine} opacity-0 hover:opacity-30 transition-opacity duration-300`}
              />
            )}
            
            {/* Animated glow for earned badges */}
            {earned && isHovered && (
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-center">
            <p className="font-semibold text-sm mb-1">{title}</p>
            <p className="text-xs text-gray-600">{description}</p>
            {!earned && (
              <Badge variant="outline" className="mt-2 text-xs">
                Não conquistado
              </Badge>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
