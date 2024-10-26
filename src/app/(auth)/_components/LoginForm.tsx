'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


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
import { useUserStore, useAuthStore } from '@/store'

import { showToastSuccess, showToastError } from '@/utils/showToast'
import { Envelope, Lock } from '@/components/icons'
import { signInWithPersistence } from '../_auth'
const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.'
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required.'
    })
    .min(6)
})

type Props = {}

const LoginForm = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const formDefaultValues = {
    email: '',
    password: ''
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formDefaultValues,
    mode: 'onChange'
  })

  const router = useRouter()

  const [formData, setFormData] = useState(formDefaultValues)

  async function onSubmit (data: z.infer<typeof FormSchema>) {
    setLoading(true)
    const { user, error } = await signInWithPersistence(
      data.email,
      data.password
    )

    if (user) {
      useAuthStore.getState().setCurrentUser?.({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      })
      console.log(useAuthStore.getState().currentUser)
      showToastSuccess('Logged in successfully!')
      router.push('/dashboard/links')
    } else {
      const errorCode = error.code
      let errorMessage = error.message
      switch (errorCode) {
        case 'auth/invalid-email':
          setErrorMsg('Please enter a valid email address.')
          break
        case 'auth/wrong-password':
          setErrorMsg('Incorrect password. Please try again.')
          break
        case 'auth/invalid-credential':
          setErrorMsg('Incorrect email or password')
          break
        case 'auth/user-not-found':
          setErrorMsg('No user found with this email address.')
          break
        case 'auth/too-many-requests':
          setErrorMsg('Too many requests. Please try again later.')
          break
        case 'auth/weak-password':
          setErrorMsg('Password is too weak. Please use a stronger password.')
          break
        default:
          setErrorMsg(errorMessage)
      }

      console.error(`${errorCode}, ${errorMessage}`)
      showToastError(`Login failed`)

      setErrorMsg(error) // Set the error message if login fails
    }
    setLoading(false)
    //setErrorMsg()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-6 /px-4 max-w-md'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='/flex  items-center /justify-around '>
              <FormLabel className='lg:w-1/2'>Email</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    placeholder='e.g. alex@email.com'
                    required
                    // value={formData.email}
                    className='pl-7 boxShadow'
                  />
                  <span className='absolute top-1/2 left-2 -translate-y-1/2'>
                    {' '}
                    <Envelope />
                  </span>{' '}
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
              <FormLabel className='lg:w-1/2'>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    placeholder='Enter Password'
                    required
                    // value={formData.password}
                    // onChange={handleChange}
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
          {errorMsg ? (
            <p className='text-red /my-2 '>{errorMsg}</p>
          ) : (
            <p className='py-2 mb-3'></p>
          )}
        </>

        <Button
          type='submit'
          className='w-full mt-4'
          disabled={loading}
          onClick={() => setErrorMsg('')}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
