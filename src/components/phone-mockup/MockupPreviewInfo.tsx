'use client'
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const MockupPreviewInfo = ({ profile }:any) => {

  return (
    <div className='flex flex-col /space-x-4 /space-y-8 items-center justify-center'>
      <div className='relative  rounded-full  h-[80px] w-[80px] self- flex justify-center items-center mb-4 border-2 border-purple '>
        {profile?.imageUrl ? (
          <Image
            alt={`${profile?.firstName}'s image`}
            src={`${profile?.imageUrl} `}
            className='rounded-full object-cover h-32 w-32 '
            fill
          />
        ) : (
          'No Image'
        )}
      </div>
      <div className='/space-y-2 flex flex-col items-center /flex-center'>
        {profile?.firstName && (
          <h2 className='text-lg font-[600] m-0'>
            {profile?.firstName} {profile?.lastName}
          </h2>
        )}

        {profile?.email && <p className='text-[0.75rem]'>{profile?.email}</p>}
      </div>
    </div>
  )
}

export default MockupPreviewInfo
