
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import { mockJogadores } from '@/lib/auth';

const Explorar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    posicao: '',
    estado: '',
    idadeMin: '',
    idadeMax: '',
    pernaHabil: '',
    temEmpresario: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const posicoes = [
    'Goleiro', 'Lateral Direito', 'Lateral Esquerdo', 'Zagueiro', 
    'Volante', 'Meio-campo', 'Meia-atacante', 'Ponta Direita', 
    'Ponta Esquerda', 'Atacante', 'Centro-avante'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const filteredPlayers = mockJogadores.filter(player => {
    const matchesSearch = player.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.posicaoPrincipal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = !filters.posicao || player.posicaoPrincipal === filters.posicao;
    const matchesState = !filters.estado || player.estado === filters.estado;
    const matchesFoot = !filters.pernaHabil || player.pernaHabil === filters.pernaHabil;
    
    return matchesSearch && matchesPosition && matchesState && matchesFoot;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar Talentos</h1>
        <p className="text-gray-600">Descubra os melhores jogadores de futebol do Brasil</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Buscar por nome, posição, cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t">
                <div>
                  <Label>Posição</Label>
                  <Select value={filters.posicao} onValueChange={(value) => setFilters(prev => ({ ...prev, posicao: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as posições</SelectItem>
                      {posicoes.map(pos => (
                        <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Estado</Label>
                  <Select value={filters.estado} onValueChange={(value) => setFilters(prev => ({ ...prev, estado: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os estados</SelectItem>
                      {estados.map(estado => (
                        <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Pé hábil</Label>
                  <Select value={filters.pernaHabil} onValueChange={(value) => setFilters(prev => ({ ...prev, pernaHabil: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="destro">Destro</SelectItem>
                      <SelectItem value="canhoto">Canhoto</SelectItem>
                      <SelectItem value="ambos">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Idade mínima</Label>
                  <Input 
                    type="number" 
                    placeholder="16"
                    value={filters.idadeMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, idadeMin: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Idade máxima</Label>
                  <Input 
                    type="number" 
                    placeholder="35"
                    value={filters.idadeMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, idadeMax: e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {filteredPlayers.length} jogadores encontrados
          </h2>
          {searchTerm && (
            <Badge variant="secondary">
              Busca: "{searchTerm}"
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Label htmlFor="sort" className="text-sm">Ordenar por:</Label>
          <Select defaultValue="relevancia">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Relevância</SelectItem>
              <SelectItem value="nome">Nome A-Z</SelectItem>
              <SelectItem value="idade">Idade</SelectItem>
              <SelectItem value="posicao">Posição</SelectItem>
              <SelectItem value="localizacao">Localização</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard 
              key={player.id} 
              player={player}
              onView={() => console.log('View player', player.id)}
              onFavorite={() => console.log('Favorite player', player.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum jogador encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou termos de busca para encontrar mais jogadores.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  posicao: '',
                  estado: '',
                  idadeMin: '',
                  idadeMax: '',
                  pernaHabil: '',
                  temEmpresario: ''
                });
              }}
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      {filteredPlayers.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Carregar Mais Jogadores
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explorar;
