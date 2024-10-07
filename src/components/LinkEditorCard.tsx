"use client";

/* eslint-disable react/no-unescaped-entities */
import * as React from "react";

import { Button } from "./ui/button";
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
import Image from "next/image";
// import { useStore } from "@/store/useStore"
import NewLinkForm from "./NewLinkForm";
import { useStore } from "@/store/useStore";

export default function LinkEditorCard() {
    const forms = useStore((state) => state.forms);
    const fetchUser = useStore((state) => state.fetchUser);
    const userData = useStore((state) => state.userData);
    const addForm = useStore((state) => state.addForm);
    const addNewLink = () => {
        if (forms?.length > 13) {
            return;
        } else {
            return addForm();
        }
    };
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Customize your links</CardTitle>
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
                {forms?.length === 0 ? (
                    <div className="bg-light-grey rounded-lg w-full py-10 px-1 space-y-4 flex flex-col gap-5 items-center">
                        <div>
                            <Image src={"/empty.svg"} alt={""} height={160} width={249.5} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Let's get you started</h2>
                            <p>
                                Use the “Add new link” button to get started. Once you have more
                                than one link, you can reorder and edit them. We’re here to help
                                you share your profiles with everyone!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {forms?.map((formData, i) => (
                            <NewLinkForm formData={formData} key={i} />
                        ))}
                    </div>
                )}
            </CardContent>
            <hr className="space-y-4 mx-6" />
            <CardFooter className="flex justify-between mt-5">
                {/* <Button variant="outline"></Button> */}
                <span></span>
                <Button> Save</Button>
            </CardFooter>
        </Card>
    );
}
