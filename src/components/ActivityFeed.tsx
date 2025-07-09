
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Trophy, Users, TrendingUp, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'view' | 'ranking' | 'newPlayer' | 'achievement';
  message: string;
  time: string;
  icon: React.ReactNode;
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'view',
      message: 'Clube Palmeiras visualizou seu perfil',
      time: 'há 2 horas',
      icon: <Eye className="h-4 w-4 text-blue-600" />
    },
    {
      id: '2',
      type: 'ranking',
      message: 'Você subiu para 4º lugar no ranking regional',
      time: 'há 5 horas',
      icon: <TrendingUp className="h-4 w-4 text-green-600" />
    },
    {
      id: '3',
      type: 'achievement',
      message: 'Conquistou o badge "Perfil Completo"',
      time: 'há 1 dia',
      icon: <Trophy className="h-4 w-4 text-yellow-600" />
    },
    {
      id: '4',
      type: 'newPlayer',
      message: 'Novo talento da sua região: Lucas Santos',
      time: 'há 1 dia',
      icon: <Users className="h-4 w-4 text-purple-600" />
    },
    {
      id: '5',
      type: 'view',
      message: 'Empresário João Silva curtiu seu vídeo',
      time: 'há 2 dias',
      icon: <Eye className="h-4 w-4 text-blue-600" />
    }
  ];

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-green-600" />
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}

        <div className="text-center pt-3 border-t">
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            Ver todas as atividades
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
