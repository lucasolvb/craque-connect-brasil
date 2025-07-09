
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Building, Briefcase, Star, MapPin, Video, Shield } from 'lucide-react';
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
                <p className="text-sm text-gray-600">conectando você ao futebol</p>
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

      {/* Hero Section com Banner de crianças jogando futebol */}
      <section className="py-20 relative overflow-hidden bg-green-600">
        {/* Background com imagem de crianças jogando futebol */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Super Talentos
          </h1>
          <p className="text-2xl text-yellow-300 font-semibold mb-4">
            conectando você ao futebol
          </p>
          <p className="text-lg text-white mb-12 max-w-3xl mx-auto">
            Sua chance de brilhar no futebol brasileiro chegou! Mostre seu talento, conecte-se com clubes e empresários, 
            e transforme sua paixão pelo futebol em uma carreira profissional.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Começar Minha Jornada
              </Button>
            </Link>
            <Link to="/explorar">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 border-0">
                Ver Outros Talentos
              </Button>
            </Link>
          </div>
          
          {/* Destaque para jogadores */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Video className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mostre Seu Talento</h3>
              <p className="text-gray-600">Envie vídeos dos seus melhores lances e seja visto por olheiros profissionais</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conecte-se com Clubes</h3>
              <p className="text-gray-600">Acesso direto a clubes parceiros em todo o Brasil</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Seja Descoberto</h3>
              <p className="text-gray-600">Empresários e olheiros procuram novos talentos todos os dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clubes Parceiros */}
      <ClubesParceiros />

      {/* User Types - Focado em jogadores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seu Sonho no Futebol Começa Aqui
            </h2>
            <p className="text-lg text-gray-600">
              Junte-se a milhares de jogadores que já fazem parte da nossa rede
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow border-0 shadow-md bg-green-50 border-l-4 border-l-green-600">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Sou Jogador</h3>
                <p className="text-gray-700 mb-4">
                  Crie seu perfil, envie seus vídeos e seja descoberto por clubes e empresários
                </p>
                <Link to="/dashboard">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Criar Meu Perfil
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clubes & Olheiros</h3>
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

            <Card className="text-center p-6 hover:shadow-xl transition-shadow border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empresários</h3>
                <p className="text-gray-600 mb-4">
                  Gerencie carreiras e descubra os próximos craques do futebol
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                    Gerenciar Atletas
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tudo Que Você Precisa Para Decolar
            </h2>
            <p className="text-lg text-gray-600">
              Ferramentas profissionais para impulsionar sua carreira no futebol
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-green-800">Vídeos Profissionais</h3>
              <p className="text-sm text-gray-600">
                Carregue vídeos dos seus melhores momentos em campo
              </p>
            </div>

            <div className="text-center bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-blue-800">Visibilidade Nacional</h3>
              <p className="text-sm text-gray-600">
                Seja encontrado por clubes em todo o Brasil
              </p>
            </div>

            <div className="text-center bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-yellow-800">Perfil Verificado</h3>
              <p className="text-sm text-gray-600">
                Tenha credibilidade com perfil verificado
              </p>
            </div>

            <div className="text-center bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2 text-gray-800">100% Seguro</h3>
              <p className="text-sm text-gray-600">
                Plataforma segura e confiável para todos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sua Hora de Brilhar Chegou!
          </h2>
          <p className="text-xl text-white mb-8">
            Milhares de jogadores já deram o primeiro passo. E você?
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4">
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
                <p className="text-sm text-gray-400">conectando você ao futebol</p>
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
