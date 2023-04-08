import { cloudString } from './cloudString';
import { ref, deleteObject, getStorage } from 'firebase/storage';

export const deleteFirebaseImage = async (image) => {
    if(image.includes(cloudString)) {
        const stored = getStorage();
        const imageRef = ref(stored, image);
        deleteObject(imageRef).then(() => {
            console.log('Old avatar has been deleted!');
        }).catch(error => console.log(error))
    }
}