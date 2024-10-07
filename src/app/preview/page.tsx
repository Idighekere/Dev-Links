"use client"
import { SkeletonCard } from '@/components/PreviewCard'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
import Link from 'next/link'
import React from 'react'

type Props = {}


const Preview = (props: Props) => {

    const user = useStore((state) => state.user)
    return (
        <div className="mb-20">

            <div className="md:bg-purple lg:max-h-64 rounded-bl-lg rounded-br-lg md:max-h-32 md:p-20 p-4">
                <div className="bg-white rounded-md flex justify-between md:p-8 gap-3">
                    {user?.uid && <Button variant="outline" className="w-full md:w-auto"><Link href="/links">Back to Editor</Link></Button>
                    }                    <Button className="w-full md:w-auto">Share Link</Button>
                </div>
            </div>


            <div className="flex justify-center items-center h-full w-full mt-10">  <div className="shadow-lg rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-16">

                <SkeletonCard />
            </div></div>

        </div>
    )
}

export default Preview