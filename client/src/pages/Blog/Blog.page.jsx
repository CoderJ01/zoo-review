import React from 'react';
import '../Review/Review.style.css'
import PostForm from '../../components/PostForm/PostForm.component';

const Blog = () => {
    return (
        <div className='review'>
            <PostForm formHeading={'Write Your Blog Post'} buttonText={'New Blog'} blog={true}/>
        </div>
    );
}

export default Blog;