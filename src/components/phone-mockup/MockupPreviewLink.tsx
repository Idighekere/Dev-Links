'use client'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react/dist/iconify.js'
import { generatePlatformIcon, generateBackgroundColor, PLATFORMS } from '@/lib'
import { Links } from '@/types/links'
type Props = {
  link: Links
}
const MockupPreviewLink = ({ link }: Props) => {
  const bgColor = generateBackgroundColor(link.platform)

  return (
    <div className="">
    <a
      href={`${link.url}`}
      className={` rounded-md  h-[35px] w-[190px] px-4 py-2 flex justify-between items-center gap-2 text-white  `}
      style={{ backgroundColor: `${bgColor}` }}
    >
      <button className='flex gap-2 items-center'>
        {generatePlatformIcon(link.platform)}
        <p>{link.platform} </p>
      </button>
      <Icon icon='mingcute:arrow-right-line' width='22' height='22' />
    </a>
    </div>
  )
}
export default MockupPreviewLink
