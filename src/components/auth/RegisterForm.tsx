
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase.config";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
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
    // .email(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) =>
    data.password === data.confirmPassword
    , {
        message: "Passwords don't match",
        path: ["confirm"], // path of error
    })

type Props = {};



const RegisterForm = (props: Props) => {

    const formDefaultValues = {
        email: "",
        password: "",
        confirmPassword: "",

    }
    const [formData, setFormData] = useState(formDefaultValues)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev, [name]: value
        }))

    }


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: formDefaultValues,
    })
    const router = useRouter()
    const setUser = useAuthStore((state) => state.setUser)
    const addUserToFirestore = useStore((state) => state.addUserToFirestore)
    async function onSubmit(data: z.infer<typeof FormSchema>) {

        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setUser?.(user)
                console.log(user)
                addUserToFirestore?.(user.uid, formData.email)
                router.push('/login')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage)
            });
        setFormData(formDefaultValues)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 /px-4 /max-w-md">

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="/flex  items-center /justify-around ">
                            <FormLabel className="/lg:w-1/2">Email</FormLabel>
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
                                    </span>
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
                            <FormLabel className="/lg:w-1/2">Create Password</FormLabel>
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="/flex  items-center /justify-around ">
                            <FormLabel className="/lg:w-1/2">Confirm Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={formData.confirmPassword}
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
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;



