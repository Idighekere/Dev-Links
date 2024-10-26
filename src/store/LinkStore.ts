import { create, StateCreator } from "zustand";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { db,storage } from "@/config/firebase.config";
import {Links, LinkState, LinkAction} from "@/types"
import useUserStore from "./UserStore"
import { v4 as uuidv4 } from 'uuid';



import toast, { Toaster } from 'react-hot-toast';
import {showToastSuccess, showToastError} from "@/utils/showToast"
import useAuthStore from "./AuthStore";

const useLinkStore=create<LinkState & LinkAction>((set,get)=>({
    initialLinks: [],
    links:[],
    hasChanges:false,
    userData:useUserStore.getState().userData,
   

    addLink: () => {
    const links = get().links
    console.log(get().userData)

      const linkId = uuidv4()
        const newLink:Links = {
        id: uuidv4(),
        platform: {
          name: "GitHub",
          url: "",
        },
      };


      set({
        links: [...links, newLink],
      hasChanges:true, //mark as chnaged
     });

  },

  removeLink: async (id: string) => {
      const links=get().links
      const uid = useAuthStore.getState()?.currentUser?.uid;
        // First, try to remove the form from unsavedLinks

    if(!uid){
      console.error("Invalid uid")
      return;
    }
    try  {
      const updatedLinks = links?.filter((link:Links) => link.id !== id).map((link:Links) => ({
      ...link,
    }));;
        const userRef=doc(db,"users",uid)

        await updateDoc(userRef,{links:updatedLinks})

         set({
      links: updatedLinks ,
      hasChanges:true, //mark as changed
      });

        showToastSuccess("Link removed successfully!")
    } catch(error){
      showToastError("Failed to remove link")
      console.error(error)

    }

      //TODO - Update the useData with the updatedSavedLinks array and the unsavedLinks with the updatedunsavedLinks array



  },

  updateLink: (id: string, updatedLink: Partial<Links>) => {
      const links=get().links

      const updatedLinks=links?.map((link:Links) =>
        link.id === id ? { ...link, ...updatedLink } :link
       );
       set({
        links:updatedLinks,
        hasChanges:true //mark as changed
       });
       console.log(updatedLinks)

  },

  saveLink: async () => {

    const uid = useAuthStore.getState()?.currentUser?.uid;
    //get the user ID
    // console.log(get());
    console.log(uid)
    const userData=useUserStore.getState()?.userData
    console.log(userData)

    const links= get().links



          try {
             if (!uid) {
      throw new Error("User is not authenticated");
    }
         if(!userData ||links?.length==0){
      showToastError("No links to save or user data unavailable.")
    }
        //const updatedLinks =[...userData.links, ...unsavedLinks]
          //console.log(updatedLinks)

            const userRef = doc(db, "users", uid);
            // const userDoc = await getDoc(userRef);
            // await setDoc(userRef, {links: unsavedLinks},{merge:true});
            await updateDoc(userRef, {links})



            //TODO - update local state
            set({
            initialLinks: links, // Sync initialLinks with the current saved links
            hasChanges:false

          })
          showToastSuccess("Link saved successfully")
            // get()?.fetchUser(get()?.user?.uid)
            console.log("Link saved")
          }
          catch(error){
            console.error(error)
            showToastError("Failed to save link")
          }
  },

  setInitialLinks:(fetchedLinks:Links[])=>{
    set({
      links:fetchedLinks,
      initialLinks:fetchedLinks,
      hasChanges:false
    })
  }
}))

export default useLinkStore
