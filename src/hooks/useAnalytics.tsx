
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface PlayerAnalytics {
  profileViews: number;
  videoViews: { [videoId: string]: number };
  favoriteCount: number;
  searchAppearances: number;
  weeklyViews: number[];
}

export interface ClubAnalytics {
  searchesPerformed: number;
  playersViewed: number;
  favoritesSaved: number;
  messagessent: number;
  weeklyActivity: number[];
}

export const useAnalytics = () => {
  const { user } = useAuth();
  const [playerAnalytics, setPlayerAnalytics] = useState<PlayerAnalytics | null>(null);
  const [clubAnalytics, setClubAnalytics] = useState<ClubAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    if (user.userType === 'jogador') {
      // Mock player analytics
      setPlayerAnalytics({
        profileViews: 324,
        videoViews: { 'video1': 156, 'video2': 89 },
        favoriteCount: 12,
        searchAppearances: 45,
        weeklyViews: [23, 45, 67, 34, 56, 78, 43]
      });
    } else if (user.userType === 'clube') {
      // Mock club analytics
      setClubAnalytics({
        searchesPerformed: 89,
        playersViewed: 156,
        favoritesSaved: 23,
        messagesent: 12,
        weeklyActivity: [12, 23, 34, 45, 56, 34, 23]
      });
    }

    setIsLoading(false);
  }, [user]);

  const trackProfileView = (playerId: string) => {
    // In real app, would send to analytics service
    console.log('Profile viewed:', playerId);
  };

  const trackVideoView = (videoId: string) => {
    // In real app, would send to analytics service  
    console.log('Video viewed:', videoId);
  };

  const trackSearch = (searchTerm: string, filters: any) => {
    // In real app, would send to analytics service
    console.log('Search performed:', searchTerm, filters);
  };

  return {
    playerAnalytics,
    clubAnalytics,
    trackProfileView,
    trackVideoView,
    trackSearch,
    isLoading
  };
};
