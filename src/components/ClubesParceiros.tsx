
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ClubesParceiros = () => {
  const clubes = [
    { nome: 'Flamengo', escudo: '🔴⚫' },
    { nome: 'Palmeiras', escudo: '🟢⚪' },
    { nome: 'São Paulo', escudo: '🔴⚪⚫' },
    { nome: 'Corinthians', escudo: '⚪⚫' },
    { nome: 'Fluminense', escudo: '🟢🔴⚪' },
    { nome: 'Santos', escudo: '⚪⚫' },
    { nome: 'Botafogo', escudo: '⚪⚫' },
    { nome: 'Vasco', escudo: '⚪⚫' },
    { nome: 'Grêmio', escudo: '🔵⚪⚫' },
    { nome: 'Internacional', escudo: '🔴⚪' },
    { nome: 'Atlético-MG', escudo: '⚪⚫' },
    { nome: 'Cruzeiro', escudo: '🔵⚪' },
    { nome: 'Bahia', escudo: '🔵🔴⚪' },
    { nome: 'Vitória', escudo: '🔴⚫' },
    { nome: 'Fortaleza', escudo: '🔴🔵⚪' },
    { nome: 'Ceará', escudo: '⚪⚫' },
    { nome: 'Sport', escudo: '🔴⚫' },
    { nome: 'Athletico-PR', escudo: '🔴⚫' },
    { nome: 'Coritiba', escudo: '🟢⚪' },
    { nome: 'Goiás', escudo: '🟢⚪' }
  ];

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Clubes Parceiros
        </h3>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-6 pb-4">
            {clubes.map((clube, index) => (
              <div
                key={index}
                className="flex-none w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-lg mb-1 group-hover:scale-110 transition-transform">
                    {clube.escudo}
                  </div>
                  <div className="text-xs font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                    {clube.nome.length > 8 ? clube.nome.substring(0, 8) + '...' : clube.nome}
                  </div>
                </div>
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
