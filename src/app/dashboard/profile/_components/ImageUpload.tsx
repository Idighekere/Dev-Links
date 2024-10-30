'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { useProfileStore } from '@/store'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button } from '@/components/ui'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from 'firebase/storage'
import { doc } from 'firebase/firestore'
import { db, storage } from '@/config/firebase.config'
import { showToastError } from '@/utils/showToast'
import ImagePreview from './ImagePreview'

type Props = {
  userUid: string | undefined | null
}

const ImageUpload = ({ userUid }: Props) => {
  const [image, setImage] = useState<null | File>(null)
  const [uploading, setUploading] = useState(false)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0
  })
  const setImageURL = useProfileStore(state => state.setImageURL)

  const profile = useProfileStore(state => state.profile)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      //uploadImage(file)
      setImage?.(file) //to store to zusand state
      useProfileStore.getState().setHasChanges(true)
      //console.log(file)

      const maxWidth = 1024
      const maxHeight = 1024

      const reader = new FileReader()
      reader.onloadend = () => {
        // const img = new Image()
        //img.src = reader.result as string
        setBlobUrl(reader.result as string)

        // img.onload = () => {
        //   const { naturalWidth, naturalHeight } = img

        //   //checking of image diimensions are greater than 1024x1024
        //   if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
        //     console.error('Image must be below 1024x1024px')
        //     showToastError('Image must be below 1024px x 1024px')
        //     return
        //   }
        // }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()

    //Upload Image
  }
  const handleUpload = async () => {
    setUploading(true)
    if (!userUid) {
      console.error('Undefined Uid')
      return
    }
    const userRef = doc(db, 'users', userUid)
    const date = new Date()
    const imageRef = ref(storage, `${userUid}/${date}`)

    const validFormats = ['image/jpeg', 'image/png']

    if (!image || !validFormats?.includes(image?.type)) {
      console.error('Invalid file format.Only JPG & PNG are allowed')
      return
    }

    //console.log(imageDimensions)

    try {
      if (image) {
        await uploadBytes(imageRef, image)
        const url = await getDownloadURL(imageRef)
        setBlobUrl(url)
        setImageURL?.(url)
        //console.log(url)
      } else {
        console.error('No Image file provided')
      }
      //console.log('Uploaded')
    } catch (error) {
      console.error(error)
    } finally {
      setUploading(false)
    }
  }
  return (
    <div className='flex flex-col gap-2'>
      <Input
        id='profile-image'
        type='file'
        onChange={handleFileChange}
        accept='image/png,image/jpeg'
        className='hidden'
        ref={fileInputRef}
      />
      <ImagePreview
        blobUrl={blobUrl}
        onClick={handleButtonClick}
        profileImageUrl={profile?.imageUrl}
      />

      <>
        {image && (
          <Button onClick={handleUpload} size='sm' disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        )}
      </>
    </div>
  )
}

export default ImageUpload
