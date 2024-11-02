import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'

type Props = {
  blobUrl: string | null
  onClick: () => void
  profileImageUrl: any //string | null
  image:File| null
}

const ImagePreview = ({ blobUrl, onClick, profileImageUrl,image }: Props) => {

  const selectedImageUrl=(image ? blobUrl : profileImageUrl) || ""
  return (
    <div
      className='mt-2 bg-light-purple relative w-40 h-40 rounded-md p-5 flex items-center cursor-pointer select-none'
      onClick={onClick}
    >
      {(blobUrl||profileImageUrl) && (
        <Image
          src={selectedImageUrl}
          alt='Preview'
          fill
          className={`
       object-cover rounded-md`}
          //objectFit='cover'
        />
      )}

      {/* Overlay for Select Image */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-md flex-col gap-4 ${
          blobUrl || profileImageUrl ? 'hidden' : 'bg-black bg-opacity-50'
        }`}
      >
        <Icon icon='bi:upload' width='26' height='26' className='text-white' />
        <p className='text-white'>+ Select Image</p>
      </div>
    </div>
  )
}

export default ImagePreview
