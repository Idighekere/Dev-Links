import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { useUserStore } from '@/store'
import { db,storage } from "@/config/firebase.config";

export const addUserToFirestore = async (uid:string,email:string,username:string) =>{

    try {
      const userRef = doc(db, "users", uid);

      await setDoc(userRef, {
        uid: uid,
        profile: {
          email: email,
          firstName: "",
          lastName: "",
          imageUrl: "",
          username: username
        },
        links:[]
      });

      console.log("User added to firebase");
    } catch (error) {
      console.error(error);
    }

}

