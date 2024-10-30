'use client'

import React from 'react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react/dist/iconify.js'
import { LogoIcon, LogoWithText } from '@/components/icons'

type Props = {}

const Header = (props: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  // const isLinkActive = pathname("/links")
  return (
    <header className='z-50 sticky top-0'>
      <nav className='flex justify-between py-4 px-4  bg-white rounded-lg m-4 items-center'>
        <div>
          <span className='hidden md:flex'>
            <LogoWithText />
          </span>

          <span className='md:hidden flex'>
            <LogoIcon />
          </span>
        </div>
        <div className={`flex gap-9`}>
          <Link href='/dashboard/links'>
            <Button
              variant='ghost'
              className={`${
                pathname == '/dashboard/links' ? 'bg-light-purple text-purple ' : ''
              } flex items-center gap-2`}
            >
              <Icon icon='ph:link-bold' width='21' height='21' />
              <p className='hidden md:block'>Links</p>
            </Button>
          </Link>
          <Link href='/dashboard/profile'>
            {' '}
            <Button
              variant='ghost'
              className={`${
                pathname == 'dashboard/profile' ? 'bg-light-purple text-purple ' : ''
              } flex items-center gap-2`}
            >
              <Icon icon='codicon:account' width='21' height='21' />
              <p className='hidden md:block'>Profile Details</p>
            </Button>
          </Link>
        </div>
        <div>
          <Button variant='secondary'>
            <a href='/dashboard/preview' className='flex items-center'>
              <span className='md:hidden inline-block'>
                {' '}
                <Icon icon='iconamoon:eye-light' width='21' height='21' />
              </span>
              <p className='hidden md:block'>Preview</p>
            </a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
