"use client"
import React from "react"
import { usePathname,useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export const MockupInfoSkeleton = () => {

    return (
        <div className="flex flex-col /space-x-4 /space-y-8 items-center justify-center gap-4">
            <Skeleton className="h-[80px] w-[80px] rounded-full" />
            <div className="space-y-2 flex flex-col items-center /flex-center gap-[5px]">
                <Skeleton className="h-[14px] w-[150px] rounded-[104px]" />
                <Skeleton className="h-[7px] w-[65px] rounded-lg" />
            </div>

</div>
    )
}


export const MockupLinkSkeleton = ()=>{

    //const pathName = usePathname()
    const preview = "/preview"
    return(
        <div className="w-full flex flex-col item-center justify-center gap-4">
        {Array(5)
            .fill("").map((_,idx)=>(<Skeleton className={`h-[35px] w-[190px] rounded-md `}  key={idx}/>))}
            </div>
    )
}
// ${pathName === preview ? "md:w-[250px] lg:w-[300px] md:h-[14px] lg:h-14" : ""}
