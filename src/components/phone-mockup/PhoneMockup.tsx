'use client'
import React, { useEffect, useState } from 'react'
import { useUserStore, useLinkStore, useAuthStore } from '@/store'
import Phone from '@/assets/Phone'

import { db, storage } from '@/config/firebase.config'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { MockupInfoSkeleton, MockupLinkSkeleton,MockupPreview } from '@/components/phone-mockup'
// import { unsubscribe } from 'diagnostics_channel'

const PhoneMockup = () => {
  //const [loading, setLoading] = useState(true)
  //const [userData, setUserData] = useState<any>(null)
  //const getUser = useUserStore(state => state.getUser)
  const user=useAuthStore(state=>state.currentUser)
  //const unsavedLinks = useLinkStore(state => state.unsavedLinks)
  const userData = useUserStore(state => state.userData)
  const loading=useUserStore(state=>state.loading)
  // const fetchUserData =  () => {
  //   const userUid = user?.uid
  //   console.log(userUid)
  //   if (!userUid) {
  //     console.error('Invalid Uid')
  //     return
  //   }

  //   setLoading(true)
  //   const userRef = doc(db, 'users', userUid)
  //   //const docSnap = await getDoc(userRef);
  //   //NOTE - OPted or onSnapshot due to relatime updates
  //   const unsubscribe = onSnapshot(userRef, docSnap => {
  //     if (docSnap.exists()) {
  //       const Data = docSnap.data()
  //       setUserData(Data)
  //       setLoading(true)
  //     } else {
  //       console.error("Doc doesn't exist")
  //       setUserData(null)
  //       setLoading(false)
  //     }
  //   })

  //   return unsubscribe
  // }

  // useEffect(() => {
  //   const unsubscribe = fetchUserData()

  //   return () => unsubscribe && unsubscribe() //cleanup listener on unmount
  // }, [user])
  // unsavedLinks,userData,fetchUser
useEffect(() => {
  const getUserData = useUserStore.getState().getUserData

  getUserData()
}, [])

  // const user = useAuthStore(state => state.currentUser)
  // useEffect(()=>{
  //   getUser(user?.uid)
  // },[user?.uid])

  if (loading) {
    return (
      <section>
        <div className='relative'>
          <div>
            <Phone />
          </div>
          <div className='absolute  top-8 pt-5  right-0 left-0 m-auto flex flex-col gap-5'>
            <MockupInfoSkeleton />
            <MockupLinkSkeleton />
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="z-0">
      <div className='relative'>
        <div>
          <Phone />
        </div>
        <div className='absolute  top-3 pt-4  right-0 left-0 m-auto'>
          <MockupPreview userData={userData} loading={loading} />
        </div>
      </div>
    </section>
  )
}

export default PhoneMockup
