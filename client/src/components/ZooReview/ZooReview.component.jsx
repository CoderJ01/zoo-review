import React, { useState, useEffect, useCallback } from 'react';
import { displayRating, defaultProfileImage } from '../Post/Post.util';
import axios from 'axios';
import '../../pages/SingleReview/SingleReview.style.css';
import './ZooReview.style.css';

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
        <div className='zoo-review'>
            <div className='zoo-review-header'>
                <h1>{review.title}</h1>
            </div>
            <div className='zoo-review-body'>
                <p>{review.content}</p>
                {ratingDisplay}
            </div>
            <div className='zoo-review-footer'>
                <div className='zrf-text'>
                    <text>{username}</text>  
                    <p>{review.updatedAt.toString().substring(0, 10)}</p>
                </div>
                <div className='zrf-avatar'>
                    <img alt='' src={defaultProfileImage}></img>
                </div>   
            </div>
        </div>
    );
}

export default ZooReview;