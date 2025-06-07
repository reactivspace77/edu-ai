import { create } from 'zustand';
import { Challenge } from '../types';
import supabase from '../config/supabase';

interface ChallengeState {
  dailyChallenges: Challenge[];
  loading: boolean;
  error: string | null;
  fetchChallenges: (userId: string) => Promise<void>;
  updateChallenge: (challengeId: string, progress: number) => Promise<void>;
}

const useChallengeStore = create<ChallengeState>((set, get) => ({
  dailyChallenges: [],
  loading: false,
  error: null,

  fetchChallenges: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('type', 'daily');
      
      if (error) {
        throw error;
      }

      // Also fetch user progress for these challenges
      const { data: progressData, error: progressError } = await supabase
        .from('challenge_progress')
        .select('*')
        .eq('userId', userId);

      if (progressError) {
        throw progressError;
      }

      // Combine challenges with user progress
      const challenges = (data as Challenge[]).map(challenge => {
        const progress = progressData.find(p => p.challengeId === challenge.id);
        return {
          ...challenge,
          current: progress ? progress.current : 0,
        };
      });

      set({ dailyChallenges: challenges, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateChallenge: async (challengeId: string, progress: number) => {
    try {
      set({ loading: true, error: null });
      const { dailyChallenges } = get();
      
      // Update local state
      const updatedChallenges = dailyChallenges.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, current: progress } 
          : challenge
      );
      
      set({ dailyChallenges: updatedChallenges });

      // Update in database
      const { error } = await supabase
        .from('challenge_progress')
        .upsert([{ challengeId, current: progress }]);
      
      if (error) {
        throw error;
      }

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useChallengeStore;