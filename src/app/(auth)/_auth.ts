import { auth } from "@/config/firebase.config";
import { useAuthStore } from "@/store";
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const signIn= async(email:string,pwd:string)=>{

  try {
    // Set session persistence for this auth session
    //await setPersistence(auth, browserSessionPersistence);

    // Perform sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, pwd);console.log("User credential after sign-in:", userCredential); // Add this line




    // Return the user object if successful
    return { user: userCredential.user, errorMsg: null,errorCode:null };
  } catch (error:any) {
    // Return error message if login fails
    return { user: null, errorMessage: error.message,errorCode:error.code};
  }
};
