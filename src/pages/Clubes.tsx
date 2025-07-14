import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search, MapPin, Calendar, Ruler, Weight, Star, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Player {
  id: string;
  nome: string;
  idade: number;
  posicao: string;
  cidade: string;
  altura: string;
  peso: string;
  pernaPreferida: string;
  habilidades: string[];
  verificado: boolean;
  avatar?: string;
  avaliacaoMedia: number;
}

// Mock data de jogadores para demonstração
const mockPlayers: Player[] = [
  {
    id: '1',
    nome: 'Gabriel Silva',
    idade: 19,
    posicao: 'Atacante',
    cidade: 'São Paulo, SP',
    altura: '1.78m',
    peso: '72kg',
    pernaPreferida: 'Direita',
    habilidades: ['Velocidade', 'Finalização', 'Drible'],
    verificado: true,
    avaliacaoMedia: 4.8
  },
  {
    id: '2',
    nome: 'Lucas Oliveira',
    idade: 20,
    posicao: 'Meio-campo',
    cidade: 'Rio de Janeiro, RJ',
    altura: '1.75m',
    peso: '68kg',
    pernaPreferida: 'Esquerda',
    habilidades: ['Passe', 'Visão de Jogo', 'Resistência'],
    verificado: true,
    avaliacaoMedia: 4.6
  },
  {
    id: '3',
    nome: 'Rafael Santos',
    idade: 18,
    posicao: 'Zagueiro',
    cidade: 'Belo Horizonte, MG',
    altura: '1.85m',
    peso: '78kg',
    pernaPreferida: 'Direita',
    habilidades: ['Força', 'Marcação', 'Jogo Aéreo'],
    verificado: false,
    avaliacaoMedia: 4.4
  },
  {
    id: '4',
    nome: 'João Costa',
    idade: 21,
    posicao: 'Lateral',
    cidade: 'Porto Alegre, RS',
    altura: '1.72m',
    peso: '65kg',
    pernaPreferida: 'Esquerda',
    habilidades: ['Velocidade', 'Cruzamento', 'Resistência'],
    verificado: true,
    avaliacaoMedia: 4.5
  }
];

const Clubes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Digite sua busca por jogadores');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simular delay de busca
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Lógica simples de busca baseada no prompt
    const query = searchQuery.toLowerCase();
    let filteredPlayers = mockPlayers;

    // Filtros baseados em palavras-chave no prompt
    if (query.includes('atacante') || query.includes('gol') || query.includes('finalização')) {
      filteredPlayers = filteredPlayers.filter(p => p.posicao === 'Atacante');
    }
    
    if (query.includes('meio') || query.includes('passe') || query.includes('armação')) {
      filteredPlayers = filteredPlayers.filter(p => p.posicao === 'Meio-campo');
    }
    
    if (query.includes('zagueiro') || query.includes('defesa') || query.includes('marcação')) {
      filteredPlayers = filteredPlayers.filter(p => p.posicao === 'Zagueiro');
    }
    
    if (query.includes('lateral') || query.includes('ala')) {
      filteredPlayers = filteredPlayers.filter(p => p.posicao === 'Lateral');
    }

    if (query.includes('jovem') || query.includes('novo') || query.includes('18') || query.includes('19')) {
      filteredPlayers = filteredPlayers.filter(p => p.idade <= 19);
    }

    if (query.includes('alto') || query.includes('altura')) {
      filteredPlayers = filteredPlayers.filter(p => parseFloat(p.altura.replace('m', '')) >= 1.80);
    }

    if (query.includes('rápido') || query.includes('velocidade')) {
      filteredPlayers = filteredPlayers.filter(p => p.habilidades.includes('Velocidade'));
    }

    if (query.includes('são paulo') || query.includes('sp')) {
      filteredPlayers = filteredPlayers.filter(p => p.cidade.includes('São Paulo'));
    }

    if (query.includes('verificado') || query.includes('documentos')) {
      filteredPlayers = filteredPlayers.filter(p => p.verificado);
    }

    setSearchResults(filteredPlayers);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Encontre o Jogador Ideal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use nossa busca inteligente para encontrar jogadores que atendem exatamente às suas necessidades
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Ex: Preciso de um atacante jovem, rápido e com boa finalização de São Paulo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12 h-12 text-base"
                    disabled={isSearching}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="h-12 px-6 bg-green-600 hover:bg-green-700"
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                💡 Dica: Seja específico sobre posição, habilidades, idade, localização ou características que procura
              </div>
            </div>
          </Card>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Buscando jogadores que atendem aos seus critérios...</p>
          </div>
        )}

        {hasSearched && !isSearching && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Resultados da Busca
              </h2>
              <Badge variant="secondary" className="text-sm">
                {searchResults.length} jogador{searchResults.length !== 1 ? 'es' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {searchResults.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <div className="text-gray-400">
                    <Search className="h-16 w-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Nenhum jogador encontrado</h3>
                  <p className="text-gray-600">
                    Tente reformular sua busca ou usar critérios diferentes
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((player) => (
                  <Card key={player.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={player.avatar} alt={player.nome} />
                          <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
                            {player.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {player.nome}
                            </h3>
                            {player.verificado && (
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">
                              {player.avaliacaoMedia.toFixed(1)}
                            </span>
                          </div>
                          
                          <Badge variant="outline" className="text-xs">
                            {player.posicao}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{player.idade} anos</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 truncate">{player.cidade}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ruler className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{player.altura}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Weight className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{player.peso}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Habilidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {player.habilidades.map((habilidade, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {habilidade}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Ver Perfil Completo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Placeholder content when no search has been made */}
        {!hasSearched && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-gray-400">
                <Shield className="h-20 w-20 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">
                Comece sua busca
              </h3>
              <p className="text-gray-600">
                Digite o que você procura em um jogador e nossa IA encontrará os melhores candidatos
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-green-800 mb-2">Exemplos de busca:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• "Atacante jovem com velocidade e boa finalização"</li>
                  <li>• "Zagueiro alto para jogo aéreo de São Paulo"</li>
                  <li>• "Meio-campista com passe e visão de jogo"</li>
                  <li>• "Lateral esquerdo rápido com cruzamento"</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubes;