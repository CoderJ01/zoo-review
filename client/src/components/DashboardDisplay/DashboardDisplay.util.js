export const displayPosts = (display) => {
    let show;

    if(display === true) {
        show = '';
    }
    else {
        show = 'none'
    }

    return show;
}