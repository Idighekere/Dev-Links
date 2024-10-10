// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey:"AIzaSyBipuoFbeWWqtwrUoOrc2lXp33ckLFwJpU",
  // authDomain: "dev-links-c1188.firebaseapp.com",
  // projectId: "dev-links-c1188",

  // storageBucket: "dev-links-c1188.appspot.com",
  // messagingSenderId: "768211321945",
  // appId: "1:768211321945:web:b21e3c30d091b752755d48",
  // measurementId: "G-WDX9DX609C",






apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
// analytics.isSupported()
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
