'use client'
import React from 'react'
import LinkSkeleton from '@/app/dashboard/links/_components/LinkSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkType } from '@/types/links'

type Props = {
  links: LinkType[]
}
const LinkRouteSkeleton = ({ links }: Props) => {
  //const links=useLinkStore.getState().links

  return (
    <div className='flex flex-col gap-3 p-5'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='md:w-[65%] w-4/5 h-7  rounded-sm' />
        <Skeleton className='w-full h-4 rounded-sm' />
        <Skeleton className='w-[30%] h-4 rounded-sm' />
      </div>

      <Skeleton className='w-full h-10 rounded-md mt-3' />

      {links?.length == 0 ? (
        <>
          <Skeleton className='w-full h-[20rem] rounded-md my-5' />

          <div className='flex flex-col gap-2'>
            <Skeleton className='w-4/5 h-7  rounded-sm' />
            <Skeleton className='w-[95%] h-4 rounded-sm' />
            <Skeleton className='w-full h-4 rounded-sm' />
            <Skeleton className='w-[76%] h-4 rounded-sm' />
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center'>
          {Array(2)
            .fill('')
            .map((_, idx) => (
              <LinkSkeleton key={idx} />
            ))}
        </div>
      )}
    </div>
  )
}
export default LinkRouteSkeleton
