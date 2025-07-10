
import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { JogadorProfile } from '@/lib/auth';

export const useFavorites = () => {
  const { user } = useSupabaseAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [user?.id]);

  const toggleFavorite = (playerId: string) => {
    setIsLoading(true);
    
    const newFavorites = favorites.includes(playerId)
      ? favorites.filter(id => id !== playerId)
      : [...favorites, playerId];
    
    setFavorites(newFavorites);
    
    // Save to localStorage
    if (user?.id) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    }
    
    setIsLoading(false);
  };

  const isFavorite = (playerId: string) => favorites.includes(playerId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isLoading
  };
};
