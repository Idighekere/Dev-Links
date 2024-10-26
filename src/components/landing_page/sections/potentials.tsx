import React from 'react'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/icons'
export const Potentials = () => {
  return (
    <section className='flex justify-center items-center /h-screen'>
      <div className='w-full /h-full p-5 md:p-16 bg-white /justify-start items-center gap-16 inline-flex flex-col md:flex-row-reverse'>

        <div className=' w-full md:w-1/2 flex justify-center border-borders md:border rounded-md h-full'>
        <Empty width="350" height="100%"/>
        </div>

        <div className='grow shrink basis-0 flex-col justify-start items-start /gap-11 inline-flex'>
          <div className='flex-col justify-start items-start gap-3 flex'>
            <div className='self-stretch text-dark-grey/40 text-lg font-bold  leading-7'>
              Connect with Your Network
            </div>
            <h2 className=' text-black text-3xl font-bold  md:leading-[42px]'>
              Unlock Your Development Potential
            </h2>
            <p className='/self-stretch text-black text-lg font-normal  /leading-7'>
              Dev-links is your one-stop platform to showcase and share your
              developer profiles. Connect with peers and enhance your online
              presence effortlessly.
            </p>
          </div>
          <div className='flex flex-col gap-1 mt-4 w-full'>
            <Button className=' md:w-auto text-lg font-semibold' size='lg'>
              <a href='/register'>Get Started for Free</a>
            </Button>

          </div>
        </div>
      </div>
    </section>
  )
}
