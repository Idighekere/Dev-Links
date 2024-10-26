"use client";

/* eslint-disable react/no-unescaped-entities */
import React,{useEffect,useState} from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import EditableLink from "./EditableLink";
import NoLinks from "./NoLinks"
import { useUserStore,useLinkStore } from "@/store";


import toast, { Toaster } from 'react-hot-toast';
import { LinkSkeleton } from "@/components/preview";

export default function LinkEditorCard({links,hasChanges,loading}:any) {
    //const [loading,setLoading] = useState(true)
    //const [userLinks,setUserLinks] = useState(null)
    const saveLink = useLinkStore((state) => state.saveLink);
    const addLink = useLinkStore((state) => state.addLink);

    const userData = useUserStore(state => state.userData)


    //const links = userData?.links
    //const getUserData = useUserStore((state) => state.getUserData);
   useEffect(() => {
    const getUserData = useUserStore.getState().getUserData

  getUserData()
}, [])


//unsavedLinks
    //const combinedLinks=userLinks?.concat(unsavedLinks)



    const addNewLink = () => {
        // if (combinedLinks?.length > 13) {
        //     return;
        // } else {
        //     return addLink();
        // }

addLink();
    };

//  const combinedLinks=[...forms,...unsavedLinks]

    const handleSave=()=>{

        saveLink()

    }
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Customize your links</CardTitle>
                <CardDescription>
                    Add/edit/remove links below and then share all your profiles with the
                    world!
                </CardDescription>
            </CardHeader>
            <CardContent className="mb-5 flex flex-col gap-4">
                <div>
                    <Button variant="secondary" className="w-full" onClick={addNewLink}>
                        + Add new link
                    </Button>
                </div>
                {links.length === 0 ? (
                   <NoLinks/>
                ) : (<>
                {
                    loading ?  (<LinkSkeleton/>):(
                    <div className="flex flex-col gap-3">
                        {links?.map((formData,idx ) => (
                            <EditableLink formData={formData} key={formData.id} idx={idx}/>
                        ))}
                    </div>)
                }</>
                )}
            </CardContent>
            <CardFooter className="flex flex-col i/tems-center justify-bet.ween mt-5 gap-4 md:gap-6 w-full">
                <div className="space-y-4 mx-6 w-full h-[1px] bg-borders" ></div>
                {/* <Button variant="outline"></Button> */}
                <span className="md:self-end w-full sm:w-auto">
                <Button onClick={handleSave} disabled={!hasChanges } className="w-full "> Save</Button>
                </span>
            </CardFooter>
        </Card>
    );
}
