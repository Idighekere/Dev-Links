// import { NextRequest, NextResponse } from 'next/server'
//  import { adminAuth } from '@/app/lib/firebase-admin'
// import { cookies } from 'next/headers'

// export async function POST(request: NextRequest) {
//   try {
//     const { idToken } = await request.json()

//     // Session expires in 5 days
//     const expiresIn = 60 * 60 * 24 * 5 * 1000

//     // Create session cookie
//     const sessionCookie = await adminAuth.createSessionCookie(idToken, {
//       expiresIn,
//     })

//     // Set cookie in response
//     cookies().set('session', sessionCookie, {
//       maxAge: expiresIn,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       path: '/',
//     })

//     return NextResponse.json(
//       { success: true },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('Error creating session:', error)
//     return NextResponse.json(
//       { error: 'Unauthorized' },
//       { status: 401 }
//     )
//   }
// }
