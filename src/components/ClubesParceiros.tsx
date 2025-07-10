
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ClubesParceiros = () => {
  const clubes = [
    { 
      nome: 'Flamengo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png',
      cor: '#E31E24'
    },
    { 
      nome: 'Palmeiras', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg',
      cor: '#006633'
    },
    { 
      nome: 'São Paulo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg',
      cor: '#FF0000'
    },
    { 
      nome: 'Corinthians', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Corinthians_Logo.svg',
      cor: '#000000'
    },
    { 
      nome: 'Fluminense', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/3/37/Fluminense_FC_crest.svg',
      cor: '#7A2830'
    },
    { 
      nome: 'Botafogo', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-de-futebol-e-regatas-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg',
      cor: '#000000'
    },
    { 
      nome: 'Vasco', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png',
      cor: '#000000'
    },
    { 
      nome: 'Atlético-MG', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Atletico_Mineiro_logo.svg',
      cor: '#000000'
    },
    { 
      nome: 'Cruzeiro', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg',
      cor: '#003399'
    },
    { 
      nome: 'Grêmio', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Gremio_logo.svg',
      cor: '#0066CC'
    },
    { 
      nome: 'Internacional', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg',
      cor: '#CC0000'
    },
    { 
      nome: 'Bahia', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/en/9/90/Esporte_Clube_Bahia_logo.svg',
      cor: '#0066CC'
    },
    { 
      nome: 'Fortaleza', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/40/FortalezaEC.png',
      cor: '#002776'
    },
    { 
      nome: 'Athletico-PR', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Athletico_Paranaense.png',
      cor: '#CC0000'
    },
    { 
      nome: 'Bragantino', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/bragantino-vector-logo.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Red_Bull_Bragantino.png',
      cor: '#FF0000'
    },
    { 
      nome: 'Santos', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      fallback: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='%23000000' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='8' font-weight='bold'%3ESAN%3C/text%3E%3C/svg%3E`,
      cor: '#000000'
    },
    { 
      nome: 'Cuiabá', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/cuiaba-vector-logo.png',
      fallback: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='%23FFD700' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='black' font-family='Arial' font-size='8' font-weight='bold'%3ECUI%3C/text%3E%3C/svg%3E`,
      cor: '#FFD700'
    },
    { 
      nome: 'Vitória', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      fallback: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='%23CC0000' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='8' font-weight='bold'%3EVIT%3C/text%3E%3C/svg%3E`,
      cor: '#CC0000'
    },
    { 
      nome: 'Juventude', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/juventude-vector-logo.png',
      fallback: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='%23006633' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='8' font-weight='bold'%3EJUV%3C/text%3E%3C/svg%3E`,
      cor: '#006633'
    },
    { 
      nome: 'Criciúma', 
      escudo: 'https://logoeps.com/wp-content/uploads/2013/03/criciuma-vector-logo.png',
      fallback: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='%23FFD700' stroke='%23000' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='black' font-family='Arial' font-size='8' font-weight='bold'%3ECRI%3C/text%3E%3C/svg%3E`,
      cor: '#FFD700'
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, clube: any) => {
    const img = e.currentTarget;
    
    // Se já está usando o fallback, mostra o SVG placeholder
    if (img.src === clube.fallback) {
      img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='26' fill='${encodeURIComponent(clube.cor)}' stroke='%23fff' stroke-width='4'/%3E%3Ctext x='28' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='8' font-weight='bold'%3E${clube.nome.substring(0, 3).toUpperCase()}%3C/text%3E%3C/svg%3E`;
    } else {
      // Primeiro tenta o fallback
      img.src = clube.fallback;
    }
  };

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
                    onError={(e) => handleImageError(e, clube)}
                    crossOrigin="anonymous"
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
