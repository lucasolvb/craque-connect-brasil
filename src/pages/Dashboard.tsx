
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  Eye, 
  TrendingUp,
  Plus,
  Search,
  Bell,
  MessageSquare,
  BarChart3,
  Upload as UploadIcon
} from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import MessageChat from '@/components/MessageChat';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import VideoUpload from '@/components/VideoUpload';
import { mockJogadores } from '@/lib/auth';
import { useFavorites } from '@/hooks/useFavorites';
import { useMessages } from '@/hooks/useMessages';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { conversations } = useMessages();

  const favoritePlayes = mockJogadores.filter(player => isFavorite(player.id));
  const unreadMessages = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const handleVideoUpload = (videoUrl: string, thumbnail?: string) => {
    console.log('Video uploaded:', videoUrl, thumbnail);
    // In real app, would save to player profile
    setShowVideoUpload(false);
  };

  const renderJogadorDashboard = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="videos">Vídeos</TabsTrigger>
        <TabsTrigger value="messages">
          Mensagens
          {unreadMessages > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {unreadMessages}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visualizações</p>
                    <p className="text-2xl font-bold text-green-600">324</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Favoritos</p>
                    <p className="text-2xl font-bold text-red-600">12</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interesse</p>
                    <p className="text-2xl font-bold text-blue-600">8</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ranking</p>
                    <p className="text-2xl font-bold text-purple-600">#45</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setShowVideoUpload(true)}
                >
                  <Plus className="h-6 w-6" />
                  <span>Adicionar Vídeo</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Ver Mensagens</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart3 className="h-6 w-6" />
                  <span>Ver Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="videos">
        <div className="space-y-6">
          {showVideoUpload ? (
            <VideoUpload
              onUpload={handleVideoUpload}
              onRemove={() => setShowVideoUpload(false)}
              label="Adicionar novo vídeo"
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Meus Vídeos
                  <Button onClick={() => setShowVideoUpload(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Vídeo
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center py-8">
                  Você ainda não possui vídeos. Clique em "Adicionar Vídeo" para começar.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      <TabsContent value="messages">
        <MessageChat />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsPanel />
      </TabsContent>
    </Tabs>
  );

  const renderClubeDashboard = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="favorites">
          Favoritos
          {favorites.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {favorites.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="messages">
          Mensagens
          {unreadMessages > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {unreadMessages}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Jogadores Visualizados</p>
                    <p className="text-2xl font-bold text-green-600">156</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Favoritos</p>
                    <p className="text-2xl font-bold text-red-600">{favorites.length}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contatos Feitos</p>
                    <p className="text-2xl font-bold text-blue-600">{conversations.length}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Esta Semana</p>
                    <p className="text-2xl font-bold text-purple-600">+12</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Players */}
          <Card>
            <CardHeader>
              <CardTitle>Jogadores Recomendados</CardTitle>
              <p className="text-sm text-gray-600">Baseado no seu histórico de busca</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockJogadores.slice(0, 3).map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player}
                    onView={() => console.log('View player', player.id)}
                    onFavorite={() => toggleFavorite(player.id)}
                    isFavorited={isFavorite(player.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="favorites">
        <Card>
          <CardHeader>
            <CardTitle>Meus Jogadores Favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            {favoritePlayes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritePlayes.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player}
                    onView={() => console.log('View player', player.id)}
                    onFavorite={() => toggleFavorite(player.id)}
                    isFavorited={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">Nenhum favorito ainda</p>
                <p className="text-sm">Adicione jogadores aos favoritos para vê-los aqui</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="messages">
        <MessageChat />
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsPanel />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Olá, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              {user?.userType === 'jogador' && 'Acompanhe seu progresso e oportunidades'}
              {user?.userType === 'clube' && 'Descubra os melhores talentos do Brasil'}
              {user?.userType === 'empresario' && 'Gerencie seu portfólio de atletas'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </Button>
            <Badge variant={user?.userType === 'jogador' ? 'default' : 'secondary'}>
              {user?.userType === 'jogador' && 'Jogador'}
              {user?.userType === 'clube' && 'Clube/Olheiro'}
              {user?.userType === 'empresario' && 'Empresário'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      {user?.userType === 'jogador' && renderJogadorDashboard()}
      {user?.userType === 'clube' && renderClubeDashboard()}
      {user?.userType === 'empresario' && renderClubeDashboard()}
    </div>
  );
};

export default Dashboard;
