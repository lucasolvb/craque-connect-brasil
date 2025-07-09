
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Star, Trophy, Play, CheckCircle, Quote, Shield, Zap } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Para Jogadores',
      description: 'Crie seu perfil profissional, mostre seus vídeos e seja descoberto por clubes e empresários.',
      benefits: ['Perfil profissional gratuito', 'Upload de vídeos', 'Visibilidade nacional'],
      cta: 'Sou Jogador',
      route: '/registro?tipo=jogador'
    },
    {
      icon: Search,
      title: 'Para Clubes e Olheiros',
      description: 'Encontre talentos em todo o Brasil com filtros avançados e sistema de favoritos.',
      benefits: ['Busca avançada', 'Acesso a vídeos', 'Sistema de favoritos'],
      cta: 'Sou Clube',
      route: '/registro?tipo=clube'
    },
    {
      icon: Star,
      title: 'Para Empresários',
      description: 'Descubra novos talentos e gerencie seu portfólio de atletas de forma eficiente.',
      benefits: ['Gestão de atletas', 'Relatórios detalhados', 'Network profissional'],
      cta: 'Sou Empresário',
      route: '/registro?tipo=empresario'
    }
  ];

  const stats = [
    { number: '12.847', label: 'Jogadores Cadastrados', icon: Users },
    { number: '284', label: 'Clubes Parceiros', icon: Shield },
    { number: '3.521', label: 'Conexões Realizadas', icon: Zap },
    { number: '98%', label: 'Satisfação dos Usuários', icon: Trophy }
  ];

  const testimonials = [
    {
      name: 'João Silva',
      role: 'Atacante - Palmeiras',
      club: 'Descoberto pela FutTalent',
      content: 'Através da FutTalent consegui contato direto com o Palmeiras. Hoje sou jogador profissional e realizo meu sonho de criança.',
      avatar: '👨‍🦱'
    },
    {
      name: 'Carlos Mendes',
      role: 'Olheiro - Flamengo',
      club: 'Clube de Regatas do Flamengo',
      content: 'A plataforma revolucionou nossa forma de descobrir talentos. Já contratamos 15 jogadores através da FutTalent.',
      avatar: '👨‍💼'
    },
    {
      name: 'Maria Santos',
      role: 'Empresária Esportiva',
      club: 'MS Sports Management',
      content: 'Encontrei atletas incríveis aqui. A qualidade dos perfis e vídeos facilita muito nosso trabalho de scouting.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section com vídeo de background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 via-blue-600/80 to-green-800/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              🏆 #1 Plataforma de Futebol do Brasil
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Conectando
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Talentos
            </span>
            do Futebol Brasileiro
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
            A maior plataforma do Brasil para descobrir, conectar e desenvolver 
            talentos do futebol. Seu sonho está a um clique de distância.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {features.map((feature, index) => (
              <Link key={index} to={feature.route}>
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <feature.icon className="mr-3 h-6 w-6" />
                  {feature.cta}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Assista aos talentos</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>100% Gratuito</span>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Números que Impressionam
            </h2>
            <p className="text-xl text-gray-600">
              Resultados reais de uma plataforma que funciona
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Uma Plataforma Para Todos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos todos os agentes do futebol brasileiro em um só lugar, 
              criando oportunidades reais para o crescimento do esporte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Link to={feature.route}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {feature.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-gray-600">
              Quem já realizou seus sonhos através da FutTalent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-green-600 mb-4" />
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-green-600 font-medium">{testimonial.club}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Dar o Próximo Passo?
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Junte-se a milhares de jogadores, clubes e empresários que já fazem parte 
            da maior rede de futebol do Brasil. Seu futuro no esporte começa agora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registro">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg shadow-xl">
                Começar Agora - É Grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
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
