'use client'

import {Links, UserData} from '@/types/'
import { usePathname, useRouter } from 'next/navigation'
import {
  MockupPreviewInfo,
  MockupLinkSkeleton,
  MockupInfoSkeleton,
  MockupPreviewLink
} from '@/components/phone-mockup'

export default function MockupPreview ({ userData, loading }:  {userData:UserData | undefined|null, loading:boolean}) {
  const links = userData?.links
  const profile = userData?.profile
  // const forms=["","","","",""]
  const maxItems = 5 //platforms.length
  // const formsCount = userData?.forms?.length
  // const linksSkeletonCount = Math.max(maxItems - links?.length, 0)
  //const pathName = usePathname()
  const router = useRouter()
  const preview = '/preview'

  if (loading) {
    return (
      <div className='flex flex-col gap-7 items-center space-x- space-y-8 py-8  px-4 justify-center w-full  /overflow-y-auto  '>
        <MockupInfoSkeleton />

        {/* <div className='/overflow-y-auto mt-5'>
          <div className='/flex flex-col /w-full gap-5 items-center /overflow-y-auto /h-full justify-center'> */}
            <MockupLinkSkeleton />
          {/* </div>
        </div> */}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 items-center space-x- /space-y-8 py-5  px-4 justify-center w-full  /overflow-y-auto  '>
      <MockupPreviewInfo profile={profile} />

      <div className='/overflow-y-auto mt-5 h-screen '>
        <div className='flex flex-col w-full gap-3 items-center overflow-y-auto h-[14.5rem] /justify-center scrollbar-thin'>
          {links?.map((link: Links) => (
            <MockupPreviewLink link={link} key={link.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
