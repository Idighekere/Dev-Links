import { platforms } from '@/lib/platforms'
import { create, StateCreator } from 'zustand'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db, storage } from '@/config/firebase.config'
import { showToastSuccess, showToastError } from '@/utils/showToast'
import { ProfileAction, ProfileState } from '@/types'
import { useAuthStore, useUserStore } from '@/store'
import { uploadImage } from '@/utils/uploadImage'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage'

const useProfileStore = create<ProfileState & ProfileAction>((set, get) => ({
  userData: useUserStore.getState().userData,
  profile: {
    //imageUrlFromStorage: '',
    firstName: '',
    lastName: '',
    email: '',
    //imageURLFromFileReader:"",
    username: ''
  },
  initialProfile: {},
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
  hasChanges: false,
  setHasChanges: (hasChanges: boolean) => set({ hasChanges }),

  setProfile: (field, value) => {
    set({
      profile: {
        ...get().profile,
        [field]: value
      },
      hasChanges: true
    })
  },
  getProfileData: async () => {
    const userUid = useAuthStore.getState().currentUser?.uid
    if (!userUid) {
      console.error('Invalid Uid')
      return
    }

    const profileRef = doc(db, `users`, userUid)

    set({ loading: true })

    const unsubscribe = onSnapshot(profileRef, snapshot => {
      const profileData = snapshot?.data()?.profile
      if (profileData) {
        get().setInitialProfile(profileData)
      }
      set({ loading: false })
    })

    return () => {
      unsubscribe()
    }
  },

  saveProfile: async () => {
    const uid = useAuthStore.getState().currentUser?.uid
    //console.log(uid)
    if (!uid) {
      console.error('Invalid Uid')
      return
    }
    try {
      const currentProfile = get()?.profile
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, {
        profile: {
          ...currentProfile
        }
      })
      set({
        initialProfile: currentProfile,
        hasChanges: false
      })
      showToastSuccess('Profile saved successfully!')
      // const fileName=`${}`
      // uploadImage()
    } catch (err) {
      console.error(err)
      showToastError('Failed to save profile')
    }
  },

  setInitialProfile: fetchedProfile => {
    set({
      profile: fetchedProfile,
      hasChanges: false,
      initialProfile: fetchedProfile
    })
  },

  //IMAGE UPLOAD FUNCTIONS
  //  setImageFile: (image) =>
  // set((state) => ({
  //   profile: {
  //     ...state.profile,
  //     imageFile: image,
  //   },
  // })),
  setImageURL: imageUrl =>
    set(state => ({
      profile: {
        ...state.profile,
      imageUrl
      },
      hasChanges: true
    }))
}))

export default useProfileStore
