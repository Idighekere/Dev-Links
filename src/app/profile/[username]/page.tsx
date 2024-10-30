/* eslint-disable react/no-unescaped-entities */
'use client'

import { useParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, Skeleton } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { PreviewCard, InfoSkeleton, LinkSkeleton } from '@/components/preview'

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { NotFound, Footer, PreLoader, NavBar } from '@/components'

import { useUserStore } from '@/store'
import { showToastError, showToastSuccess } from '@/utils/showToast'
import { UserData } from '@/types'
// import { FetchByUsername } from '@/hooks/useFetchData'

const db = getFirestore()

const PreviewPage = () => {
  const { username } = useParams()
  //const username = params.username

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['username'],
  //   queryFn: () => {
  //     return FetchByUsername(username as string)
  //   },
  //   enabled:!!username
  // })

  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const user = useUserStore.getState().userData
  const uid = user?.uid
  const [userData, setUserData] = useState<null | UserData>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return

      try {
        setLoading(true)

        //TODO - Query firestore for the user with the specified username or email
        const docRef = collection(db, 'users')
        const q = query(docRef, where('profile.username', '==', username))

        const querySnapshot = await getDocs(q)
        //console.log(querySnapshot)
        //console.log(q)
        //console.log(docRef)
        if (querySnapshot.empty) {
          //console.log('No matching users found')
          setError(true)
          setUserData(null)

          return
        }

        querySnapshot.forEach(doc => {
          const data = doc.data()
          setUserData(data as UserData)
          setError(false)
          //console.log(data)
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [username])

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

        <div className='flex justify-center items-center h-screen w-full mt-10 p-5'>
          {' '}
          <div className=' w-full smax-w-sm sm:max-w-md lg:max-w-lg p-5 md:p-16  md:w-[349px] bg-white md:shadow-lg rounded-md  md:rounded-[24px] sm:absolute top-40'>
            <div className='w-full flex justify-center items-center gap-6 /space-y-4 flex-col  bg-white rounded-lg py-8 '>
              <InfoSkeleton />
              <LinkSkeleton />
            </div>
          </div>
        </div>
        <div className='sm:absolute bottom-0 w-full md:hidden'>
          {' '}
          <Footer />
        </div>
      </div>
    )
  }

  const getSharableLink = () => {
    return `${window.location.origin}/profile/${username}`
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
  if (userData) {
    return (
      <div className='//mb-20'>
        <div className='sm:bg-purple lg:max-h-64 rounded-bl-lg rounded-br-lg md:max-h-32 md:p-8 sm:pb-[10rem] md:pb-[16rem] p-4  relative'>
          <div
            className={`${
              pathname == '/preview' ? 'justify-between' : 'justify-end'
            } bg-white rounded-md flex  sm:p-8 gap-3 p-4`}
          >
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
          <div className=' w-full smax-w-sm sm:max-w-md lg:max-w-lg p-5 md:p-16  md:w-[349px] bg-white md:shadow-lg rounded-md  md:rounded-[24px] sm:absolute top-40'>
            <PreviewCard userData={userData} loading={loading} />
            {/* {params.username} */}

            <p className='text-sm text-center'>
              Don't have an account?{' '}
              <a href='/register' className='text-purple'>
                Create account
              </a>
            </p>
          </div>
        </div>
        <div className='/sm:absolute bottom-0 w-full /hidden'>
          {' '}
          <Footer />{' '}
        </div>
      </div>
    )
  }

  if (error) {
    return <NotFound />
  }
}
export default PreviewPage
