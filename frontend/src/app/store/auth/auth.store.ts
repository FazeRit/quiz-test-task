import { AUTH_INITIAL_STATE, AUTH_STORE_NAME } from './const/auth-store.const';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IAuthStore } from './types/auth-store.types';
import { IUser } from '../../../entities/user/model';

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      ...AUTH_INITIAL_STATE,

      setUser: (user: IUser | null) => set({ user }),

      setToken: (token: string | null) => set({ token }),

      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),

      clearAuth: () => set(AUTH_INITIAL_STATE),
    }),
    {
      name: AUTH_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
