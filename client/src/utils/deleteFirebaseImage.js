import { cloudString } from './cloudString';
import { ref, deleteObject, getStorage } from 'firebase/storage';

export const deleteFirebaseImage = (avatar) => {
    if(avatar.includes(cloudString)) {
        const stored = getStorage();
        const imageRef = ref(stored, avatar);
        deleteObject(imageRef).then(() => {
            console.log('Old avatar has been deleted!');
        }).catch(error => console.log(error))
    }
}