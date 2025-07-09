
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import VideoUpload from '@/components/VideoUpload';
import { toast } from '@/hooks/use-toast';

const PlayerOnboarding = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Informações Pessoais
    nomeCompleto: user?.name || '',
    dataNascimento: '',
    telefone: '',
    cidade: '',
    estado: '',
    altura: '',
    peso: '',
    
    // Informações Futebolísticas
    posicaoPrincipal: '',
    posicaoSecundaria: '',
    pernaHabil: '',
    clubesAnteriores: '',
    temEmpresario: false,
    nomeEmpresario: '',
    
    // Habilidades
    habilidades: [] as string[],
    
    // Bio e Vídeos
    bio: '',
    videos: [] as string[]
  });

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

  const habilidadesList = [
    'Velocidade', 'Finalização', 'Passe', 'Drible', 'Cabeceio',
    'Cruzamento', 'Marcação', 'Desarme', 'Visão de jogo', 'Liderança',
    'Força física', 'Resistência', 'Flexibilidade', 'Reflexos', 'Chute de longe'
  ];

  const handleHabilidadeChange = (habilidade: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        habilidades: [...prev.habilidades, habilidade]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        habilidades: prev.habilidades.filter(h => h !== habilidade)
      }));
    }
  };

  const handleVideoUpload = (videoUrl: string) => {
    if (formData.videos.length < 3) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, videoUrl]
      }));
    }
  };

  const handleVideoRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Salvar dados do jogador
    updateUser({ isOnboarded: true });
    
    toast({
      title: "Perfil criado com sucesso!",
      description: "Seu perfil está completo e já pode ser visualizado por clubes e empresários.",
    });
    
    navigate('/dashboard');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Informações Pessoais</h2>
        <p className="text-gray-600">Vamos começar com suas informações básicas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nomeCompleto">Nome Completo *</Label>
          <Input
            id="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={(e) => setFormData(prev => ({ ...prev, nomeCompleto: e.target.value }))}
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => setFormData(prev => ({ ...prev, dataNascimento: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
          <Input
            id="telefone"
            value={formData.telefone}
            onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <Label htmlFor="cidade">Cidade *</Label>
          <Input
            id="cidade"
            value={formData.cidade}
            onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
            placeholder="Sua cidade"
          />
        </div>

        <div>
          <Label htmlFor="estado">Estado *</Label>
          <Select value={formData.estado} onValueChange={(value) => setFormData(prev => ({ ...prev, estado: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu estado" />
            </SelectTrigger>
            <SelectContent>
              {estados.map(estado => (
                <SelectItem key={estado} value={estado}>{estado}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="altura">Altura</Label>
            <Input
              id="altura"
              value={formData.altura}
              onChange={(e) => setFormData(prev => ({ ...prev, altura: e.target.value }))}
              placeholder="1.75m"
            />
          </div>
          <div>
            <Label htmlFor="peso">Peso</Label>
            <Input
              id="peso"
              value={formData.peso}
              onChange={(e) => setFormData(prev => ({ ...prev, peso: e.target.value }))}
              placeholder="70kg"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Informações Futebolísticas</h2>
        <p className="text-gray-600">Conte-nos sobre sua experiência no futebol</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="posicaoPrincipal">Posição Principal *</Label>
          <Select value={formData.posicaoPrincipal} onValueChange={(value) => setFormData(prev => ({ ...prev, posicaoPrincipal: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua posição" />
            </SelectTrigger>
            <SelectContent>
              {posicoes.map(posicao => (
                <SelectItem key={posicao} value={posicao}>{posicao}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="posicaoSecundaria">Posição Secundária</Label>
          <Select value={formData.posicaoSecundaria} onValueChange={(value) => setFormData(prev => ({ ...prev, posicaoSecundaria: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Opcional" />
            </SelectTrigger>
            <SelectContent>
              {posicoes.map(posicao => (
                <SelectItem key={posicao} value={posicao}>{posicao}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Pé Hábil *</Label>
        <RadioGroup 
          value={formData.pernaHabil} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, pernaHabil: value }))}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="destro" id="destro" />
            <Label htmlFor="destro">Destro</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="canhoto" id="canhoto" />
            <Label htmlFor="canhoto">Canhoto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambos" id="ambos" />
            <Label htmlFor="ambos">Ambos os pés</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="clubesAnteriores">Clubes Anteriores</Label>
        <Textarea
          id="clubesAnteriores"
          value={formData.clubesAnteriores}
          onChange={(e) => setFormData(prev => ({ ...prev, clubesAnteriores: e.target.value }))}
          placeholder="Liste os clubes onde já jogou (opcional)"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="temEmpresario"
            checked={formData.temEmpresario}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, temEmpresario: checked as boolean }))}
          />
          <Label htmlFor="temEmpresario">Já possuo empresário</Label>
        </div>

        {formData.temEmpresario && (
          <div>
            <Label htmlFor="nomeEmpresario">Nome do Empresário</Label>
            <Input
              id="nomeEmpresario"
              value={formData.nomeEmpresario}
              onChange={(e) => setFormData(prev => ({ ...prev, nomeEmpresario: e.target.value }))}
              placeholder="Nome do seu empresário"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Suas Habilidades</h2>
        <p className="text-gray-600">Selecione suas principais habilidades no futebol</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {habilidadesList.map((habilidade) => (
          <div key={habilidade} className="flex items-center space-x-2">
            <Checkbox 
              id={habilidade}
              checked={formData.habilidades.includes(habilidade)}
              onCheckedChange={(checked) => handleHabilidadeChange(habilidade, checked as boolean)}
            />
            <Label htmlFor={habilidade} className="text-sm">{habilidade}</Label>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor="bio">Biografia (Opcional)</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          placeholder="Conte um pouco sobre você, seus objetivos e experiências no futebol..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vídeos</h2>
        <p className="text-gray-600">Adicione até 3 vídeos mostrando suas habilidades (máximo 1 minuto cada)</p>
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <Label className="text-base font-medium mb-2 block">
              Vídeo {index + 1} {index === 0 ? '(Obrigatório)' : '(Opcional)'}
            </Label>
            <VideoUpload
              videoUrl={formData.videos[index]}
              onUpload={handleVideoUpload}
              onRemove={() => handleVideoRemove(index)}
              label={`Vídeo ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">Dicas para um bom vídeo:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Mostre suas principais habilidades</li>
          <li>• Grave em boa qualidade e iluminação</li>
          <li>• Inclua jogadas variadas</li>
          <li>• Mantenha o foco em você durante as jogadas</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Configurar Perfil</h1>
            <span className="text-sm text-gray-500">
              Passo {currentStep} de {totalSteps}
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {/* Content */}
        <Card>
          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Finalizar Perfil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerOnboarding;
