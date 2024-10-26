export interface User {
  uid: string |  undefined | null
  email: string |  undefined | null
  displayName: string | undefined | null;
}

export interface AuthState {
    currentUser:User | null
loading: boolean;
}
export interface AuthAction {
    setCurrentUser: (currentUser: User | null) => void;
  setLoading: (loading: boolean) => void;
}
