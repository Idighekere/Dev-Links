import { create, StateCreator } from "zustand";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.config";
// import { auth } from ".config/firebase.config";
export interface User {
  user: null;
  email: string;
  password: string;
}

interface State {
  user: any;
  isLoading?: boolean;
}
interface Action {
  setUser?: (user: any) => void;
  logout: () => void;
  init: () => void;
}

export const useAuthStore = create<State & Action>((set) => ({
  user: null,
  isLoading: true,
  init: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, isLoading: false });
    });

    return () => unsubscribe();
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
