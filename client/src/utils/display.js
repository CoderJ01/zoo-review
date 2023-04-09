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

export const displayRating = (rating) => {
    let color = starColor(rating);

    let filled = [];

    for(let i = 0; i < rating; i++) {
        filled[i] =  <span class='fa fa-star checked' style={{ color: color }}></span>
    }

    let empty = [];

    for(let i = 0; i < 5 - filled.length; i++) {
        empty[i] = <span class='fa fa-star'></span>
    }

    let display = [];

    for(let i = 0; i < filled.length; i++) {
        display.push(filled[i]);
    }

    for(let i = 0; i < empty.length; i++) {
        display.push(empty[i]);
    }

    return display;
}

const starColor = (rating) => {
    let color;
    switch(rating) {
        case 1:
            color = 'rgb(223, 33, 33)';
            break;
        case 2:
            color = 'rgb(238, 161, 18)';
            break;
        case 3:
            color = 'rgb(226, 226, 38)';
            break;
        case 4:
            color = 'rgb(34, 191, 41)';
            break;
        case 5:
            color = 'rgb(46, 182, 225)';
            break;
        default:
    }
    return color;
}

export const displayAdminText = <span> (<span style={{ color: 'rgb(50, 179, 50)'}}>ADMIN</span>)</span>