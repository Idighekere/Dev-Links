import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const LinkSkeleton = () => {
  return (
    <>
      <div className='flex justify-between items-center py-3'>
        <Skeleton className='h-5 rounded w-1/4' />
        <Skeleton className='h-4 rounded w-16' />
      </div>
      <div className=''>
        <Skeleton className='h-8 rounded w-full' />
        <Skeleton className='h-8 rounded w-full' />
      </div>
    </>
  )
}

export default LinkSkeleton
