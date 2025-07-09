
export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'jogador' | 'clube' | 'empresario';
  avatar?: string;
  isOnboarded: boolean;
}

export interface JogadorProfile {
  id: string;
  userId: string;
  nomeCompleto: string;
  dataNascimento: string;
  cidade: string;
  estado: string;
  posicaoPrincipal: string;
  pernaHabil: 'destro' | 'canhoto' | 'ambos';
  habilidades: string[];
  temEmpresario: boolean;
  clubesAnteriores: string;
  altura: string;
  peso: string;
  telefone: string;
  videos: string[];
  avatar?: string;
  bio?: string;
}

// Mock data para demonstração
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'carlos@email.com',
    name: 'Carlos Silva',
    userType: 'jogador',
    isOnboarded: true
  },
  {
    id: '2',
    email: 'scout@palmeiras.com',
    name: 'João Santos',
    userType: 'clube',
    isOnboarded: true
  }
];

export const mockJogadores: JogadorProfile[] = [
  {
    id: '1',
    userId: '1',
    nomeCompleto: 'Carlos Silva Santos',
    dataNascimento: '2001-03-15',
    cidade: 'São Paulo',
    estado: 'SP',
    posicaoPrincipal: 'Atacante',
    pernaHabil: 'destro',
    habilidades: ['velocidade', 'finalização', 'drible'],
    temEmpresario: false,
    clubesAnteriores: 'Juventus Mooca, Nacional AC',
    altura: '1.75m',
    peso: '70kg',
    telefone: '(11) 99999-9999',
    videos: ['/placeholder.mp4'],
    bio: 'Atacante rápido com boa finalização, procurando oportunidade em clube profissional.'
  }
];

let currentUser: User | null = null;

export const authService = {
  login: async (email: string, password: string) => {
    // Simula autenticação
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    throw new Error('Credenciais inválidas');
  },

  register: async (userData: Omit<User, 'id' | 'isOnboarded'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      isOnboarded: false
    };
    mockUsers.push(newUser);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return newUser;
  },

  logout: () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      currentUser = JSON.parse(stored);
      return currentUser;
    }
    return null;
  },

  updateUser: (updates: Partial<User>) => {
    if (currentUser) {
      currentUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }
};
