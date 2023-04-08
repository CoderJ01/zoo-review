import { cloudString } from './cloudString';
import { ref, uploadBytes, deleteObject, getStorage, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const deleteFirebaseImage = async (image) => {
    if(image.includes(cloudString)) {
        const stored = getStorage();
        const imageRef = ref(stored, image);
        deleteObject(imageRef).then(() => {
            console.log('Old avatar has been deleted!');
        }).catch(error => console.log(error))
    }
}

export const storeFirebaseImage = async (imageUpload, setConfirmed, imageRef) => {
    if(imageUpload != null) {
        setConfirmed(true);

        uploadBytes(imageRef, imageUpload)
        .then(() => {
            alert('Image confirmed! Wait a few seconds for it to process!');
        })
        .catch(error => {
            console.log(error);
        });
    }
    else {
        alert('You have not uploaded an image!');
        window.location.reload(false);
        return;
    }
}

export const retrieveFirebaseURL = (imageRef, setImageUrl, folder) => {
    const imageListRef = ref(storage, `images/${folder}/`);
    listAll(imageListRef)
    .then(response => {
        response.uploadedImage = [];
        response.uploadedImage.push(imageRef);
        response.uploadedImage.forEach(image => {
            getDownloadURL(image).then(url => {
                console.log(url);
                setImageUrl(url);
            });
        })
    });
}