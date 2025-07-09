
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, MapPin } from 'lucide-react';

export interface SearchFilters {
  searchTerm: string;
  position: string;
  state: string;
  ageMin: string;
  ageMax: string;
  hasAgent: string;
  sortBy: string;
}

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  showMap?: boolean;
  onToggleMap?: () => void;
}

const positions = [
  'Goleiro', 'Lateral Direito', 'Lateral Esquerdo', 'Zagueiro', 
  'Volante', 'Meio-campo', 'Meia-atacante', 'Ponta Direita', 
  'Ponta Esquerda', 'Atacante', 'Centro-avante'
];

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  showMap = false,
  onToggleMap
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: '',
      position: '',
      state: '',
      ageMin: '',
      ageMax: '',
      hasAgent: '',
      sortBy: 'recent'
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'searchTerm' && key !== 'sortBy' && value !== ''
  ).length;

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Main Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar por nome, posição, cidade..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {onToggleMap && (
            <Button 
              variant="outline"
              onClick={onToggleMap}
              className="flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Mapa
            </Button>
          )}

          <Button onClick={onSearch} className="bg-green-600 hover:bg-green-700">
            Buscar
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label>Posição</Label>
                <Select value={filters.position} onValueChange={(value) => updateFilter('position', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as posições</SelectItem>
                    {positions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Estado</Label>
                <Select value={filters.state} onValueChange={(value) => updateFilter('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os estados</SelectItem>
                    {states.map(estado => (
                      <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Idade Mínima</Label>
                <Input 
                  type="number" 
                  placeholder="16"
                  value={filters.ageMin}
                  onChange={(e) => updateFilter('ageMin', e.target.value)}
                />
              </div>

              <div>
                <Label>Idade Máxima</Label>
                <Input 
                  type="number" 
                  placeholder="35"
                  value={filters.ageMax}
                  onChange={(e) => updateFilter('ageMax', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <Label>Tem Empresário</Label>
                  <Select value={filters.hasAgent} onValueChange={(value) => updateFilter('hasAgent', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="sim">Sim</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Ordenar por</Label>
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Mais recentes</SelectItem>
                      <SelectItem value="views">Mais visualizados</SelectItem>
                      <SelectItem value="name">Nome A-Z</SelectItem>
                      <SelectItem value="age">Idade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <Button variant="outline" onClick={clearFilters} className="text-gray-600">
                  <X className="h-4 w-4 mr-1" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.position && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Posição: {filters.position}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('position', '')} />
              </Badge>
            )}
            {filters.state && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Estado: {filters.state}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('state', '')} />
              </Badge>
            )}
            {(filters.ageMin || filters.ageMax) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Idade: {filters.ageMin || '0'}-{filters.ageMax || '∞'}
                <X className="h-3 w-3 cursor-pointer" onClick={() => {
                  updateFilter('ageMin', '');
                  updateFilter('ageMax', '');
                }} />
              </Badge>
            )}
            {filters.hasAgent && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Empresário: {filters.hasAgent === 'sim' ? 'Sim' : 'Não'}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter('hasAgent', '')} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
