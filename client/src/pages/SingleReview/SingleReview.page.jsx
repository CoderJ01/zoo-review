// React
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// CSS
import './SingleReview.style.css';

// util
import { displayAvatar, displayRating } from '../../utils/display';

// URL
import { baseURL } from '../../URLs/urls';

// other import
import axios from 'axios';

const SingleReview = () => {
    const { reviewId } = useParams();
    
    const [title, setTitle] = useState('');
    const [zoo, setZoo] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [user, setUser] = useState('');
    const [date, setDate] = useState('');
    const [avatar, setAvatar] = useState('');

    let profileImage = displayAvatar(avatar);

    const fetchReviewById = useCallback(async () => {
        const id = reviewId;
        if(id) {
            try {
                const response = await axios.get(baseURL + `/single-review/${id}`);
                setTitle(response.data.data.title);
                setRating(response.data.data.rating);
                setZoo(response.data.zoo)
                setContent(response.data.data.content);
                setUser(response.data.user);
                setAvatar(response.data.avatar);
                setDate(response.data.data.updatedAt.toString().substring(0, 10))
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [reviewId]);

    useEffect(() => {
        fetchReviewById();
    }, [fetchReviewById]);

    let ratingDisplay = displayRating(rating);

    return (
        <div className='single-review'>
            <div className='single-review-display'>
                <div className='single-review-display-header'>
                    <h1>{title}</h1>
                    <p>{zoo}</p>
                </div>
                <div className='single-review-display-body'>
                    <p>{content}</p>
                    {ratingDisplay}
                </div>
                <div className='single-review-display-footer'>
                    <div className='srdf-text'>
                        <text>{user}</text>  
                        <p>{date}</p>
                    </div>
                    <div className='srdf-avatar'>
                        <img alt='' src={profileImage} draggable='false'></img>
                    </div>   
                </div>
            </div>
        </div>
    );
}

export default SingleReview;

