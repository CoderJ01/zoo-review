import React from 'react';
import './Review.style.css'

const Review = () => {
    return (
        <div className='review'>
            <div className='review-heading'>
                <div className='review-avatar'>

                </div>
                <div>
                    <div className='review-username'></div>
                    <text>Wrote a review</text>
                </div>
            </div>
            <div className='review-picture'></div>
            <div className='review-info'></div>
            <div className='review-icons'></div>
        </div>
    );
}

export default Review;