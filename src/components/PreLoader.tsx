import React from 'react'

const Preloader: React.FC = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-white'>
     <div
  className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-purple border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1s_linear_infinite] dark:text-white"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
    <p className={'text-center'}>Loading...</p>
    </div>
  )
}

export default Preloader
