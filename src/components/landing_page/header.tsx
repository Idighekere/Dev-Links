import React from 'react'
import { LogoWithText } from '../icons'
import Link from 'next/link'
import { Button } from '../ui'

const NavLinks = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'Features',
    url: '#features'
  },
  {
    title: 'FAQ',
    url: '#faq'
  }
]
export const Header = () => {
  return (
    <header className='p-2  sticky top-0 /bg-white z-50'>
      <nav className='border border-borders rounded-lg p-4 md:p-5 bg-white flex justify-between  shadow-md items-center '>

        {/* DESKTOP LOGO */}
        <span className="hidden md:block">

        <LogoWithText />
        </span>

        {/* MOBBILE LOGO */}
        <span className='block md:hidden'>
  <LogoWithText width="140" height="30"/>
</span>

        <ul className='md:flex gap-10 hidden '>
          {NavLinks.map(link => (
            <li key={link.title}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className='flex gap-5 text-lg font-semibold'>
          <Button variant='secondary' className='hidden md:inline-flex text-[1rem] font-semibold'>
            <Link href='login'>Login</Link>
          </Button>
          <Button className="text-[1rem] font-semibold">
            <Link href='/register'>Register</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
