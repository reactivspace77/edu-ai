import { create } from 'zustand';
import { User } from '../types';
import supabase from '../config/supabase';
import { AuthUser } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  loadUserProfile: (authUser: AuthUser) => Promise<void>;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },

  loadUserProfile: async (authUser: AuthUser) => {
    try {
      set({ loading: true, error: null });
      
      // Try to fetch existing user profile
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();
      
      if (fetchError) {
        throw fetchError;
      }

      if (existingUser) {
        // User profile exists, use it
        set({
          user: existingUser as User,
          isAuthenticated: true,
          loading: false,
        });
        return;
      }

      // No profile exists, create a new one
      const newUser: Partial<User> = {
        id: authUser.id,
        email: authUser.email || '',
        name: '',
        level: 1,
        experience: 0,
        subjects: [],
        badges: [],
      };

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      set({
        user: createdUser as User,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      console.error('Error loading user profile:', error);
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        await get().loadUserProfile(data.user);
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        await get().loadUserProfile(data.user);
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) {
        throw error;
      }

      // Note: The actual user data will be handled in App.tsx after redirect
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      get().clearAuth();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateUser: async (userData: Partial<User>) => {
    const { user } = get();
    if (!user) return;

    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }

      set({
        user: { ...user, ...userData },
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuthStore;