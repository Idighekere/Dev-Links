'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { platforms } from '@/lib/platforms'
import {Links, UserData} from '@/types/'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  PreviewInfo,
  LinkSkeleton,
  InfoSkeleton,
  PreviewLink
} from '@/components/preview'

export default function PreviewCard ({ userData, loading }: {userData:UserData | undefined|null, loading:boolean}) {
  const links = userData?.links
  const profile = userData?.profile
  // const forms=["","","","",""]
  // const maxItems = 5 //platforms.length
  // const formsCount = userData?.forms?.length
  // const linksSkeletonCount = Math.max(maxItems - links?.length, 0)
  //const pathName = usePathname()
  const router = useRouter()
  const preview = '/preview'

  if (loading) {
    return (
      <div className='flex flex-col gap-7 items-center space-x- space-y-8 py-8  px-4 justify-center w-full  /overflow-y-auto  '>
        <InfoSkeleton />

        <div className='overflow-y-auto mt-5'>
          <div className='flex flex-col w-full gap-5 items-center overflow-y-auto h-full justify-center'>
            <LinkSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-7 items-center space-x- space-y-8 py-8  px-4 justify-center w-full  /overflow-y-auto  '>
      <PreviewInfo profile={profile} />

      <div className='/overflow-y-auto mt-5 /h-screen '>
        <div className='flex flex-col w-full gap-5 items-center overflow-y-auto h-[18rem] /justify-center'>


            {links?.map((link: Links) => (
              <PreviewLink link={link} key={link.id} />
            ))}

        </div>
      </div>
    </div>
  )
}
