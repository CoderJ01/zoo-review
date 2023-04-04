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

export const reversePostOrder = (posts) => {
    let x = [];

    for(let i = (posts.length - 1); i >= 0; i--) {
        x.push(posts[i]);
    }

    return x;
}