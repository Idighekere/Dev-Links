import React from 'react'
import { LogoIcon } from '../icons'

const footerLinks = [
  { title: 'Features', url: '/#features' },
  { title: 'Pricing', url: '/pricing' },
  { title: 'Docs', url: '/docs' },
  { title: 'Blog', url: '/blog' },

]

export const Footer: React.FC = () => {
  return (    <footer className='bg-dark-grey text-light-grey md:p-16 p-5'>
      <div className='/container mx-auto flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center md:items-start text-center md:text-left'>
        {/* Column 1: Logo */}
        <div className='flex flex-col items-center'>
          <LogoIcon /> {/* Your Logo component */}
          <p className='mt-4 /text-grey text-base'>
            Developed by{' '}
            <a
              href='https://yourprofile.com'
              className='text-purple hover:text-purple-hover'
              target='_blank'
              rel='noopener noreferrer'
            >
              Idighekere Udo
            </a>
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className='flex flex-col'>
          <h3 className='font-bold text-xl mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            {footerLinks.map(link => (
              <li key={link.title}>
                <a href={link.url} className='text-light-grey/80 hover:text-purple'>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className='flex flex-col'>
          <h3 className='font-bold text-xl mb-4'>Get in Touch</h3>
          <ul className='space-y-2'>
            <li>
              <a href='/contact' className='text-light-grey/80 hover:text-purple'>
                Contact Us
              </a>
            </li>
            <li>
              <a href='/privacy' className='text-light-grey/80 hover:text-purple'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='/terms' className='text-light-grey/80 hover:text-purple'>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
