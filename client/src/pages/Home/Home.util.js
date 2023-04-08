export const displayPosts = (admin, reviewNum) => {
    let numberDisplayed;
    console.log(admin);

    if(admin === true) {
        numberDisplayed = reviewNum;
    }
    else {
        numberDisplayed = 4;
    }

    return numberDisplayed;
}