import { Button } from '@/components/ui'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Contribute = () => {
  return (
    <section className='p-5 md:p-16'>
      <div className='h-full flex justify-between items-center flex-col-reverse md:flex-row gap-10'>
        <div className='flex flex-col gap-6 w-fullmd:w-1/2'>
          <p className=' text-[#1a1a1a]/40 text-lg font-bold '>
            Build. Share. Contribute.
          </p>
          <h3 className=' text-black text-3xl font-bold '>
            Join Us in Building dev-links
          </h3>
          <p className=' text-black text-lg font-normal  '>
            dev-links is an open-source project that welcomes developers of all
            skill levels to contribute with features, design improvements, or
            optimizations.
          </p>
          <Button size='lg'>
            <Link
              href='https://github.com/Idighekere/Link-sharing-app-for-Devs'
              className='flex gap-4 items-center text-[1rem] font-semibold'
            >
              <Icon icon='simple-icons:github' width="1rem" height="1rem" />
              <p>Visit our Github Repo</p>
            </Link>
          </Button>
        </div>
        <div className='relative w-full max-h-lg h-96 rounded-full'>
          <Image src='/developer_male.jpg' fill alt='Hero Image' className="rounded-full"/>
        </div>
      </div>
    </section>
  )
}
