import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'

import { db } from "@/config/firebase.config"
import { UserData } from "@/types/"
//:Promise<Error | null | UserData>
export const FetchByUsername=async (username:string) =>{

        if(!username){
            console.error("Username doesn't exist");
            return null;
        }
        const docRef=collection(db,"users")
        //TODO - Query firestore for the user with the specified username
        const q = query(docRef, where('profile.username', '==', username))

              const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
        console.error('No matching users found')
        return null;
      }

      const doc=querySnapshot.docs[0];

      return {...doc.data()}
      // return {id:doc.id.toString(),...doc.data()}
}
