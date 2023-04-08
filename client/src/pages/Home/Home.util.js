export const displayPosts = (admin, reviewNum) => {
    let numberDisplayed;

    if(admin === true) {
        numberDisplayed = reviewNum;
    }
    else {
        numberDisplayed = 4;
    }

    return numberDisplayed;
}