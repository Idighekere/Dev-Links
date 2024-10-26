'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react/dist/iconify.js'
import { generatePlatformIcon, generateBackgroundColor, PLATFORMS } from '@/lib'
import { LinkType } from '@/types/links'
type Props = {
  link: LinkType
}
const MockupPreviewLink = ({ link }: Props) => {
  const bgColor = generateBackgroundColor(link.platform.name)

  return (
    <div className="">
    <a
      href={`${link.platform.url}`}
      className={` rounded-md  h-[35px] w-[190px] px-4 py-2 flex justify-between items-center gap-2 text-white  `}
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
export default MockupPreviewLink
