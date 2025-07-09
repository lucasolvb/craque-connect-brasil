
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
    user_type: 'jogador' | 'clube' | 'empresario';
    emailRedirectTo?: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          user_type: userData.user_type
        },
        emailRedirectTo: userData.emailRedirectTo || `${window.location.origin}/dashboard`
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
      console.log('Auth state change:', event, session?.user?.id);
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
