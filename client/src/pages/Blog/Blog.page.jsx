// React
import React from 'react';

// CSS
import '../Review/Review.style.css'

// components
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';
import PostBlog from '../../components/PostBlog/PostBlog.component';

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