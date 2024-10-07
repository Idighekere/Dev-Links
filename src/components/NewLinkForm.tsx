"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { platforms } from "../lib/platforms"
import { Icon } from "@iconify/react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Envelope } from "./icons/Envelope"
import { useState, useEffect } from "react"
import { useStore, State, Action, platform, FormType } from "@/store/useStore"
// import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    link: z
        .string({
            required_error: "Please select an platform to display.",
        })
        .email(),
})

export default function NewLinkForm({ formData }: any) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    // const [selectedOption, setSelectedOption] = useState<string>("")
    // const [placeholder, setPlaceholder] = useState<string>("")

    // let currentPlaceholder = platforms.find(p => p.name === selectedOption)?.url || ""
    // const handleSelectChange = (value: string) => {
    //     const selectedPlatform = platforms.find(p => p.name === value)
    //     if (selectedPlatform) {
    //         setPlaceholder(selectedPlatform.url); // Update the placeholder with the selected platform's URL
    //         setSelectedOption(value); // Update the selected option state
    //     }
    // }


    // console.log(placeholder)
    // console.log(selectedOption)
    // useEffect(() => {
    //     setPlaceholder(selectedOption?.url)

    //     return () => {
    //     }
    // }, [selectedOption])


    function onSubmit(data: z.infer<typeof FormSchema>) {
        //     toast({
        //         title: "You submitted the following values:",
        //         description: (
        //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //                 <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //             </pre>
        //         ),
        //     })
    }

    // const [formData, setFormData] = useState({ 
    //     link: "",
    //     platform: selectedOption,
    // });
    const setForm = useStore((state: State & Action) => state.setForm)

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(formData.id,
            {
                platform:
                {
                    ...formData.platform,// to keep previous content of the form
                    [name]: value // to update only the required(username)
                }
            })
        // console.log(formData.platform)
    }
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target
    //     setForm(formData.id, { ...formData.platform, [name]: value })
    //     // console.log(formData.platform)
    // }
    const handleSelectChange = (value: string) => {

        const selectedPlatform = JSON.parse(value)
        console.log(selectedPlatform)
        setForm(formData.id, {
            platform:
            {
                name: selectedPlatform.name,
                color: selectedPlatform.color,
                icon: selectedPlatform.icon,
                url: selectedPlatform.url,
                username: selectedPlatform.username
            }
        })
        // console.log(value)
    }
    console.log(formData.platform)

    const remove = useStore((state: State & Action) => state.removeForm)
    // const handleAddLink = () => {
    //     addLink(formData)
    //     // console.log(links)
    // }
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 py-4">
                    <FormField
                        control={form.control}
                        name="link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex justify-between">
                                    <p className="text-[#333]/80">Link {formData.id}</p>
                                    <button onClick={() => remove(formData.id)}>Remove</button>
                                </FormLabel>
                                <Select
                                    onValueChange={handleSelectChange}
                                // defaultValue="Github"
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a platform" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {platforms.map((p, i) => (<SelectItem value={JSON.stringify(p)} key={i} ><span className="flex gap-2 items-center"><Icon icon={p?.icon} /> <p>{p.name}</p></span></SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>
                                <div className="relative">
                                    <Label htmlFor="">Link</Label>
                                    <div className="flex items-center">
                                        <span className="absolute top-1/2 left-2 transform-translate-y-1/2 flex gap-2 items-center">
                                            {" "}
                                            <Icon icon="lucide:link" />
                                            {/* <span className="text-[15px] max-w-[100px]">{placeholder}</span> */}
                                        </span>
                                        <Input
                                            id="url"
                                            type="url"
                                            placeholder="e.g johndoe"
                                            required
                                            name="username"
                                            value={formData.username
                                            }
                                            onChange={handleUserNameChange}
                                            className="pl-7 text-[15px] w-full"
                                        />
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type="submit" onClick={handleAddLink}>Submit</Button> */}
                </form>
            </Form >
        </>)
}
