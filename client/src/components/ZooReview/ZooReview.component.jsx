import React from 'react';
import { displayRating } from '../Post/Post.util';
import { defaultProfileImage } from '../Post/Post.util';

const ZooReview = ({ review }) => {
    let ratingDisplay = displayRating(review.rating);
    return (
        <div className='single-review-display'>
            <div className='single-review-display-header'>
                <h1>{review.title}</h1>
            </div>
            <div className='single-review-display-body'>
                <p>{review.content}</p>
                {ratingDisplay}
            </div>
            <div className='single-review-display-footer'>
                <div className='srdf-text'>
                    <text>{review.user}</text>  
                    <p>{review.updatedAt.toString().substring(0, 10)}</p>
                </div>
                <div className='srdf-avatar'>
                    <img alt='' src={defaultProfileImage}></img>
                </div>   
            </div>
        </div>
    );
}

export default ZooReview;