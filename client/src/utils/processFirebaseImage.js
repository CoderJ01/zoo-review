import { cloudString } from './cloudString';
import { ref, uploadBytes, deleteObject, getStorage, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { v4 } from 'uuid';

export const deleteFirebaseImage = async (image) => {
    if(image.includes(cloudString)) {
        const stored = getStorage();
        const imageRef = ref(stored, image);
        deleteObject(imageRef).then(() => {
            console.log('Old avatar has been deleted!');
        }).catch(error => console.log(error))
    }
}

export const storeFirebaseImage = async (imageUpload, setConfirmed, directory) => {
    if(imageUpload != null) {
        setConfirmed(true);
        const imageRef = ref(storage, `images/${directory}/${imageUpload.name + cloudString + v4()}`);

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

export const retrieveFirebaseURL = (directory, setImageUrl) => {
    const imageListRef = ref(storage, `images/${directory}/`);

    listAll(imageListRef)
    .then(response => {
        response.items.forEach(item => {
            getDownloadURL(item).then(url => {
                setImageUrl(url);
            });
        })
    });
}