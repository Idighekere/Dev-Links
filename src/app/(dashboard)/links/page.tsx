"use client"
import React from 'react'
import LinkEditorCard from "@/components/LinkEditorCard"

import { useRouter } from 'next/navigation';
import {useStore} from "@/store/useStore"
import { auth } from "@/config/firebase.config";
type Props = {}

const Links = (props: Props) => {

const router=useRouter()
    const user=useStore(state=>state.user)

    if(!user){
        router.push('/login')
    }

    return (
        <div>
            <LinkEditorCard />
        </div>
    )
}

export default Links
