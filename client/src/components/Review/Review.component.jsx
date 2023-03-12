import React from 'react';
import './Review.style.css'

const Review = ({ username, avatar, image, zoo, review }) => {
    return (
        <div className='review'>
            <div className='review-heading'>
                <div className='review-heading-avatar'>
                    <img alt='' src={avatar}/>
                </div>
                <div className='review-heading-info'>
                    <div className='review-username'>{username}</div>
                    <text>Wrote a review</text>
                </div>
            </div>
            <div className='review-picture'>
                <img alt='' src={image}></img>
            </div>
            <div className='review-info'>
                <h1>{zoo}</h1>
                <div className='review-info-rating'>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <text>
                    {review}
                </text>
            </div>
        </div>
    );
}

export default Review;