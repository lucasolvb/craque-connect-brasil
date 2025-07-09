
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Building, Briefcase, Star, MapPin, Video, Shield } from 'lucide-react';
import ClubesParceiros from '@/components/ClubesParceiros';

const SuperLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">⚽</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Talentos</h1>
                <p className="text-sm text-gray-600">conectando você ao futebol</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">Acessar Sistema</Button>
              </Link>
              <Link to="/super-registro">
                <Button className="bg-green-600 hover:bg-green-700">Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section com Banner */}
      <section className="py-20 relative overflow-hidden">
        {/* Background com imagem de criança jogando futebol */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-yellow-500/10 to-blue-600/20"></div>
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Super Talentos
          </h1>
          <p className="text-2xl text-green-700 font-semibold mb-4">
            conectando você ao futebol
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            A maior rede de talentos do futebol brasileiro. Conectamos jogadores, clubes e empresários 
            de forma simples e eficiente, transformando sonhos em oportunidades reais.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 text-lg">
                Começar Agora
              </Button>
            </Link>
            <Link to="/explorar">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4">
                Explorar Talentos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clubes Parceiros */}
      <ClubesParceiros />

      {/* User Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Para Quem é o Super Talentos?
            </h2>
            <p className="text-lg text-gray-600">
              Nossa plataforma atende diferentes perfis do mundo do futebol
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Jogadores</h3>
                <p className="text-gray-600 mb-4">
                  Atletas que buscam oportunidades e querem se destacar no futebol
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                    Sou Jogador
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clubes & Olheiros</h3>
                <p className="text-gray-600 mb-4">
                  Clubes e profissionais que buscam identificar novos talentos
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Represento Clube
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empresários</h3>
                <p className="text-gray-600 mb-4">
                  Profissionais que trabalham com gestão de carreiras esportivas
                </p>
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                    Sou Empresário
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que Escolher o Super Talentos?
            </h2>
            <p className="text-lg text-gray-600">
              Recursos desenvolvidos especialmente para o futebol brasileiro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Portfólio em Vídeo</h3>
              <p className="text-sm text-gray-600">
                Mostre suas habilidades através de vídeos profissionais
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Busca Geolocalizada</h3>
              <p className="text-sm text-gray-600">
                Encontre talentos por região em todo o Brasil
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Perfil Verificado</h3>
              <p className="text-sm text-gray-600">
                Sistema de verificação para maior credibilidade
              </p>
            </div>

            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Ambiente Seguro</h3>
              <p className="text-sm text-gray-600">
                Plataforma segura e confiável para todos os usuários
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-brasil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de pessoas que já fazem parte do Super Talentos
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 font-bold px-8 py-4">
              Entrar no Sistema
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
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
