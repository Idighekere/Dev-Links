'use client'
import React, { useEffect, useState } from 'react'
import LinkEditorCard from '@/app/dashboard/links/_components/Links'

import { useRouter } from 'next/navigation'

import LinkRouteSkeleton from './_skeleton'
import { useUserStore, useLinkStore } from '@/store'

import { db, storage } from '@/config/firebase.config'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

const Links = () => {
  //const [loading, setLoading] = useState(false)
  const userData = useUserStore(state => state.userData)
  //const userUid = user?.uid
  const setInitialLinks = useLinkStore(state => state.setInitialLinks)
  const hasChanges = useLinkStore(state => state.hasChanges)
const links=userData?.links
const loading = useUserStore.getState()?.loading
  //const getUserData = useUserStore(state => state.getUserData)
useEffect(() => {
  const getUserData=useUserStore.getState().getUserData
  getUserData()
}, [])

  // const links = useLinkStore(state => state.links)
  // const fetchUserData = (userUid: string) => {
  //   if (!userUid) {
  //     console.error('Invalid Uid')
  //     return
  //   }

  //   setLoading(true)
  //   const userRef = doc(db, 'users', userUid)
  //   // const docSnap = await getDoc(userRef);
  //   //NOTE - OPted or onSnapshot due to relatime updates
  //   const unsubscribe = onSnapshot(userRef, docSnap => {
  //     if (docSnap.exists()) {
  //       const linksData = docSnap.data()?.links
  //       setInitialLinks(linksData)
  //       setLoading(false)
  //     } else {
  //       console.error("Doc doesn't exist")
  //       setInitialLinks([])
  //       setLoading(false)
  //     }
  //   })

  //   return unsubscribe
  // }

  // useEffect(() => {
  //   const unsubscribe = fetchUserData(userUid)

  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe() //cleanup listener on unmount
  //     }
  //   }
  // }, [userUid])

  if (loading) {
    return (
      <div>
        {/* <LinkEditorCard /> */}
        <LinkRouteSkeleton links={links} />
      </div>
    )
  }
  return (
    <div>
      <LinkEditorCard links={links} hasChanges={hasChanges} loading={loading}/>
      {/* <LinkRouteSkeleton/> */}
    </div>
  )
}

export default Links
