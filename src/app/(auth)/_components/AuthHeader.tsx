import { LogoWithText } from '@/components/icons'
import Image from 'next/image'
import React from 'react'
type Props = {}

const AuthHeader = (props: Props) => {
    return (


        <div className='flex justify-center mt-14 md:mt-20 mb-6 md:mb-10'>
        <LogoWithText/>
        </div>
)
}

export default AuthHeader
