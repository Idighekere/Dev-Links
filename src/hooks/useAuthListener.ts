import { useAuthStore } from '@/store'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/config/firebase.config'

export const useAuthListener = () => {
  const setCurrentUser = useAuthStore(state => state.setCurrentUser)
  const setLoading = useAuthStore(state => state.setLoading)
  const currentUser = useAuthStore(state => state.currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      //console.log(user)
      setCurrentUser({
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName
      })
      setLoading(false)
      ////console.log(currentUser)
    })

    return () => unsubscribe()
  }, [setCurrentUser, setLoading])
}
