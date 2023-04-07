// React
import React, { useState, useEffect, useCallback } from 'react';

// CSS
import './ZooReview.style.css';

// util
import { displayAvatar, displayRating } from '../../utils/display';

// URL
import { baseURL } from '../../URLs/urls';

// other imports
import axios from 'axios';

const ZooReview = ({ review }) => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');

    let ratingDisplay = displayRating(review.rating);
    let profileImage = displayAvatar(avatar);

    const fetchUserById = useCallback(async () => {
        const id = review.user;

        if(id) {
            try {
                const response = await axios.get(baseURL + `/api/users/${id}`);
                setUsername(response.data.username);
                setAvatar(response.data.avatar);
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
                <text>{username}</text>  
            </div>
            <div className='zoo-review-body'>
                <p>{review.content}</p>
            </div>
            <div className='zoo-review-rating'>
               
            </div>
            <div className='zoo-review-footer'>
                <div className='zrf-text'>
                    {ratingDisplay}
                    <p>{review.updatedAt.toString().substring(0, 10)}</p>
                </div>
                <div className='zrf-avatar'>
                    <img alt='' src={profileImage} draggable='false'></img>
                </div>   
            </div>
        </div>
    );
}

export default ZooReview;