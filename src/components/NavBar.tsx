
import Image from 'next/image'
import React from "react"
import { LogoWithText } from './icons'

const NavBar = () => {

    return (
        <header className="flex justify-center items-center w-full bg-light-purple sticky top-0 py-5">

            <LogoWithText/>
        </header>
    )
}
export default NavBar


