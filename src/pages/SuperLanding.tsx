
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Trophy, Target, ArrowRight, Upload, Shield, Bell, RefreshCw } from 'lucide-react';
import SuperHeader from '@/components/SuperHeader';
import ClubesParceiros from '@/components/ClubesParceiros';

const SuperLanding = () => {
  const steps = [
    {
      number: 1,
      title: 'Crie o seu Perfil de Jogador',
      description: 'Insira o máximo de informações possíveis sobre você para que os clubes, empresários e olheiros possam te conhecer.',
      icon: Users
    },
    {
      number: 2,
      title: 'Faça Upload dos seus vídeos',
      description: 'Insira seus melhores vídeos que destacam suas habilidades e jogadas que podem chamar atenção dos clubes.',
      icon: Upload
    },
    {
      number: 3,
      title: 'Verifique seu Perfil',
      description: 'Faça a verificação do seu perfil e dos seus documentos para que seu perfil passe credibilidade e confirme sua idade.',
      icon: Shield
    },
    {
      number: 4,
      title: 'Fique atento às notificações',
      description: 'Esteja atento às notificações do sistema sobre as interações que você receber, peneiras e jogos próximos à sua cidade e dúvidas dos clubes sobre você.',
      icon: Bell
    },
    {
      number: 5,
      title: 'Novas informações',
      description: 'Atualize seu perfil com vídeos de boa qualidade, alimente seu perfil semanalmente para aumentar as chances de ter mais visibilidade no site.',
      icon: RefreshCw
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SuperHeader />
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Joga Bola, Jogador
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              A única plataforma do futebol brasileiro que conecta jogadores de todo o país com os maiores clubes e empresários do mercado.
            </p>

            <div className="flex justify-center">
              <Link to="/super-onboarding">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  Criar Meu Perfil de Jogador
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Conecte-se aos Clubes
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Tenha acesso direto aos principais clubes do país que estão em busca de novos talentos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Mostre seu Talento
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Crie seu perfil completo com vídeos, estatísticas e informações que destacam suas habilidades.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Realize seu Sonho
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Transforme sua paixão pelo futebol em uma carreira profissional de sucesso.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nova Seção - Como Funciona */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              Agora ficou mais fácil
            </h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              virar jogador de futebol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clubes Section */}
      <section className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClubesParceiros />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Pronto para Mostrar seu Talento?
          </h2>
          <p className="text-base sm:text-xl text-green-100 mb-6 sm:mb-8">
            Junte-se a milhares de jogadores que já encontraram sua oportunidade no futebol brasileiro.
          </p>
          <Link to="/super-onboarding">
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              Sua Hora de Brilhar Chegou ⭐
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SuperLanding;
