
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, TrendingUp } from 'lucide-react';

interface PlayerScoreWidgetProps {
  currentPoints: number;
  currentLevel: string;
  nextLevel: string;
  pointsToNext: number;
  weeklyGrowth: number;
}

const PlayerScoreWidget = ({ 
  currentPoints = 1250, 
  currentLevel = "Talento", 
  nextLevel = "Craque Regional",
  pointsToNext = 750,
  weeklyGrowth = 15
}: PlayerScoreWidgetProps) => {
  const totalPointsNeeded = 2000;
  const progress = ((currentPoints) / totalPointsNeeded) * 100;

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Promessa': return '🌱';
      case 'Talento': return '⭐';
      case 'Craque Regional': return '🏆';
      case 'Futuro Profissional': return '👑';
      default: return '⚽';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Promessa': return 'bg-green-100 text-green-800';
      case 'Talento': return 'bg-blue-100 text-blue-800';
      case 'Craque Regional': return 'bg-purple-100 text-purple-800';
      case 'Futuro Profissional': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getLevelIcon(currentLevel)}</div>
            <div>
              <Badge className={getLevelColor(currentLevel)}>
                {currentLevel}
              </Badge>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {currentPoints.toLocaleString()} pontos
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              +{weeklyGrowth}% esta semana
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progresso para {nextLevel}</span>
            <span className="font-medium">{pointsToNext} pontos restantes</span>
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-3 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+100</div>
              <div className="text-xs text-gray-500">Upload vídeo</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">+10</div>
              <div className="text-xs text-gray-500">Login diário</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-600">+50</div>
              <div className="text-xs text-gray-500">Perfil completo</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerScoreWidget;
