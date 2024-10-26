// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { adminAuth } from '@/app/lib/firebase-admin'

// export async function middleware(request: NextRequest) {
//   try {
//     // Get the session cookie
//     const sessionCookie = request.cookies.get('session')?.value

//     if (!sessionCookie) {
//       return NextResponse.redirect(new URL('/login', request.url))
//     }

//     // Verify the session cookie
//     await adminAuth.verifySessionCookie(sessionCookie, true)
//     return NextResponse.next()
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }

// export const config = {
//   matcher: [
//     '/protected/:path*',
//     '/dashboard/:path*'
//     // Add other protected routes here
//   ]
// }
