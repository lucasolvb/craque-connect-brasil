import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Ruler, 
  Weight, 
  Star, 
  CheckCircle, 
  Filter,
  SlidersHorizontal,
  Heart,
  MessageCircle,
  Eye
} from 'lucide-react';
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
  numeroJogos: number;
  gols: number;
  assistencias: number;
}

// Mock data expandido para marketplace
const allPlayers: Player[] = [
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
    avaliacaoMedia: 4.8,
    numeroJogos: 45,
    gols: 23,
    assistencias: 8
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
    avaliacaoMedia: 4.6,
    numeroJogos: 38,
    gols: 5,
    assistencias: 15
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
    avaliacaoMedia: 4.4,
    numeroJogos: 32,
    gols: 3,
    assistencias: 2
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
    avaliacaoMedia: 4.5,
    numeroJogos: 41,
    gols: 7,
    assistencias: 12
  },
  {
    id: '5',
    nome: 'Pedro Almeida',
    idade: 19,
    posicao: 'Meio-campo',
    cidade: 'Salvador, BA',
    altura: '1.76m',
    peso: '70kg',
    pernaPreferida: 'Direita',
    habilidades: ['Drible', 'Criatividade', 'Passe'],
    verificado: true,
    avaliacaoMedia: 4.7,
    numeroJogos: 35,
    gols: 8,
    assistencias: 18
  },
  {
    id: '6',
    nome: 'Miguel Torres',
    idade: 20,
    posicao: 'Atacante',
    cidade: 'Fortaleza, CE',
    altura: '1.80m',
    peso: '75kg',
    pernaPreferida: 'Esquerda',
    habilidades: ['Velocidade', 'Finalização', 'Força'],
    verificado: true,
    avaliacaoMedia: 4.9,
    numeroJogos: 42,
    gols: 28,
    assistencias: 6
  },
  {
    id: '7',
    nome: 'Felipe Rodrigues',
    idade: 18,
    posicao: 'Zagueiro',
    cidade: 'Recife, PE',
    altura: '1.88m',
    peso: '82kg',
    pernaPreferida: 'Direita',
    habilidades: ['Jogo Aéreo', 'Marcação', 'Força'],
    verificado: false,
    avaliacaoMedia: 4.3,
    numeroJogos: 28,
    gols: 4,
    assistencias: 1
  },
  {
    id: '8',
    nome: 'Bruno Mendes',
    idade: 22,
    posicao: 'Goleiro',
    cidade: 'Curitiba, PR',
    altura: '1.89m',
    peso: '85kg',
    pernaPreferida: 'Direita',
    habilidades: ['Reflexos', 'Jogo com os Pés', 'Comando'],
    verificado: true,
    avaliacaoMedia: 4.6,
    numeroJogos: 40,
    gols: 0,
    assistencias: 3
  }
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [players, setPlayers] = useState<Player[]>(allPlayers);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(allPlayers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [ageRange, setAgeRange] = useState<number[]>([16, 25]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Extrair query da URL se vier de /clubes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
      applySearch(query);
    }
  }, [location.search]);

  // Opções para filtros
  const positions = ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-campo', 'Atacante'];
  const cities = [...new Set(allPlayers.map(p => p.cidade))];
  const allSkills = [...new Set(allPlayers.flatMap(p => p.habilidades))];

  const applySearch = (query: string) => {
    const searchLower = query.toLowerCase();
    let filtered = allPlayers;

    if (searchLower) {
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(searchLower) ||
        player.posicao.toLowerCase().includes(searchLower) ||
        player.cidade.toLowerCase().includes(searchLower) ||
        player.habilidades.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    setFilteredPlayers(filtered);
  };

  const applyFilters = () => {
    let filtered = allPlayers;

    // Filtro de busca
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(player => 
        player.nome.toLowerCase().includes(searchLower) ||
        player.posicao.toLowerCase().includes(searchLower) ||
        player.cidade.toLowerCase().includes(searchLower) ||
        player.habilidades.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }

    // Filtro de posição
    if (selectedPosition) {
      filtered = filtered.filter(player => player.posicao === selectedPosition);
    }

    // Filtro de cidade
    if (selectedCity) {
      filtered = filtered.filter(player => player.cidade === selectedCity);
    }

    // Filtro de idade
    filtered = filtered.filter(player => 
      player.idade >= ageRange[0] && player.idade <= ageRange[1]
    );

    // Filtro de verificação
    if (onlyVerified) {
      filtered = filtered.filter(player => player.verificado);
    }

    // Filtro de habilidades
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(player => 
        selectedSkills.some(skill => player.habilidades.includes(skill))
      );
    }

    setFilteredPlayers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedPosition, selectedCity, ageRange, onlyVerified, selectedSkills]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedPosition('');
    setSelectedCity('');
    setAgeRange([16, 25]);
    setOnlyVerified(false);
    setSelectedSkills([]);
    setSearchQuery('');
  };

  const handlePlayerView = (playerId: string) => {
    toast.success('Perfil visualizado!');
  };

  const handlePlayerContact = (playerId: string) => {
    toast.success('Mensagem enviada para o jogador!');
  };

  const handlePlayerFavorite = (playerId: string) => {
    toast.success('Jogador adicionado aos favoritos!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Marketplace de Jogadores
          </h1>
          <p className="text-gray-600">
            Encontre os melhores talentos do futebol brasileiro
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Buscar jogadores por nome, posição, cidade ou habilidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar
                </Button>
              </div>

              <div className="space-y-6">
                {/* Posição */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Posição
                  </Label>
                  <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as posições" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as posições</SelectItem>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cidade */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Cidade
                  </Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as cidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as cidades</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Idade */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Idade: {ageRange[0]} - {ageRange[1]} anos
                  </Label>
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    max={30}
                    min={16}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Verificação */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={onlyVerified}
                    onCheckedChange={(checked) => setOnlyVerified(checked === true)}
                  />
                  <Label htmlFor="verified" className="text-sm text-gray-700">
                    Apenas jogadores verificados
                  </Label>
                </div>

                {/* Habilidades */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Habilidades
                  </Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allSkills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm text-gray-700">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredPlayers.length} jogador{filteredPlayers.length !== 1 ? 'es' : ''} encontrado{filteredPlayers.length !== 1 ? 's' : ''}
                </h2>
                {searchQuery && (
                  <p className="text-sm text-gray-600">
                    Resultados para: "{searchQuery}"
                  </p>
                )}
              </div>
              
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Maior avaliação</SelectItem>
                  <SelectItem value="age-asc">Mais jovem</SelectItem>
                  <SelectItem value="age-desc">Mais experiente</SelectItem>
                  <SelectItem value="games">Mais jogos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Players Grid */}
            {filteredPlayers.length === 0 ? (
              <Card className="p-12 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Nenhum jogador encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou refinar sua busca
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredPlayers.map((player) => (
                  <Card key={player.id} className="hover:shadow-lg transition-all duration-300 group">
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
                            <span className="text-xs text-gray-400">
                              ({player.numeroJogos} jogos)
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

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2 py-2 border-t border-gray-100">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">
                              {player.gols}
                            </div>
                            <div className="text-xs text-gray-500">Gols</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-blue-600">
                              {player.assistencias}
                            </div>
                            <div className="text-xs text-gray-500">Assist.</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {player.habilidades.slice(0, 3).map((habilidade, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {habilidade}
                              </Badge>
                            ))}
                            {player.habilidades.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{player.habilidades.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-3 border-t">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handlePlayerView(player.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Perfil
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePlayerContact(player.id)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePlayerFavorite(player.id)}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;