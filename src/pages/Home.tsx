import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  CheckCircle, 
  Eye, 
  Heart,
  Calendar,
  MapPin,
  Ruler,
  Weight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Player {
  id: string;
  nome: string;
  idade: number;
  posicao: string;
  cidade: string;
  estado: string;
  altura: string;
  peso: string;
  peDominante: string;
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
    cidade: 'São Paulo',
    estado: 'SP',
    altura: '178',
    peso: '72',
    peDominante: 'Direita',
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
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    altura: '175',
    peso: '68',
    peDominante: 'Esquerda',
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
    cidade: 'Belo Horizonte',
    estado: 'MG',
    altura: '185',
    peso: '78',
    peDominante: 'Direita',
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
    cidade: 'Porto Alegre',
    estado: 'RS',
    altura: '172',
    peso: '65',
    peDominante: 'Esquerda',
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
    cidade: 'Salvador',
    estado: 'BA',
    altura: '176',
    peso: '70',
    peDominante: 'Direita',
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
    cidade: 'Fortaleza',
    estado: 'CE',
    altura: '180',
    peso: '75',
    peDominante: 'Esquerda',
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
    cidade: 'Recife',
    estado: 'PE',
    altura: '188',
    peso: '82',
    peDominante: 'Direita',
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
    cidade: 'Curitiba',
    estado: 'PR',
    altura: '189',
    peso: '85',
    peDominante: 'Direita',
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
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedFootedness, setSelectedFootedness] = useState<string>('');
  const [heightRange, setHeightRange] = useState<number[]>([120, 220]);
  const [weightRange, setWeightRange] = useState<number[]>([30, 150]);
  const [ageRange, setAgeRange] = useState<number[]>([6, 30]);
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
  const states = [...new Set(allPlayers.map(p => p.estado))];
  
  // Filtrar cidades baseadas no estado selecionado
  const getAvailableCities = () => {
    if (!selectedState || selectedState === 'all') {
      return [...new Set(allPlayers.map(p => p.cidade))];
    }
    return [...new Set(allPlayers.filter(p => p.estado === selectedState).map(p => p.cidade))];
  };
  
  const cities = getAvailableCities();
  const footedness = ['Direita', 'Esquerda', 'Ambas'];
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
    if (selectedPosition && selectedPosition !== 'all') {
      filtered = filtered.filter(player => player.posicao === selectedPosition);
    }

    // Filtro de cidade
    if (selectedCity && selectedCity !== 'all') {
      filtered = filtered.filter(player => player.cidade === selectedCity);
    }

    // Filtro de estado
    if (selectedState && selectedState !== 'all') {
      filtered = filtered.filter(player => player.estado === selectedState);
    }

    // Filtro de perna dominante
    if (selectedFootedness && selectedFootedness !== 'all') {
      filtered = filtered.filter(player => player.peDominante === selectedFootedness);
    }

    // Filtro de altura
    filtered = filtered.filter(player => {
      const height = parseInt(player.altura);
      return height >= heightRange[0] && height <= heightRange[1];
    });

    // Filtro de peso
    filtered = filtered.filter(player => {
      const weight = parseInt(player.peso);
      return weight >= weightRange[0] && weight <= weightRange[1];
    });

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

  // Limpar cidade quando estado mudar
  useEffect(() => {
    if (selectedState && selectedState !== 'all') {
      const availableCities = allPlayers.filter(p => p.estado === selectedState).map(p => p.cidade);
      if (selectedCity && !availableCities.includes(selectedCity)) {
        setSelectedCity('');
      }
    }
  }, [selectedState]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedPosition, selectedCity, selectedState, selectedFootedness, heightRange, weightRange, ageRange, onlyVerified, selectedSkills]);

  const clearFilters = () => {
    setSelectedPosition('');
    setSelectedCity('');
    setSelectedState('');
    setSelectedFootedness('');
    setHeightRange([120, 220]);
    setWeightRange([30, 150]);
    setAgeRange([6, 30]);
    setOnlyVerified(false);
    setSelectedSkills([]);
    setSearchQuery('');
  };

  const handlePlayerView = (playerId: string) => {
    toast.success('Perfil visualizado!');
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
            Talentos do Futebol
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

        {showFilters ? (
          /* Tela de Filtros */
          <div className="w-full space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtros</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <SelectItem value="all">Todas as posições</SelectItem>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Estado */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Estado
                  </Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Perna Dominante */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Perna Dominante
                  </Label>
                  <Select value={selectedFootedness} onValueChange={setSelectedFootedness}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a perna dominante" />
                    </SelectTrigger>
                    <SelectContent>
                      {footedness.map(foot => (
                        <SelectItem key={foot} value={foot}>
                          {foot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Idade */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Idade: {ageRange[0]} - {ageRange[1]} anos
                  </Label>
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    max={30}
                    min={6}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>6 anos</span>
                    <span>30 anos</span>
                  </div>
                </div>

                {/* Altura */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Altura: {heightRange[0]}cm - {heightRange[1]}cm
                  </Label>
                  <Slider
                    value={heightRange}
                    onValueChange={setHeightRange}
                    max={220}
                    min={120}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1,20m</span>
                    <span>2,20m</span>
                  </div>
                </div>

                {/* Peso */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    Peso: {weightRange[0]}kg - {weightRange[1]}kg
                  </Label>
                  <Slider
                    value={weightRange}
                    onValueChange={setWeightRange}
                    max={150}
                    min={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30kg</span>
                    <span>150kg</span>
                  </div>
                </div>

                {/* Jogador Verificado */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={onlyVerified}
                    onCheckedChange={(checked) => setOnlyVerified(checked === true)}
                  />
                  <Label htmlFor="verified" className="text-sm font-medium text-gray-700">
                    Apenas jogadores verificados
                  </Label>
                </div>

                {/* Habilidades */}
                <div className="col-span-full">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Habilidades
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map(skill => (
                      <Button
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setSelectedSkills(prev => 
                            prev.includes(skill) 
                              ? prev.filter(s => s !== skill)
                              : [...prev, skill]
                          );
                        }}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Apply Filters Button */}
              <div className="mt-6 flex justify-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  onClick={() => setShowFilters(false)}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Tela de Jogadores */
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-80 space-y-6">
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
                        <SelectItem value="all">Todas as posições</SelectItem>
                        {positions.map(position => (
                          <SelectItem key={position} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estado */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Estado
                    </Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os estados</SelectItem>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Perna Dominante */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Perna Dominante
                    </Label>
                    <Select value={selectedFootedness} onValueChange={setSelectedFootedness}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a perna dominante" />
                      </SelectTrigger>
                      <SelectContent>
                        {footedness.map(foot => (
                          <SelectItem key={foot} value={foot}>
                            {foot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Idade */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Idade: {ageRange[0]} - {ageRange[1]} anos
                    </Label>
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      max={30}
                      min={6}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6 anos</span>
                      <span>30 anos</span>
                    </div>
                  </div>

                  {/* Altura */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Altura: {heightRange[0]}cm - {heightRange[1]}cm
                    </Label>
                    <Slider
                      value={heightRange}
                      onValueChange={setHeightRange}
                      max={220}
                      min={120}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1,20m</span>
                      <span>2,20m</span>
                    </div>
                  </div>

                  {/* Peso */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Weight className="h-4 w-4" />
                      Peso: {weightRange[0]}kg - {weightRange[1]}kg
                    </Label>
                    <Slider
                      value={weightRange}
                      onValueChange={setWeightRange}
                      max={150}
                      min={30}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>30kg</span>
                      <span>150kg</span>
                    </div>
                  </div>

                  {/* Verificação */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified-sidebar"
                      checked={onlyVerified}
                      onCheckedChange={(checked) => setOnlyVerified(checked === true)}
                    />
                    <Label htmlFor="verified-sidebar" className="text-sm font-medium text-gray-700">
                      Apenas verificados
                    </Label>
                  </div>

                  {/* Habilidades */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      Habilidades
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.slice(0, 6).map(skill => (
                        <Button
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedSkills(prev => 
                              prev.includes(skill) 
                                ? prev.filter(s => s !== skill)
                                : [...prev, skill]
                            );
                          }}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {filteredPlayers.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {filteredPlayers.length} jogador{filteredPlayers.length !== 1 ? 'es' : ''} encontrado{filteredPlayers.length !== 1 ? 's' : ''}
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
                    <Card key={player.id} className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                      <div className="relative">
                        {/* Player Image - Large at top */}
                        <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                              <AvatarImage src={player.avatar} alt={player.nome} />
                              <AvatarFallback className="bg-white text-green-700 text-3xl font-bold">
                                {player.nome.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          {/* Verified Badge */}
                          {player.verificado && (
                            <div className="absolute top-3 right-3">
                              <CheckCircle className="h-6 w-6 text-white bg-green-500 rounded-full" />
                            </div>
                          )}
                          {/* "DESTAQUE" badge */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">
                              DESTAQUE
                            </span>
                          </div>
                        </div>

                        {/* Player Info */}
                        <CardContent className="p-4 space-y-3">
                          {/* Name and Rating */}
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 mb-1">
                              {player.nome}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {player.posicao} • {player.cidade}, {player.estado}
                            </p>
                            
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium text-gray-900">
                                {player.avaliacaoMedia.toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({Math.floor(Math.random() * 500) + 100} avaliações)
                              </span>
                            </div>
                          </div>

                          {/* Physical Stats */}
                          <div className="grid grid-cols-3 gap-2 text-sm border-t pt-3">
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{player.idade}</div>
                              <div className="text-xs text-gray-500">anos</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{player.altura}cm</div>
                              <div className="text-xs text-gray-500">altura</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{player.peso}kg</div>
                              <div className="text-xs text-gray-500">peso</div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <div className="flex flex-wrap gap-1">
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
                              onClick={() => handlePlayerFavorite(player.id)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;