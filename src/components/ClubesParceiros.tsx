
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ClubesParceiros = () => {
  const clubes = [
    { nome: 'Flamengo', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png' },
    { nome: 'Palmeiras', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png' },
    { nome: 'São Paulo', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png' },
    { nome: 'Corinthians', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png' },
    { nome: 'Fluminense', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png' },
    { nome: 'Santos', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png' },
    { nome: 'Botafogo', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png' },
    { nome: 'Vasco', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png' },
    { nome: 'Grêmio', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png' },
    { nome: 'Internacional', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png' },
    { nome: 'Atlético-MG', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png' },
    { nome: 'Cruzeiro', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png' },
    { nome: 'Bahia', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png' },
    { nome: 'Vitória', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png' },
    { nome: 'Fortaleza', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png' },
    { nome: 'Ceará', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/ceara-vector-logo.png' },
    { nome: 'Sport', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png' },
    { nome: 'Athletico-PR', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png' },
    { nome: 'Coritiba', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/coritiba-vector-logo.png' },
    { nome: 'Goiás', escudo: 'https://logoeps.com/wp-content/uploads/2013/03/goias-vector-logo.png' }
  ];

  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Clubes Parceiros
        </h3>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-6 pb-4">
            {clubes.map((clube, index) => (
              <div
                key={index}
                className="flex-none w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-green-600 transition-colors cursor-pointer group shadow-md hover:shadow-lg"
              >
                <img 
                  src={clube.escudo} 
                  alt={`Escudo ${clube.nome}`}
                  className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default ClubesParceiros;
