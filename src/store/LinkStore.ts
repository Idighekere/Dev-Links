import { create, StateCreator } from 'zustand'
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db, storage } from '@/config/firebase.config'
import { Links, LinkState, LinkAction } from '@/types'
import useUserStore from './UserStore'
import { v4 as uuidv4 } from 'uuid'

import toast, { Toaster } from 'react-hot-toast'
import { showToastSuccess, showToastError } from '@/utils/showToast'
import useAuthStore from './AuthStore'

export const useLinkStore = create<LinkState & LinkAction>((set, get) => ({
  initialLinks: [],
  links: [],
  hasChanges: false,
  loading: true,

  setLoading: (loading: boolean) => set({ loading }),

  setHasChanges: (hasChanges: boolean) => set({ hasChanges }),

  setLinks: (links: Links[]) => set({ links }),

  setInitialLinks: (fetchedLinks: Links[]) =>
    set({
      initialLinks: fetchedLinks,
      hasChanges: false
    }),

  getLinkData: async () => {
    const userUid = useAuthStore.getState().currentUser?.uid
    if (!userUid) {
      console.error('Invalid Uid')
      return
    }

    const linkRef = doc(db, `users`, userUid)

    set({ loading: true })

    const unsubscribe = onSnapshot(linkRef, snapshot => {
      const linkData = snapshot?.data()?.links
      //console.log(snapshot)
      if (linkData) {
        get().setLinks(linkData)
        get().setInitialLinks(linkData)
        //console.log(linkData)
      }
      set({ loading: false })
    })

    return () => {
      unsubscribe()
    }
  }
}))
