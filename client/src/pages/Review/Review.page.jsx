import React from 'react';
import './Review.style.css'
import PostReview from '../../components/PostReview/PostReview.component';
import AccessDenied from '../../components/AccessDenied/AccessDenied.component';

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