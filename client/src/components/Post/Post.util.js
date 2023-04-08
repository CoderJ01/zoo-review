import { blogImage, reviewImage } from "../../utils/images";

export const displayImage = (blog, post) => {
    if(!blog && post.image === '') {
        post.image = reviewImage;
    }

    if(blog && post.image === '') {
        post.image = blogImage;
    }

    return post.image
} 

export const trashIcon = <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='currentColor' d='M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z'/></svg>;