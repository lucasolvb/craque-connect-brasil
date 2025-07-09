
-- Criar tabela para perfis de jogadores
CREATE TABLE public.player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Dados básicos
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Localização
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  
  -- Dados técnicos
  main_position TEXT NOT NULL,
  dominant_foot TEXT NOT NULL CHECK (dominant_foot IN ('destro', 'canhoto', 'ambos')),
  height INTEGER, -- em cm
  weight INTEGER, -- em kg
  
  -- Habilidades (array de strings)
  skills TEXT[] DEFAULT '{}',
  
  -- Experiência
  has_agent BOOLEAN DEFAULT FALSE,
  agent_name TEXT,
  previous_clubs TEXT,
  
  -- Vídeos
  videos JSONB DEFAULT '[]',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Habilitar RLS
ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view their own profile" 
ON public.player_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.player_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.player_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Criar tabela para perfis de clubes
CREATE TABLE public.club_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  club_name TEXT NOT NULL,
  representative_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  club_type TEXT NOT NULL CHECK (club_type IN ('clube', 'olheiro')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Habilitar RLS para clubes
ALTER TABLE public.club_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own club profile" 
ON public.club_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own club profile" 
ON public.club_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own club profile" 
ON public.club_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Criar tabela para perfis de empresários
CREATE TABLE public.agent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Habilitar RLS para empresários
ALTER TABLE public.agent_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own agent profile" 
ON public.agent_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own agent profile" 
ON public.agent_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_identity);

CREATE POLICY "Users can update their own agent profile" 
ON public.agent_profiles FOR UPDATE 
USING (auth.uid() = user_id);
