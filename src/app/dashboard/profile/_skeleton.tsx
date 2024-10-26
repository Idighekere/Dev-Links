'use client'
import React from 'react'
import LinkSkeleton from '@/app/dashboard/links/_components/LinkSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserStore, useLinkStore } from '@/store'
const ProfileRouteSkeleton = () => {
  //const links=useLinkStore.getState().links

  return (
    <div className='flex flex-col gap-3 p-5'>
      <div className='flex flex-col gap-2 mb-4'>
        <Skeleton className='md:w-[65%] w-4/5 h-7  rounded-sm' />
        <Skeleton className='w-full h-4 rounded-sm' />
        <Skeleton className='w-[30%] h-4 rounded-sm' />
      </div>
      <div className='flex lg:flex-row flex-col bg-light-grey p-4 rounded-md space-y-3 mb-4 gap-2 items-center justify-center'>
        <Skeleton className='w-[8rem] h-4 rounded-sm' />

        <div className='flex lg:flex-row flex-col items-center justify-center gap-3 w-full m-0'>
          <Skeleton className=' w-[9rem] h-[9rem]  rounded-md' />
          <div className='flex flex-col gap-2 w-full md:w-[50%]'>
            <Skeleton className='w-full h-4 rounded-sm' />
            <Skeleton className='w-[30%] h-4 rounded-sm' />
          </div>
        </div>
      </div>

      <div className='bg-light-grey p-4 rounded-md flex flex-col gap-4'>
        {/* FORM SKELETON */}

        <div className='flex flex-col gap-5'>
          {/**INPUT FIELDS WITH LABEL SKELETON */}
          <div className=''>
            <Skeleton className='w-[35%] h-3  rounded-md mb-1' />
            <Skeleton className='w-full h-8  rounded-md' />
          </div>
          <div className=''>
            <Skeleton className='w-[35%] h-3  rounded-md mb-1' />
            <Skeleton className='w-full h-8  rounded-md' />
          </div>
          <div className=''>
            <Skeleton className='w-[35%] h-3  rounded-md mb-1' />
            <Skeleton className='w-full h-8  rounded-md' />
          </div>
        </div>

        {/* SAAVE BUTTON */}
        <div className='flex w-full /md:w-[10rem] md:justify-end //pr-4'>
          <Skeleton className='w-full md:w-[4rem] h-8 rounded-md' />
        </div>
      </div>

      <div className='mt-10 w-full flex justify-center'>
        <Skeleton className='w-[5rem] h-8 rounded-md mt-3' />
      </div>
    </div>
  )
}
export default ProfileRouteSkeleton
