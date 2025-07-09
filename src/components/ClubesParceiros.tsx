
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ClubesParceiros = () => {
  const clubes = [
    { 
      nome: 'Flamengo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      cor: '#E31E24'
    },
    { 
      nome: 'Palmeiras', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      cor: '#006633'
    },
    { 
      nome: 'São Paulo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      cor: '#FF0000'
    },
    { 
      nome: 'Corinthians', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      cor: '#000000'
    },
    { 
      nome: 'Fluminense', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      cor: '#7A2830'
    },
    { 
      nome: 'Botafogo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      cor: '#000000'
    },
    { 
      nome: 'Vasco', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      cor: '#000000'
    },
    { 
      nome: 'Atlético-MG', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      cor: '#000000'
    },
    { 
      nome: 'Cruzeiro', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      cor: '#003399'
    },
    { 
      nome: 'Grêmio', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      cor: '#0066CC'
    },
    { 
      nome: 'Internacional', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      cor: '#CC0000'
    },
    { 
      nome: 'Bahia', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      cor: '#0066CC'
    },
    { 
      nome: 'Fortaleza', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      cor: '#CC0000'
    },
    { 
      nome: 'Athletico-PR', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png',
      cor: '#CC0000'
    },
    { 
      nome: 'Bragantino', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/bragantino-vector-logo.png',
      cor: '#FF0000'
    },
    { 
      nome: 'Cuiabá', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/cuiaba-vector-logo.png',
      cor: '#FFD700'
    },
    { 
      nome: 'Vitória', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      cor: '#CC0000'
    },
    { 
      nome: 'Juventude', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/juventude-vector-logo.png',
      cor: '#006633'
    },
    { 
      nome: 'Criciúma', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/criciuma-vector-logo.png',
      cor: '#FFD700'
    },
    { 
      nome: 'Mirassol', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/mirassol-vector-logo.png',
      cor: '#FFD700'
    }
  ];

  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Clubes Parceiros - Série A 2025
        </h3>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-6 pb-4">
            {clubes.map((clube, index) => (
              <div
                key={index}
                className="flex-none w-24 h-24 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-green-600 transition-all duration-300 cursor-pointer group shadow-md hover:shadow-lg transform hover:scale-105"
                style={{ borderColor: `${clube.cor}20` }}
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={clube.escudo}
                    alt={`Escudo ${clube.nome}`}
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback para URLs alternativas se a primeira falhar
                      const fallbacks = [
                        `https://logoeps.com/wp-content/uploads/2013/03/${clube.nome.toLowerCase().replace(/\s+/g, '-').replace('ã', 'a').replace('é', 'e').replace('ú', 'u').replace('í', 'i').replace('ó', 'o')}-vector-logo.png`,
                        `https://ssl.gstatic.com/onebox/media/sports/logos/${clube.nome.toLowerCase()}_48x48.png`,
                        `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='${clube.cor}' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='10' font-weight='bold'%3E${clube.nome.substring(0, 3).toUpperCase()}%3C/text%3E%3C/svg%3E`
                      ];
                      
                      const currentSrc = e.currentTarget.src;
                      const currentIndex = fallbacks.findIndex(url => url === currentSrc);
                      
                      if (currentIndex < fallbacks.length - 1) {
                        e.currentTarget.src = fallbacks[currentIndex + 1];
                      }
                    }}
                  />
                </div>
                <span className="sr-only">{clube.nome}</span>
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
