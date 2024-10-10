"use client"
import ImageUpload from '@/components/profile/ImageUpload'
import { ProfileForm } from '@/components/profile/ProfileForm'
import { Button } from '@/components/ui/button'
import React from 'react'
import {signOut} from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { auth } from "@/config/firebase.config";
import {useStore} from "@/store/useStore"
type Props = {}

const Profile = (props: Props) => {
const router=useRouter()
    const user=useStore(state=>state.user)

    if(!user){
        router.push('/login')
    }

    const logOut=()=>{
        signOut(auth).then(() => {
   console.log("Sign-out successful")
}).catch((error) => {
   console.log("An error happened.")
});
    }
    return (
        <main className="bg-white h-f p-4 relative">

            <h2 className="font-[500] text-2xl">Profile Details</h2>

            <p>Add your details to create a personal touch to your profile.</p>

            <div className="flex lg:flex-row flex-col bg-light-grey p-4 rounded-md space-y-3 mb-4 gap-2 items-center justify-center">
                <h3 className="font-[500] whitespace-nowrap">Profile Picture</h3>
                <div className="flex lg:flex-row flex-col items-center justify-center gap-3 w-full m-0">
                    <ImageUpload />
                    <p className="text-[12px] w-[40%]">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>
            </div>

            <div className="bg-light-grey p-4 rounded-md">

                <ProfileForm />
            </div>

            <div className="flex items-end h-auto absolute justify-end r,ight-0">


                <Button type="submit">Save</Button>
            </div>
<div className="mt-7 w-full flex justify-center">
    <Button type="submit" variant="destructive" onClick={logOut}>Log Out</Button>

</div>
        </main >
    )
}

export default Profile
