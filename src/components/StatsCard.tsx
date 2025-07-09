
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const StatsCard = ({
  icon: Icon,
  iconColor,
  title,
  value,
  change,
  changeLabel,
  gradientFrom = 'from-white',
  gradientTo = 'to-gray-50'
}: StatsCardProps) => {
  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <Card className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {isPositiveChange ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : isNegativeChange ? (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                ) : null}
                <span className={`text-sm font-medium ${
                  isPositiveChange ? 'text-green-600' : 
                  isNegativeChange ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {changeLabel && (
                  <span className="text-sm text-gray-500">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconColor}`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
