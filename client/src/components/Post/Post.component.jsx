import React from 'react';
import './Post.style.css'
import { displayRating } from './Post.util';

const Post = ({ username, avatar, image, zoo, review, rating }) => {
    let ratingDisplay = displayRating(rating);
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
                    {ratingDisplay}
                </div>
                <text>
                    {review}
                </text>
            </div>
        </div>
    );
}

export default Post;