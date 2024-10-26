import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
      <footer className="flex justify-center items-center h-full w-full bg-light-purple /absolute bottom-0 py-10 max-h-lg">
        <p className="">Developed by <a href="https://idighekereudo.vercel.app" className="text-purple font-[600]">Idighekere Udo</a></p>
      </footer>
  )
}

export default Footer
