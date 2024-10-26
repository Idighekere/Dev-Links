import { AuthAction, AuthState, User } from '@/types/auth';
import { create } from 'zustand';

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  currentUser:null,
  loading:true,
  setCurrentUser:(currentUser : User | null)=>set({currentUser}),
  setLoading:(loading:boolean) => set({loading})
}))

export default useAuthStore
