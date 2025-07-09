
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import SearchFilters, { SearchFilters as FilterType } from '@/components/SearchFilters';
import BrazilMap from '@/components/BrazilMap';
import { mockJogadores } from '@/lib/auth';
import { useFavorites } from '@/hooks/useFavorites';
import { useAnalytics } from '@/hooks/useAnalytics';

const Explorar = () => {
  const [filters, setFilters] = useState<FilterType>({
    searchTerm: '',
    position: '',
    state: '',
    ageMin: '',
    ageMax: '',
    hasAgent: '',
    sortBy: 'recent'
  });
  
  const [showMap, setShowMap] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { trackSearch, trackProfileView } = useAnalytics();

  const handleSearch = () => {
    trackSearch(filters.searchTerm, filters);
  };

  const handleStateSelect = (state: string) => {
    setFilters(prev => ({ ...prev, state }));
    setShowMap(false);
  };

  const filteredPlayers = mockJogadores.filter(player => {
    const matchesSearch = !filters.searchTerm || 
      player.nomeCompleto.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      player.posicaoPrincipal.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      player.cidade.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesPosition = !filters.position || player.posicaoPrincipal === filters.position;
    const matchesState = !filters.state || player.estado === filters.state;
    
    const age = new Date().getFullYear() - new Date(player.dataNascimento).getFullYear();
    const matchesAgeMin = !filters.ageMin || age >= parseInt(filters.ageMin);
    const matchesAgeMax = !filters.ageMax || age <= parseInt(filters.ageMax);
    
    return matchesSearch && matchesPosition && matchesState && matchesAgeMin && matchesAgeMax;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.nomeCompleto.localeCompare(b.nomeCompleto);
      case 'age':
        const ageA = new Date().getFullYear() - new Date(a.dataNascimento).getFullYear();
        const ageB = new Date().getFullYear() - new Date(b.dataNascimento).getFullYear();
        return ageA - ageB;
      case 'views':
        // Mock sorting by views - in real app would come from analytics
        return Math.random() - 0.5;
      case 'recent':
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorar Talentos</h1>
        <p className="text-gray-600">Descubra os melhores jogadores de futebol do Brasil</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={handleSearch}
          showMap={showMap}
          onToggleMap={() => setShowMap(!showMap)}
        />
      </div>

      {/* Brazil Map Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <BrazilMap
            selectedState={filters.state}
            onStateSelect={handleStateSelect}
            onClose={() => setShowMap(false)}
          />
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {filteredPlayers.length} jogadores encontrados
          </h2>
          {filters.searchTerm && (
            <Badge variant="secondary">
              Busca: "{filters.searchTerm}"
            </Badge>
          )}
          {filters.state && (
            <Badge variant="secondary">
              Estado: {filters.state}
            </Badge>
          )}
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard 
              key={player.id} 
              player={player}
              onView={() => trackProfileView(player.id)}
              onFavorite={() => toggleFavorite(player.id)}
              isFavorited={isFavorite(player.id)}
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
              onClick={() => setFilters({
                searchTerm: '',
                position: '',
                state: '',
                ageMin: '',
                ageMax: '',
                hasAgent: '',
                sortBy: 'recent'
              })}
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
