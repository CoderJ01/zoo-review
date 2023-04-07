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