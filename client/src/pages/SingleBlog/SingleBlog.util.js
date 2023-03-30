export const colorThumbUp = (liked) => {
    let likedColor;
 
    if(liked === true) {
        likedColor = 'rgb(34, 191, 41)';
    }
    else {
        likedColor = '';
    }

    return likedColor;
}

export const colorThumbDown = (disliked) => {
    let dislikedColor;

    if(disliked === true) {
        dislikedColor = 'rgb(223, 33, 33)';
    }
    else {
        dislikedColor = '';
    }

    return dislikedColor;
}