import { useUserStore, useAuthStore, useLinkStore } from '@/store'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db, storage } from '@/config/firebase.config'
import { Links, LinkState, LinkAction } from '@/types'

import { v4 as uuidv4 } from 'uuid'

import toast, { Toaster } from 'react-hot-toast'
import { showToastSuccess, showToastError } from '@/utils/showToast'

//TODO Add links to zustand store locally
const links = useLinkStore.getState().links
const setLinks = useLinkStore.getState().setLinks
const setHasChanges = useLinkStore.getState().setHasChanges

export const addLink = () => {
  const links = useLinkStore.getState().links
  const setLinks = useLinkStore.getState().setLinks
  const setHasChanges = useLinkStore.getState().setHasChanges

  const newLink = {
    id: uuidv4(),
    platform: 'GitHub',
    url: ''
  }

  setLinks([...links, newLink])
  setHasChanges(true)
}

export const removeLink = async (id: string) => {
  const links = useLinkStore.getState().links
  const uid = useAuthStore.getState().currentUser?.uid

  if (!uid) {
    console.error('Invalid uid')
    return
  }

  try {
    //Filter the links and remove a link and then update it with what is on firestore.
    const updatedLinks = links?.filter(link => link.id !== id)

    const userRef = doc(db, 'users', uid)

    await updateDoc(userRef, { links: updatedLinks }) //Used updateDoc because I wanna also change the links locally so it will be in sync when saved

    setLinks(updatedLinks)
    setHasChanges(true)

    showToastSuccess('Link removed successfully!')
  } catch (error) {
    showToastError('Failed to remove link')
    console.error(error)
  }
}

export const updateLink = (id: string, updatedLink: Partial<Links>) => {
  const links = useLinkStore.getState().links
  const setHasChanges = useLinkStore.getState().setHasChanges
  const setLinks = useLinkStore.getState().setLinks


  const linksAfterUpdate = links?.map(link =>
    link.id === id ? { ...link, ...updatedLink } : link
  )

  setLinks(linksAfterUpdate)
  setHasChanges(true)
}

//Save the links array(including newly added links, and updated Links) to firebase firestore

export const saveLinks = async () => {
  const uid = useAuthStore.getState().currentUser?.uid
  const links = useLinkStore.getState().links
  const setInitialLinks= useLinkStore.getState().setInitialLinks
  if(!uid) {
    console.error("USer is not authenticated");
    return
  }
  if(links.length==0){
    showToastError("No links to save");
    return;
  }

  try {
    const userRef= doc(db, 'users',uid)

    await updateDoc(userRef, {links})

    setInitialLinks(links)
    setHasChanges(false)

    showToastSuccess("Link saved successfully");

  } catch (error) {
    console.error(error)
    showToastError("Failed to save links");
  }
}
