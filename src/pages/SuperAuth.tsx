
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Eye, EyeOff, Users, Building, Briefcase } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SuperAuth = () => {
  const { mode } = useParams<{ mode: 'login' | 'registro' }>();
  const navigate = useNavigate();
  const { signIn, signUp } = useSupabaseAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    user_type: 'jogador' as 'jogador' | 'clube' | 'empresario'
  });

  const isLogin = mode === 'login';

  const userTypes = [
    {
      value: 'jogador',
      label: 'Jogador',
      description: 'Sou um atleta procurando oportunidades',
      icon: Users
    },
    {
      value: 'clube',
      label: 'Clube/Olheiro',
      description: 'Represento um clube ou sou olheiro',
      icon: Building
    },
    {
      value: 'empresario',
      label: 'Empresário',
      description: 'Trabalho com gestão de carreiras',
      icon: Briefcase
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password, rememberMe);
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao Super Talentos.",
        });
        navigate('/dashboard');
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        
        await signUp(formData.email, formData.password, {
          full_name: formData.full_name,
          user_type: formData.user_type
        });
        
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Super Talentos. Vamos configurar seu perfil.",
        });
        navigate('/super-onboarding');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Algo deu errado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">⚽</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Entrar no Super Talentos' : 'Criar Conta'}
          </CardTitle>
          <p className="text-gray-600">
            {isLogin 
              ? 'Conectando você ao futebol' 
              : 'Junte-se ao Super Talentos - conectando você ao futebol'
            }
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Tipo de Usuário</Label>
                  <RadioGroup 
                    value={formData.user_type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, user_type: value as any }))}
                    className="space-y-2"
                  >
                    {userTypes.map((type) => (
                      <div key={type.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <RadioGroupItem value={type.value} id={type.value} />
                        <div className="flex items-center space-x-3 flex-1">
                          <type.icon className="h-5 w-5 text-green-600" />
                          <div>
                            <Label htmlFor={type.value} className="font-medium cursor-pointer">
                              {type.label}
                            </Label>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Lembrar de mim por 7 dias
                </Label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700" 
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              {' '}
              <Link 
                to={isLogin ? '/super-registro' : '/super-login'} 
                className="text-green-600 hover:text-green-700 font-medium"
              >
                {isLogin ? 'Cadastre-se' : 'Entre aqui'}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAuth;
