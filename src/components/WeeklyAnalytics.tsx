
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, Users, Play } from 'lucide-react';

interface AnalyticsData {
  profileViews: number;
  videoViews: number;
  clubsInterested: number;
  weeklyGrowth: number;
}

const WeeklyAnalytics = () => {
  const data: AnalyticsData = {
    profileViews: 156,
    videoViews: 342,
    clubsInterested: 8,
    weeklyGrowth: 23
  };

  const metrics = [
    {
      label: 'Views do Perfil',
      value: data.profileViews,
      icon: <Eye className="h-5 w-5 text-blue-600" />,
      growth: '+15%'
    },
    {
      label: 'Vídeos Assistidos',
      value: data.videoViews,
      icon: <Play className="h-5 w-5 text-green-600" />,
      growth: '+28%'
    },
    {
      label: 'Clubes Interessados',
      value: data.clubsInterested,
      icon: <Users className="h-5 w-5 text-purple-600" />,
      growth: '+12%'
    }
  ];

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
          Meu Desempenho Esta Semana
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {metric.growth}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-800 font-medium">
                Crescimento semanal
              </div>
              <div className="text-2xl font-bold text-green-900">
                +{data.weeklyGrowth}%
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyAnalytics;
