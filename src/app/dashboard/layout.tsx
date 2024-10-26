'use client'
import { useEffect, useState } from 'react'
import { PhoneMockup, PreLoader, Footer } from '@/components/'
import Header from './_header'
import { auth } from '@/config/firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { redirect, useRouter } from 'next/navigation'
import { useUserStore,useAuthStore } from '@/store'
import { useAuthListener } from '@/hooks/useAuthListener'
import Preloader from '@/components/PreLoader'
// import { getUser } from '@/utils/firebase/users'

// export const metadata: Metadata = {
//     title: "Create Next App",
//     description: "Generated by create next app",
// };

function DashboardLayout ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  //const {loading,currentUser}=useAuthStore()
 const currentUser=useAuthStore(state=>state.currentUser)
    const loading= useAuthStore(state=>state.loading)
  console.log(currentUser);
  console.log(loading)

  useAuthListener()
  useEffect(() => {
    if(!loading && !currentUser){
      router.push("/login")
    }

  }, [router,loading,currentUser])

  if (loading) {
    return <div><Preloader/></div>; // Or redirect, etc.
  }

 // if(isUserValid){
  return (
    <>
      {currentUser ? (<>
        <Header />

        <div className='/flex gap-20 p-5 /relative h-full /overflow-y-hidden'>
          <div className='hidden md:flex justify-center w-[40%] bg-white p-7 left-auto fixed top-24 rounded-lg /items-center overflow-y-auto scrollbar-thin h-screen'>
            <PhoneMockup />
          </div>
          <div className='/h-screen w-full md:w-[55%] md:ml-auto overflow-y-auto'>{children}</div>
        </div>
        {/* <Footer /> */}
      </>) : null}
    </>
  )

}
export default DashboardLayout
