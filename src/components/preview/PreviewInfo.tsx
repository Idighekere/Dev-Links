"use client"
import React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const PreviewInfo = ({profile}) => {
const pathname=usePathname()

  let style=""
if(pathname==="/dashboard/profile"|| pathname=="/dashboard/links"){
   style="w-[180px] h-[32px] py-10"
}
        return (
             <div className="flex flex-col /space-x-4 /space-y-8 items-center justify-center">

                <div className="relative  rounded-full  h-[96px] w-[96px] self- flex justify-center items-center mb-4 border-2 border-purple ">
                {profile?.imageUrl ?  <Image alt={`${profile?.firstName}'s image`} src={`${profile?.imageUrl} `} className="rounded-full object-cover h-40 w-40 " fill /> : ("No Image")}



                </div>
                <div className="/space-y-2 flex flex-col items-center /flex-center">

                    { profile?.firstName &&
                        (<h2 className="text-xl font-[600] m-0">{profile?.firstName} {profile?.lastName}</h2>
                    )}

                    {profile?.email && (
                        <p className="text-sm">{profile?.email}</p>)
                    }

                </div>

            </div>
        )
}

export default PreviewInfo
