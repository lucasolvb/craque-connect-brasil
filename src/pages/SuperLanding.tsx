
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
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">⚽</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Super Talentos</h1>
                <p className="text-xs sm:text-sm text-green-600 font-medium">Futebol para Todos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">Acessar Sistema</Button>
              </Link>
              <Link to="/super-registro">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2">Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com imagem de fundo */}
      <section className="relative py-12 sm:py-20 overflow-hidden min-h-[500px] sm:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        
        {/* Overlay gradiente verde semi-transparente */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-700/70 to-green-800/80"></div>
        
        {/* Elementos gráficos sutis */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Transforme Seu Talento
            <span className="block text-yellow-400">
              em Oportunidade
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Mostre seu futebol para os maiores clubes e empresários do mercado e fique atento às oportunidades!
          </p>
          
          <div className="flex justify-center mb-8 sm:mb-16">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Criar Meu Perfil de Jogador
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <p className="text-base sm:text-lg text-white/90 font-medium">
              Agora você pode mostrar seu futebol ao mundo!
            </p>
          </div>
        </div>
      </section>

      {/* Clubes que Confiam em Nós */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClubesParceiros />
        </div>
      </section>

      {/* Destaque para jogadores com imagem de fundo */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        {/* Background Image - mesma do banner principal */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        
        {/* Overlay gradiente verde semi-transparente - igual ao primeiro banner */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-700/70 to-green-800/80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Seu Sonho no Futebol Começa Aqui
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Junte-se a milhares de jogadores que já fazem parte da nossa rede
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <Card className="text-center p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white/95 backdrop-blur-sm">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Video className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Mostre Seu Talento</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Envie vídeos dos seus melhores lances e seja visto por olheiros profissionais
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white/95 backdrop-blur-sm">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Conecte-se com Clubes</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Acesso direto a clubes parceiros em todo o Brasil
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md bg-white/95 backdrop-blur-sm">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Seja Descoberto</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Empresários e olheiros procuram novos talentos todos os dias
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Para outros usuários */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Para Profissionais do Futebol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="text-center p-4 sm:p-6 hover:shadow-xl transition-shadow border-0 shadow-md bg-white">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Building className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Clubes & Olheiros</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Encontre novos talentos e acompanhe jogadores promissores
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 text-sm">
                    Buscar Talentos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-4 sm:p-6 hover:shadow-xl transition-shadow border-0 shadow-md bg-white">
              <CardContent className="pt-4 sm:pt-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Empresários</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Gerencie carreiras e descubra os próximos craques do futebol
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 text-sm">
                    Gerenciar Atletas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Sua Hora de Brilhar Chegou! ⭐
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 px-4">
            Milhares de jogadores já deram o primeiro passo. E você?
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl">
              Criar Meu Perfil Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">⚽</span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">Super Talentos</h3>
                <p className="text-xs sm:text-sm text-gray-400">Futebol para Todos</p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
              © 2024 Super Talentos. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SuperLanding;
