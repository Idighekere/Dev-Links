import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  cookies().set({
    name: 'session',
    value: '',
    maxAge: -1,
    httpOnly: true,
    secure: true, // Ensure secure is set to true if using HTTPS
    path: '/' // Set the path to match the original cookie pat
  })

  return NextResponse.json({ message: 'Logged out' }, { status: 200 })
}
