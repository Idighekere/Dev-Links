import React from 'react'
import Image from 'next/image'
export const Hero = () => {
  return (
    <main className='p-5 md:px-16 md:py-0 h-[80vh] md:h-screen bg-hero-pattern //opacity-50 md:bg-none bg-contain bg-no-repeat w-full bg-center '>
      <div className='h-full flex justify-between items-center'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-4xl md:text-5xl  font-bold' data-aos="fade-up">
            Elevate Your Developer Presence Online
          </h2>
          <p className='text-xl' data-aos="fade-up">
            Easily create and share a professional profile that brings together all your essential developer links—from GitHub to LinkedIn and beyond. Show the world what you’re building.
          </p>
        </div>

        {/* <div className=''> */}
          <div className='relative w-full h-screen hidden md:block'>
            <Image src='/hero.svg' fill alt='Hero Image' />
          </div>
        {/* </div> */}
      </div>
    </main>
  )
}
