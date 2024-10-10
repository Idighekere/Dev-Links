"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import { usePathname } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from "@/store/useStore";

type Props = {
    children: React.ReactNode
}

const ClientLayout = ({ children }: Props) => {

    const router = useRouter();

    const fetchUser = useStore((state) => state.fetchUser)
    useEffect(() => {
        const auth = getAuth();
       const unSubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {

        fetchUser?.(user?.uid)
                router.push('/links')
                // console.log(auth?.currentUser)
                useStore.getState().setUser?.({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
                console.log(user.uid)
            } else {
                //redirect to sign in
                router.push('/login');
            }
        });

        return()=>{
            unSubscribe()
        }
    },[fetchUser]);

    // const route = useRouter()
    const pathname = usePathname();

    // const hideHeaderFooter = route.pathname == "/login" || route.pathname == "/register"
    const hideHeaderFooter = pathname === '/login' || pathname === '/register' || pathname === "/preview";

    // if () {
    //     setHideHeader(true)
    // }
    return (
        <>{!hideHeaderFooter && <Header />}
            <main className="bg-light-grey">{children}</main>
            {!hideHeaderFooter && <Footer />}
        </>
    )
}

export default ClientLayout
