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

  const hasChanges = useLinkStore(state => state.hasChanges)
  const links = useLinkStore(state => state.links)
  const loading = useUserStore.getState()?.loading

  useEffect(() => {
    const getLinkData = useLinkStore.getState().getLinkData
    getLinkData()
    //console.log("Link rendered")
  }, [])

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
      <LinkEditorCard links={links} hasChanges={hasChanges} loading={loading} />
      {/* <LinkRouteSkeleton/> */}
    </div>
  )
}

export default Links
