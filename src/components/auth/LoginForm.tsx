"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase.config";

import { Label } from "../ui/label";
import { Envelope } from "../icons/Envelope";
import { Lock } from "../icons/Lock";

// import { toast } from "@/components/hooks/use-toast"
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
import { Input } from "@/components/ui/input"
import { useStore } from "@/store/useStore"
import { useAuthStore } from "@/store/useAuthStore";

const FormSchema = z.object({

    email: z.string(),
    password: z.string(),
})

type Props = {};

const LoginForm = (props: Props) => {

    // const init = useAuthStore((state) => state.init)
    // const isLoading = useAuthStore((state) => state.isLoading)
    // const user = useAuthStore((state) => state.user)
    // useEffect(() => {
    //     init();
    // }, []);
    const formDefaultValues = {
        email: "",
        password: "",

    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: formDefaultValues,
    })

    const router = useRouter()

    const setUser = useStore((state) => state.setUser)
    async function onSubmit(data: z.infer<typeof FormSchema>) {

console.log(data)
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in
                const authUser = userCredential.user;
                useStore.getState().setUser?.({
                    uid: authUser.uid,
                    email: authUser.email,
                    displayName: authUser.displayName,
                })
                // console.log("")
                router.push('/links')
                // console.log(auth?.currentUser)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}, ${errorMessage}`)
            });
    }

    // const { setProfile, profile } = useStore()
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target


    //     setProfile?.(name, value)
    // }

    const [formData, setFormData] = useState(formDefaultValues)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 /px-4 max-w-md">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="/flex  items-center /justify-around ">
                            <FormLabel className="lg:w-1/2">Email</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} id="email"
                                        type="email"
                                        placeholder="e.g. alex@email.com"
                                        required
                                        value={formData.email}
                                        className="pl-7"
                                        onChange={handleChange} />
                                    <span className="absolute top-1/2 left-2 -translate-y-1/2">
                                        {" "}
                                        <Envelope />
                                    </span>{" "}
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="/flex  items-center /justify-around ">
                            <FormLabel className="lg:w-1/2">Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} id="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        required
                                        value={formData.password}
                                        className="pl-7"
                                        onChange={handleChange} />
                                    <span className="absolute top-1/2 left-2 -translate-y-1/2">
                                        {" "}
                                        <Lock />
                                    </span>{" "}
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" className="w-full mt-4">
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
