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

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is not signed in, redirect to login
                // router.push('/links')
                console.log(auth?.currentUser)
                useStore.getState().setUser?.({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
                console.log(user.uid)
            } else {
                router.push('/login');
            }


        });
    });

    const fetchUser = useStore((state) => state.fetchUser)
    const user = useStore((state) => state.user)

    useEffect(() => {
        const uid = user?.uid//"aI3lSvzwgiPbsA4McGjir4hHy5q2"
        fetchUser?.(uid)

    }, [user?.uid, fetchUser])

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