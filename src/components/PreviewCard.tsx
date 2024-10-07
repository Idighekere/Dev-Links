"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { platforms } from "@/lib/platforms"
import { useStore, FormType } from "@/store/useStore"
import { Icon } from "@iconify/react/dist/iconify.js"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SkeletonCard() {
    const forms = useStore(state => state.forms)
    const userData = useStore(state => state.userData)

    const maxItems = 5//platforms.length
    const formsCount = userData?.forms?.length
    const linksSkeletonCount = Math.max(maxItems - forms?.length, 0)


    const pathName = usePathname()
    const preview = "/preview"
    // const profile = useStore(state => state.profile)
    const profile = userData?.profile
    console.log(profile)
    console.log(profile?.imageUrl)

    return (
        <div className="flex flex-col gap-7 items-center space-x-4 space-y-8 p-4 justify-center w-full /overflow-y-auto">

            <div className="flex flex-col space-x-4 /space-y-8 items-center justify-center">

                <div className="relative  /rounded-full  h-32 w-32 self- flex justify-center items-center mb-4">
                    {
                        profile?.imageUrl ? (<Image alt={`Name`} src={`${profile?.imageUrl}`} className="rounded-full border-purple object-contain border-2" fill />
                        ) : (<Skeleton className="h-32 w-32 rounded-full" />
                        )
                    }
                </div>
                <div className="space-y-2 flex flex-col items-center /flex-center">
                    {
                        (profile?.firstName?.length >= 2) ? (
                            <h2 className="text-xl font-[600] m-0">{profile?.firstName} {profile?.lastName}</h2>
                        ) : (<Skeleton className="h-5 w-[160px] rounded-full" />
                        )
                    }
                    {
                        (profile?.email) ? (
                            <p className="text-sm">{profile?.email}</p>
                        ) : (<Skeleton className="h-3 w-[72px] rounded-lg" />

                        )
                    }

                </div>

            </div>

            <div className="overflow-y-auto">
                <div className="flex flex-col w-full gap-3 items-center overflow-y-auto h-full justify-center">

                    {forms?.map((link: FormType) => (
                        <div key={link.id} className="/w-[237px] w-full ">
                            <Link href={`${link.platform.url}${link.platform.username}`} className={`rounded-md ${link.platform.color} h-10 /w-full px-4 py-2 flex justify-between items-center gap-2 text-white  ${pathName === preview ? "w-full md:w-[250px] lg:w-[300px] md:h-[14px] lg:h-14" : ""}`}
                            >
                                <div className="flex gap-2"> <Icon icon={`${link.platform.icon}`} width="24" height="24" />
                                    <p>{link.platform.name} </p></div>

                                <Icon icon="mingcute:arrow-right-line" width="26" height="26" />                            </Link>


                        </div>))}
                    {
                        Array.from({ length: linksSkeletonCount }).map((_, i) => (<Skeleton className={`h-10 w-[237px] rounded-md ${pathName === preview ? "md:w-[250px] lg:w-[300px] md:h-[14px] lg:h-14" : ""}`} key={i} />
                        ))
                    }


                </div></div>
        </div >

    )
}
