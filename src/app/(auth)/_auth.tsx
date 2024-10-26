import { auth } from "@/config/firebase.config";
import { useAuthStore } from "@/store";
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const signInWithPersistence= async(email:string,pwd:string)=>{

  try {
    // Set session persistence for this auth session
    await setPersistence(auth, browserLocalPersistence);

    // Perform sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, pwd);console.log("User credential after sign-in:", userCredential); // Add this line

    const setUser = useAuthStore.getState().setCurrentUser
// setUser?.(userCredential.user)


    // Return the user object if successful
    return { user: userCredential.user, error: null };
  } catch (error:any) {
    // Return error message if login fails
    return { user: null, error: error.message};
  }
};
