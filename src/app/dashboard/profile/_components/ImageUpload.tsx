"use client"
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


type Props = {
    userUid:string | undefined | null
}

const ImageUpload = ({userUid}: Props) => {
    const [image, setImage] = useState<null | File>(null)
    const [uploading, setUploading]=useState(false)
    const [imageFileUrl, setImageFileUrl] = useState<string>("")
    const [imageDimensions, setImageDimensions]=useState({
        width:0,
        height:0
    })
    const setImageURL = useProfileStore(state => state.setImageURL)
const uploadImage = useProfileStore((state) => state.uploadImage);

    const profile = useProfileStore((state) => state.profile);

    const fileInputRef = useRef<HTMLInputElement>(null)

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
          //uploadImage(file)
            setImage?.(file) //to store to zusand state
            useProfileStore.getState().setHasChanges(true)
            console.log(file)

            // var img:HTMLImageElement
            // img=document.createElement("img")

            // img.onload=()=>{
            //     debugger
            //     setImageDimensions({
            //         width:img.width,
            //         height:img.height
            //     })

            //     console.log(img.width)
            // }
            const reader = new FileReader()
reader.onloadend = () => {
  setImageFileUrl(reader.result)
}
reader.readAsDataURL(file)


        }
    }

    const handleButtonClick = () => {

        fileInputRef.current?.click()

        //Upload Image


    }
    const handleUpload = async()=>{
        setUploading(true)
        if(!userUid){
            console.error("Undefined Uid");
            return;
        }
        const userRef = doc(db, 'users', userUid)
        const date=new Date()
        const imageRef = ref(storage, `${userUid}/${date}`)

        const validFormats = ['image/jpeg', 'image/png']
const maxWidth = 1024
const maxHeight = 1024

if (!validFormats?.includes(image?.type)) {
  console.error('Invalid file format.Only JPG & PNG are allowed')
  return
}

console.log(imageDimensions)





        try {

    if(imageDimensions?.width>maxWidth || imageDimensions?.height>maxHeight){
    console.error("Image must be below 1024x1024px")
    showToastError("Image must be below 1024px x 1024px")
    return
}
            await uploadBytes(imageRef, image)
            const url=await getDownloadURL(imageRef)
            setImageFileUrl(url)
            setImageURL?.(url)
            console.log(url)
            console.log("Uploaded")
        } catch (error) {
            console.error(error)
        } finally{
            setUploading(false)
        }


    }
    return (
        <div className='flex flex-col gap-2'>
            <Input id="profile-image" type="file" onChange={handleFileChange} accept="image/png,image/jpeg" className="hidden" ref={fileInputRef} />
            {(
                <div className="mt-2 bg-light-purple relative w-40 h-40 rounded-md p-5 flex items-center " onClick={handleButtonClick}>

                    {
                        profile?.imageUrl ? (<Image
                            src={`${profile?.imageUrl} || ${imageFileUrl}`}
                            alt="Preview"
                            fill
                            className={`${profile?.imageUrl && "opacity-500"} object-cover rounded-md`}
                            //objectFit='cover'
                        />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-purple whitespace-nowrap justify-center">
                                <Icon icon="bi:upload" width="26" height="26" />
                                <p>+ Select Image
                                </p>                        </div>)
                    }
                </div>
            )}
            <>
            {image && (<Button onClick={handleUpload} size="sm" disabled={uploading}>{uploading ? "Uploading..." :"Upload"}</Button>)}
            </>

        </div>
    )
}

export default ImageUpload
