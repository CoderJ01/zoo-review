import React from 'react';
import '../Review/Review.style.css'
import PostBlog from '../../components/PostBlog/PostBlog.component';
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';

const Blog = ({ user }) => {
    return (
        <>
        {
            user.length === 0 ? 
            (
                <AccessDenied/>
            ) : 
            (
            <div className='review'>
                <PostBlog user={user}/>
            </div>
            )
        }
        </>
    );
}

export default Blog;