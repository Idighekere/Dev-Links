import React from "react"
import { Empty } from "@/components/icons";

const NoLinks = () => {

    return (
         <div className="bg-light-grey rounded-lg w-full py-10 px-1 space-y-4 flex flex-col gap-5 items-center">
                        <div>
                        <Empty/>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Let&apos;s get you started</h2>
                            <p>
                                Use the “Add new link” button to get started. Once you have more
                                than one link, you can reorder and edit them. We&apos;re here to help
                                you share your profiles with everyone!
                            </p>
                        </div>
                    </div>
    )
}

export default NoLinks
