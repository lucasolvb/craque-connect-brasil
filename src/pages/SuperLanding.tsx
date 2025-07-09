
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Building, Briefcase, Star, MapPin, Video, Shield, Play, CheckCircle } from 'lucide-react';
import ClubesParceiros from '@/components/ClubesParceiros';

const SuperLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚽</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Talentos</h1>
                <p className="text-sm text-green-600 font-medium">Futebol para Todos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">Acessar Sistema</Button>
              </Link>
              <Link to="/super-registro">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com imagem de fundo */}
      <section className="relative py-20 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        
        {/* Overlay gradiente verde semi-transparente */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-700/70 to-green-800/80"></div>
        
        {/* Elementos gráficos sutis */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforme Seu Talento
            <span className="block text-yellow-400">
              em Oportunidade
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            A plataforma onde jovens talentos do futebol brasileiro são descobertos 
            por clubes e empresários de todo o país
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="mr-3 h-6 w-6" />
                Criar Meu Perfil de Jogador
              </Button>
            </Link>
            <Link to="/historias">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-bold"
              >
                <Play className="mr-3 h-6 w-6" />
                Ver Histórias de Sucesso
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>100% Gratuito</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Totalmente Seguro</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Milhares de Talentos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clubes que Confiam em Nós */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Clubes que Confiam em Nós
          </h2>
          <ClubesParceiros />
        </div>
      </section>

      {/* Destaque para jogadores */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seu Sonho no Futebol Começa Aqui
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Junte-se a milhares de jogadores que já fazem parte da nossa rede
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Mostre Seu Talento</h3>
                <p className="text-gray-600 mb-6">
                  Envie vídeos dos seus melhores lances e seja visto por olheiros profissionais
                </p>
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-green-800 font-medium text-sm">+100 pontos por vídeo</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Conecte-se com Clubes</h3>
                <p className="text-gray-600 mb-6">
                  Acesso direto a clubes parceiros em todo o Brasil
                </p>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-blue-800 font-medium text-sm">+50 clubes parceiros</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Seja Descoberto</h3>
                <p className="text-gray-600 mb-6">
                  Empresários e olheiros procuram novos talentos todos os dias
                </p>
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-purple-800 font-medium text-sm">Rankings semanais</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Para outros usuários */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Profissionais do Futebol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow border-0 shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Clubes & Olheiros</h3>
                <p className="text-gray-600 mb-4">
                  Encontre novos talentos e acompanhe jogadores promissores
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Buscar Talentos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-shadow border-0 shadow-md bg-white">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Empresários</h3>
                <p className="text-gray-600 mb-4">
                  Gerencie carreiras e descubra os próximos craques do futebol
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                    Gerenciar Atletas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sua Hora de Brilhar Chegou!
          </h2>
          <p className="text-xl text-white mb-8">
            Milhares de jogadores já deram o primeiro passo. E você?
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg shadow-xl">
              Criar Meu Perfil Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">⚽</span>
              </div>
              <div>
                <h3 className="font-bold">Super Talentos</h3>
                <p className="text-sm text-gray-400">Futebol para Todos</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 Super Talentos. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperLanding;
