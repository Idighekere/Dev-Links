import { Profile, Links } from '@/types'
import { DocumentData } from 'firebase/firestore'
import { ZodBoolean } from 'zod'

export interface UserData {
  forms: any[]
  profile: Profile
  uid: string
  links: Links[]
}
export interface UserState {
  userData?: UserData | null
  isSaved?: boolean
  loading: boolean
}

export interface UserAction {
  setUserData?: (userData: UserData) => void
  getUserData: () => Promise<(() => void) | undefined>
  setLoading: (loading: boolean) => void
}
