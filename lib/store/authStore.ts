import { User } from '@/types/user';
import { create } from 'zustand';

interface AuthStore {
  user: null | User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set(() => ({ user: user, isAuthenticated: true })),
  clearAuth: () => set(() => ({ user: null, isAuthenticated: false })),
}));
