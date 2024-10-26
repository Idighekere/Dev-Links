'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react/dist/iconify.js'
import { generatePlatformIcon, generateBackgroundColor, PLATFORMS } from '@/lib'
import { LinkType } from '@/types/links'
type Props = {
  link: LinkType
}
const PreviewLink = ({ link }: Props) => {
  const bgColor = generateBackgroundColor(link.platform.name)
  const pathname=usePathname()

  let style=""
if(pathname==="/dashboard/profile"|| pathname=="/dashboard/links"){
   style="w-[180px] h-[32px] py-10"
}
  //${link?.platform?.url}
  return (
    <div className="">
    <a
      href={`${link.platform.url}`}
      className={` rounded-md  h-[44px] w-[230px] px-4 py-2 flex justify-between items-center gap-2 text-white  `}
      style={{ backgroundColor: `${bgColor}` }}
    >
      <button className='flex gap-2 items-center'>
        {generatePlatformIcon(link.platform.name)}
        <p>{link.platform.name} </p>
      </button>
      <Icon icon='mingcute:arrow-right-line' width='26' height='26' />
    </a>
    </div>
  )
}
export default PreviewLink
