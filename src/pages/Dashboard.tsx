
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Heart, 
  Eye, 
  TrendingUp, 
  Calendar, 
  MapPin,
  Star,
  Plus,
  Search,
  Bell
} from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import { mockJogadores } from '@/lib/auth';

const Dashboard = () => {
  const { user } = useAuth();

  const renderJogadorDashboard = () => (
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
              <Star className="h-8 w-8 text-blue-600" />
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
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Adicionar Vídeo</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Ver Interessados</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Melhorar Perfil</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Novo curtiu seu perfil', who: 'Santos FC', time: '2 horas atrás', type: 'like' },
              { action: 'Visualizou seus vídeos', who: 'João Silva (Olheiro)', time: '5 horas atrás', type: 'view' },
              { action: 'Adicionou aos favoritos', who: 'Palmeiras', time: '1 dia atrás', type: 'favorite' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'like' ? 'bg-green-500' : 
                    activity.type === 'view' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{activity.who}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClubeDashboard = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar jogadores por nome, posição, cidade..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              Buscar Talentos
            </Button>
          </div>
        </CardContent>
      </Card>

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
                <p className="text-2xl font-bold text-red-600">23</p>
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
                <p className="text-2xl font-bold text-blue-600">18</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
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
            {mockJogadores.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player}
                onView={() => console.log('View player', player.id)}
                onFavorite={() => console.log('Favorite player', player.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmpresarioDashboard = () => (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Atletas Representados</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Propostas Ativas</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contratos Fechados</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Novos Talentos</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <Search className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Athletes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Meus Atletas</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Atleta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockJogadores.slice(0, 3).map((player) => (
              <div key={player.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">{player.nomeCompleto}</h4>
                    <p className="text-sm text-gray-600">{player.posicaoPrincipal} • {player.cidade}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Ativo</Badge>
                  <Button size="sm" variant="outline">Ver Perfil</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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
      {user?.userType === 'empresario' && renderEmpresarioDashboard()}
    </div>
  );
};

export default Dashboard;
