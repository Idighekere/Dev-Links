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
  collectionGroup,
} from "firebase/firestore";
import "firebase/firestore";
import firebase from "firebase/app";
import { db } from "../config/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "./useAuthStore";
export interface FormType {
  id: number;
  // url: string;
  platform: platform;
}

export interface platform {
  name: string;
  url: string;
  icon: string;
  color: string;
  username?: string;
}
export interface Profile {
  imageUrl: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
}
export interface State {
  profile: Profile;
  forms: FormType[];
  user?: User;
  userData: any;
}
export type Action = {
  listenUser?: (uid: string) => Promise<void>;
  fetchUser?: (uid: string | null | undefined) => Promise<void>;
  addForm: () => Promise<void>;
  removeForm: (id: number) => void;
  setForm: (id: number, updatedForm: Partial<FormType>) => void;
  setUser?: (userData: Partial<User>) => void;
  setProfile?: (field: string, value: string) => void;
  setImageURL?: (image: string) => void;
  addUserToFirestore?: (uid: string, email: string) => Promise<void>;
};

export const useStore = create<State & Action>((set, get) => ({
  forms: [],
  profile: {
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  user: {
    uid: null,
    email: null,
    displayName: null,
  },
  userData: null,
  // listenUser: async (uid) => {},
  setUser: (userData) =>
    set((state: any) => ({ user: { ...state.user, ...userData } })),

  addUserToFirestore: async (uid, email) => {
    try {
      const userRef = doc(db, "users", uid);

      await setDoc(userRef, {
        uid: uid,
        profile: {
          email: email,
          firstName: "",
          lastName: "",
          imageUrl: "",
        },
        forms: [],
      });

      console.log("User added to firebase");
    } catch (error) {
      console.error(error);
    }
  },
  fetchUser: async (uid) => {
    if(!uid){
      console.error("Invalid Uid")
      return;
    }
    const userRef = doc(db, "users",uid);
    const userDoc = await getDoc(userRef);
    // console.log(userDoc);

    try{
      if (userDoc.exists()) {
          const userData = userDoc.data();
          // const set = useSet();
          // set((state: State) => ({
          //   ...state,
          //   profile: userData.profile,
          //   forms: userData.forms,
          //   // user: {
          //   //   uid: userData.uid,
          //   //   email: userData.user.email,
          //   //   displayName: userData.user.displayName,
          //   // },
          // }));

          set({ userData: userData });

          console.log(userData);
            // return userData;
        } else {
          set({ userData: null });
        }
    } catch(error){
          console.error(error)
    }


  },
  addForm: async () => {
    const uid = get()?.user?.uid;
    //get the user ID
    console.log(get());

    if (!uid) {
      throw new Error("User is not authenticated");
    }
    try {
      const userRef = doc(db, "users", uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      console.log(userData);
      // const docRef = collectionGroup(db, "user");
      console.log(userRef);
      const newForm = {
        id: get().forms.length + 1,
        platform: {
          name: "GitHub",
          url: "https://github.com/",
          color: "bg-[#181717]",
          icon: "icon-park-outline:github",
          username: "example",
        },
      };
      await updateDoc(userRef, {
        forms: [...get().forms, newForm],
      });
      set({ forms: [...get().forms, newForm] });
    } catch (error) {
      console.error("Error adding link to Firestore", error);
    }
    // Handle case where user is not logged in
  },
  removeForm: async (id: number) => {
    const uid = get()?.user?.uid;

    if(!uid){
      console.error("Invalid Uid");
return;
    }
    try {
      const userRef = doc?.(db, "users", uid);

      const updatedForm = get()?.forms?.filter((form) => form.id !== id);
      const formWithUpdatedId = updatedForm?.map((form, i) => ({
        ...form,
        id: i + 1,
      }));
      await updateDoc(userRef, {
        forms: formWithUpdatedId,
      });
      set({
        forms: formWithUpdatedId,
      });
    } catch (error) {
      console.error(error);
    }
  },
  setForm: async (id: number, updatedForm: Partial<FormType>) => {
    const uid = get()?.user?.uid; // Get the user ID from the store
      if(!uid){
      console.error("Invalid Uid");
return;
    }
    try {
      const userRef = doc(db, "users", uid);
      const updatedForms = get().
      forms.map((form) =>
        form.id === id ? { ...form, ...updatedForm } : form
      );
      await updateDoc(userRef, {
        forms: updatedForms,
      });
      set({
        forms: updatedForms,
      });
    } catch (err) {
      console.error(err);
    }
  },

  setProfile: async (field, value) => {
    const uid = get()?.user?.uid;
if(!uid){
      console.error("Invalid Uid");
return;
    }
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        profile: {
          ...get().profile,
          [field]: value,
        },
      });
      set((state) => ({
        profile: {
          ...get().profile,
          [field]: value,
        },
      }));
    } catch (err) {
      console.error(err);
    }
    set((state: State) => ({
      profile: { ...state.profile, [field]: value }, // to update the profile form filled dynamically
    }));
  },
  setImageURL: (image) =>
    set((state) => ({
      profile: {
        ...state.profile,
        imageUrl: image,
      },
    })),
}));

/**

import { useStore } from 'zustand';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

const useFirestoreStore = create<State & Action>((set, get) => ({
  // ... your existing Zustand state and actions

  // Fetch user data from Firestore
  fetchUser: async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      set({
        profile: userData.profile,
        forms: userData.forms,
        user: uid, // Set the user ID in the store
      });
    } else {
      // Handle case where user doesn't exist
      console.error('User not found');
    }
  },

  // Update user profile in Firestore
  updateProfile: async (field, value) => {
    const uid = get().user; // Get the user ID from the store

    if (uid) {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        profile: {
          ...get().profile,
          [field]: value,
        },
      });
      set({ profile: {
          ...get().profile,
          [field]: value,
        },
      });
    } else {
      // Handle case where user is not logged in
      console.error('User not logged in');
 }



  },


  // Add a new form to Firestore
  //These are some bunch of words that I'm using to practice vim
  addForm: async () => {
    const uid = get().user; // Get the user ID from the store
    if (uid) {
      const userRef = doc(db, 'users', uid);
      const newForm = {
        id: get().forms.length + 1,
        platform: {
          name: "GitHub",
          url: "https://github.com/",
          color: "bg-[#181717]",
          icon: "icon-park-outline:github",
          username: "example",
        },
      };
      await updateDoc(userRef, {
        forms: [...get().forms, newForm],
      });
      set({
        forms: [...get().forms, newForm],
      });
    } else {
      // Handle case where user is not logged in
      console.error('User not logged in');
    }
  },

  // Remove a form from Firestore
  removeForm: async (id) => {
    const uid = get().user; // Get the user ID from the store
    if (uid) {
      const userRef = doc(db, 'users', uid);
      const updatedForms = get().forms.filter((form) => form.id !== id);
      await updateDoc(userRef, {
        forms: updatedForms,
      });
      set({
        forms: updatedForms,
      });
    } else {
      // Handle case where user is not logged in
      console.error('User not logged in');
    }
  },

  // Update a form in Firestore
  setForm: async (id, updatedForm) => {
    const uid = get().user; // Get the user ID from the store
    if (uid) {
      const userRef = doc(db, 'users', uid);
      const updatedForms = get().forms.map((form) =>
        form.id === id ? { ...form, ...updatedForm } : form
      );
      await updateDoc(userRef, {
        forms: updatedForms,
      });
      set({
        forms: updatedForms,
      });
    } else {
      // Handle case where user is not logged in
      console.error('User not logged in');
    }
  },

  // ... other actions
}));

**/
