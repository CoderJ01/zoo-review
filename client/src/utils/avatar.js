import { defaultProfileImage } from './images';

export const displayAvatar = (avatar) => {
    let profileImage;
    
    if(avatar === '' || avatar === undefined) {
        profileImage = defaultProfileImage;
    }
    else {
        profileImage = avatar;
    }

    return profileImage;
}