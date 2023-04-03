// React
import React from 'react';

// CSS
import './Review.style.css';

// components
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';
import PostReview from '../../components/PostReview/PostReview.component';

const Review = ({ user }) => {
    return (
        <>
        {
            user.length === 0 ? 
            (
                <AccessDenied/>
            ) : 
            (
                <div className='review'>
                    <PostReview user={user}/>
                </div>
            )
        }
        </>
    );
}

export default Review;