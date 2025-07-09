
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthUser } from '@/lib/supabase-auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { 
    full_name: string; 
    user_type: 'jogador' | 'clube' | 'empresario';
    emailRedirectTo?: string;
  }) => Promise<void>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const SupabaseAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      console.log('User state updated:', user?.id);
      setUser(user);
      setLoading(false);
    });

    // THEN get initial session
    authService.getCurrentUser().then(({ data: { user } }) => {
      if (user) {
        setUser({
          id: user.id,
          email: user.email!,
          user_metadata: user.user_metadata
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { 
    full_name: string; 
    user_type: 'jogador' | 'clube' | 'empresario';
    emailRedirectTo?: string;
  }) => {
    await authService.signUp(email, password, userData);
  };

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    await authService.signIn(email, password, rememberMe);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
