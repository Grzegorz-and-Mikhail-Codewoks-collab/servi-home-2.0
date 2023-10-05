import { create } from 'zustand';
interface Auth {
  auth: string | null;
  setAuth: (auth: string) => void;
  removeAuth: () => void;
  getState?: () => Auth;
}

interface Cleaner {
  cleaner: string | null;
  setCleaner: (cleaner: string) => void;
  removeCleaner: () => void;
}

export const useAuth = create<Auth>((set) => ({
  auth: null,
  setAuth: (auth) => set(() => ({ auth })),
  removeAuth: () => set({ auth: null }),
}));

export const useCleaner = create<Cleaner>((set) => ({
  cleaner: null,
  setCleaner: (cleaner) => set(() => ({ cleaner })),
  removeCleaner: () => set({ cleaner: null }),
}));
