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
import { ChevronLeft, ChevronRight, Upload, Users, Building, Briefcase } from 'lucide-react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SuperOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState<'jogador' | 'clube' | 'empresario'>(
    user?.user_metadata?.user_type || 'jogador'
  );

  // Determinar total de steps baseado no tipo de usuário
  const getTotalSteps = () => {
    switch (selectedUserType) {
      case 'jogador': return 7;
      case 'clube': return 4;
      case 'empresario': return 4;
      default: return 7;
    }
  };

  const totalSteps = getTotalSteps();

  const [formData, setFormData] = useState({
    // Dados básicos (todos os tipos)
    full_name: user?.user_metadata?.full_name || '',
    birth_date: '',
    phone: '',
    email: user?.email || '',
    
    // Localização (todos os tipos)
    state: '',
    city: '',
    
    // Específico para jogadores
    main_position: '',
    dominant_foot: '',
    height: '',
    weight: '',
    skills: [] as string[],
    has_agent: false,
    agent_name: '',
    previous_clubs: '',
    videos: [] as string[],
    
    // Específico para clubes
    club_name: '',
    representative_name: '',
    club_type: 'clube' as 'clube' | 'olheiro',
    description: '',
    
    // Específico para empresários
    agent_company_name: '',
    company_name: ''
  });

  const userTypes = [
    {
      value: 'jogador',
      label: 'Jogador',
      description: 'Sou um atleta procurando oportunidades no futebol',
      icon: Users
    },
    {
      value: 'clube',
      label: 'Clube/Olheiro',  
      description: 'Represento um clube ou trabalho como olheiro',
      icon: Building
    },
    {
      value: 'empresario',
      label: 'Empresário',
      description: 'Trabalho com gestão de carreiras esportivas',
      icon: Briefcase
    }
  ];

  const positions = [
    'Goleiro', 'Zagueiro', 'Lateral Direito', 'Lateral Esquerdo', 
    'Volante', 'Meia', 'Atacante'
  ];

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const skillsList = [
    'Velocidade', 'Finalização', 'Passe', 'Drible', 'Cabeceio', 
    'Marcação', 'Cruzamento', 'Força', 'Resistência'
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked && formData.skills.length < 5) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    } else if (!checked) {
      setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skill)
      }));
    }
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

  const handleSubmit = async () => {
    try {
      if (selectedUserType === 'jogador') {
        const { error } = await (supabase as any).from('player_profiles').insert({
          user_id: user!.id,
          full_name: formData.full_name,
          birth_date: formData.birth_date,
          phone: formData.phone,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          main_position: formData.main_position,
          dominant_foot: formData.dominant_foot,
          height: parseInt(formData.height) || null,
          weight: parseInt(formData.weight) || null,
          skills: formData.skills,
          has_agent: formData.has_agent,
          agent_name: formData.agent_name,
          previous_clubs: formData.previous_clubs,
          videos: formData.videos
        });
        
        if (error) throw error;
      } else if (selectedUserType === 'clube') {
        const { error } = await (supabase as any).from('club_profiles').insert({
          user_id: user!.id,
          club_name: formData.club_name,
          representative_name: formData.representative_name,
          phone: formData.phone,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          club_type: formData.club_type,
          description: formData.description
        });
        
        if (error) throw error;
      } else if (selectedUserType === 'empresario') {
        const { error } = await (supabase as any).from('agent_profiles').insert({
          user_id: user!.id,
          agent_name: formData.full_name,
          company_name: formData.company_name,
          phone: formData.phone,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          description: formData.description
        });
        
        if (error) throw error;
      }
      
      toast({
        title: "Perfil criado com sucesso!",
        description: "Bem-vindo ao Super Talentos - conectando você ao futebol.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        title: "Erro ao criar perfil",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Step 1: Tipo de usuário
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Escolha seu Perfil</h2>
        <p className="text-gray-600">Como você quer usar o Super Talentos?</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {userTypes.map((type) => (
          <div 
            key={type.value}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
              selectedUserType === type.value 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setSelectedUserType(type.value as any)}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                selectedUserType === type.value ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <type.icon className={`h-6 w-6 ${
                  selectedUserType === type.value ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{type.label}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedUserType === type.value 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-gray-300'
              }`}>
                {selectedUserType === type.value && (
                  <div className="w-full h-full bg-white rounded-full scale-50"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Dados básicos
  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dados Básicos</h2>
        <p className="text-gray-600">Suas informações principais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="full_name">Nome Completo *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            placeholder="Seu nome completo"
          />
        </div>

        {selectedUserType === 'jogador' && (
          <div>
            <Label htmlFor="birth_date">Data de Nascimento *</Label>
            <Input
              id="birth_date"
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
            />
          </div>
        )}

        <div>
          <Label htmlFor="phone">Telefone/WhatsApp *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="seu@email.com"
            disabled
          />
        </div>

        {selectedUserType === 'clube' && (
          <>
            <div>
              <Label htmlFor="club_name">Nome do Clube *</Label>
              <Input
                id="club_name"
                value={formData.club_name}
                onChange={(e) => setFormData(prev => ({ ...prev, club_name: e.target.value }))}
                placeholder="Nome do clube"
              />
            </div>
            <div>
              <Label htmlFor="representative_name">Nome do Representante *</Label>
              <Input
                id="representative_name"
                value={formData.representative_name}
                onChange={(e) => setFormData(prev => ({ ...prev, representative_name: e.target.value }))}
                placeholder="Seu nome"
              />
            </div>
          </>
        )}

        {selectedUserType === 'empresario' && (
          <div>
            <Label htmlFor="company_name">Nome da Empresa</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              placeholder="Nome da empresa (opcional)"
            />
          </div>
        )}
      </div>
    </div>
  );

  // Step 3: Localização
  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Localização</h2>
        <p className="text-gray-600">Onde você está localizado?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="state">Estado *</Label>
          <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu estado" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Sua cidade"
          />
        </div>
      </div>

      {selectedUserType === 'clube' && (
        <div>
          <Label>Tipo de Perfil *</Label>
          <RadioGroup 
            value={formData.club_type} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, club_type: value as 'clube' | 'olheiro' }))}
            className="flex space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clube" id="clube" />
              <Label htmlFor="clube">Clube</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="olheiro" id="olheiro" />
              <Label htmlFor="olheiro">Olheiro</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {(selectedUserType === 'clube' || selectedUserType === 'empresario') && (
        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Fale um pouco sobre você/seu clube..."
            rows={3}
          />
        </div>
      )}
    </div>
  );

  // Step 4: Dados técnicos (apenas jogadores)
  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dados Técnicos</h2>
        <p className="text-gray-600">Informações sobre seu perfil esportivo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="main_position">Posição Principal *</Label>
          <Select value={formData.main_position} onValueChange={(value) => setFormData(prev => ({ ...prev, main_position: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione sua posição" />
            </SelectTrigger>
            <SelectContent>
              {positions.map(position => (
                <SelectItem key={position} value={position}>{position}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Perna Dominante *</Label>
          <RadioGroup 
            value={formData.dominant_foot} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, dominant_foot: value }))}
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
              <Label htmlFor="ambos">Ambos</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            value={formData.height}
            onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
            placeholder="175"
          />
        </div>

        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
            placeholder="70"
          />
        </div>
      </div>
    </div>
  );

  // Step 5: Habilidades (apenas jogadores)
  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Suas Habilidades</h2>
        <p className="text-gray-600">Selecione até 5 habilidades principais</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillsList.map((skill) => (
          <div key={skill} className="flex items-center space-x-2">
            <Checkbox 
              id={skill}
              checked={formData.skills.includes(skill)}
              onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
              disabled={!formData.skills.includes(skill) && formData.skills.length >= 5}
            />
            <Label htmlFor={skill} className="text-sm">{skill}</Label>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Selecionadas: {formData.skills.length}/5
      </div>
    </div>
  );

  // Step 6: Experiência (apenas jogadores)
  const renderStep6 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Experiência</h2>
        <p className="text-gray-600">Conte sobre sua trajetória no futebol</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="has_agent"
            checked={formData.has_agent}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_agent: checked as boolean }))}
          />
          <Label htmlFor="has_agent">Já possuo empresário</Label>
        </div>

        {formData.has_agent && (
          <div>
            <Label htmlFor="agent_name">Nome do Empresário</Label>
            <Input
              id="agent_name"
              value={formData.agent_name}
              onChange={(e) => setFormData(prev => ({ ...prev, agent_name: e.target.value }))}
              placeholder="Nome do seu empresário"
            />
          </div>
        )}

        <div>
          <Label htmlFor="previous_clubs">Clubes Anteriores</Label>
          <Textarea
            id="previous_clubs"
            value={formData.previous_clubs}
            onChange={(e) => setFormData(prev => ({ ...prev, previous_clubs: e.target.value }))}
            placeholder="Liste os clubes onde já jogou (opcional)"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  // Step 7: Upload de vídeos (apenas jogadores)
  const renderStep7 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Vídeos</h2>
        <p className="text-gray-600">Mostre suas habilidades em campo</p>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Vídeo {index}: {index === 1 ? 'Jogadas ofensivas' : index === 2 ? 'Jogadas defensivas' : 'Habilidades especiais'}
            </p>
            <Button variant="outline" size="sm">
              Selecionar Vídeo {index === 1 ? '(Obrigatório)' : '(Opcional)'}
            </Button>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">Dicas para um bom vídeo:</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Máximo 1 minuto por vídeo</li>
          <li>• Boa qualidade e iluminação</li>
          <li>• Foque em suas principais habilidades</li>
          <li>• Mantenha o foco em você durante as jogadas</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (currentStep === 1) return renderStep1();
    
    if (selectedUserType === 'jogador') {
      switch (currentStep) {
        case 2: return renderStep2();
        case 3: return renderStep3();
        case 4: return renderStep4();
        case 5: return renderStep5();
        case 6: return renderStep6();
        case 7: return renderStep7();
        default: return renderStep1();
      }
    } else {
      // Para clube e empresário
      switch (currentStep) {
        case 2: return renderStep2();
        case 3: return renderStep3();
        case 4: return (
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Pronto para começar!</h2>
              <p className="text-gray-600">
                Seu perfil está quase completo. Clique em finalizar para começar a usar o Super Talentos.
              </p>
            </div>
          </div>
        );
        default: return renderStep1();
      }
    }
  };

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
            {renderCurrentStep()}
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

export default SuperOnboarding;
