'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase.config'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// import { toast } from "@/components/hooks/use-toast"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store'

import { showToastSuccess, showToastError } from '@/utils/showToast'
import { Envelope, Lock, User } from '@/components/icons'
import { addUserToFirestore } from '@/utils/firebase/users'

const FormSchema = z
  .object({
    // fullName:z.string()
    // .min(8,{
    //     message:"Full name must be at least 8 characters"
    // }),
    username: z
      .string({
        required_error: 'Username is required.'
      })
      .min(5, {
        message: 'Username must be at least 5 characters'
      })
      .refine(s => !s.includes(' '), 'Username must not contain spaces!'),
    email: z
      .string({
        required_error: 'Email is required.'
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required.'
      })
      .min(8, {
        message: 'Password must be at least 8 characters'
      }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters'
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // path of error
  })

const RegisterForm = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const formDefaultValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formData, setFormData] = useState(formDefaultValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues,
    mode: 'onChange' // Validate on change
  })
  const router = useRouter()

  // const addUserToFirestore = useUserStore((state) => state.addUserToFirestore)

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    //console.log(data)
    setLoading(true)
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        // Signed up
        const user = userCredential.user
        //setUser?.(user)
        //console.log(user)
        addUserToFirestore?.(user.uid, data.email, data.username)
        router.push('/login')
        showToastSuccess('User registered successfully!')
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        let errorMessage = error.message
        // ..
        switch (errorCode) {
          case 'auth/email-already-in-use':
            setErrorMsg('This email address is already in use.')
            break
          case 'auth/invalid-email':
            setErrorMsg('Please enter a valid email address.')
            break
          case 'auth/weak-password':
            setErrorMsg('Password should be at least 6 characters.')
            break
          case 'auth/operation-not-allowed':
            setErrorMsg(
              'Account creation is not allowed in this project. Please contact the administrator.'
            )
            break
          case 'auth/too-many-requests':
            setErrorMsg('Too many requests. Please try again later.')
            break
          default:
            setErrorMsg(errorMessage)
        }
        console.log(errorMessage)
        showToastError(`Registration failed`)
      })
      .finally(() => {
        setLoading(false)
      })
    setFormData(formDefaultValues)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6 /px-4 max-w-md'
      >
        {/* <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem className="/flex  items-center /justify-around ">
                            <FormLabel className="/lg:w-1/2">Full Name</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input {...field} id="fullName"
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        required
                                        //value={formData.fullName}
                                        className="pl-7 boxShadow"
                                         />
                                    <span className="absolute top-1/2 left-2 -translate-y-1/2">
                                        {" "}
                                        <Envelope />
                                    </span>
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='/flex  items-center /justify-around '>
              <FormLabel className='/lg:w-1/2'>Email</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    placeholder='e.g. alex@email.com'
                    required
                    //value={formData.email}
                    className='pl-7 boxShadow'
                    //onChange={handleChange}
                  />
                  <span className='absolute top-1/2 left-2 -translate-y-1/2'>
                    {' '}
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
          name='username'
          render={({ field }) => (
            <FormItem className='/flex  items-center /justify-around '>
              <FormLabel className='/lg:w-1/2'>Username</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='username'
                    type='text'
                    placeholder='e.g. johndoe'
                    required
                    //value={formData.username}
                    className='pl-7 boxShadow'
                    //onChange={handleChange}
                  />
                  <span className='absolute top-1/2 left-2 -translate-y-1/2'>
                    {' '}
                    <User />
                  </span>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='/flex  items-center /justify-around '>
              <FormLabel className='/lg:w-1/2'>Create Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    placeholder='Enter Password'
                    required
                    //value={formData.password}
                    className='pl-7 boxShadow'
                  />
                  <span className='absolute top-1/2 left-2 -translate-y-1/2'>
                    {' '}
                    <Lock />
                  </span>{' '}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='/flex  items-center /justify-around '>
              <FormLabel className='/lg:w-1/2'>Confirm Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    required
                    //value={formData.confirmPassword}
                    className='pl-7 boxShadow'
                  />
                  <span className='absolute top-1/2 left-2 -translate-y-1/2'>
                    {' '}
                    <Lock />
                  </span>{' '}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <>
          {errorMsg && (
            <p className='text-red .my-2 '>{errorMsg}</p>
          )}
        </>
        <Button
          type='submit'
          className='w-full mt-4 text-base font-semibold'
          disabled={loading}
          onClick={() => setErrorMsg('')}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
