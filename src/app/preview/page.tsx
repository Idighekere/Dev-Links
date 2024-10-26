'use client'
import { PreviewCard } from '@/components/preview'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import { InfoSkeleton, LinkSkeleton } from '@/components/preview'
import { Skeleton } from '@/components/ui/skeleton'
import { showToastError, showToastSuccess } from '@/utils/showToast'
import { NotFound, Footer, PreLoader, NavBar } from '@/components'

import { db, storage } from '@/config/firebase.config'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

const Preview = () => {
  const pathname = usePathname()
  //const user = useUserStore((state) => state.user)
  const [loading, setLoading] = useState(false)
  const user = useUserStore(state => state.userData)
  const [userData, setUserData] = useState()

  const userUid = user?.uid
  const fetchUserData = (userUid: string) => {
    console.log(userUid)
    if (!userUid) {
      console.error('Invalid Uid')
      return
    }
    try {
      setLoading(true)
      const userRef = doc(db, 'users', userUid)
      // const docSnap = await getDoc(userRef);
      //NOTE - OPted or onSnapshot due to relatime updates
      const unsubscribe = onSnapshot(userRef, docSnap => {
        if (docSnap.exists()) {
          const Data = docSnap.data()
          setUserData(Data)
        } else {
          console.error("Doc doesn't exist")
          //setUserData()
        }
      })

      return unsubscribe
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = fetchUserData(userUid)

    return () => unsubscribe && unsubscribe() //cleanup listener on unmount
  }, [userUid])

  const getSharableLink = () => {
    return `${window.location.origin}/profile/${userData?.profile?.username}`
  }
  const copyLinkToClipboard = async () => {
    const link = getSharableLink()
    try {
      await navigator.clipboard.writeText(link)
      showToastSuccess('Link copied to clipboard!')
    } catch (error) {
      console.error(error)
      showToastError('Failed to copy link')
    }
  }

  if (loading) {
    return (
      <div>
        <div className='sm:bg-purple lg:max-h-64 rounded-bl-lg rounded-br-lg md:max-h-32 md:p-8 sm:pb-[10rem] md:pb-[16rem] p-4  relative'>
          <div
            className={`${
              pathname == '/preview' ? 'justify-between' : 'justify-end'
            } bg-white rounded-md flex  sm:p-8 gap-3 p-4`}
          >
            <Skeleton className='h-9 w-full sm:w-32 self' />
          </div>
        </div>

        <div className='flex justify-center items-center /h-screen w-full mt-10 p-5'>
          {' '}
          <div className=' w-full smax-w-sm sm:max-w-md lg:max-w-lg p-5 md:p-16  md:w-[349px] bg-white md:shadow-lg rounded-md  md:rounded-[24px] sm:absolute top-40'>
            <div className='w-full flex justify-center items-center gap-6 /space-y-4 flex-col  bg-white rounded-lg py-8 '>
              <InfoSkeleton />
              <LinkSkeleton />
            </div>
          </div>
        </div>
        <div className='/sm:absolute bottom-0 w-full hidden'>
          {' '}
          <Footer />{' '}
        </div>
      </div>
    )
  }

  return (
    <div className='//mb-20'>
      <div className='sm:bg-purple lg:max-h-64 rounded-bl-lg rounded-br-lg md:max-h-32 md:p-8 sm:pb-[10rem] md:pb-[16rem] p-4  relative'>
        <div
          className={`${
            pathname == '/preview' ? 'justify-between' : 'justify-end'
          } bg-white rounded-md flex  sm:p-8 gap-3 p-4`}
        >
          {userData?.uid && (
            <Button variant='outline' className='w-full md:w-auto'>
              <Link href='/links'>Back to Editor</Link>
            </Button>
          )}

          <Button
            className='/w-full sm:w-auto self-end'
            onClick={copyLinkToClipboard}
          >
            Share Link
          </Button>
        </div>
      </div>

      <div className='flex justify-center items-center h-screen w-full mt-10 p-5'>
        {' '}
        <div className=' w-full smax-w-sm sm:max-w-md lg:max-w-lg p-5 md:p-6  md:w-[349px] bg-white md:shadow-lg rounded-md  md:rounded-[24px] sm:absolute top-40'>
          <PreviewCard userData={userData} loading={loading} />
          {/* {params.username} */}
        </div>
      </div>
      <div className=' h-full /sm:absolute bottom-0 w-full /hidden'>
        {' '}
        <Footer />{' '}
      </div>
    </div>
  )
}

export default Preview
