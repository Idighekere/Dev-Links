"use client"
import React from "react"
import { usePathname,useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export const InfoSkeleton = () => {

    return (
        <div className="flex flex-col /space-x-4 /space-y-8 items-center justify-center gap-7">
            <Skeleton className="h-[96px] w-[96px] rounded-full" />
            <div className="space-y-2 flex flex-col items-center /flex-center gap-[5px]">
                <Skeleton className="h-4 w-[160px] rounded-[104px]" />
                <Skeleton className="h-[8px] w-[72px] rounded-lg" />
            </div>

</div>
    )
}


export const LinkSkeleton = ()=>{

    //const pathName = usePathname()
    const preview = "/preview"
    return(
        <>
        {Array(3)
            .fill("").map((_,idx)=>(<Skeleton className={`h-[44px] w-[237px] rounded-md `}  key={idx}/>))}
            </>
    )
}
// ${pathName === preview ? "md:w-[250px] lg:w-[300px] md:h-[14px] lg:h-14" : ""}
