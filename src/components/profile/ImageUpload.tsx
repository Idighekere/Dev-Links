"use client"
import React, { useRef, useState, useEffect } from 'react'
import { Input } from '../ui/input'
import { useStore } from '@/store/useStore'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
// import { useStore } from 'zustand'
import { storage } from '../../config/firebase.config'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

type Props = {}

const ImageUpload = (props: Props) => {
    const [image, setImage] = useState<File | null>(null)
    const [imageFileUrl, setImageFileUrl] = useState("")
    const setImageURL = useStore(state => state.setImageURL)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // useEffect(() => {

    //     image && uploadImage
    // }, [image])

    const uploadImage = () => {
const date=new Date().getTime()
        const imageRef = ref(storage, `images/${date+image.name}`)

        if (image) {
          
            const uploadTask = uploadBytesResumable(imageRef, image);

            // Get the download URL
            getDownloadURL(uploadTask.snapshot.ref)
                .then((url: any) => {
                    // Insert url into an <img> tag to "download"
                    setImageURL?.(url)
                    setImageFileUrl(url)
                    console.log(url)
                })
                .catch((error: any) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
        }

    }
    uploadImage()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)

            console.log(image)
            // setImageURL?.(selectedImage) //to store to zusand state

        }
    }

    const handleButtonClick = () => {

        fileInputRef.current?.click()
    }
    return (
        <div>
            <Input id="profile-image" type="file" onChange={handleFileChange} accept="image/*" className="hidden" ref={fileInputRef} />
            {(
                <div className="mt-2 bg-light-purple relative w-40 h-40 rounded-md p-5 flex items-center" onClick={handleButtonClick}>
                    {
                        imageFileUrl ? (<Image
                            src={imageFileUrl || `/User-avatar.png`}
                            alt="Preview"
                            fill
                            className={`${imageFileUrl && "opacity-500"} object-cover`}
                            objectFit='cover'
                        />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-purple whitespace-nowrap justify-center">
                                <Icon icon="bi:upload" width="26" height="26" />
                                <p>+ Upload Image
                                </p>                        </div>)
                    }
                </div>
            )}
        </div>
    )
}

export default ImageUpload
