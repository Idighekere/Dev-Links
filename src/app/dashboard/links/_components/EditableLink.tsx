'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { platforms, PLATFORMS, generatePlatformIcon } from '@/lib'
import { Icon } from '@iconify/react'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { useLinkStore } from '@/store'
import { LinkDeleteDialog } from './LinkDeleteDialog'

import { v4 as uuidv4 } from 'uuid'
import { removeLink, updateLink } from '@/utils'
import { Links } from '@/types'

const FormSchema = z.object({
  platform: z
    .string({
      required_error: 'Please select a platform.'
    })
    .min(1, 'Platform is required.'), // Validate platform selection
  url: z
    .string({
      required_error: 'url is required.'
    })
    .url('Please enter a valid URL.') // Ensures URL format
    .min(10, 'Url must be at least 10 characters.')
})

type Props = {
  link: Links
  idx: number
}

export default function EditableLink ({ link, idx }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState()
  const handleDialogClick = () => {
    setIsDialogOpen(prev => !prev)
    //console.log(isDialogOpen)
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: link.url,
      platform: link.platform
    },
    mode: 'onChange'
  })

  function onSubmit (data: z.infer<typeof FormSchema>) {}

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    updateLink(link.id, {
      platform: link.platform, // to keep previous content of the form
      [name]: value // to update only the required(username)
    })
    // //console.log(link.platform)
  }

  const handleSelectChange = (value: string) => {
    //console.log(value)
    //const selectedPlatform = JSON.parse(value)
    ////console.log(selectedPlatform)
    updateLink(link.id, {
      url: link.url,
      platform: value.toString()
    })
    ////console.log(platform)
  }
  ////console.log(link.platform)

  const handleRemoveLink = (id: string) => {
    removeLink(link.id)
  }

  return (
    <>
      {isDialogOpen && (
        <div className='p-5'>
          <LinkDeleteDialog
            handleRemoveLink={handleRemoveLink}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6 py-4 bg-light-grey rounded-md p-4'
        >
          <div className='flex justify-between mb-0'>
            <p className='text-[#333]/80'>Link #{idx + 1}</p>
            <button onClick={handleDialogClick} type='button'>
              Remove
            </button>
          </div>
          <FormField
            control={form.control}
            name='platform'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select
                  onValueChange={value => {
                    //console.log(value)
                    field.onChange(value)
                    handleSelectChange(value)
                  }}
                  //onValueChange={field.onChange}
                  //{...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          field.value ? (
                            <div className='flex gap-2 items-center'>
                              {generatePlatformIcon(field.value)}
                              <span>{field.value}</span>
                            </div>
                          ) : (
                            'Select a platform'
                          )
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PLATFORMS.map(platform => (
                      <SelectItem value={platform.toString()} key={uuidv4()}>
                        <span className='flex gap-2 items-center'>
                          {generatePlatformIcon(platform)} <p>{platform}</p>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>

                <FormControl>
                  <div className='relative /w-full'>
                    <Input
                      id='url'
                      type='text'
                      placeholder='e.g https://github.com/johndoe'
                      required
                      {...field}
                      // name="url"
                      // value={link.url
                      // }
                      onChange={e => {
                        field.onChange(e)
                        handleLinkChange(e)
                      }}
                      className='pl-8 text-[15px] w-full /relative'
                    />
                    <span className='absolute top-1/2 /left-5 pl-3 -translate-y-1/2 flex gap-2 items-center pointer-events-none'>
                      {' '}
                      <Icon icon='lucide:link' />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Button type="submit" onClick={handleAddLink}>Submit</Button> */}
        </form>
      </Form>
    </>
  )
}
