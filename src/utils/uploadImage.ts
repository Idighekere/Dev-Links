import { storage } from '@/config/firebase.config'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export const uploadImage=async(image:File,uid:string)=>{
        // const date = new Date().getTime()
        const imageRef = ref(storage, `images/${uid}`)

        if (image) {
            const uploadTask = uploadBytesResumable(imageRef, image);

            // Get the download URL
            const imageUrl= await getDownloadURL(uploadTask.snapshot.ref)
                .then((url: any) => {
                    // Insert url into an <img> tag to "download"

                    console.log(url)
                })
                .catch((error: any) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
 return imageUrl
        }

}
