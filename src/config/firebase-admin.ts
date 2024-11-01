import { initializeApp, getApps, cert } from 'firebase-admin/app'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process?.env?.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') //to replace the \n in the private key with actual new lines
  })
}

export function customInitApp () {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig)
  }
}
