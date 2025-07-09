
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RankingPlayer {
  position: number;
  name: string;
  points: number;
  change: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

const PlayerRanking = () => {
  const mockRanking: RankingPlayer[] = [
    { position: 1, name: 'Gabriel Silva', points: 3450, change: 'same' },
    { position: 2, name: 'Lucas Santos', points: 3200, change: 'up' },
    { position: 3, name: 'Rafael Costa', points: 2980, change: 'down' },
    { position: 4, name: 'Você', points: 2750, change: 'up', isCurrentUser: true },
    { position: 5, name: 'Pedro Lima', points: 2650, change: 'down' },
  ];

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-600 font-bold';
      case 2: return 'text-gray-600 font-bold';
      case 3: return 'text-orange-600 font-bold';
      default: return 'text-gray-900 font-medium';
    }
  };

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
          Ranking da Sua Posição
        </CardTitle>
        <p className="text-sm text-gray-600">Atacantes • São Paulo</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {mockRanking.map((player) => (
          <div
            key={player.position}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              player.isCurrentUser 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`text-lg ${getPositionStyle(player.position)}`}>
                {player.position}º
              </div>
              <div>
                <div className="font-medium text-gray-900 flex items-center">
                  {player.name}
                  {player.isCurrentUser && (
                    <Badge className="ml-2 bg-green-600 text-white text-xs">
                      Você
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {player.points.toLocaleString()} pontos
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              {getChangeIcon(player.change)}
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4">
          Ver Ranking Completo
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlayerRanking;
