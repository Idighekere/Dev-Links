'use client'

import { ProfileForm, ImageUpload } from '@/app/dashboard/profile/_components'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/config/firebase.config'
import { useUserStore, useProfileStore, useAuthStore } from '@/store'
import ProfileRouteSkeleton from './_skeleton'
import { db, storage } from '@/config/firebase.config'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

import { showToastSuccess, showToastError } from '@/utils/showToast'
type Props = {}

const Profile = (props: Props) => {
  const router = useRouter()
  const profile = useProfileStore(state => state.profile)
  const saveProfile = useProfileStore(state => state.saveProfile)
  // const [loading, setLoading] = useState(false)
  const user = useAuthStore(state => state.currentUser)
  const userUid = user?.uid
  const setInitialProfile = useProfileStore(state => state.setInitialProfile)
  const getProfileData = useProfileStore(state => state.getProfileData)
  const hasChanges = useProfileStore(state => state.hasChanges)
  const loading = useProfileStore(state=>state.loading)

  // const fetchUserData = (userUid: string | undefined | null) => {

  //     if (!userUid) {
  //         console.error("Invalid Uid")
  //         return;
  //     }

  //     setLoading(true)
  //     const userRef = doc(db, "users", userUid);
  //     // const docSnap = await getDoc(userRef);
  //     //NOTE - OPted or onSnapshot due to relatime updates
  //     const unsubscribe = onSnapshot(userRef, (docSnap) => {
  //         if (docSnap.exists()) {
  //             const profileData = docSnap.data()?.profile;
  //             setInitialProfile(profileData)
  //             setLoading(false)
  //         } else {
  //             console.error("Doc doesn't exist");
  //             setInitialProfile({})
  //             setLoading(false)
  //         }

  //     })

  //     return unsubscribe
  // }

  useEffect(() => {
    const getProfileData=useProfileStore.getState().getProfileData
    getProfileData()
  }, [])

  //UPLOAD IMAGE

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Logged out successfully!')
        showToastSuccess('Log-out success')
      })
      .catch(error => {
        console.log('An error happened.')
        showToastError('Logged out failed')
      })
  }

  const handleSaveLink = () => {
    saveProfile()
  }

  if (loading) {
    return (
      <main className='bg-white h-f p-4'>
        <ProfileRouteSkeleton />
      </main>
    )
  }

  return (
    <main className='bg-white h-f p-4 /relative'>
      <h2 className='font-[500] text-2xl'>Profile Details</h2>

      <p>Add your details to create a personal touch to your profile.</p>

      <div className='flex lg:flex-row flex-col bg-light-grey p-4 rounded-md space-y-3 mb-4 gap-2 items-center justify-center'>
        <h3 className='font-[500] whitespace-nowrap'>Profile Picture</h3>
        <div className='flex lg:flex-row flex-col items-center justify-center gap-3 w-full m-0'>
          <ImageUpload userUid={userUid} />
          <p className='text-[12px] w-[40%]'>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </div>

      <div className='bg-light-grey p-4 rounded-md flex flex-col gap-4'>
        <ProfileForm />
        <div className='space-y-4 mt-6 w-full h-[1px] bg-borders'></div>
        <div className='flex w-full md:w-auto md:justify-end //pr-4'>
          <Button
            type='submit'
            onClick={handleSaveLink}
            disabled={!hasChanges}
            className='w-full md:w-auto'
          >
            Save
          </Button>
        </div>
      </div>
      <div className='mt-10 w-full flex justify-center'>
        <Button type='submit' variant='destructive' onClick={logOut}>
          Log Out
        </Button>
      </div>
    </main>
  )
}

export default Profile
