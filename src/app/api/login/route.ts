import { auth } from 'firebase-admin'
import { customInitApp } from '@/config/firebase-admin'
import { cookies, headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Init the Firebase SDK every time the server is called
customInitApp()

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    const authorization = headers().get('Authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      )
    }
    const idToken = authorization.split('Bearer ')[1]

    let decodedToken
    try {
      // Verify ID token using Firebase Admin SDK
      decodedToken = await auth().verifyIdToken(idToken)
      //console.log('Decoded Token:', decodedToken)
    } catch (error) {
      console.error('Error verifying token:', error)
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000 //60(seconds) * 60(minutes) * 24(hours) * 5(days) * 1000(milliseconds)
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn
    })

    cookies().set({
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: true
    })

    return NextResponse.json(
      { message: 'Login successful', sessionCookie },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in API handler:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET (request: NextRequest) {
  const session = cookies().get('session')?.value || ''

  //Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true)

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 })
  }

  return NextResponse.json({ isLogged: true }, { status: 200 })
}
