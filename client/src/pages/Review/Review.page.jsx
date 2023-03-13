import React from 'react';
import './Review.style.css'
import PostForm from '../../components/PostForm/PostForm.component';

const Review = () => {
    return (
        <div className='review'>
            <PostForm formHeading={'Write Your Review'} buttonText={'New Review'}/>
        </div>
    );
}

export default Review;