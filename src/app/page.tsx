'use client'
import { useEffect } from 'react'
// import { useRouter } from "next/navigation"
import { Header, Footer } from '@/components/landing_page'
import {
  Hero,
  Contribute,
  Potentials,
  Features
} from '@/components/landing_page/sections'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import Image from "next/image";

export default function Home () {
  // const router = useRouter()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    })
  }, [])
  return (
    <main className='/flex ///min-h-screen flex-col items-center justify-between /p-24'>
      <Header />
      <div>
        <Hero />
        <Potentials />
        <Features />
        <Contribute />
      </div>
      <Footer />
    </main>
  )
}
