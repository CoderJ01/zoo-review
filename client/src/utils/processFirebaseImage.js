import { cloudString } from './cloudString';
import { ref, uploadBytes, deleteObject, getStorage, getDownloadURL } from 'firebase/storage';

export const deleteFirebaseImage = async (image) => {
    if(image.includes(cloudString)) {
        const stored = getStorage();
        const imageRef = ref(stored, image);
        deleteObject(imageRef).then(() => {
            console.log('Old avatar has been deleted!');
        }).catch(error => console.log(error))
    }
}

export const storeFirebaseImage = async (imageUpload, setConfirmed, imageRef, setImageUrl) => {
    if(imageUpload != null) {
        setConfirmed(true);

        uploadBytes(imageRef, imageUpload)
        .then(() => {
            getDownloadURL(imageRef).then(function(url) {
                console.log(url);
                setImageUrl(url);
            })
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
