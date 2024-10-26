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


    // const fetchUser = useUserStore((state) => state.fetchUser)
    // useEffect(() => {
    //     const auth = getAuth();
    //    const unSubscribe= onAuthStateChanged(auth, (user) => {
    //         if (user) {

    //
    //             router.push('/links')
    //             // console.log(auth?.currentUser)
    //             useUserStore.getState().setUser?.({
    //                 uid: user.uid,
    //                 email: user.email,
    //                 displayName: user.displayName,
    //             })
    //             console.log(user.uid)
    //         } else {
    //             //redirect to sign in
    //             router.push('/login');
    //         }
    //     });

    //     return()=>{
    //         unSubscribe()
    //     }
    // },[fetchUser]);

    // const route = useRouter()
    //const pathname = usePathname();

    // const hideHeaderFooter = route.pathname == "/login" || route.pathname == "/register"
    // const hideHeaderFooter = pathname.startsWith('/login') || pathname === '/register' || pathname.startsWith("/preview");

    // if () {
    //     setHideHeader(true)
    // }
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
