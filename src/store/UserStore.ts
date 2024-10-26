import { platforms } from "@/lib/platforms";
import { create, StateCreator } from "zustand";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import firebase from "firebase/app";
import { db,storage } from "@/config/firebase.config";
import useAuthStore from "./AuthStore";
import {UserAction, UserState,UserData } from "@/types"


const useUserStore = create<UserState & UserAction>((set, get) => ({
  isSaved:false,
  userData: null,
  loading:true,
  setLoading:(loading:boolean) => set({loading}),
  setUserData: (userData)=> set({userData:userData}),

  getUserData: async ()=>{
    const uid=useAuthStore.getState().currentUser?.uid
    if(!uid){
        console.error("No Uid found or undefined");
        return;
    }
        const userRef = doc(db, "users",uid);
    //const userDoc = await getDoc(userRef);

    try{

      const unsubscribe=onSnapshot(userRef,(snapshot)=>{
        const userdata=snapshot?.data()
            if(userdata){
                set({userData:userdata})
            }

          })

        return ()=>{
            unsubscribe()
        }

} catch(error){
  console.error(error)
} finally{
  set({loading:false})

}
      }
    }))





export default useUserStore
