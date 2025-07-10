
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
  Upload as UploadIcon,
  Home,
  Video,
  Trophy,
  MessageCircle
} from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import MessageChat from '@/components/MessageChat';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import VideoUpload from '@/components/VideoUpload';
import PlayerScoreWidget from '@/components/PlayerScoreWidget';
import WeeklyChallenge from '@/components/WeeklyChallenge';
import PlayerRanking from '@/components/PlayerRanking';
import ActivityFeed from '@/components/ActivityFeed';
import WeeklyAnalytics from '@/components/WeeklyAnalytics';
import StatsCard from '@/components/StatsCard';
import DashboardGrid from '@/components/DashboardGrid';
import SoccerField from '@/components/SoccerField';
import AchievementBadge from '@/components/AchievementBadge';
import { mockJogadores } from '@/lib/auth';
import { useFavorites } from '@/hooks/useFavorites';
import { useMessages } from '@/hooks/useMessages';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { conversations } = useMessages();

  // Se não há usuário, criamos um usuário mock para demonstração
  const currentUser = user || {
    id: 'demo-user',
    name: 'Usuário Demo',
    email: 'demo@example.com',
    userType: 'jogador'
  };

  const favoritePlayes = mockJogadores.filter(player => isFavorite(player.id));
  const unreadMessages = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const handleVideoUpload = (videoUrl: string, thumbnail?: string) => {
    console.log('Video uploaded:', videoUrl, thumbnail);
    setShowVideoUpload(false);
  };

  const renderJogadorDashboard = () => (
    <div className="space-y-6 relative">
      {/* Soccer field background */}
      <SoccerField />
      
      {/* Header com pontuação */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {currentUser?.name}! 👋
            </h1>
            <p className="text-gray-600">Transforme seu talento em oportunidade</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <PlayerScoreWidget />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Vídeos</span>
          </TabsTrigger>
          <TabsTrigger value="ranking" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Ranking</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Mensagens</span>
            {unreadMessages > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Primeira linha - Analytics e Desafio */}
            <DashboardGrid columns={2}>
              <WeeklyAnalytics />
              <WeeklyChallenge />
            </DashboardGrid>

            {/* Segunda linha - Ranking e Atividades */}
            <DashboardGrid columns={2}>
              <PlayerRanking />
              <ActivityFeed />
            </DashboardGrid>

            {/* Stats Cards */}
            <DashboardGrid columns={4}>
              <StatsCard
                icon={Eye}
                iconColor="bg-green-600"
                title="Visualizações"
                value={324}
                change={15}
                changeLabel="esta semana"
                gradientFrom="from-green-50"
                gradientTo="to-green-100"
              />
              <StatsCard
                icon={Heart}
                iconColor="bg-red-600"
                title="Favoritos"
                value={12}
                change={8}
                changeLabel="esta semana"
                gradientFrom="from-red-50"
                gradientTo="to-red-100"
              />
              <StatsCard
                icon={MessageSquare}
                iconColor="bg-blue-600"
                title="Interesse"
                value={8}
                change={-2}
                changeLabel="esta semana"
                gradientFrom="from-blue-50"
                gradientTo="to-blue-100"
              />
              <StatsCard
                icon={TrendingUp}
                iconColor="bg-purple-600"
                title="Ranking"
                value="#4"
                gradientFrom="from-purple-50"
                gradientTo="to-purple-100"
              />
            </DashboardGrid>

            {/* Conquistas */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Suas Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <AchievementBadge
                    type="gold"
                    category="performance"
                    title="Primeiro Vídeo"
                    description="Parabéns por adicionar seu primeiro vídeo!"
                    earned={true}
                  />
                  <AchievementBadge
                    type="silver"
                    category="engagement"
                    title="Popular"
                    description="Recebeu mais de 50 visualizações"
                    earned={true}
                  />
                  <AchievementBadge
                    type="bronze"
                    category="milestone"
                    title="Perfil Completo"
                    description="Completou 100% do perfil"
                    earned={true}
                  />
                  <AchievementBadge
                    type="gold"
                    category="skill"
                    title="Craque Regional"
                    description="Entre os top 10 da sua região"
                    earned={false}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardGrid columns={3}>
                  <Button 
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setShowVideoUpload(true)}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Adicionar Vídeo</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center space-y-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span>Ver Mensagens</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto p-4 flex flex-col items-center space-y-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => setActiveTab('analytics')}
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span>Ver Analytics</span>
                  </Button>
                </DashboardGrid>
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
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Meus Vídeos
                    <Button onClick={() => setShowVideoUpload(true)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Vídeo
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center py-8">
                    Você ainda não possui vídeos. Clique em "Adicionar Vídeo" para começar e ganhar +100 pontos!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ranking">
          <DashboardGrid columns={2}>
            <PlayerRanking />
            <WeeklyChallenge />
          </DashboardGrid>
        </TabsContent>

        <TabsContent value="messages">
          <MessageChat />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>
    </div>
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
          <DashboardGrid columns={4}>
            <StatsCard
              icon={Eye}
              iconColor="bg-green-600"
              title="Jogadores Visualizados"
              value={156}
              change={12}
              changeLabel="esta semana"
            />
            <StatsCard
              icon={Heart}
              iconColor="bg-red-600"
              title="Favoritos"
              value={favorites.length}
              change={5}
              changeLabel="esta semana"
            />
            <StatsCard
              icon={MessageSquare}
              iconColor="bg-blue-600"
              title="Contatos Feitos"
              value={conversations.length}
              change={3}
              changeLabel="esta semana"
            />
            <StatsCard
              icon={TrendingUp}
              iconColor="bg-purple-600"
              title="Esta Semana"
              value="+12"
              change={25}
              changeLabel="vs anterior"
            />
          </DashboardGrid>

          {/* Recommended Players */}
          <Card>
            <CardHeader>
              <CardTitle>Jogadores Recomendados</CardTitle>
              <p className="text-sm text-gray-600">Baseado no seu histórico de busca</p>
            </CardHeader>
            <CardContent>
              <DashboardGrid columns={3}>
                {mockJogadores.slice(0, 3).map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player}
                    onView={() => console.log('View player', player.id)}
                    onFavorite={() => toggleFavorite(player.id)}
                    isFavorited={isFavorite(player.id)}
                  />
                ))}
              </DashboardGrid>
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
              <DashboardGrid columns={3}>
                {favoritePlayes.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player}
                    onView={() => console.log('View player', player.id)}
                    onFavorite={() => toggleFavorite(player.id)}
                    isFavorited={true}
                  />
                ))}
              </DashboardGrid>
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
      {/* Dashboard Content */}
      {currentUser?.userType === 'jogador' && renderJogadorDashboard()}
      {currentUser?.userType === 'clube' && renderClubeDashboard()}
      {currentUser?.userType === 'empresario' && renderClubeDashboard()}
    </div>
  );
};

export default Dashboard;
