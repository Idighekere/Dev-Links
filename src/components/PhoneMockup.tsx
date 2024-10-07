import React from 'react'
import { SkeletonCard } from './PreviewCard'

type Props = {}

const PhoneMockup = (props: Props) => {
    return (
        <div>
            <div className="/flex flex-col relative /mx-auto border-gray-800 dark:border-gray-800 bg-gray border-[14px] rounded-[2rem] h-[590px] w-[304px] /overflow-hidden items-center">
                <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="h-auto">                <SkeletonCard />
                </div>            </div>
            { }

        </div>
    )
}

export default PhoneMockup