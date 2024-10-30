"use client"


import {Footer,PreLoader} from "@/components/"
//import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from "@/store";

type Props = {
    children: React.ReactNode
}

const ClientLayout = ({ children }: Props) => {

    const router = useRouter();


    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const timer=setTimeout(()=>{
            setLoading(false)
        },3000)

        return ()=>clearTimeout(timer)
    },[])

    return (
        <main>
            {loading?(<PreLoader/>) :
                <>
            {/* {!hideHeaderFooter && <Header />} */}
            <section className="bg-light-grey">{children}</section>
            {/* {!hideHeaderFooter && <Footer />} */}
            </>}

        </main>
    )
}

export default ClientLayout
