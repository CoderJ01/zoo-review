import React, { useState, useEffect, useCallback } from 'react';
import { displayRating, defaultProfileImage } from '../Post/Post.util';
import axios from 'axios';

const baseURL = 'http://localhost:3001';

const ZooReview = ({ review }) => {
    const [username, setUsername] = useState('');

    let ratingDisplay = displayRating(review.rating);

    const fetchUserById = useCallback(async () => {
        const id = review.user;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/api/users/${id}`);
                setUsername(response.data.username);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [review.user]);

    useEffect(() => {
        fetchUserById();
    }, [fetchUserById]);

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
                    <text>{username}</text>  
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