
import { supabase } from '@/integrations/supabase/client';

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    user_type?: 'jogador' | 'clube' | 'empresario';
  };
}

export const authService = {
  signUp: async (email: string, password: string, userData: { 
    full_name: string; 
    user_type: 'jogador' | 'clube' | 'empresario' 
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string, rememberMe: boolean = false) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    if (rememberMe) {
      // Supabase handles session persistence automatically
      localStorage.setItem('rememberMe', 'true');
    }
    
    return data;
  },

  signOut: async () => {
    localStorage.removeItem('rememberMe');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (user: AuthUser | null) => void) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email!,
          user_metadata: session.user.user_metadata
        });
      } else {
        callback(null);
      }
    });
  }
};
