
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Search, Star, Trophy, Play, CheckCircle } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Para Jogadores',
      description: 'Crie seu perfil profissional, mostre seus vídeos e seja descoberto por clubes e empresários.',
      benefits: ['Perfil profissional gratuito', 'Upload de vídeos', 'Visibilidade nacional']
    },
    {
      icon: Search,
      title: 'Para Clubes e Olheiros',
      description: 'Encontre talentos em todo o Brasil com filtros avançados e sistema de favoritos.',
      benefits: ['Busca avançada', 'Acesso a vídeos', 'Sistema de favoritos']
    },
    {
      icon: Star,
      title: 'Para Empresários',
      description: 'Descubra novos talentos e gerencie seu portfólio de atletas de forma eficiente.',
      benefits: ['Gestão de atletas', 'Relatórios detalhados', 'Network profissional']
    }
  ];

  const stats = [
    { number: '5.000+', label: 'Jogadores Cadastrados' },
    { number: '200+', label: 'Clubes Parceiros' },
    { number: '1.500+', label: 'Conexões Realizadas' },
    { number: '98%', label: 'Satisfação dos Usuários' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              O Futuro do Futebol
              <span className="block text-yellow-300">Começa Aqui</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              A maior plataforma do Brasil para conectar jogadores de futebol com clubes, 
              olheiros e empresários. Seu talento merece ser descoberto.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/registro">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
                  Cadastre-se Grátis
                </Button>
              </Link>
              <Link to="/explorar">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5" />
                  Explorar Talentos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Uma Plataforma Para Todos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos todos os agentes do futebol brasileiro em um só lugar, 
              criando oportunidades reais para o crescimento do esporte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Jogadores que realizaram seus sonhos através da nossa plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-r from-green-400 to-blue-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">João Silva</h4>
                      <p className="text-sm text-gray-600">Atacante - Palmeiras</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    "Através da FutTalent consegui contato direto com o Palmeiras. 
                    Hoje sou jogador profissional e realizo meu sonho."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto Para Dar o Próximo Passo?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Junte-se a milhares de jogadores, clubes e empresários que já fazem parte 
            da maior rede de futebol do Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4">
                Começar Agora - É Grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4">
                Já Tenho Conta
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
