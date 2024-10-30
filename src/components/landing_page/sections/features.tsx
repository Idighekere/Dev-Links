import Image from 'next/image'
import React from 'react'
import { features } from '../constants'
import { Icon } from '@iconify/react/dist/iconify.js'

export const Features = () => {
  return (
    <section className='bg-white py-12 px-5 md:px-16' id="#features">
      <div className='/container mx-auto /text-center'>
        <p className='iself-stretch text-dark-grey/40 text-lg font-bold  leading-7 mb-4'>
          Explore what makes dev-links the ideal platform for developers.
        </p>
        <h2 className='text-3xl font-bold .text-purple mb-6'>Features</h2>

        {/* Feature Cards Grid */}
        <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-light-purple rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
            >
              <div className='text-purple text-4xl mb-4 justify-center flex'>
                {' '}
                <Icon icon={feature.icon} width='1.2em' height='1.2em' />
              </div>
              <h3 className='text-xl font-semibold text-dark-grey mb-2'>
                {feature.title}
              </h3>
              <p className='text-grey'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
