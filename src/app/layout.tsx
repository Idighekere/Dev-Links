import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Links',
  description: 'The go-to platform for developers to organize, manage, and share social media links seamlessly',
  openGraph: {
    title: 'Dev Links',
    description: 'The go-to platform for developers to organize, manage, and share social media links seamlessly',
    images:
      'https://res.cloudinary.com/dyouxzxab/image/upload/v1730579887/Screenshot_2024-11-02_212631_l121s0.png'
  }
}


export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='shortcut icon'
          href='/favicon.svg'
          type='image/x-icon'
          sizes='any'
        />
      </head>
      <body className={inter.className}>
        <Toaster position='top-right'  />
        {/* <Providers> */}
        <ClientLayout>
          {children}
          {/* <Footer/> */}
        </ClientLayout>
        {/* </Providers> */}
      </body>
    </html>
  )
}
