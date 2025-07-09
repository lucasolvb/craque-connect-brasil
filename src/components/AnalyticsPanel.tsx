
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Eye, Heart, Search, MessageSquare, TrendingUp, Users, Play } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/contexts/AuthContext';

const AnalyticsPanel: React.FC = () => {
  const { user } = useAuth();
  const { playerAnalytics, clubAnalytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Carregando analytics...</p>
        </CardContent>
      </Card>
    );
  }

  if (user?.userType === 'jogador' && playerAnalytics) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Suas Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{playerAnalytics.profileViews}</p>
                <p className="text-sm text-gray-600">Visualizações</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{playerAnalytics.favoriteCount}</p>
                <p className="text-sm text-gray-600">Favoritos</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Search className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{playerAnalytics.searchAppearances}</p>
                <p className="text-sm text-gray-600">Buscas</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">+{playerAnalytics.weeklyViews[6] - playerAnalytics.weeklyViews[0]}</p>
                <p className="text-sm text-gray-600">Esta semana</p>
              </div>
            </div>

            {/* Weekly Views Chart */}
            <div>
              <h4 className="font-medium mb-3">Visualizações da Semana</h4>
              <div className="flex items-end space-x-2 h-32">
                {playerAnalytics.weeklyViews.map((views, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-green-600 rounded-t"
                      style={{ height: `${(views / Math.max(...playerAnalytics.weeklyViews)) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Performance */}
            <div>
              <h4 className="font-medium mb-3">Performance dos Vídeos</h4>
              <div className="space-y-3">
                {Object.entries(playerAnalytics.videoViews).map(([videoId, views], index) => (
                  <div key={videoId} className="flex items-center space-x-3">
                    <Play className="h-4 w-4 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vídeo {index + 1}</span>
                        <span>{views} visualizações</span>
                      </div>
                      <Progress value={(views / 200) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.userType === 'clube' && clubAnalytics) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics do Clube</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Search className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{clubAnalytics.searchesPerformed}</p>
                <p className="text-sm text-gray-600">Buscas</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{clubAnalytics.playersViewed}</p>
                <p className="text-sm text-gray-600">Jogadores vistos</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">{clubAnalytics.favoritesSaved}</p>
                <p className="text-sm text-gray-600">Favoritos</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{clubAnalytics.messagesent}</p>
                <p className="text-sm text-gray-600">Mensagens</p>
              </div>
            </div>

            {/* Weekly Activity */}
            <div>
              <h4 className="font-medium mb-3">Atividade Semanal</h4>
              <div className="flex items-end space-x-2 h-32">
                {clubAnalytics.weeklyActivity.map((activity, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-600 rounded-t"
                      style={{ height: `${(activity / Math.max(...clubAnalytics.weeklyActivity)) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 text-center text-gray-500">
        <p>Analytics não disponível para este tipo de usuário</p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
