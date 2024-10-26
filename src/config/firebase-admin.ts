// app/lib/firebase-admin.ts
import "server-only"
import admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  storageBucket: string
  privateKey: string
}

interface FirebaseAdminServices {
  auth: admin.auth.Auth
  db: admin.firestore.Firestore
  storage: admin.storage.Storage
}

function formatPrivateKey(key: string | undefined): string {
  if (!key) {
    throw new Error("FIREBASE_PRIVATE_KEY is not set in environment variables")
  }
  return key.replace(/\\n/g, "\n")
}

function validateEnvironmentVariables(): FirebaseAdminAppParams {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!projectId || !clientEmail || !storageBucket) {
    throw new Error(
      "Missing Firebase Admin environment variables. Please check your .env file"
    )
  }

  return {
    projectId,
    clientEmail,
    storageBucket,
    privateKey: formatPrivateKey(privateKey),
  }
}

function createFirebaseAdminApp(params: FirebaseAdminAppParams): admin.app.App {
  // Check if app is already initialized
  if (admin.apps.length > 0) {
    const existingApp = admin.app()
    // Verify if the existing app has the same config
    const currentProjectId = existingApp.options.projectId
    if (currentProjectId !== params.projectId) {
      throw new Error(
        `Firebase Admin app already initialized with different project ID: ${currentProjectId}`
      )
    }
    return existingApp
  }

  // Initialize new app
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: params.privateKey,
  })

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
}

function getFirebaseAdminServices(app: admin.app.App): FirebaseAdminServices {
  return {
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  }
}

let adminServices: FirebaseAdminServices | null = null

export async function getAdmin(): Promise<FirebaseAdminServices> {
  if (adminServices) {
    return adminServices
  } 

  try {
    const params = validateEnvironmentVariables()
    const app = createFirebaseAdminApp(params)
    adminServices = getFirebaseAdminServices(app)
    return adminServices
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error)
    throw error
  }
}

// Convenience exports for common services
export async function getAdminAuth() {
  const { auth } = await getAdmin()
  return auth
}

// export async function getAdminDb() {
//   const { db } = await getAdmin()
//   return db
// }

// export async function getAdminStorage() {
//   const { storage } = await getAdmin()
//   return storage
// }

// Example usage in a server action or API route
export async function verifyIdToken(idToken: string) {
  const auth = await getAdminAuth()
  try {
    const decodedToken = await auth.verifyIdToken(idToken)
    return decodedToken
  } catch (error) {
    console.error("Error verifying ID token:", error)
    throw error
  }
}
